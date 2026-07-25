/* Progress & persistence — localStorage only, no PII, nothing sent anywhere.
   One namespaced, versioned key holds the learner's whole journey so they can
   leave and return.

   State is versioned. Version 1 (the original live course) is migrated on read
   into the Version 2 shape below — no field is dropped, and new fields simply
   default when absent. The storage key is unchanged so existing learners keep
   their progress. See migrate(). */

const KEY = "manifesto_course_v1";
const STATE_VERSION = 2;

function defaults() {
  return {
    version: STATE_VERSION,
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

    /* --- Version 2 additions --- */
    savedStatements: [], // "Keep this statement" — kept as you explore (unified
    // with the old Manifesto-section "mark to explore" list)
    stopAction: null, // Stop / Start / Continue Protecting (Your Practice)
    startAction: null,
    continueAction: null,
    stakeholders: [], // who needs to be part of the change
    statementTension: null, // { a, b, priority, change } — Where statements pull apart
    finalThinking: null, // { movement, note } — What happened to your thinking
    statement31: null, // the learner's own 31st statement
    completedScenarios: [], // branching scenario ids completed in Manifesto in Action
    scenarioPaths: {}, // scenarioId -> [decision indices taken]
  };
}

/* Bring an older stored state up to the current version, non-destructively.
   Anything unrecognised is preserved; anything missing defaults. */
function migrate(raw) {
  const s = Object.assign(defaults(), raw);
  if ((raw.version || 1) < 2) {
    // Unify the old "mark to explore" bookmarks into the new kept list so
    // returning learners keep continuity in Your Practice.
    const marked = (raw.activities && raw.activities.exploreMarked) || [];
    const kept = Array.isArray(s.savedStatements) ? s.savedStatements.slice() : [];
    marked.forEach((n) => { if (typeof n === "number" && !kept.includes(n)) kept.push(n); });
    s.savedStatements = kept;
  }
  s.version = STATE_VERSION;
  return s;
}

function read() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || typeof raw !== "object") return defaults();
    return migrate(raw);
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

  /* "Keep this statement" — the unified kept list. */
  savedStatements() {
    return (read().savedStatements || []).slice();
  },

  isSaved(n) {
    return (read().savedStatements || []).includes(n);
  },

  /** Toggle a statement in/out of the kept list. Returns the new kept state. */
  toggleSaved(n) {
    const s = read();
    const arr = Array.isArray(s.savedStatements) ? s.savedStatements : [];
    const i = arr.indexOf(n);
    let kept;
    if (i === -1) { arr.push(n); kept = true; }
    else { arr.splice(i, 1); kept = false; }
    s.savedStatements = arr;
    write(s);
    return kept;
  },

  removeSaved(n) {
    const s = read();
    s.savedStatements = (s.savedStatements || []).filter((x) => x !== n);
    write(s);
    return s;
  },

  savedCount() {
    return (read().savedStatements || []).length;
  },

  /* Branching scenarios (Manifesto in Action). */
  saveScenarioPath(id, pathIndices) {
    const s = read();
    s.scenarioPaths = s.scenarioPaths || {};
    s.scenarioPaths[id] = pathIndices;
    write(s);
    return s;
  },

  completeScenario(id) {
    const s = read();
    s.completedScenarios = s.completedScenarios || [];
    if (!s.completedScenarios.includes(id)) s.completedScenarios.push(id);
    write(s);
    return s;
  },

  scenariosCompleted() {
    return (read().completedScenarios || []).slice();
  },

  isScenarioComplete(id) {
    return (read().completedScenarios || []).includes(id);
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
