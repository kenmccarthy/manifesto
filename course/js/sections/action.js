/* Section 7 — Manifesto in Action: single-decision institutional dilemmas.
   Each dilemma is a scenario + a multiple-choice call with typed (interpretive)
   feedback, footed by the statements that bear on it. No scored answers. */

import { sectionHeader, multipleChoice, el } from "../interactions.js";
import { shapeSvg } from "../shapes.js";
import { Progress } from "../progress.js";
import { MANIFESTO } from "../../data/manifesto.js";
import { ACTION } from "../../data/course.js";

const byNumber = (n) => MANIFESTO.find((s) => s.number === n);

/* Themed, linked chips naming the statements a dilemma pulls on. */
function statementsInPlay(numbers) {
  const chips = el("div", { class: "play-chips" });
  numbers.forEach((n) => {
    const s = byNumber(n);
    chips.appendChild(
      el("a", {
        class: "play-chip theme-" + s.theme,
        href: s.url,
        target: "_blank",
        rel: "noopener",
        title: s.statement,
      }, [
        el("span", { class: "play-mark", html: shapeSvg(s.theme) }),
        el("span", { class: "play-num", text: String(s.number).padStart(2, "0") }),
        el("span", { class: "play-text", text: s.statement }),
      ])
    );
  });
  return el("div", { class: "play-block" }, [
    el("p", { class: "play-label", text: ACTION.statementsLabel }),
    chips,
  ]);
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

  /* Dilemmas — mark the section complete once every one has been answered. */
  const total = ACTION.dilemmas.length;
  const answered = new Set();

  ACTION.dilemmas.forEach((d, i) => {
    const mc = multipleChoice(
      { prompt: d.prompt, options: d.options, saveKey: "action-dilemma-" + i },
      {
        onAnswer: () => {
          answered.add(i);
          if (answered.size === total) Progress.markCompleted("action");
        },
      }
    );
    frag.appendChild(
      el("section", { class: "activity dilemma" }, [
        el("p", { class: "dilemma-kicker", text: "Dilemma " + (i + 1) + " of " + total }),
        el("p", { class: "dilemma-scenario", text: d.scenario }),
        mc,
        statementsInPlay(d.statements),
      ])
    );
  });

  /* Closing */
  frag.appendChild(el("p", { class: "scenario-conclusion action-closing", text: ACTION.closing }));

  return frag;
}
