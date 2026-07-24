/* Progress & persistence — localStorage only, no PII, nothing sent anywhere.
   One namespaced, versioned key holds the learner's whole journey so they can
   leave and return. */

const KEY = "manifesto_course_v1";

function defaults() {
  return {
    startedAt: null,
    lastSection: null,
    visited: {}, // sectionId -> true
    completed: {}, // sectionId -> true
    activities: {}, // activityId -> arbitrary data (choices, results)
    reflections: {}, // reflectionKey -> text (the "My Reflections" notebook)
    selectedStatements: [], // numbers chosen for the personal manifesto
    anchor: null, // the one statement that matters most
    sentimentStart: null,
    sentimentEnd: null,
  };
}

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    return raw ? Object.assign(defaults(), raw) : defaults();
  } catch (e) {
    return defaults();
  }
}

function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (e) {
    /* storage may be unavailable (private mode / full) — fail quietly */
  }
}

export const Progress = {
  get() {
    return read();
  },

  /** Merge a shallow patch into the stored state. */
  update(patch) {
    const s = read();
    Object.assign(s, patch);
    write(s);
    return s;
  },

  markVisited(sectionId) {
    const s = read();
    if (!s.startedAt) s.startedAt = Date.now();
    s.visited[sectionId] = true;
    s.lastSection = sectionId;
    write(s);
    return s;
  },

  markCompleted(sectionId) {
    const s = read();
    s.completed[sectionId] = true;
    write(s);
    return s;
  },

  isVisited(sectionId) {
    return !!read().visited[sectionId];
  },

  isCompleted(sectionId) {
    return !!read().completed[sectionId];
  },

  /** Store the result/choices of a named activity. */
  saveActivity(id, data) {
    const s = read();
    s.activities[id] = data;
    write(s);
    return s;
  },

  getActivity(id) {
    return read().activities[id];
  },

  /** The reflection notebook: freeform text keyed by prompt id. */
  saveReflection(key, text) {
    const s = read();
    if (text && text.trim()) s.reflections[key] = text.trim();
    else delete s.reflections[key];
    write(s);
    return s;
  },

  hasStarted() {
    return !!read().startedAt;
  },

  /** Wipe everything (Start Again / Reset Progress). */
  reset() {
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      /* ignore */
    }
  },
};
