/* Section 8 — Your Practice: narrow the statements you kept down to five, name
   an anchor, decide what to stop/start/protect, commit to one small change,
   and note who needs to be part of it. The course's payoff; everything
   persists so the final section can reflect it back. */

import {
  sectionHeader, statementCard, selectionCards, reflectionPrompt, toast, el,
} from "../interactions.js";
import { Progress } from "../progress.js";
import { MANIFESTO } from "../../data/manifesto.js";
import { PRACTICE } from "../../data/course.js";

function activity(title, intro, nodes) {
  return el("section", { class: "activity" }, [
    el("h2", { class: "activity-title", text: title }),
    intro ? el("p", { class: "activity-intro", text: intro }) : null,
    ...nodes,
  ]);
}

const byNumber = (n) => MANIFESTO.find((s) => s.number === n);

export default function renderPractice({ meta }) {
  const frag = document.createDocumentFragment();
  frag.appendChild(sectionHeader(meta));

  const state = Progress.get();
  const C = PRACTICE.choose;
  const limit = C.limit;

  const chosen = new Set((state.selectedStatements || []).filter((n) => byNumber(n)));
  const saved = Progress.savedStatements().filter((n) => byNumber(n));

  /* Opening */
  const op = PRACTICE.opening;
  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: op.line }),
      el("p", { class: "section-lead", text: op.body }),
    ])
  );

  /* ---- Choose your five ---- */
  const counter = el("p", { class: "explore-counter", "aria-live": "polite" });
  const chooseRoot = el("div", { class: "choose-root" });

  const persist = () => Progress.update({ selectedStatements: [...chosen] });
  const updateCounter = () => {
    counter.textContent = C.counter(chosen.size, limit);
    counter.classList.toggle("full", chosen.size === limit);
  };
  const findCard = (n) => chooseRoot.querySelector('.statement-card[data-number="' + n + '"]');
  const setCard = (n, on) => {
    const card = findCard(n);
    if (!card) return;
    card.classList.toggle("selected", on);
    const b = card.querySelector(".sc-select");
    if (b) {
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.setAttribute("aria-label", (on ? "Deselect" : "Select") + " statement " + n);
    }
  };

  function makeCard(n) {
    return statementCard(byNumber(n), {
      selectable: true,
      selected: chosen.has(n),
      link: true,
      onToggle: (num, on) => {
        if (on && chosen.size >= limit) {
          setCard(num, false); // revert — over the cap
          toast(C.full);
          return;
        }
        if (on) chosen.add(num);
        else chosen.delete(num);
        persist();
        updateCounter();
        renderAnchor();
      },
    });
  }

  const grids = [];
  function grid(numbers) {
    const g = el("div", { class: "explore-grid" });
    numbers.forEach((n) => g.appendChild(makeCard(n)));
    grids.push(g);
    return g;
  }

  if (saved.length) {
    /* Kept statements first. */
    PRACTICE.choose.savedIntroLines(saved.length).forEach((line, i) =>
      chooseRoot.appendChild(el("p", { class: i === 0 ? "activity-intro" : "choose-line", text: line }))
    );
    chooseRoot.appendChild(el("p", { class: "recap-label", text: C.keptLabel }));
    chooseRoot.appendChild(counter);
    chooseRoot.appendChild(grid(saved));

    /* The rest — expanded automatically if fewer than five were kept,
       otherwise tucked behind a "Browse all 30" control. */
    const remaining = MANIFESTO.map((s) => s.number).filter((n) => !saved.includes(n));
    const otherLabel = el("p", { class: "recap-label", text: C.otherLabel });
    const otherGrid = grid(remaining);
    const otherWrap = el("div", {}, [otherLabel, otherGrid]);
    const autoShow = saved.length < limit;
    otherWrap.hidden = !autoShow;

    const browse = el("button", {
      type: "button",
      class: "c-btn ghost small browse-toggle",
      "aria-expanded": autoShow ? "true" : "false",
    }, autoShow ? C.browseHide : C.browseLabel);
    browse.addEventListener("click", () => {
      const open = browse.getAttribute("aria-expanded") === "true";
      browse.setAttribute("aria-expanded", open ? "false" : "true");
      browse.textContent = open ? C.browseLabel : C.browseHide;
      otherWrap.hidden = open;
    });
    chooseRoot.append(browse, otherWrap);
  } else {
    /* No kept statements — choose from all thirty. */
    chooseRoot.appendChild(el("p", { class: "activity-intro", text: C.intro }));
    chooseRoot.appendChild(counter);
    chooseRoot.appendChild(grid(MANIFESTO.map((s) => s.number)));
  }

  frag.appendChild(
    el("section", { class: "activity" }, [
      el("h2", { class: "activity-title", text: C.title }),
      chooseRoot,
    ])
  );
  updateCounter();

  /* ---- Name your anchor ---- */
  const A = PRACTICE.anchor;
  const anchorHost = el("div", { class: "anchor-host" });
  const anchorReveal = el("p", { class: "reveal", hidden: true, text: A.reveal });

  function renderAnchor() {
    anchorHost.innerHTML = "";
    if (chosen.size === 0) {
      Progress.update({ anchor: null });
      anchorReveal.hidden = true;
      anchorHost.appendChild(el("p", { class: "empty", text: A.empty }));
      return;
    }
    let anchor = Progress.get().anchor;
    if (anchor != null && !chosen.has(anchor)) { anchor = null; Progress.update({ anchor: null }); }

    const options = [...chosen].sort((a, b) => a - b).map((n) => {
      const s = byNumber(n);
      return { id: n, label: s.statement, theme: s.theme };
    });
    anchorHost.appendChild(
      selectionCards(options, {
        multi: false,
        selected: anchor != null ? [anchor] : [],
        label: A.prompt,
        onChange: (ids) => {
          const pick = ids.length ? ids[0] : null;
          Progress.update({ anchor: pick });
          if (pick != null) Progress.markCompleted("practice");
          anchorReveal.hidden = pick == null;
        },
      })
    );
    anchorReveal.hidden = anchor == null;
  }

  frag.appendChild(activity(A.title, A.intro, [anchorHost, anchorReveal]));
  renderAnchor();

  /* ---- What might change? — Stop / Start / Continue Protecting ---- */
  const W = PRACTICE.whatChanges;
  const field = (stateKey, label, prompt, placeholder) =>
    el("div", { class: "ssc-field" }, [
      el("p", { class: "ssc-label", text: label }),
      reflectionPrompt({
        id: "field-" + stateKey,
        label: prompt,
        placeholder,
        value: state[stateKey] || "",
        save: (v) => Progress.update({ [stateKey]: v.trim() ? v.trim() : null }),
      }),
    ]);
  frag.appendChild(
    activity(W.title, W.intro, [
      el("div", { class: "ssc-grid" }, [
        field("stopAction", W.stopLabel, W.stopPrompt, W.stopPlaceholder),
        field("startAction", W.startLabel, W.startPrompt, W.startPlaceholder),
        field("continueAction", W.continueLabel, W.continuePrompt, W.continuePlaceholder),
      ]),
    ])
  );

  /* ---- One small change ---- */
  const CH = PRACTICE.change;
  frag.appendChild(
    activity(CH.title, CH.intro, [
      reflectionPrompt({ id: "oneSmallChange", label: CH.prompt, placeholder: CH.placeholder }),
    ])
  );

  /* ---- Who needs to be part of this? ---- */
  const SK = PRACTICE.stakeholders;
  frag.appendChild(
    activity(SK.title, SK.intro, [
      selectionCards(SK.options, {
        multi: true,
        selected: state.stakeholders || [],
        label: SK.title,
        columns: 2,
        onChange: (ids) => Progress.update({ stakeholders: ids }),
      }),
    ])
  );

  /* Closing */
  frag.appendChild(el("p", { class: "scenario-conclusion practice-closing", text: PRACTICE.closing }));

  return frag;
}
