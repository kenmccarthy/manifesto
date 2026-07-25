/* Section 9 — The Conversation Continues: a closing sentiment reading measured
   against the opening one, and a recap of everything the learner made. The
   course's coda. Reads existing progress; writes only sentimentEnd. */

import { sectionHeader, slider, statementCard, el } from "../interactions.js";
import { Progress } from "../progress.js";
import { CONTINUES } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

export default function renderContinues({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  const state = Progress.get();

  /* Opening */
  const op = CONTINUES.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
    ])
  );

  /* ---- Closing sentiment ---- */
  const S = CONTINUES.sentiment;
  const start = state.sentimentStart;
  const moveNote = el("p", { class: "reveal sentiment-move", hidden: state.sentimentEnd == null });

  function describeMovement(end) {
    if (start == null) return S.noStart;
    const d = end - start;
    if (Math.abs(d) <= 5) return S.movement.steady;
    return d > 0 ? S.movement.towardPossibility : S.movement.towardConcern;
  }
  if (state.sentimentEnd != null) moveNote.textContent = describeMovement(state.sentimentEnd);

  const sent = slider({
    id: "sentiment-end",
    value: state.sentimentEnd ?? start ?? 50,
    leftLabel: S.leftLabel,
    midLabel: S.midLabel,
    rightLabel: S.rightLabel,
    ariaLabel: "How are you feeling about Generative AI in higher education now?",
    onChange: (v) => {
      Progress.update({ sentimentEnd: v });
      Progress.markCompleted("continues");
      moveNote.textContent = describeMovement(v);
      moveNote.hidden = false;
    },
  });
  frag.appendChild(activity(S.title, start == null ? S.intro : S.intro, [sent, moveNote]));

  /* ---- Recap: what you've made ---- */
  const R = CONTINUES.recap;
  const selected = (state.selectedStatements || []).filter((n) => n >= 1 && n <= 30);
  const anchor = state.anchor;
  const recapNodes = [];

  if (selected.length === 0) {
    recapNodes.push(
      el("p", { class: "recap-empty" }, [
        el("span", { text: R.empty + " " }),
        el("a", { href: "#/practice", text: "Go to Your Practice →" }),
      ])
    );
  } else {
    /* Anchor, featured. */
    if (anchor != null) {
      recapNodes.push(
        el("div", { class: "recap-block recap-anchor" }, [
          el("p", { class: "recap-label", text: R.anchorLabel }),
          statementCard(anchor, { link: true }),
        ])
      );
    }
    /* The remaining chosen statements. */
    const others = selected.filter((n) => n !== anchor).sort((a, b) => a - b);
    if (others.length) {
      const grid = el("div", { class: "recap-grid" });
      others.forEach((n) => grid.appendChild(statementCard(n, { link: true, compact: true })));
      recapNodes.push(
        el("div", { class: "recap-block" }, [
          el("p", { class: "recap-label", text: R.fiveLabel }),
          grid,
        ])
      );
    }
  }

  /* The one small change. */
  const change = (state.reflections || {}).oneSmallChange;
  recapNodes.push(
    el("div", { class: "recap-block" }, [
      el("p", { class: "recap-label", text: R.changeLabel }),
      change
        ? el("blockquote", { class: "recap-quote", text: change })
        : el("p", { class: "recap-empty", text: R.changeEmpty }),
    ])
  );

  /* The reflections notebook (excluding the change, shown above). */
  const notebook = state.reflections || {};
  const entries = Object.keys(R.notebook)
    .filter((key) => key !== "oneSmallChange" && notebook[key])
    .map((key) => ({ label: R.notebook[key], text: notebook[key] }));
  if (entries.length) {
    const list = el("div", { class: "recap-notebook" });
    entries.forEach((e) =>
      list.appendChild(
        el("div", { class: "notebook-entry" }, [
          el("p", { class: "notebook-q", text: e.label }),
          el("blockquote", { class: "recap-quote", text: e.text }),
        ])
      )
    );
    recapNodes.push(
      el("div", { class: "recap-block" }, [
        el("p", { class: "recap-label", text: R.notebookLabel }),
        list,
      ])
    );
  }

  frag.appendChild(activity(R.title, R.intro, [el("div", { class: "recap" }, recapNodes)]));

  /* ---- Take it with you ---- */
  const T = CONTINUES.takeaway;
  const printBtn = el("button", { type: "button", class: "c-btn", onclick: () => window.print() }, T.printLabel);
  frag.appendChild(
    activity(T.title, T.intro, [
      el("div", { class: "takeaway-actions" }, [printBtn]),
      el("p", { class: "takeaway-hint", text: T.printHint }),
    ])
  );

  /* ---- Closing ---- */
  const CL = CONTINUES.closing;
  frag.appendChild(
    el("section", { class: "activity course-coda" }, [
      el("h2", { class: "activity-title coda-line", text: CL.line }),
      el("p", { class: "section-lead", text: CL.body }),
      el("a", { class: "c-btn ghost", href: CL.linkUrl, target: "_blank", rel: "noopener", text: CL.linkLabel + " ↗" }),
    ])
  );

  return frag;
}
