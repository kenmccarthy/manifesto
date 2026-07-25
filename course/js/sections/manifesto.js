/* Section 3 — The Manifesto: three-theme introduction, Explore the Landscape
   (the interactive field of 30), and the Find the Theme knowledge check. */

import { sectionHeader, statementCard, knowledgeCheck, el } from "../interactions.js";
import { Progress } from "../progress.js";
import { shapeSvg } from "../shapes.js";
import { MANIFESTO, THEMES } from "../../data/manifesto.js";
import { THEME_INTRO, THEME_REASON } from "../../data/course.js";

function themeTriptych() {
  const wrap = el("div", { class: "theme-triptych" });
  [1, 2, 3].forEach((t) => {
    const card = el("a", { class: "theme-intro-card theme-" + t, href: "#/theme-" + t }, [
      el("span", { class: "ti-shape", html: shapeSvg(t) }),
      el("span", { class: "ti-name", text: THEMES[t].name }),
      el("span", { class: "ti-q", text: THEME_INTRO[t].question }),
    ]);
    wrap.appendChild(card);
  });
  return wrap;
}

function exploreLandscape() {
  const wrap = el("section", { class: "activity" });
  wrap.appendChild(el("h2", { class: "activity-title", text: "Explore the landscape" }));
  wrap.appendChild(
    el("p", {
      class: "activity-intro",
      text: "All 30 provocations. Filter, search, and keep the ones you want to carry forward. You don't need to read every rationale yet — the statements you keep here follow you into Your Practice.",
    })
  );

  const marked = new Set(Progress.savedStatements());
  const counter = el("p", { class: "explore-counter", "aria-live": "polite" });
  const updateCounter = () => {
    counter.textContent =
      "30 provocations. " + (marked.size ? marked.size + " kept so far." : "How many will stay with you?");
  };

  let filter = 0;
  let search = "";
  const grid = el("div", { class: "explore-grid" });
  function draw() {
    grid.innerHTML = "";
    const rows = MANIFESTO.filter(
      (s) => (!filter || s.theme === filter) && (!search || s.statement.toLowerCase().includes(search))
    );
    if (!rows.length) {
      grid.appendChild(el("p", { class: "empty", text: "No statements match that search." }));
      return;
    }
    rows.forEach((s) =>
      grid.appendChild(
        statementCard(s, {
          selectable: true,
          selected: marked.has(s.number),
          link: true,
          onToggle: (n, on) => {
            if (on) { marked.add(n); if (!Progress.isSaved(n)) Progress.toggleSaved(n); }
            else { marked.delete(n); Progress.removeSaved(n); }
            updateCounter();
          },
        })
      )
    );
  }

  const filters = el("div", { class: "explore-filters", role: "group", "aria-label": "Filter by theme" });
  const chip = (label, val, theme) => {
    const b = el("button", {
      type: "button",
      class: "filter-chip" + (theme ? " theme-" + theme : ""),
      "aria-pressed": val === filter ? "true" : "false",
    }, [theme ? el("span", { class: "chip-shape", html: shapeSvg(theme) }) : null, el("span", { text: label })]);
    b.addEventListener("click", () => {
      filter = val;
      filters.querySelectorAll(".filter-chip").forEach((x) => x.setAttribute("aria-pressed", "false"));
      b.setAttribute("aria-pressed", "true");
      draw();
    });
    return b;
  };
  filters.append(chip("All themes", 0, null), chip("Rethinking", 1, 1), chip("Responsibility", 2, 2), chip("Imagination", 3, 3));

  const searchInput = el("input", {
    type: "search",
    class: "explore-search",
    placeholder: "Search statements…",
    "aria-label": "Search statements",
  });
  searchInput.addEventListener("input", () => {
    search = searchInput.value.trim().toLowerCase();
    draw();
  });

  wrap.append(el("div", { class: "explore-toolbar" }, [filters, searchInput]), counter, grid);
  updateCounter();
  draw();
  return wrap;
}

function findTheme() {
  const wrap = el("section", { class: "activity" });
  wrap.appendChild(el("h2", { class: "activity-title", text: "Knowledge check: find the theme" }));
  wrap.appendChild(
    el("p", {
      class: "activity-intro",
      text: "Six statements, one at a time. Which theme does each belong to? You'll get an explanation either way — and you can retry as often as you like.",
    })
  );

  const picks = [...MANIFESTO].sort(() => Math.random() - 0.5).slice(0, 6);
  const questions = picks.map((s) => ({
    prompt: "“" + s.statement + "”",
    options: [1, 2, 3].map((t) => ({
      label: THEMES[t].name,
      kind: t === s.theme ? "corrective" : "interpretive",
      correct: t === s.theme,
      feedback:
        t === s.theme
          ? "Yes — " + THEME_REASON[s.number]
          : "Not quite. This one sits in " + THEMES[s.theme].name + ", because " + THEME_REASON[s.number],
    })),
  }));
  wrap.appendChild(knowledgeCheck(questions, { id: "kc-find-theme", title: "Find the theme" }));
  return wrap;
}

export default function renderManifesto({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));
  frag.appendChild(themeTriptych());
  frag.appendChild(exploreLandscape());
  frag.appendChild(findTheme());
  return frag;
}
