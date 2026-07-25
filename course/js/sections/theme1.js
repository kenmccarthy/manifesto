/* Section 4 — Theme 1: Rethinking Teaching and Learning. */

import {
  sectionHeader, statementSpotlight, statementCard, selectionCards,
  multipleChoice, knowledgeCheck, sorter, reflectionPrompt, keptCounterText, el,
} from "../interactions.js";
import { Progress } from "../progress.js";
import { MANIFESTO } from "../../data/manifesto.js";
import { SPOTLIGHT, THEME1 } from "../../data/course.js";

const stmt = (n) => MANIFESTO.find((s) => s.number === n).statement;

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

export default function renderTheme1({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  /* Opening — the abundance problem */
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: THEME1.openingHeading }),
      el("p", { class: "section-lead", text: THEME1.openingBody }),
    ])
  );

  /* Scarcity, abundance, or both? sorter */
  const sortConcl = el("p", { class: "reveal", hidden: true, text: THEME1.sort.conclusion });
  frag.appendChild(
    activity(
      THEME1.sort.heading,
      THEME1.sort.intro,
      [sorter({ buckets: THEME1.sort.buckets, items: THEME1.sort.items, onComplete: () => (sortConcl.hidden = false) }), sortConcl]
    )
  );

  /* Statement spotlights */
  const keptMsg = el("p", { class: "kept-counter", role: "status", "aria-live": "polite" });
  const syncKept = () => (keptMsg.textContent = keptCounterText(Progress.savedCount()));
  const spots = el("div", { class: "spotlight-stack" });
  THEME1.spotlights.forEach((n) => spots.appendChild(statementSpotlight(n, SPOTLIGHT[n], { onKeep: syncKept })));
  syncKept();
  frag.appendChild(
    activity(
      "Statement spotlights",
      "Read the short take on each, then open “Explore further” if you want the fuller interpretation. Keep the ones you want to carry forward.",
      [keptMsg, spots]
    )
  );

  /* Choose your provocation */
  const cp = THEME1.chooseProvocation;
  const chosen = Progress.getActivity("chooseProvocation");
  const whyWrap = el("div", { class: "reveal-block", hidden: chosen == null });
  whyWrap.appendChild(
    reflectionPrompt({ id: "chooseProvocationWhy", label: "Why this one?", placeholder: "There is deliberately no correct answer…" })
  );
  const cards = selectionCards(
    cp.statements.map((n) => ({ id: String(n), label: stmt(n) })),
    {
      multi: false,
      selected: chosen != null ? [String(chosen)] : [],
      label: cp.prompt,
      onChange: (ids) => {
        if (ids.length) {
          Progress.saveActivity("chooseProvocation", Number(ids[0]));
          whyWrap.hidden = false;
        }
      },
    }
  );
  frag.appendChild(
    activity(cp.prompt, "Pick the statement that unsettles conventional teaching most for you — then say why.", [cards, whyWrap])
  );

  /* Scenario — the essay problem */
  const es = THEME1.essay;
  const concl = el("div", { class: "reveal-block", hidden: true });
  concl.appendChild(el("p", { class: "scenario-conclusion", text: es.conclusion }));
  const cardRow = el("div", { class: "card-row" });
  es.statements.forEach((n) => cardRow.appendChild(statementCard(n, { link: true })));
  concl.appendChild(cardRow);
  const mcq = multipleChoice(
    { prompt: es.prompt, options: es.options, saveKey: "essayScenario" },
    { onAnswer: () => (concl.hidden = false) }
  );
  frag.appendChild(activity("Scenario: the essay problem", es.scenario, [mcq, concl]));

  /* Theme 1 knowledge check */
  frag.appendChild(
    activity(
      "Theme 1 knowledge check",
      "Four questions, mixed formats. Every answer gets an explanation, and you can retry freely — the score is just for you.",
      [knowledgeCheck(THEME1.knowledgeCheck, { id: "kc-theme1" })]
    )
  );

  return frag;
}
