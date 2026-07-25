/* Section 6 — Connecting the Manifesto: the themes are intertwined. One
   situation pulling in all three themes, cross-theme knowledge checks, and a
   reflection on genuine tension. Reuses the interaction engine throughout. */

import { sectionHeader, accordion, knowledgeCheck, reflectionPrompt, selectionCards, uid, el } from "../interactions.js";
import { Progress } from "../progress.js";
import { shapeSvg } from "../shapes.js";
import { MANIFESTO, THEMES } from "../../data/manifesto.js";
import { CONNECTING } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

const byNumber = (n) => MANIFESTO.find((s) => s.number === n);

/* A thread body: one row per cross-theme connection. */
function threadBody(links) {
  const wrap = el("div", { class: "thread-links" });
  links.forEach((lk) => {
    const s = byNumber(lk.n);
    wrap.appendChild(
      el("div", { class: "thread-link theme-" + s.theme }, [
        el("span", { class: "thread-mark", html: shapeSvg(s.theme) + "<b>" + String(s.number).padStart(2, "0") + "</b>" }),
        el("div", { class: "thread-copy" }, [
          el("p", { class: "thread-statement" }, [
            el("a", { href: s.url, target: "_blank", rel: "noopener", text: s.statement }),
          ]),
          el("p", { class: "thread-theme", text: THEMES[s.theme].name }),
          el("p", { class: "thread-note", text: lk.note }),
        ]),
      ])
    );
  });
  return wrap;
}

export default function renderConnecting({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  /* Opening */
  const op = CONNECTING.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
    ])
  );

  /* One situation, three themes */
  const T = CONNECTING.threads;
  frag.appendChild(
    activity(T.title, T.intro, [
      accordion(T.items.map((it) => ({ title: it.situation, body: threadBody(it.links) }))),
    ])
  );

  /* Trace the connection — cross-theme knowledge check */
  const C = CONNECTING.connect;
  frag.appendChild(
    activity(C.title, C.intro, [
      knowledgeCheck(C.questions, {
        id: "connecting",
        noun: "Connection",
        doneText: "The seams are the point — statements deepen and complicate one another across the themes.",
      }),
    ])
  );

  /* Where statements pull apart — pick two, prioritise, say what would change */
  frag.appendChild(tensionActivity());

  return frag;
}

/* A labelled <select> of all 30 statements. */
function statementSelect(labelText, current, onChange) {
  const id = uid("tsel");
  const sel = el("select", { class: "tension-select", id, "aria-label": labelText },
    [el("option", { value: "", text: "Choose a statement…" })].concat(
      MANIFESTO.map((s) =>
        el("option", {
          value: String(s.number),
          selected: current === s.number ? true : null,
          text: String(s.number).padStart(2, "0") + " — " + s.statement,
        })
      )
    )
  );
  sel.addEventListener("change", () => onChange(sel.value ? Number(sel.value) : null));
  return el("div", { class: "tension-field" }, [
    el("label", { class: "tension-field-label", for: id, text: labelText }),
    sel,
  ]);
}

function tensionActivity() {
  const TN = CONNECTING.tension;
  const saved = Progress.get().statementTension || {};
  const state = { a: saved.a ?? null, b: saved.b ?? null, priority: saved.priority ?? null };

  const note = el("p", { class: "tension-note", role: "status", "aria-live": "polite", hidden: true });
  const view = el("div", { class: "tension-view", role: "status", "aria-live": "polite" });
  const prioHost = el("div", { class: "tension-prio" });
  const changeHost = el("div", { class: "tension-change" });

  const persist = () =>
    Progress.update({ statementTension: { a: state.a, b: state.b, priority: state.priority } });

  function statementChip(n, side) {
    const s = MANIFESTO.find((x) => x.number === n);
    return el("div", { class: "tension-card theme-" + s.theme }, [
      el("span", { class: "tension-side", text: side }),
      el("span", { class: "tension-mark", html: shapeSvg(s.theme) + "<b>" + String(s.number).padStart(2, "0") + "</b>" }),
      el("p", { class: "tension-statement", text: s.statement }),
    ]);
  }

  function render() {
    view.innerHTML = "";
    prioHost.innerHTML = "";
    changeHost.innerHTML = "";
    note.hidden = true;

    if (state.a == null || state.b == null) return;
    if (state.a === state.b) { note.textContent = "Choose two different statements."; note.hidden = false; return; }

    const sA = MANIFESTO.find((x) => x.number === state.a);
    const sB = MANIFESTO.find((x) => x.number === state.b);
    if (sA.theme === sB.theme) { note.textContent = TN.sameThemeNote; note.hidden = false; }

    view.appendChild(
      el("div", { class: "tension-pair" }, [
        statementChip(state.a, TN.labelA),
        el("span", { class: "tension-arrow", "aria-hidden": "true" }, [
          el("span", { class: "tension-arrow-line" }),
          el("span", { class: "tension-word", text: "← " + TN.tensionWord + " →" }),
        ]),
        statementChip(state.b, TN.labelB),
      ])
    );

    /* Prioritise */
    const options = [
      { id: "a", label: TN.labelA + " · " + String(state.a).padStart(2, "0"), theme: sA.theme },
      { id: "b", label: TN.labelB + " · " + String(state.b).padStart(2, "0"), theme: sB.theme },
      { id: "context", label: TN.contextLabel },
    ];
    prioHost.appendChild(el("p", { class: "tension-prio-prompt", text: TN.priorityPrompt }));
    prioHost.appendChild(
      selectionCards(options, {
        multi: false,
        selected: state.priority ? [state.priority] : [],
        label: TN.priorityPrompt,
        onChange: (ids) => {
          state.priority = ids.length ? ids[0] : null;
          persist();
          changeHost.hidden = state.priority == null;
        },
      })
    );

    /* What would change your mind — free text, kept in the notebook */
    changeHost.appendChild(
      reflectionPrompt({ id: "statementTension", label: TN.changePrompt, placeholder: TN.changePlaceholder })
    );
    changeHost.hidden = state.priority == null;
  }

  const pickers = el("div", { class: "tension-pickers" }, [
    statementSelect(TN.labelA, state.a, (n) => { state.a = n; persist(); render(); }),
    statementSelect(TN.labelB, state.b, (n) => { state.b = n; persist(); render(); }),
  ]);

  const wrap = activity(TN.title, TN.intro, [
    el("p", { class: "activity-intro", text: TN.prompt }),
    pickers,
    note,
    view,
    prioHost,
    changeHost,
  ]);
  render();
  return wrap;
}
