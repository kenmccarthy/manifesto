/* SCORM 1.2 runtime adapter.

   The course is a self-contained client-side app that also happens to run
   inside a SCORM 1.2 LMS. This module is the *only* place that talks to the
   LMS. Everywhere else (progress.js, the sections) stays LMS-agnostic.

   Design guarantees:
     • Completely inert off-LMS. When there is no LMS API on any parent/opener
       frame, every method is a safe no-op and the course behaves exactly as
       the standalone web version. Nothing here throws.
     • Idempotent init/finish. Each page load is one SCORM session; total_time
       accumulates across sessions in the LMS, so init→finish cycles are safe.
     • Compact by design. Callers decide what to store; SCORM 1.2 caps
       cmi.suspend_data at 4096 characters, enforced here (see setSuspendData).

   Reference model used: pipwerks-style API discovery, hand-rolled to avoid a
   dependency and to keep the whole thing a single small ES module. */

const SUSPEND_DATA_LIMIT = 4096; // SCORM 1.2 CMIString4096 hard cap.

/* Walk up the frame/opener chain looking for the LMS-provided API object.
   SCORM 1.2 names it `API` (SCORM 2004 would be `API_1484_11`). The LMS puts
   it somewhere on an ancestor window or the launching window's opener. */
function findAPIIn(win, depth) {
  let w = win;
  let n = 0;
  while (w && n < depth) {
    if (w.API) return w.API;
    if (w.parent === w) break; // reached the top
    w = w.parent;
    n++;
  }
  return null;
}

function discoverAPI() {
  try {
    // Current window's ancestors.
    let api = findAPIIn(window, 20);
    if (api) return api;
    // Content launched in a pop-up: search the opener's ancestors too.
    if (window.opener && typeof window.opener !== "undefined") {
      api = findAPIIn(window.opener, 20);
      if (api) return api;
    }
  } catch (e) {
    /* Cross-origin frame access can throw; treat as "no API". */
  }
  return null;
}

let API = null;
let available = false;
let initialized = false;
let terminated = false;
let sessionStart = 0;

function ok(result) {
  // SCORM 1.2 boolean returns are the strings "true"/"false".
  return result === "true" || result === true;
}

function lastError() {
  try {
    return API ? API.LMSGetLastError() : "0";
  } catch (e) {
    return "0";
  }
}

/* Format elapsed milliseconds as a SCORM 1.2 CMITimespan: HHHH:MM:SS.SS */
function toCMITime(ms) {
  const totalSec = Math.max(0, ms) / 1000;
  const hh = Math.floor(totalSec / 3600);
  const mm = Math.floor((totalSec % 3600) / 60);
  const ss = totalSec % 60;
  const p2 = (n) => String(Math.floor(n)).padStart(2, "0");
  return p2(hh) + ":" + p2(mm) + ":" + ss.toFixed(2).padStart(5, "0");
}

export const Scorm = {
  /** True only when a real LMS API was found and initialized. */
  get available() {
    return available && initialized && !terminated;
  },

  /** Find the API and LMSInitialize. Safe to call more than once. */
  init() {
    if (initialized) return available;
    API = discoverAPI();
    available = !!API;
    if (!available) return false;
    try {
      const res = API.LMSInitialize("");
      // "already initialized" (101) is fine — another page in this SCO began
      // the session. Treat as success either way.
      initialized = ok(res) || lastError() === "101";
      if (initialized) {
        terminated = false;
        sessionStart = Date.now();
        // Mark the attempt in progress the first time we see a blank/unset
        // status, so the LMS shows "incomplete" rather than "not attempted".
        const status = this.get("cmi.core.lesson_status");
        if (!status || status === "not attempted" || status === "") {
          this.set("cmi.core.lesson_status", "incomplete");
        }
        this.commit();
      }
    } catch (e) {
      initialized = false;
      available = false;
    }
    return this.available;
  },

  get(key) {
    if (!this.available) return "";
    try {
      return API.LMSGetValue(key);
    } catch (e) {
      return "";
    }
  },

  set(key, value) {
    if (!this.available) return false;
    try {
      return ok(API.LMSSetValue(key, String(value)));
    } catch (e) {
      return false;
    }
  },

  commit() {
    if (!this.available) return false;
    try {
      return ok(API.LMSCommit(""));
    } catch (e) {
      return false;
    }
  },

  /** Resume point — which section the learner last opened. */
  setLocation(section) {
    if (section == null) return;
    this.set("cmi.core.lesson_location", String(section).slice(0, 255));
  },

  getLocation() {
    return this.get("cmi.core.lesson_location");
  },

  /** Store the compact progress blob. Never writes past the 4096 cap. */
  setSuspendData(str) {
    if (!this.available) return false;
    const data = String(str == null ? "" : str);
    if (data.length > SUSPEND_DATA_LIMIT) {
      // Callers keep the blob small on purpose; if it ever grows past the cap
      // we drop the write rather than let the LMS silently truncate mid-JSON
      // (which would corrupt the resume payload).
      if (typeof console !== "undefined" && console.warn) {
        console.warn("[scorm] suspend_data over " + SUSPEND_DATA_LIMIT + " chars (" + data.length + "); skipping write.");
      }
      return false;
    }
    return this.set("cmi.suspend_data", data);
  },

  getSuspendData() {
    return this.get("cmi.suspend_data");
  },

  getStatus() {
    return this.get("cmi.core.lesson_status");
  },

  /** Explicit completion (the learner's Finish action). */
  setComplete() {
    if (!this.available) return false;
    this.set("cmi.core.lesson_status", "completed");
    this._writeSessionTime();
    return this.commit();
  },

  _writeSessionTime() {
    if (!sessionStart) return;
    this.set("cmi.core.session_time", toCMITime(Date.now() - sessionStart));
  },

  /** LMSFinish. Records session time first. Guarded against double-finish. */
  finish() {
    if (!this.available) return false;
    try {
      this._writeSessionTime();
      this.commit();
      const res = API.LMSFinish("");
      terminated = true;
      return ok(res);
    } catch (e) {
      terminated = true;
      return false;
    }
  },
};

/* Auto-initialize as early as the module loads. Off-LMS this is a no-op.
   On an LMS the session opens here and closes on page unload so session_time
   and a final commit are recorded even if the learner never clicks Finish. */
Scorm.init();

if (typeof window !== "undefined") {
  // pagehide is the reliable cross-browser "leaving" signal (bfcache-safe);
  // fall back to unload for very old engines.
  const end = () => Scorm.finish();
  window.addEventListener("pagehide", end);
  window.addEventListener("unload", end);
}
