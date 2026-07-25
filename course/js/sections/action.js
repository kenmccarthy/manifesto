/* Section 7 — Manifesto in Action: branching, multi-stage scenarios.
   The learner chooses at least two of four scenarios; each unfolds as a small
   decision tree where earlier choices change what comes next. No route is a
   clean win — every ending names what it protected and what it put at risk. */

import { sectionHeader, branchingScenario, el } from "../interactions.js";
import { Progress } from "../progress.js";
import { ACTION } from "../../data/course.js";

const SUMMARY_LABELS = ACTION.summaryLabels;

function scenarioCard(sc, occupies, onChange) {
  const card = el("section", { class: "scenario-card", "aria-label": sc.title });
  const host = el("div", { class: "scenario-host" });

  function heading(withBadge) {
    return el("div", { class: "scenario-card-head" }, [
      el("h3", { class: "scenario-title", text: sc.title }),
      withBadge && Progress.isScenarioComplete(sc.id)
        ? el("span", { class: "scenario-badge", text: ACTION.completedBadge })
        : null,
    ]);
  }

  function intro() {
    host.innerHTML = "";
    const completed = Progress.isScenarioComplete(sc.id);
    const begin = el("button", { type: "button", class: "c-btn small" }, completed ? ACTION.restartLabel : ACTION.beginLabel);
    begin.addEventListener("click", start);
    host.append(heading(true), el("p", { class: "scenario-situation", text: sc.situation }), begin);
  }

  function start() {
    host.innerHTML = "";
    host.append(heading(false), el("p", { class: "scenario-situation", text: sc.situation }));
    if (sc.interest && occupies.has(sc.interest)) {
      host.appendChild(el("p", { class: "scenario-interest", text: sc.interestNote }));
    }
    host.appendChild(
      branchingScenario(sc, {
        labels: { statementsLabel: ACTION.statementsLabel, summaryTitle: ACTION.summaryTitle, summaryLabels: SUMMARY_LABELS },
        onComplete: () => {
          onChange();
          const again = el("button", { type: "button", class: "c-btn ghost small scenario-restart" }, ACTION.restartLabel);
          again.addEventListener("click", start);
          host.appendChild(again);
        },
      })
    );
    // Move focus to the first decision for keyboard/SR users.
    const firstOpt = host.querySelector(".scenario-option");
    if (firstOpt) firstOpt.focus();
  }

  card.appendChild(host);
  intro();
  return card;
}

export default function renderAction({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  /* Opening */
  const op = ACTION.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
    ])
  );
  frag.appendChild(el("p", { class: "activity-intro standalone-intro", text: ACTION.intro }));

  const occupies = new Set(Progress.getActivity("occupies") || []);
  const counter = el("p", { class: "explore-counter scenario-counter", role: "status", "aria-live": "polite" });
  function updateCounter() {
    const n = Progress.scenariosCompleted().length;
    counter.textContent = ACTION.chooseNote(n);
    if (n >= 2) Progress.markCompleted("action");
  }

  const list = el("div", { class: "scenario-list" });
  ACTION.scenarios.forEach((sc) => list.appendChild(scenarioCard(sc, occupies, updateCounter)));
  frag.appendChild(counter);
  frag.appendChild(list);
  updateCounter();

  /* Closing */
  frag.appendChild(el("p", { class: "scenario-conclusion action-closing", text: ACTION.closing }));

  return frag;
}
