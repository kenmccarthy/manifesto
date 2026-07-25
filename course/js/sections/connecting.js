/* Section 6 — Connecting the Manifesto: the themes are intertwined. One
   situation pulling in all three themes, cross-theme knowledge checks, and a
   reflection on genuine tension. Reuses the interaction engine throughout. */

import { sectionHeader, accordion, knowledgeCheck, reflectionPrompt, el } from "../interactions.js";
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

  /* Where statements pull apart — reflection on tension */
  const TN = CONNECTING.tension;
  frag.appendChild(
    activity(TN.title, TN.intro, [
      reflectionPrompt({ id: "connectingTension", label: TN.prompt, placeholder: TN.placeholder }),
    ])
  );

  return frag;
}
