/* Section 5 — Theme 2: Responsibility, Ethics, and Power. */

import {
  sectionHeader, statementSpotlight, statementCard, allocator, sorter,
  multipleChoice, accordion, knowledgeCheck, keptCounterText, el,
} from "../interactions.js";
import { Progress } from "../progress.js";
import { SPOTLIGHT, THEME2 } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

export default function renderTheme2({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  /* Opening */
  const op = THEME2.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
      el("ul", { class: "question-list" }, op.questions.map((q) => el("li", { text: q }))),
    ])
  );

  /* Who holds responsibility? — allocator */
  const r = THEME2.responsibility;
  const reveal = el("div", { class: "reveal-block", hidden: Progress.getActivity("whoHoldsResponsibility") == null });
  reveal.appendChild(el("p", { class: "reveal", text: r.reveal }));
  reveal.appendChild(el("div", { class: "card-row" }, [statementCard(r.statement, { link: true })]));
  const alloc = allocator({
    items: r.items,
    start: Progress.getActivity("whoHoldsResponsibility") || null,
    onChange: (values) => {
      Progress.saveActivity("whoHoldsResponsibility", values);
      reveal.hidden = false;
    },
  });
  frag.appendChild(activity("Who holds responsibility?", r.scenario, [alloc, reveal]));

  /* Statement spotlights */
  const keptMsg = el("p", { class: "kept-counter", role: "status", "aria-live": "polite" });
  const syncKept = () => (keptMsg.textContent = keptCounterText(Progress.savedCount()));
  const spots = el("div", { class: "spotlight-stack" });
  THEME2.spotlights.forEach((n) => spots.appendChild(statementSpotlight(n, SPOTLIGHT[n], { onKeep: syncKept })));
  syncKept();
  frag.appendChild(
    activity("Statement spotlights", "Read the short take on each, then open “Explore further” for the fuller interpretation. Keep the ones you want to carry forward.", [keptMsg, spots])
  );

  /* Automate or augment? — sorter */
  const a = THEME2.automate;
  frag.appendChild(
    activity("Automate or augment?", a.intro, [
      sorter({ buckets: a.buckets, items: a.items, bucketFeedback: a.bucketFeedback }),
    ])
  );

  /* Transparency test */
  const t = THEME2.transparency;
  const tConcl = el("p", { class: "reveal", hidden: true, text: t.conclusion });
  frag.appendChild(
    activity("The transparency test", "Explore transparency, not policing — the question is what a reader can understand about how the work was made.", [
      multipleChoice({ prompt: t.prompt, options: t.options, saveKey: "transparencyTest" }, { onAnswer: () => (tConcl.hidden = false) }),
      tConcl,
    ])
  );

  /* Discipline matters */
  const d = THEME2.discipline;
  const dConcl = el("div", { class: "reveal-block" }, [
    el("p", { class: "scenario-conclusion", text: d.conclusion }),
    el("div", { class: "card-row" }, [statementCard(d.statement, { link: true })]),
  ]);
  frag.appendChild(
    activity("Discipline matters", d.intro, [
      accordion(d.items.map((it) => ({ title: it.title, body: it.body }))),
      dConcl,
    ])
  );

  /* Theme 2 knowledge check */
  frag.appendChild(
    activity("Theme 2 knowledge check", "Scenario questions — at least one has more than one defensible answer, and we'll say so. Every answer gets an explanation, and you can retry freely.", [
      knowledgeCheck(THEME2.knowledgeCheck, { id: "kc-theme2" }),
    ])
  );

  return frag;
}
