/* Section 2 — Before We Begin: a sentiment slider and a "what occupies you"
   multi-select. Both save locally and are picked up again later. */

import { sectionHeader, slider, selectionCards, el } from "../interactions.js";
import { Progress } from "../progress.js";
import { OCCUPIES } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

export default function renderBefore({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));
  const state = Progress.get();

  /* Sentiment slider */
  const sentNote = el("p", {
    class: "reveal",
    hidden: state.sentimentStart == null,
    text: "Hold that thought. We'll ask you again near the end.",
  });
  const sent = slider({
    id: "sentiment-start",
    value: state.sentimentStart ?? 50,
    leftLabel: "Deeply concerned",
    midLabel: "Uncertain / mixed",
    rightLabel: "Full of possibility",
    ariaLabel: "How are you feeling about Generative AI in higher education right now?",
    onChange: (v) => {
      Progress.update({ sentimentStart: v });
      Progress.markCompleted("before");
      sentNote.hidden = false;
    },
  });
  frag.appendChild(
    activity(
      "How are you feeling about Generative AI in higher education right now?",
      "There are no good or bad positions here — just your honest starting point.",
      [sent, sentNote]
    )
  );

  /* What occupies your thinking */
  const occStored = state.activities.occupies || [];
  const occNote = el("p", {
    class: "reveal",
    hidden: occStored.length === 0,
    text: "You'll encounter these questions throughout the course.",
  });
  const occ = selectionCards(OCCUPIES, {
    multi: true,
    selected: occStored,
    label: "What occupies your thinking?",
    onChange: (ids) => {
      Progress.saveActivity("occupies", ids);
      occNote.hidden = ids.length === 0;
    },
  });
  frag.appendChild(
    activity(
      "What occupies your thinking?",
      "Choose as many as you like. Nothing is hidden based on your choices — we'll simply pick these threads up as we go.",
      [occ, occNote]
    )
  );

  return frag;
}
