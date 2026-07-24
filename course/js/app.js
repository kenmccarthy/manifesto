/* Course orchestrator — navigation, routing, progress wiring, focus management.
   Phase 1: the responsive shell + visual system. Section bodies are intros +
   placeholders; the interaction engine and activities arrive in later phases. */

import { Progress } from "./progress.js";
import { shapeSvg } from "./shapes.js";

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

// Short section intros (drafts) so the shell reads as a real experience.
const LEADS = {
  before: {
    kicker: "Before We Begin",
    title: "Where are you starting from?",
    lead: "A moment to notice where you stand before we explore the statements. There are no right answers here — only your honest starting point.",
  },
  manifesto: {
    kicker: "The Manifesto",
    title: "This is not a rulebook.",
    lead: "The Manifesto is an invitation to think, question and act with intention — 30 statements across three interconnected themes.",
  },
  "theme-1": {
    kicker: "Theme 1",
    title: "Rethinking Teaching and Learning",
    lead: "For generations, education was organised around scarce information. What changes when explanations, examples and answers become almost instant?",
  },
  "theme-2": {
    kicker: "Theme 2",
    title: "Responsibility, Ethics, and Power",
    lead: "Capability does not remove responsibility. It redistributes it. Who chose the system? Whose data shaped it? Who is accountable?",
  },
  "theme-3": {
    kicker: "Theme 3",
    title: "Imagination, Humanity, and the Future",
    lead: "The future is not something technology does to us. Technology changes what becomes possible; people still decide what becomes desirable.",
  },
  connecting: {
    kicker: "Connecting the Manifesto",
    title: "The statements don't live alone.",
    lead: "The three themes are deliberately intertwined. Questions about teaching quickly become questions about power, judgement and value.",
  },
  action: {
    kicker: "Manifesto in Action",
    title: "Principles become meaningful when choices become difficult.",
    lead: "Work through branching scenarios drawn from real institutional dilemmas — and see which statements shaped your decisions.",
  },
  practice: {
    kicker: "Your Practice",
    title: "From Manifesto to Practice",
    lead: "Turn reflection into intention: the statements you want to carry forward, and one small change you could realistically make.",
  },
  continues: {
    kicker: "The Conversation Continues",
    title: "The end of the course — but not the Manifesto.",
    lead: "The Manifesto is meant to be questioned, debated, adapted and developed. Here is what you have made your own.",
  },
};

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
  const reset = document.createElement("button");
  reset.className = "c-btn ghost small";
  reset.type = "button";
  reset.textContent = "Reset progress";
  reset.addEventListener("click", resetProgress);
  footer.appendChild(reset);
  navEl.appendChild(footer);
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
function pager(id) {
  const idx = SECTIONS.findIndex((s) => s.id === id);
  const prev = SECTIONS[idx - 1];
  const next = SECTIONS[idx + 1];
  let html = '<nav class="section-pager" aria-label="Between sections">';
  html += prev
    ? '<a class="pager-link prev" href="#/' + prev.id + '"><span class="dir">← Previous</span><span class="lbl">' + prev.label + "</span></a>"
    : "<span></span>";
  html += next
    ? '<a class="pager-link next" href="#/' + next.id + '"><span class="dir">Next →</span><span class="lbl">' + next.label + "</span></a>"
    : "<span></span>";
  html += "</nav>";
  return html;
}

function renderView(id) {
  const s = sectionById(id);
  const meta = LEADS[id];
  const article = document.createElement("article");
  article.className = "section" + (s.theme ? " theme-" + s.theme : "");
  article.innerHTML =
    '<p class="section-kicker">' +
    (s.theme ? shapeSvg(s.theme, "kicker-shape") : "") +
    "<span>" + meta.kicker + "</span></p>" +
    '<h1 class="section-title" id="sectionTitle" tabindex="-1">' + meta.title + "</h1>" +
    '<p class="section-lead">' + meta.lead + "</p>" +
    '<div class="section-placeholder"><p>The activities for this section are being built. This is the Phase&nbsp;1 shell — navigation, progress and the visual system.</p></div>' +
    pager(id);
  viewEl.innerHTML = "";
  viewEl.appendChild(article);
}

/* ---------------- Show a section ---------------- */
function showSection(id) {
  renderView(id);
  Progress.markVisited(id);
  refreshNavState(id);
  updateProgressBar();
  document.title = LEADS[id].title + " · Manifesto Course";
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
