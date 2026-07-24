/* Course orchestrator — navigation, routing, progress wiring, focus management.
   Phase 1: the responsive shell + visual system. Section bodies are intros +
   placeholders; the interaction engine and activities arrive in later phases. */

import { Progress } from "./progress.js";
import { shapeSvg } from "./shapes.js";
import { el, sectionHeader } from "./interactions.js";
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
