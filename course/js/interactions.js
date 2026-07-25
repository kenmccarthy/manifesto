/* Interaction engine — reusable, accessible components for the course.
   Every factory returns a DOM node; components that persist take an id and
   write through js/progress.js. No framework; plain DOM + ARIA.

   Feedback model (brief §9):
     corrective   — there is a right answer
     interpretive — one answer is stronger, others are defensible
     reflective   — there is no correct answer
*/

import { Progress } from "./progress.js";
import { MANIFESTO, THEMES } from "../data/manifesto.js";
import { shapeSvg } from "./shapes.js";

let _uid = 0;
export const uid = (p = "c") => p + "-" + ++_uid;

/* Tiny hyperscript. Use `text` for untrusted content, `html` only for
   trusted static markup. */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k === "text") node.textContent = v;
    else if (k === "dataset") Object.assign(node.dataset, v);
    else if (k.startsWith("on") && typeof v === "function")
      node.addEventListener(k.slice(2).toLowerCase(), v);
    else if (v === true) node.setAttribute(k, "");
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach((c) => {
    if (c == null || c === false) return;
    node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return node;
}

const byNumber = (n) => MANIFESTO.find((s) => s.number === n);

/* Section header — kicker (+ theme shape), focusable title, lead. */
export function sectionHeader(meta) {
  const kicker = el("p", { class: "section-kicker" });
  if (meta.theme) kicker.insertAdjacentHTML("beforeend", shapeSvg(meta.theme, "kicker-shape"));
  kicker.appendChild(el("span", { text: meta.kicker }));
  return el("header", { class: "section-head" }, [
    kicker,
    el("h1", { class: "section-title", id: "sectionTitle", tabindex: "-1", text: meta.title }),
    meta.lead ? el("p", { class: "section-lead", text: meta.lead }) : null,
  ]);
}

/* ---------------------------------------------------------------------------
   Feedback panel
--------------------------------------------------------------------------- */
const FEEDBACK_LABEL = {
  corrective: "Yes",
  interpretive: "Worth weighing",
  reflective: "A reflection",
};
export function feedbackPanel(kind, text) {
  return el("div", { class: "feedback feedback-" + kind, role: "status", "aria-live": "polite" }, [
    el("span", { class: "feedback-label", text: FEEDBACK_LABEL[kind] || "" }),
    el("p", { class: "feedback-text", text }),
  ]);
}

/* ---------------------------------------------------------------------------
   Statement card
   opts: { selectable, selected, onToggle, link, compact }
--------------------------------------------------------------------------- */
export function statementCard(statement, opts = {}) {
  const s = typeof statement === "number" ? byNumber(statement) : statement;
  const th = THEMES[s.theme];
  const num = el("span", { class: "sc-num", html: shapeSvg(s.theme) + "<b>" + String(s.number).padStart(2, "0") + "</b>" });
  const text = el("p", { class: "sc-text", text: s.statement });
  const body = el("div", { class: "sc-body" }, [num, text]);

  const card = el("article", { class: "statement-card theme-" + s.theme + (opts.compact ? " compact" : "") }, [body]);
  card.dataset.number = s.number;

  if (opts.selectable) {
    card.classList.add("selectable");
    const btn = el("button", {
      type: "button",
      class: "sc-select",
      "aria-pressed": opts.selected ? "true" : "false",
      "aria-label": (opts.selected ? "Deselect" : "Select") + " statement " + s.number,
    });
    const sync = () => {
      const on = btn.getAttribute("aria-pressed") === "true";
      card.classList.toggle("selected", on);
      btn.setAttribute("aria-label", (on ? "Deselect" : "Select") + " statement " + s.number);
    };
    if (opts.selected) card.classList.add("selected");
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      sync();
      if (opts.onToggle) opts.onToggle(s.number, on);
    });
    card.appendChild(btn);
  }

  const foot = el("div", { class: "sc-foot" }, [
    el("span", { class: "sc-theme", html: th.name }),
    opts.link
      ? el("a", { class: "sc-link", href: s.url, target: "_blank", rel: "noopener" }, "Explore ↗")
      : null,
  ]);
  card.appendChild(foot);
  return card;
}

/* ---------------------------------------------------------------------------
   Keep this statement — an accessible toggle button writing to the unified
   saved-statements list. onChange(kept, count) fires after each toggle.
--------------------------------------------------------------------------- */
export function keepButton(number, onChange) {
  const btn = el("button", { type: "button", class: "keep-btn" }, [
    el("span", { class: "keep-heart", "aria-hidden": "true" }),
    el("span", { class: "keep-label" }),
  ]);
  const heart = btn.querySelector(".keep-heart");
  const label = btn.querySelector(".keep-label");
  const sync = (kept) => {
    btn.setAttribute("aria-pressed", kept ? "true" : "false");
    btn.classList.toggle("kept", kept);
    heart.textContent = kept ? "♥" : "♡";
    label.textContent = kept ? "Kept" : "Keep this statement";
    btn.setAttribute(
      "aria-label",
      kept ? "Remove statement " + number + " from your kept statements"
           : "Keep statement " + number
    );
  };
  sync(Progress.isSaved(number));
  btn.addEventListener("click", () => {
    const kept = Progress.toggleSaved(number);
    sync(kept);
    if (onChange) onChange(kept, Progress.savedCount());
  });
  return btn;
}

/* A subtle running message for how many statements have been kept. */
export function keptCounterText(n) {
  if (n === 0) return "Keep the statements you want to carry forward — you can narrow them down later.";
  return "You've kept " + n + " statement" + (n === 1 ? "" : "s") + " so far.";
}

/* ---------------------------------------------------------------------------
   Statement spotlight — number + statement + short interpretation always
   visible; the longer interpretation, rationale and reflection sit behind
   "Explore further"; a "Keep this statement" control saves it for later.
   content: { short, interpretation, why?, reflection? }
   opts: { onKeep(kept, count) }
--------------------------------------------------------------------------- */
export function statementSpotlight(number, content = {}, opts = {}) {
  const s = byNumber(number);
  const id = uid("spot");
  const panelId = id + "-panel";

  const head = el("div", { class: "spot-head" }, [
    el("span", { class: "spot-num", html: shapeSvg(s.theme) + "<b>" + String(s.number).padStart(2, "0") + "</b>" }),
    el("p", { class: "spot-statement", text: s.statement }),
  ]);

  const short = content.short ? el("p", { class: "spot-short", text: content.short }) : null;

  const panel = el("div", { class: "spot-panel", id: panelId, hidden: true });
  if (content.interpretation) panel.appendChild(el("p", { class: "spot-interp", text: content.interpretation }));
  panel.appendChild(el("h4", { class: "spot-why-h", text: "Why this matters" }));
  panel.appendChild(el("p", { class: "spot-why", text: content.why || s.rationale }));
  panel.appendChild(
    el("div", { class: "spot-reflect" }, [
      el("span", { class: "spot-reflect-l", text: "A question to sit with" }),
      el("p", { text: content.reflection || s.reflection }),
    ])
  );
  panel.appendChild(el("a", { class: "spot-link", href: s.url, target: "_blank", rel: "noopener" }, "Explore this statement on the Manifesto website ↗"));

  const moreBtn = el("button", {
    type: "button",
    class: "spot-more",
    "aria-expanded": "false",
    "aria-controls": panelId,
  }, [
    el("span", { class: "spot-more-label", text: "Explore further" }),
    el("span", { class: "spot-caret", "aria-hidden": "true", text: "＋" }),
  ]);
  moreBtn.addEventListener("click", () => {
    const open = moreBtn.getAttribute("aria-expanded") === "true";
    moreBtn.setAttribute("aria-expanded", open ? "false" : "true");
    moreBtn.querySelector(".spot-more-label").textContent = open ? "Explore further" : "Show less";
    moreBtn.querySelector(".spot-caret").textContent = open ? "＋" : "－";
    panel.hidden = open;
  });

  const actions = el("div", { class: "spot-actions" }, [moreBtn, keepButton(s.number, opts.onKeep)]);

  return el("div", { class: "spotlight theme-" + s.theme, dataset: { number: s.number } }, [head, short, actions, panel]);
}

/* ---------------------------------------------------------------------------
   Selection cards (single or multi)
   options: [{ id, label, description?, theme? }]
   opts: { multi, selected:[], onChange, columns }
--------------------------------------------------------------------------- */
export function selectionCards(options, opts = {}) {
  const selected = new Set(opts.selected || []);
  const group = el("div", {
    class: "selection-grid" + (opts.columns ? " cols-" + opts.columns : ""),
    role: "group",
    "aria-label": opts.label || "Choose",
  });

  options.forEach((o) => {
    const btn = el("button", {
      type: "button",
      class: "select-card" + (o.theme ? " theme-" + o.theme : ""),
      "aria-pressed": selected.has(o.id) ? "true" : "false",
    }, [
      o.theme ? el("span", { class: "select-shape", html: shapeSvg(o.theme) }) : null,
      el("span", { class: "select-label", text: o.label }),
      o.description ? el("span", { class: "select-desc", text: o.description }) : null,
    ]);
    btn.addEventListener("click", () => {
      const on = btn.getAttribute("aria-pressed") !== "true";
      if (!opts.multi) {
        group.querySelectorAll(".select-card").forEach((c) => c.setAttribute("aria-pressed", "false"));
        selected.clear();
      }
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      if (on) selected.add(o.id);
      else selected.delete(o.id);
      if (opts.onChange) opts.onChange([...selected]);
    });
    group.appendChild(btn);
  });
  return group;
}

/* ---------------------------------------------------------------------------
   Sorter — assign each item to a bucket (accessible, click/keyboard, no drag)
   opts: { buckets:[{id,label}], items:[{label, answer?, feedback?}], onComplete }
   If an item has `answer`, feedback is corrective/interpretive; otherwise it is
   treated as reflective (no single right answer).
--------------------------------------------------------------------------- */
export function sorter(opts) {
  const { buckets, items, onComplete } = opts;
  const wrap = el("div", { class: "sorter" });
  const done = new Set();
  items.forEach((it, i) => {
    const fb = el("p", { class: "sort-fb", "aria-live": "polite" });
    const btnRow = el("div", { class: "sort-buckets", role: "group", "aria-label": it.label });
    const row = el("div", { class: "sort-item" }, [
      el("p", { class: "sort-label", text: it.label }),
      btnRow,
      fb,
    ]);
    buckets.forEach((b) => {
      const btn = el("button", { type: "button", class: "sort-btn", "aria-pressed": "false" }, b.label);
      btn.addEventListener("click", () => {
        btnRow.querySelectorAll(".sort-btn").forEach((x) => x.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        let mark = "";
        if (it.answer) {
          const right = b.id === it.answer;
          row.dataset.state = right ? "right" : "rethink";
          mark = right ? "✓ " : "↺ ";
        } else {
          row.dataset.state = "answered";
        }
        let text = it.feedback;
        if (it.feedbackByBucket && it.feedbackByBucket[b.id] != null) text = it.feedbackByBucket[b.id];
        else if (!it.answer && opts.bucketFeedback && opts.bucketFeedback[b.id] != null) text = opts.bucketFeedback[b.id];
        fb.className = "sort-fb " + (row.dataset.state || "");
        fb.textContent = mark + (text || "");
        done.add(i);
        if (done.size === items.length && onComplete) onComplete();
      });
      btnRow.appendChild(btn);
    });
    wrap.appendChild(row);
  });
  return wrap;
}

/* ---------------------------------------------------------------------------
   Allocator — distribute a fixed budget with +/- controls (no drag)
   opts: { items:[{id,label}], total=100, step=5, start?, onChange(values,sum) }
   The total can never exceed `total`; give more to one by taking from another.
--------------------------------------------------------------------------- */
export function allocator(opts) {
  const { items, total = 100, step = 5, start, onChange } = opts;
  const values = {};
  items.forEach((it) => (values[it.id] = start && start[it.id] != null ? start[it.id] : Math.round(total / items.length)));
  const rows = {};
  const plusBtns = [];
  const wrap = el("div", { class: "allocator" });
  const totalEl = el("p", { class: "alloc-total", "aria-live": "polite" });
  const sum = () => Object.values(values).reduce((a, b) => a + b, 0);

  function refresh(fire) {
    items.forEach((it) => {
      rows[it.id].val.textContent = values[it.id] + "%";
      rows[it.id].fill.style.width = values[it.id] + "%";
    });
    const s = sum();
    totalEl.textContent = "Allocated " + s + "% of " + total + "%" + (s === total ? " — balanced" : "");
    totalEl.classList.toggle("balanced", s === total);
    plusBtns.forEach((b) => (b.disabled = s >= total));
    if (fire && onChange) onChange({ ...values }, s);
  }

  items.forEach((it) => {
    const val = el("span", { class: "alloc-val" });
    const fill = el("span", { class: "alloc-bar-fill" });
    const minus = el("button", { type: "button", class: "alloc-btn", "aria-label": "Decrease " + it.label }, "−");
    const plus = el("button", { type: "button", class: "alloc-btn", "aria-label": "Increase " + it.label }, "+");
    minus.addEventListener("click", () => { values[it.id] = Math.max(0, values[it.id] - step); refresh(true); });
    plus.addEventListener("click", () => { if (sum() < total) { values[it.id] = Math.min(total, values[it.id] + step); refresh(true); } });
    plusBtns.push(plus);
    rows[it.id] = { val, fill };
    wrap.appendChild(
      el("div", { class: "alloc-row" }, [
        el("span", { class: "alloc-label", text: it.label }),
        el("span", { class: "alloc-bar" }, [fill]),
        val,
        el("span", { class: "alloc-ctrls" }, [minus, plus]),
      ])
    );
  });
  wrap.appendChild(totalEl);
  refresh(false);
  return wrap;
}

/* ---------------------------------------------------------------------------
   Multiple choice with per-answer feedback
   q: { prompt, options:[{ label, kind, feedback, correct? }], saveKey? }
--------------------------------------------------------------------------- */
export function multipleChoice(q, opts = {}) {
  const wrap = el("section", { class: "mcq" });
  if (q.prompt) wrap.appendChild(el("p", { class: "mcq-prompt", text: q.prompt }));
  const list = el("div", { class: "mcq-options", role: "group", "aria-label": "Answer options" });
  const fbHost = el("div", { class: "mcq-feedback" });
  let answered = false;

  q.options.forEach((o, i) => {
    const btn = el("button", { type: "button", class: "mcq-option" }, [
      el("span", { class: "mcq-key", "aria-hidden": "true", text: String.fromCharCode(65 + i) }),
      el("span", { text: o.label }),
    ]);
    btn.addEventListener("click", () => {
      list.querySelectorAll(".mcq-option").forEach((b) => b.classList.remove("chosen"));
      btn.classList.add("chosen");
      if (o.correct === true) btn.dataset.state = "correct";
      else if (o.correct === false) btn.dataset.state = "incorrect";
      fbHost.innerHTML = "";
      fbHost.appendChild(feedbackPanel(o.kind || "reflective", o.feedback));
      if (!answered && opts.onAnswer) opts.onAnswer(o, i);
      answered = true;
      if (q.saveKey) Progress.saveActivity(q.saveKey, { choice: i });
    });
    list.appendChild(btn);
  });

  wrap.appendChild(list);
  wrap.appendChild(fbHost);
  return wrap;
}

/* ---------------------------------------------------------------------------
   Knowledge check — a stepper of questions, informational score
   questions: [ multipleChoice-shaped ], opts: { id, title }
--------------------------------------------------------------------------- */
export function knowledgeCheck(questions, opts = {}) {
  const wrap = el("section", { class: "kcheck", "aria-label": opts.title || "Knowledge check" });
  const counter = el("p", { class: "kcheck-counter", "aria-live": "polite" });
  const host = el("div", { class: "kcheck-host" });
  const nav = el("div", { class: "kcheck-nav" });
  let idx = 0;
  const total = questions.length;
  const noun = opts.noun || "Question";
  const nlow = noun.toLowerCase();

  function render() {
    counter.textContent = noun + " " + (idx + 1) + " of " + total;
    host.innerHTML = "";
    const q = questions[idx];
    let answered = false;
    const mc = multipleChoice(q, { onAnswer: () => { answered = true; nextBtn.disabled = false; } });
    host.appendChild(mc);
    nav.innerHTML = "";
    const nextBtn = el("button", {
      type: "button",
      class: "c-btn small",
      disabled: true,
      onclick: () => {
        if (idx < total - 1) { idx++; render(); }
        else finish();
      },
    }, idx < total - 1 ? "Next " + nlow + " →" : "See summary");
    // Re-evaluate answered state (a question may already be answered on re-render)
    if (answered) nextBtn.disabled = false;
    nav.appendChild(nextBtn);
  }

  function finish() {
    counter.textContent = "Complete";
    host.innerHTML = "";
    host.appendChild(el("p", { class: "kcheck-done", text: opts.doneText || "That's the set. These are for thinking, not scoring — revisit anytime." }));
    nav.innerHTML = "";
    nav.appendChild(el("button", { type: "button", class: "c-btn ghost small", onclick: () => { idx = 0; render(); } }, "Start again"));
    if (opts.id) Progress.markCompleted(opts.id);
  }

  wrap.appendChild(counter);
  wrap.appendChild(host);
  wrap.appendChild(nav);
  render();
  return wrap;
}

/* ---------------------------------------------------------------------------
   Statement chips — small linked chips naming the statements in play.
--------------------------------------------------------------------------- */
export function statementChips(numbers, label) {
  const chips = el("div", { class: "play-chips" });
  numbers.forEach((n) => {
    const s = byNumber(n);
    chips.appendChild(
      el("a", { class: "play-chip theme-" + s.theme, href: s.url, target: "_blank", rel: "noopener", title: s.statement }, [
        el("span", { class: "play-mark", html: shapeSvg(s.theme) }),
        el("span", { class: "play-num", text: String(s.number).padStart(2, "0") }),
        el("span", { class: "play-text", text: s.statement }),
      ])
    );
  });
  return el("div", { class: "play-block" }, [label ? el("p", { class: "play-label", text: label }) : null, chips]);
}

/* ---------------------------------------------------------------------------
   Branching scenario — a multi-stage decision tree. Each option carries a
   consequence, the statements it surfaces, and either a `next` node id or (at
   a leaf) an `outcome` with what it protected and put at risk. Earlier choices
   change what comes next; no route is a clean win. Fully keyboard-operable and
   understandable without animation; new content is focus-moved for SR users.
   sc: { id, situation, start, reflection, nodes:{ id:{ decision, options:[...] } } }
   opts: { labels:{ statementsLabel, summaryTitle, summaryLabels }, onComplete }
--------------------------------------------------------------------------- */
export function branchingScenario(sc, opts = {}) {
  const L = opts.labels || {};
  const SL = L.summaryLabels || {};
  const flow = el("div", { class: "scenario-flow" });
  const path = []; // [{ node, option }]

  const optOf = (p) => sc.nodes[p.node].options[p.option];

  function endSummary(term) {
    const surfaced = [...new Set(path.flatMap((p) => optOf(p).statements || []))].sort((a, b) => a - b);
    const principles = [...new Set(path.flatMap((p) => optOf(p).principles || []))];
    const block = (label, node) =>
      node ? el("div", { class: "scenario-sum-block" }, [el("p", { class: "scenario-sum-label", text: label }), node]) : null;
    return el("div", { class: "scenario-end" }, [
      el("p", { class: "scenario-end-title", text: L.summaryTitle || "Where your choices led" }),
      block(SL.emphasised, principles.length ? el("ul", { class: "scenario-principles" }, principles.map((p) => el("li", { text: p }))) : null),
      block(SL.surfaced, surfaced.length ? statementChips(surfaced) : null),
      block(SL.protected, el("p", { class: "scenario-protected", text: term.protected })),
      block(SL.atRisk, el("p", { class: "scenario-atrisk", text: term.atRisk })),
      el("p", { class: "scenario-reflection", text: sc.reflection }),
    ]);
  }

  function renderNode(nodeId) {
    const node = sc.nodes[nodeId];
    const stage = el("div", { class: "scenario-stage" });
    stage.appendChild(el("p", { class: "scenario-decision", text: node.decision }));
    const optsWrap = el("div", { class: "scenario-options", role: "group", "aria-label": node.decision });

    node.options.forEach((o, i) => {
      const btn = el("button", { type: "button", class: "scenario-option" }, [
        el("span", { class: "scenario-opt-key", "aria-hidden": "true", text: String.fromCharCode(65 + i) }),
        el("span", { text: o.label }),
      ]);
      btn.addEventListener("click", () => {
        if (stage.dataset.answered) return;
        stage.dataset.answered = "1";
        optsWrap.querySelectorAll(".scenario-option").forEach((b) => (b.disabled = true));
        btn.classList.add("chosen");
        path.push({ node: nodeId, option: i });
        Progress.saveScenarioPath(sc.id, path.map((p) => p.option));

        const cons = el("div", { class: "scenario-consequence", tabindex: "-1", role: "status", "aria-live": "polite" });
        cons.appendChild(el("p", { class: "scenario-consequence-text", text: o.consequence || o.outcome }));
        if (o.statements && o.statements.length) cons.appendChild(statementChips(o.statements, L.statementsLabel));
        stage.appendChild(cons);

        if (o.next) {
          const cont = el("button", { type: "button", class: "c-btn small scenario-continue", text: "Continue →" });
          cont.addEventListener("click", () => { cont.remove(); renderNode(o.next); });
          cons.appendChild(cont);
        } else {
          stage.appendChild(endSummary(o));
          Progress.completeScenario(sc.id);
          if (opts.onComplete) opts.onComplete(sc.id);
        }
        cons.focus();
      });
      optsWrap.appendChild(btn);
    });

    stage.appendChild(optsWrap);
    flow.appendChild(stage);
  }

  renderNode(sc.start);
  return flow;
}

/* ---------------------------------------------------------------------------
   Reflection prompt — saves to the local notebook
   opts: { id, label, prompt?, placeholder?, maxlength }
--------------------------------------------------------------------------- */
export function reflectionPrompt(opts = {}) {
  const id = opts.id || uid("reflect");
  const taId = id + "-ta";
  /* By default the entry lives in the reflections notebook keyed by id; pass
     opts.value + opts.save to target a dedicated state field instead. */
  const stored = opts.value != null ? opts.value : (Progress.get().reflections[id] || "");
  const ta = el("textarea", {
    id: taId,
    class: "reflect-ta",
    maxlength: opts.maxlength || 1000,
    placeholder: opts.placeholder || "Type your thoughts…",
  });
  ta.value = stored || "";
  const status = el("span", { class: "reflect-status", role: "status", "aria-live": "polite" });
  let t;
  ta.addEventListener("input", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (opts.save) opts.save(ta.value);
      else Progress.saveReflection(id, ta.value);
      status.textContent = ta.value.trim() ? "Saved on this device" : "";
    }, 500);
  });
  return el("div", { class: "reflect" }, [
    opts.label ? el("label", { class: "reflect-label", for: taId, text: opts.label }) : null,
    opts.prompt ? el("p", { class: "reflect-prompt", text: opts.prompt }) : null,
    ta,
    el("p", { class: "reflect-note" }, [
      el("span", { text: "Kept on this device — never submitted. " }),
      status,
    ]),
  ]);
}

/* ---------------------------------------------------------------------------
   Sentiment slider
   opts: { id, min, max, value, leftLabel, midLabel, rightLabel, onChange }
--------------------------------------------------------------------------- */
export function slider(opts = {}) {
  const id = opts.id || uid("slider");
  const input = el("input", {
    type: "range",
    id: id,
    class: "c-slider",
    min: opts.min ?? 0,
    max: opts.max ?? 100,
    value: opts.value ?? 50,
    "aria-label": opts.ariaLabel || "Your position",
  });
  input.addEventListener("input", () => {
    if (opts.onChange) opts.onChange(Number(input.value));
  });
  return el("div", { class: "slider-block" }, [
    el("div", { class: "slider-track-row" }, [input]),
    el("div", { class: "slider-labels" }, [
      el("span", { class: "s-left", text: opts.leftLabel || "" }),
      el("span", { class: "s-mid", text: opts.midLabel || "" }),
      el("span", { class: "s-right", text: opts.rightLabel || "" }),
    ]),
  ]);
}

/* ---------------------------------------------------------------------------
   Accordion (generic disclosure list)
   items: [{ title, body(node|string) }]
--------------------------------------------------------------------------- */
export function accordion(items) {
  const wrap = el("div", { class: "accordion" });
  items.forEach((it) => {
    const panelId = uid("acc") + "-p";
    const btn = el("button", { type: "button", class: "acc-head", "aria-expanded": "false", "aria-controls": panelId }, [
      el("span", { text: it.title }),
      el("span", { class: "acc-caret", "aria-hidden": "true", text: "＋" }),
    ]);
    const panel = el("div", { class: "acc-panel", id: panelId, hidden: true });
    panel.appendChild(typeof it.body === "string" ? el("p", { text: it.body }) : it.body);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      btn.querySelector(".acc-caret").textContent = open ? "＋" : "－";
      panel.hidden = open;
    });
    wrap.appendChild(el("div", { class: "acc-item" }, [btn, panel]));
  });
  return wrap;
}

/* ---------------------------------------------------------------------------
   Modal — focus-trapped dialog
--------------------------------------------------------------------------- */
export function modal({ title, body, closeLabel = "Close" } = {}) {
  const titleId = uid("modal") + "-t";
  const dialog = el("div", { class: "c-modal-dialog", role: "dialog", "aria-modal": "true", "aria-labelledby": titleId });
  dialog.appendChild(el("div", { class: "c-modal-head" }, [
    el("h2", { id: titleId, class: "c-modal-title", text: title || "" }),
    el("button", { type: "button", class: "c-modal-close", "aria-label": closeLabel, onclick: () => api.close(), text: "×" }),
  ]));
  const bodyHost = el("div", { class: "c-modal-body" });
  bodyHost.appendChild(typeof body === "string" ? el("p", { text: body }) : body || el("div"));
  dialog.appendChild(bodyHost);
  const overlay = el("div", { class: "c-modal-overlay", hidden: true }, [dialog]);

  let lastFocus = null;
  function onKey(e) {
    if (e.key === "Escape") api.close();
    if (e.key === "Tab") {
      const f = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  const api = {
    element: overlay,
    open() {
      lastFocus = document.activeElement;
      overlay.hidden = false;
      document.addEventListener("keydown", onKey);
      dialog.querySelector(".c-modal-close").focus();
    },
    close() {
      overlay.hidden = true;
      document.removeEventListener("keydown", onKey);
      if (lastFocus) lastFocus.focus();
    },
    setBody(node) { bodyHost.innerHTML = ""; bodyHost.appendChild(node); },
  };
  overlay.addEventListener("click", (e) => { if (e.target === overlay) api.close(); });
  return api;
}

/* ---------------------------------------------------------------------------
   Toast — transient, announced
--------------------------------------------------------------------------- */
let toastHost;
export function toast(message) {
  if (!toastHost) {
    toastHost = el("div", { class: "toast-host", "aria-live": "polite", "aria-atomic": "true" });
    document.body.appendChild(toastHost);
  }
  const t = el("div", { class: "toast", text: message });
  toastHost.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 2600);
}

/* ---------------------------------------------------------------------------
   Tooltip — lightweight, hover/focus, aria-describedby
--------------------------------------------------------------------------- */
export function withTooltip(node, text) {
  const tipId = uid("tip");
  const tip = el("span", { class: "c-tooltip", id: tipId, role: "tooltip", hidden: true, text });
  node.setAttribute("aria-describedby", tipId);
  node.classList.add("has-tooltip");
  const show = () => (tip.hidden = false);
  const hide = () => (tip.hidden = true);
  node.addEventListener("mouseenter", show);
  node.addEventListener("mouseleave", hide);
  node.addEventListener("focus", show);
  node.addEventListener("blur", hide);
  const wrap = el("span", { class: "tooltip-wrap" }, [node, tip]);
  return wrap;
}
