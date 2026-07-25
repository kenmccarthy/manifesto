/* Section 8 — Your Practice: choose five statements, name an anchor, commit to
   one small change. The course's payoff. Everything persists so the final
   section can reflect it back. */

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

  /* Selection is the source of truth for both the anchor chooser and the
     completion state; keep it in a Set and persist on every change. */
  const chosen = new Set((state.selectedStatements || []).filter((n) => byNumber(n)));

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
  const grid = el("div", { class: "explore-grid" });

  function persist() {
    Progress.update({ selectedStatements: [...chosen] });
  }
  function updateCounter() {
    counter.textContent = C.counter(chosen.size, limit);
    counter.classList.toggle("full", chosen.size === limit);
  }

  MANIFESTO.forEach((s) => {
    grid.appendChild(
      statementCard(s, {
        selectable: true,
        selected: chosen.has(s.number),
        link: true,
        onToggle: (n, on) => {
          if (on && chosen.size >= limit) {
            // Over the cap: revert the card the engine just pressed.
            const card = grid.querySelector('.statement-card[data-number="' + n + '"]');
            if (card) {
              card.classList.remove("selected");
              const btn = card.querySelector(".sc-select");
              if (btn) {
                btn.setAttribute("aria-pressed", "false");
                btn.setAttribute("aria-label", "Select statement " + n);
              }
            }
            toast(C.full);
            return;
          }
          if (on) chosen.add(n);
          else chosen.delete(n);
          persist();
          updateCounter();
          renderAnchor();
        },
      })
    );
  });

  /* Optional continuity: seed from statements marked in the Manifesto section. */
  const marked = (Progress.getActivity("exploreMarked") || []).filter((n) => byNumber(n));
  const seedRow = el("div", { class: "practice-seed" });
  if (chosen.size === 0 && marked.length) {
    const btn = el("button", { type: "button", class: "c-btn ghost small" },
      "Start from the " + Math.min(marked.length, limit) + " " + C.seedPrompt + " →");
    btn.addEventListener("click", () => {
      marked.slice(0, limit).forEach((n) => chosen.add(n));
      persist();
      // Reflect the seeded state onto the cards.
      chosen.forEach((n) => {
        const card = grid.querySelector('.statement-card[data-number="' + n + '"]');
        if (card) {
          card.classList.add("selected");
          const b = card.querySelector(".sc-select");
          if (b) { b.setAttribute("aria-pressed", "true"); b.setAttribute("aria-label", "Deselect statement " + n); }
        }
      });
      seedRow.remove();
      updateCounter();
      renderAnchor();
    });
    seedRow.appendChild(btn);
  }

  frag.appendChild(activity(C.title, C.intro, [seedRow, counter, grid]));
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
    // Drop a stale anchor that is no longer among the chosen five.
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

  /* ---- One small change ---- */
  const CH = PRACTICE.change;
  frag.appendChild(
    activity(CH.title, CH.intro, [
      reflectionPrompt({ id: "oneSmallChange", label: CH.prompt, placeholder: CH.placeholder }),
    ])
  );

  /* Closing */
  frag.appendChild(el("p", { class: "scenario-conclusion practice-closing", text: PRACTICE.closing }));

  return frag;
}
