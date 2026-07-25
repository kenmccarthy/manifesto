/* Section 9 — The Conversation Continues: a closing sentiment reading against
   the opening one, a recap of everything the learner made, a reflection on how
   their thinking moved, the learner's own Statement 31, a course-transparency
   disclosure that models Statement 11, and an exportable Action Plan. */

import {
  sectionHeader, slider, statementCard, selectionCards,
  multipleChoice, reflectionPrompt, el,
} from "../interactions.js";
import { Progress } from "../progress.js";
import { MANIFESTO } from "../../data/manifesto.js";
import { CONTINUES, PRACTICE } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

const byNumber = (n) => MANIFESTO.find((s) => s.number === n);
const stakeholderLabel = (id) => (PRACTICE.stakeholders.options.find((o) => o.id === id) || {}).label || id;
const thinkingLabel = (id) => (CONTINUES.finalThinking.options.find((o) => o.id === id) || {}).label || "";

function sentimentBand(v) {
  const S = CONTINUES.sentiment;
  if (v <= 33) return S.leftLabel;
  if (v <= 66) return S.midLabel;
  return S.rightLabel;
}

/* ---- Exportable Action Plan (print target + copy source) ---- */
function statementLine(n) {
  const s = byNumber(n);
  return s ? String(n).padStart(2, "0") + ". " + s.statement : "";
}

function actionPlanData(state) {
  const A = CONTINUES.actionPlan;
  const five = (state.selectedStatements || []).filter((n) => byNumber(n)).sort((a, b) => a - b);
  const ft = state.finalThinking || {};
  const complicated = [thinkingLabel(ft.movement), ft.note].filter(Boolean).join(" — ");
  const stake = (state.stakeholders || []).map(stakeholderLabel);
  return {
    labels: A.labels,
    five,
    anchor: state.anchor != null ? state.anchor : null,
    stop: state.stopAction || "",
    start: state.startAction || "",
    continue: state.continueAction || "",
    change: (state.reflections || {}).oneSmallChange || "",
    stakeholders: stake,
    complicated,
    statement31: state.statement31 || "",
  };
}

function actionPlanText(state) {
  const A = CONTINUES.actionPlan;
  const d = actionPlanData(state);
  const dash = A.empty;
  const lines = [A.title, ""];
  lines.push(d.labels.five);
  if (d.five.length) d.five.forEach((n) => lines.push("- " + statementLine(n)));
  else lines.push("- " + dash);
  lines.push("");
  lines.push(d.labels.anchor, "- " + (d.anchor != null ? statementLine(d.anchor) : dash), "");
  lines.push(d.labels.stop, d.stop || dash, "");
  lines.push(d.labels.start, d.start || dash, "");
  lines.push(d.labels.continue, d.continue || dash, "");
  lines.push(d.labels.change, d.change || dash, "");
  lines.push(d.labels.stakeholders, d.stakeholders.length ? d.stakeholders.join(", ") : dash, "");
  lines.push(d.labels.complicated, d.complicated || dash, "");
  lines.push(d.labels.statement31, d.statement31 || dash, "");
  lines.push("—");
  A.footer.forEach((f) => lines.push(f));
  return lines.join("\n");
}

function actionPlanNode(state) {
  const A = CONTINUES.actionPlan;
  const d = actionPlanData(state);
  const dash = A.empty;
  const block = (label, node) =>
    el("div", { class: "ap-block" }, [el("p", { class: "ap-label", text: label }), node]);
  const textP = (t) => el("p", { class: "ap-value", text: t || dash });

  const fiveNode = d.five.length
    ? el("ul", { class: "ap-list" }, d.five.map((n) => el("li", { text: statementLine(n) })))
    : textP("");

  return el("div", { class: "action-plan" }, [
    el("h2", { class: "ap-title", text: A.title }),
    block(d.labels.five, fiveNode),
    block(d.labels.anchor, textP(d.anchor != null ? statementLine(d.anchor) : "")),
    block(d.labels.stop, textP(d.stop)),
    block(d.labels.start, textP(d.start)),
    block(d.labels.continue, textP(d.continue)),
    block(d.labels.change, textP(d.change)),
    block(d.labels.stakeholders, textP(d.stakeholders.join(", "))),
    block(d.labels.complicated, textP(d.complicated)),
    block(d.labels.statement31, textP(d.statement31)),
    el("div", { class: "ap-footer" }, A.footer.map((f) => el("p", { text: f }))),
  ]);
}

export default function renderContinues({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  const state = Progress.get();

  /* The Action Plan node reflects live state; rebuild it when fields edited on
     this page (Statement 31, final-thinking) change. */
  const planHost = el("div", { class: "action-plan-host" });
  const refreshPlan = () => { planHost.innerHTML = ""; planHost.appendChild(actionPlanNode(Progress.get())); };

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
  const startNote = el("p", { class: "sentiment-start", hidden: !(start != null && state.sentimentEnd != null) });
  if (start != null) startNote.textContent = CONTINUES.startReadout(sentimentBand(start));
  const moveNote = el("p", { class: "reveal sentiment-move", hidden: state.sentimentEnd == null });

  /* ---- What happened to your thinking? (revealed after the slider) ---- */
  const FT = CONTINUES.finalThinking;
  const ftBlock = el("div", { class: "reveal-block final-thinking", hidden: state.sentimentEnd == null });
  const saveFT = (patch) => {
    const cur = Progress.get().finalThinking || {};
    Progress.update({ finalThinking: Object.assign({}, cur, patch) });
    refreshPlan();
  };
  ftBlock.append(
    el("h3", { class: "activity-subtitle", text: FT.title }),
    selectionCards(FT.options, {
      multi: false,
      selected: (state.finalThinking && state.finalThinking.movement) ? [state.finalThinking.movement] : [],
      label: FT.title,
      columns: 2,
      onChange: (ids) => saveFT({ movement: ids.length ? ids[0] : null }),
    }),
    reflectionPrompt({
      id: "finalThinkingNote",
      label: FT.prompt,
      placeholder: FT.placeholder,
      value: (state.finalThinking && state.finalThinking.note) || "",
      save: (v) => saveFT({ note: v.trim() ? v.trim() : null }),
    })
  );

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
    ariaLabel: "How are you feeling about generative AI in higher education now?",
    onChange: (v) => {
      Progress.update({ sentimentEnd: v });
      Progress.markCompleted("continues");
      moveNote.textContent = describeMovement(v);
      moveNote.hidden = false;
      if (start != null) { startNote.textContent = CONTINUES.startReadout(sentimentBand(start)); startNote.hidden = false; }
      ftBlock.hidden = false;
    },
  });
  frag.appendChild(activity(S.title, S.intro, [sent, startNote, moveNote, ftBlock]));

  /* ---- Recap: what you've made ---- */
  frag.appendChild(recapSection(state));

  /* ---- Statement 31 ---- */
  const S31 = CONTINUES.statement31;
  const s31Note = el("p", { class: "reveal s31-note", hidden: !state.statement31, text: S31.saveNote });
  const s31Field = reflectionPrompt({
    id: "statement31field",
    label: S31.label,
    placeholder: S31.placeholder,
    value: state.statement31 || "",
    maxlength: 500,
    save: (v) => { Progress.update({ statement31: v.trim() ? v.trim() : null }); s31Note.hidden = !v.trim(); refreshPlan(); },
  });
  frag.appendChild(
    el("section", { class: "activity statement31" }, [
      el("p", { class: "s31-unwritten", text: S31.unwritten }),
      el("h2", { class: "activity-title", text: S31.title }),
      ...S31.copy.map((line) => el("p", { class: "s31-copy", text: line })),
      s31Field,
      el("p", { class: "s31-guidance", text: S31.guidance }),
      s31Note,
    ])
  );

  /* ---- One last disclosure (course transparency; models Statement 11) ---- */
  const CT = CONTINUES.courseTransparency;
  const ctReveal = el("div", { class: "reveal-block", hidden: Progress.getActivity("courseTransparency") == null }, [
    el("div", { class: "card-row" }, [statementCard(CT.revealStatement, { link: true })]),
    el("p", { class: "scenario-conclusion", text: CT.revealNote }),
  ]);
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: CT.title }),
      ...CT.body.map((t) => el("p", { class: "section-lead", text: t })),
      multipleChoice(
        {
          prompt: CT.question,
          options: CT.options.map((o) => ({ label: o.label, kind: "reflective", feedback: "Thank you — there's nothing to score here. What matters is that you now have the information to judge for yourself." })),
          saveKey: "courseTransparency",
        },
        { onAnswer: () => (ctReveal.hidden = false) }
      ),
      ctReveal,
    ])
  );

  /* ---- Take it with you: Action Plan (print + copy) ---- */
  const T = CONTINUES.takeaway;
  const copyStatus = el("span", { class: "takeaway-status", role: "status", "aria-live": "polite" });
  const printBtn = el("button", { type: "button", class: "c-btn", onclick: () => window.print() }, T.printLabel);
  const copyBtn = el("button", { type: "button", class: "c-btn ghost" }, T.copyLabel);
  copyBtn.addEventListener("click", async () => {
    const text = actionPlanText(Progress.get());
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(text);
      else throw new Error("no clipboard");
      copyStatus.textContent = T.copied;
    } catch (e) {
      copyStatus.textContent = T.copyFailed;
    }
  });
  frag.appendChild(
    activity(T.title, T.intro, [
      el("div", { class: "takeaway-actions" }, [printBtn, copyBtn]),
      copyStatus,
      el("p", { class: "takeaway-hint", text: T.printHint }),
    ])
  );
  /* The Action Plan sits outside .activity so it survives the print rules
     (which hide every .activity block). It is the sole printed content. */
  refreshPlan();
  frag.appendChild(planHost);

  /* ---- Closing coda ---- */
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

/* The reflective on-screen recap of the personal manifesto and notebook. */
function recapSection(state) {
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
    if (anchor != null) {
      recapNodes.push(
        el("div", { class: "recap-block recap-anchor" }, [
          el("p", { class: "recap-label", text: R.anchorLabel }),
          statementCard(anchor, { link: true }),
        ])
      );
    }
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

  /* Stop / Start / Continue Protecting. */
  const ssc = [
    [R.stopLabel, state.stopAction],
    [R.startLabel, state.startAction],
    [R.continueLabel, state.continueAction],
  ].filter(([, v]) => v);
  ssc.forEach(([label, v]) =>
    recapNodes.push(
      el("div", { class: "recap-block" }, [
        el("p", { class: "recap-label", text: label }),
        el("blockquote", { class: "recap-quote", text: v }),
      ])
    )
  );

  /* One small change. */
  const change = (state.reflections || {}).oneSmallChange;
  recapNodes.push(
    el("div", { class: "recap-block" }, [
      el("p", { class: "recap-label", text: R.changeLabel }),
      change
        ? el("blockquote", { class: "recap-quote", text: change })
        : el("p", { class: "recap-empty", text: R.changeEmpty }),
    ])
  );

  /* Who needs to be part of it. */
  const stake = (state.stakeholders || []);
  if (stake.length) {
    recapNodes.push(
      el("div", { class: "recap-block" }, [
        el("p", { class: "recap-label", text: R.stakeholdersLabel }),
        el("p", { class: "recap-value", text: stake.map(stakeholderLabel).join(", ") }),
      ])
    );
  }

  /* Reflections notebook (excluding one-small-change, shown above). */
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

  return activity(R.title, R.intro, [el("div", { class: "recap" }, recapNodes)]);
}
