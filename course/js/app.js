/* Course orchestrator — navigation, routing, progress wiring, focus management.
   Phase 1: the responsive shell + visual system. Section bodies are intros +
   placeholders; the interaction engine and activities arrive in later phases. */

import { Progress } from "./progress.js";
import { shapeSvg } from "./shapes.js";
import { el, sectionHeader, modal } from "./interactions.js";
import { SECTION_META, RENDERERS } from "./sections/index.js";

/* ---------------- Sections ---------------- */
const SECTIONS = [
  { id: "before", label: "Before We Begin" },
  { id: "manifesto", label: "The Manifesto" },
  { id: "theme-1", label: "Rethinking Teaching and Learning", theme: 1 },
  { id: "theme-2", label: "Responsibility, Ethics, and Power", theme: 2 },
  { id: "theme-3", label: "Imagination, Humanity, and the Future", theme: 3 },
  { id: "connecting", label: "Connecting the Manifesto" },
  { id: "action", label: "Manifesto in Action" },
  { id: "practice", label: "Your Practice" },
  { id: "continues", label: "The Conversation Continues" },
];

/* ---------------- DOM refs ---------------- */
const navEl = document.getElementById("courseNav");
const viewEl = document.getElementById("view");
const progressBar = document.getElementById("progressBar");
const navToggle = document.getElementById("navToggle");
const navOverlay = document.getElementById("navOverlay");

const sectionById = (id) => SECTIONS.find((s) => s.id === id);

/* ---------------- Navigation panel ---------------- */
function buildNav() {
  const list = document.createElement("ul");
  list.className = "nav-list";
  SECTIONS.forEach((s, i) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#/" + s.id;
    a.className = "nav-link";
    a.dataset.id = s.id;
    a.innerHTML =
      '<span class="nav-marker">' +
      (s.theme ? shapeSvg(s.theme) : '<span class="nav-num">' + (i + 1) + "</span>") +
      "</span>" +
      '<span class="nav-label">' + s.label + "</span>" +
      '<span class="nav-tick" aria-hidden="true"></span>';
    li.appendChild(a);
    list.appendChild(li);
  });
  navEl.innerHTML = "";
  const heading = document.createElement("p");
  heading.className = "nav-heading";
  heading.textContent = "Course";
  navEl.appendChild(heading);
  navEl.appendChild(list);

  const footer = document.createElement("div");
  footer.className = "nav-footer";
  const reflections = document.createElement("button");
  reflections.className = "c-btn ghost small";
  reflections.type = "button";
  reflections.textContent = "My Reflections";
  reflections.addEventListener("click", openReflections);
  footer.appendChild(reflections);
  const reset = document.createElement("button");
  reset.className = "c-btn ghost small";
  reset.type = "button";
  reset.textContent = "Reset progress";
  reset.addEventListener("click", resetProgress);
  footer.appendChild(reset);
  navEl.appendChild(footer);
}

/* ---------------- My Reflections notebook ---------------- */
/* Aggregates the learner's written responses from across the course. Each
   source is either a reflections-notebook entry, a top-level state field, or
   the final-thinking note. Editable and deletable in place. */
const REFLECTION_FIELDS = [
  { id: "chooseProvocationWhy", type: "reflection", label: "On the provocation that most challenges conventional teaching" },
  { id: "whatMustRemainHuman", type: "reflection", label: "On what must remain deeply human" },
  { id: "constraintCreates", type: "reflection", label: "Your constrained learning-activity design" },
  { id: "statementTension", type: "reflection", label: "On two statements that pull against each other" },
  { id: "stopAction", type: "field", label: "What you'll stop" },
  { id: "startAction", type: "field", label: "What you'll start" },
  { id: "continueAction", type: "field", label: "What you'll continue protecting" },
  { id: "oneSmallChange", type: "reflection", label: "Your one small change" },
  { id: "finalNote", type: "finalNote", label: "What you're leaving with that you weren't expecting" },
  { id: "statement31", type: "field", label: "Your Statement 31" },
];

function getReflection(f) {
  const s = Progress.get();
  if (f.type === "reflection") return (s.reflections || {})[f.id] || "";
  if (f.type === "field") return s[f.id] || "";
  if (f.type === "finalNote") return (s.finalThinking || {}).note || "";
  return "";
}

function setReflection(f, val) {
  const v = (val || "").trim();
  if (f.type === "reflection") Progress.saveReflection(f.id, v);
  else if (f.type === "field") Progress.update({ [f.id]: v || null });
  else if (f.type === "finalNote") {
    const ft = Progress.get().finalThinking || {};
    Progress.update({ finalThinking: Object.assign({}, ft, { note: v || null }) });
  }
}

function reflectionsText() {
  return REFLECTION_FIELDS
    .filter((f) => getReflection(f).trim())
    .map((f) => f.label + "\n" + getReflection(f))
    .join("\n\n");
}

function reflectionsBody() {
  const wrap = el("div", { class: "reflections-panel" });
  const list = el("div", { class: "reflections-list" });
  const emptyMsg = el("p", { class: "reflections-empty", text: "You haven't written any reflections yet. As you work through the course, your written responses collect here." });

  function refreshEmpty() {
    const any = list.querySelector(".reflection-entry");
    emptyMsg.hidden = !!any;
  }

  REFLECTION_FIELDS.filter((f) => getReflection(f).trim()).forEach((f) => {
    const entry = el("div", { class: "reflection-entry" });
    const taId = "refl-" + f.id;
    const ta = el("textarea", { id: taId, class: "reflect-ta", maxlength: 1000 });
    ta.value = getReflection(f);
    let t;
    ta.addEventListener("input", () => { clearTimeout(t); t = setTimeout(() => setReflection(f, ta.value), 400); });
    const del = el("button", { type: "button", class: "c-btn ghost small", text: "Delete" });
    del.addEventListener("click", () => { setReflection(f, ""); entry.remove(); refreshEmpty(); });
    entry.append(
      el("label", { class: "reflection-label", for: taId, text: f.label }),
      ta,
      el("div", { class: "reflection-actions" }, [del])
    );
    list.appendChild(entry);
  });

  const status = el("span", { class: "reflections-status", role: "status", "aria-live": "polite" });
  const copyAll = el("button", { type: "button", class: "c-btn small" }, "Copy all");
  copyAll.addEventListener("click", async () => {
    const text = reflectionsText();
    if (!text) { status.textContent = "Nothing to copy yet."; return; }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
      else throw new Error("no clipboard");
      status.textContent = "Copied to this device's clipboard";
    } catch (e) {
      status.textContent = "Couldn't copy automatically — select the text to copy it.";
    }
  });

  wrap.append(
    emptyMsg,
    list,
    el("div", { class: "reflections-foot" }, [copyAll, status]),
    el("p", { class: "reflections-note", text: "Your reflections are stored only in this browser and are not submitted." })
  );
  refreshEmpty();
  return wrap;
}

function openReflections() {
  const existing = document.getElementById("reflectionsModal");
  if (existing) existing.remove();
  closeNav();
  const m = modal({ title: "My Reflections", body: reflectionsBody() });
  m.element.id = "reflectionsModal";
  document.body.appendChild(m.element);
  m.open();
}

function refreshNavState(activeId) {
  const p = Progress.get();
  navEl.querySelectorAll(".nav-link").forEach((a) => {
    const id = a.dataset.id;
    a.classList.toggle("visited", !!p.visited[id]);
    a.classList.toggle("completed", !!p.completed[id]);
    if (id === activeId) a.setAttribute("aria-current", "true");
    else a.removeAttribute("aria-current");
  });
}

function updateProgressBar() {
  const p = Progress.get();
  const visited = SECTIONS.filter((s) => p.visited[s.id]).length;
  const pct = Math.round((visited / SECTIONS.length) * 100);
  progressBar.style.width = pct + "%";
  progressBar.parentElement.setAttribute("aria-valuenow", String(pct));
}

/* ---------------- Section rendering ---------------- */
function pagerEl(id) {
  const idx = SECTIONS.findIndex((s) => s.id === id);
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];
  const link = (s, dir, cls) =>
    el("a", { class: "pager-link " + cls, href: "#/" + s.id }, [
      el("span", { class: "dir", text: dir }),
      el("span", { class: "lbl", text: s.label }),
    ]);
  return el("nav", { class: "section-pager", "aria-label": "Between sections" }, [
    prev ? link(prev, "← Previous", "prev") : el("span"),
    next ? link(next, "Next →", "next") : el("span"),
  ]);
}

function placeholder(meta) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));
  frag.appendChild(
    el("div", { class: "section-placeholder" }, [
      el("p", { text: "The activities for this section are being built." }),
    ])
  );
  return frag;
}

function renderView(id) {
  const s = sectionById(id);
  const meta = SECTION_META[id];
  const article = el("article", { class: "section" + (s.theme ? " theme-" + s.theme : "") });
  const renderer = RENDERERS[id];
  article.appendChild(renderer ? renderer({ section: s, meta }) : placeholder(meta));
  article.appendChild(pagerEl(id));
  viewEl.innerHTML = "";
  viewEl.appendChild(article);
}

/* ---------------- Show a section ---------------- */
function showSection(id) {
  renderView(id);
  Progress.markVisited(id);
  refreshNavState(id);
  updateProgressBar();
  document.title = SECTION_META[id].title + " · Manifesto Course";
  closeNav();
  // Move focus to the section title for screen-reader + keyboard users.
  const title = document.getElementById("sectionTitle");
  if (title) title.focus();
  window.scrollTo(0, 0);
}

function currentIdFromHash() {
  const id = (location.hash || "").replace(/^#\/?/, "");
  return sectionById(id) ? id : null;
}

function route() {
  const id = currentIdFromHash() || SECTIONS[0].id;
  if (!currentIdFromHash()) history.replaceState(null, "", "#/" + id);
  showSection(id);
}

/* ---------------- Mobile drawer ---------------- */
function openNav() {
  document.body.classList.add("nav-open");
  navToggle.setAttribute("aria-expanded", "true");
  navOverlay.hidden = false;
}
function closeNav() {
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navOverlay.hidden = true;
}
navToggle.addEventListener("click", () => {
  if (document.body.classList.contains("nav-open")) closeNav();
  else openNav();
});
navOverlay.addEventListener("click", closeNav);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeNav();
});

/* ---------------- Header controls ---------------- */
const resumeBtn = document.getElementById("resumeBtn");
if (resumeBtn) {
  resumeBtn.addEventListener("click", () => {
    const last = Progress.get().lastSection || SECTIONS[0].id;
    location.hash = "#/" + last;
  });
}

function resetProgress() {
  if (!window.confirm("Reset your progress? This clears everything stored on this device.")) return;
  Progress.reset();
  refreshNavState(currentIdFromHash());
  updateProgressBar();
  location.hash = "#/" + SECTIONS[0].id;
  route();
}

/* ---------------- Init ---------------- */
buildNav();
window.addEventListener("hashchange", route);
route();
