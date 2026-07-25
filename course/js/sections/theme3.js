/* Section 6 — Theme 3: Imagination, Humanity, and the Future. */

import {
  sectionHeader, statementSpotlight, reflectionPrompt, knowledgeCheck, keptCounterText, el,
} from "../interactions.js";
import { Progress } from "../progress.js";
import { SPOTLIGHT, THEME3 } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

export default function renderTheme3({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  /* Opening */
  const op = THEME3.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
    ])
  );

  /* What must remain human? */
  const rm = THEME3.remainHuman;
  const hasResponse = !!Progress.get().reflections["whatMustRemainHuman"];
  const chips = el("div", { class: "reveal-block concept-reveal", hidden: !hasResponse }, [
    el("p", { class: "concept-label", text: "Ideas you might also consider" }),
    el("div", { class: "concept-chips" }, rm.concepts.map((c) => el("span", { class: "concept-chip", text: c }))),
  ]);
  const rp = reflectionPrompt({ id: "whatMustRemainHuman", label: rm.prompt, placeholder: "A sentence or two is plenty…" });
  rp.querySelector("textarea").addEventListener("input", () => (chips.hidden = false), { once: true });
  frag.appendChild(activity("What must remain human?", null, [rp, chips]));

  /* Statement spotlights */
  const keptMsg = el("p", { class: "kept-counter", role: "status", "aria-live": "polite" });
  const syncKept = () => (keptMsg.textContent = keptCounterText(Progress.savedCount()));
  const spots = el("div", { class: "spotlight-stack" });
  THEME3.spotlights.forEach((n) => spots.appendChild(statementSpotlight(n, SPOTLIGHT[n], { onKeep: syncKept })));
  syncKept();
  frag.appendChild(
    activity("Statement spotlights", "Read the short take on each, then open “Explore further” for the fuller interpretation. Keep the ones you want to carry forward.", [keptMsg, spots])
  );

  /* The future university */
  const fu = THEME3.futureUniversity;
  frag.appendChild(
    activity("The future university", fu.intro, [
      knowledgeCheck(fu.decisions, {
        id: "kc-future-university",
        noun: "Decision",
        doneText: "Five decisions, no scorecard. What mattered was the priority you kept returning to.",
      }),
    ])
  );

  /* Constraint creates */
  const c = THEME3.constraint;
  frag.appendChild(
    activity("Constraint creates", c.intro, [
      el("p", { class: "scenario-conclusion", text: c.challenge }),
      el("ul", { class: "constraint-list" }, c.constraints.map((x) => el("li", { text: x }))),
      reflectionPrompt({ id: "constraintCreates", label: c.prompt, placeholder: "Two sentences…" }),
    ])
  );

  /* Theme 3 knowledge check */
  frag.appendChild(
    activity("Theme 3 knowledge check", "Four questions, including one that asks which statement best fits a future-facing dilemma. Feedback on every answer; retry freely.", [
      knowledgeCheck(THEME3.knowledgeCheck, { id: "kc-theme3" }),
    ])
  );

  return frag;
}
