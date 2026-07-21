/* Manifesto statement pages — responses & observations (v2)
   Requires: window.MANIFESTO_CONFIG (shared/config.js),
             window.STATEMENT_ID (set inline on each page),
             supabase-js v2 loaded from CDN. */

(function () {
  "use strict";

  const cfg = window.MANIFESTO_CONFIG || {};
  const stmtId = window.STATEMENT_ID;
  const configured =
    cfg.SUPABASE_URL &&
    !cfg.SUPABASE_URL.includes("YOUR-PROJECT-REF") &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_ANON_KEY.includes("YOUR-ANON");

  const $ = (sel) => document.querySelector(sel);
  const formStatus = $("#form-status");
  const summaryBox = $("#summary");
  const listEl = $("#observations-list");
  const submitBtn = $("#submit-response");

  /* ------------- statement manifest (for the sidebar navigator) ------------- */
  const MANIFEST = [
    { id: 1, s: "We teach in an age of abundance, not scarcity." },
    { id: 2, s: "Inquiry has become the new intelligence." },
    { id: 3, s: "GenAI does not replace thinking - it reveals the cost of not thinking." },
    { id: 4, s: "Detection chases the past; thoughtful design shapes the future." },
    { id: 5, s: "Courage opens the door, but resources build the path." },
    { id: 6, s: "Curiosity surpasses completion." },
    { id: 7, s: "Students must learn with GenAI before they can question it." },
    { id: 8, s: "Students are collaborators, not spectators." },
    { id: 9, s: "We cannot ask students to be collaborators in systems designed to constrain them." },
    { id: 10, s: "Our job is not to tame the machine, but to awaken the human next to it." },
    { id: 11, s: "Transparency is the new integrity." },
    { id: 12, s: "Academic judgement is augmented, not automated." },
    { id: 13, s: "Institutions must lead ethically, not just efficiently." },
    { id: 14, s: "Accountability scales with influence." },
    { id: 15, s: "Efficiency is seductive; wisdom lingers." },
    { id: 16, s: 'There is no "neutral" data - only stories told by systems.' },
    { id: 17, s: "Prompting is pedagogy." },
    { id: 18, s: "GenAI is not one thing - it lives differently in every discipline." },
    { id: 19, s: "Writing remains an act of thinking, even when machines hold the pen." },
    { id: 20, s: "Ease is not the enemy; uncritical learning is." },
    { id: 21, s: "We owe students more than caution - we owe them courage." },
    { id: 22, s: "Every technological shift doesn't just change tools; it changes power." },
    { id: 23, s: "Inclusion is not optional." },
    { id: 24, s: "Sustainability is a learning outcome." },
    { id: 25, s: "Constraint is not the enemy of creativity; it is a catalyst." },
    { id: 26, s: "Ethics is a foundation, not a footnote." },
    { id: 27, s: "Privacy is practice." },
    { id: 28, s: "GenAI challenges us to teach why, not just how." },
    { id: 29, s: "The horizon is still ours to shape." },
    { id: 30, s: "The future classroom is a conversation, and it can be extraordinary." },
  ];
  const THEMES = [
    { n: 1, name: "Rethinking Teaching and Learning" },
    { n: 2, name: "Responsibility, Ethics, and Power" },
    { n: 3, name: "Imagination, Humanity, and the Future" },
  ];
  const GLYPH_PATH = {
    1: '<path d="M6 0.9 L11.3 11.1 H0.7 Z"/>',
    2: '<rect x="1.4" y="1.4" width="9.2" height="9.2"/>',
    3: '<circle cx="6" cy="6" r="5.1"/>',
  };
  const glyph = (t) =>
    '<svg class="tglyph" viewBox="0 0 12 12" aria-hidden="true">' + GLYPH_PATH[t] + "</svg>";
  const themeOf = (id) => (id <= 10 ? 1 : id <= 20 ? 2 : 3);

  function buildSidebar() {
    const main = document.querySelector("main.wrap");
    if (!main || document.querySelector(".col-side")) return;
    const cur = Number(stmtId);
    const curTheme = themeOf(cur);

    let nav =
      '<div class="side-progress">' +
      '<span><span class="n" id="side-progress-n">0</span> of 30 explored</span>' +
      '<div class="track"><span id="side-progress-bar" style="width:0%"></span></div></div>' +
      '<nav class="side-nav" aria-label="Statements by theme">' +
      '<p class="side-title">Browse the manifesto</p>';

    THEMES.forEach((th) => {
      const open = th.n === curTheme ? " open" : "";
      nav +=
        "<details" + open + '><summary class="grp-' + th.n + '">' + glyph(th.n) +
        "<span>" + th.name + '</span><span class="caret" aria-hidden="true">›</span></summary><ul>';
      MANIFEST.filter((s) => themeOf(s.id) === th.n).forEach((s) => {
        const num = String(s.id).padStart(2, "0");
        const acur = s.id === cur ? ' aria-current="true"' : "";
        nav +=
          '<li><a href="../' + num + '/"' + acur + '><span class="sn">' + num +
          '</span><span class="st">' + esc(s.s) + "</span></a></li>";
      });
      nav += "</ul></details>";
    });
    nav += "</nav>";

    const colMain = document.createElement("div");
    colMain.className = "col-main";
    while (main.firstChild) colMain.appendChild(main.firstChild);
    main.appendChild(colMain);
    const aside = document.createElement("aside");
    aside.className = "col-side";
    aside.innerHTML = nav;
    main.appendChild(aside);
    main.classList.add("has-side");
  }

  /* ------------- progress note (localStorage only, works regardless) ------- */
  function updateProgress() {
    let n = 0;
    for (let i = 1; i <= 30; i++) {
      if (localStorage.getItem("manifesto_response_" + String(i).padStart(2, "0"))) n++;
    }
    const note = $("#progress-note");
    if (note && n > 0) {
      note.textContent =
        "You have shared your view on " + n + " of 30 statements.";
    }
    const sn = document.getElementById("side-progress-n");
    if (sn) sn.textContent = n;
    const sb = document.getElementById("side-progress-bar");
    if (sb) sb.style.width = Math.round((n / 30) * 100) + "%";
  }

  buildSidebar();
  updateProgress();

  if (!configured) {
    if (summaryBox)
      summaryBox.innerHTML =
        '<p class="empty-state">The conversation will appear here once the site is connected to its database.</p>';
    if (formStatus) {
      formStatus.textContent =
        "Responses are not yet enabled - the site owner needs to complete the database setup.";
      formStatus.className = "form-status err";
    }
    if (submitBtn) submitBtn.disabled = true;
    return;
  }

  const db = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  const storageKey = "manifesto_response_" + String(stmtId).padStart(2, "0");

  /* ---------------- Conversation summary ---------------- */

  function bar(label, val) {
    const pct = val ? Math.round((val / 5) * 100) : 0;
    const shown = val ? Number(val).toFixed(1) : "–";
    return (
      '<div class="dim"><span>' + label + "</span>" +
      '<div class="bar"><span style="width:' + pct + '%"></span></div>' +
      '<span class="val">' + shown + "</span></div>"
    );
  }

  async function loadSummary() {
    if (!summaryBox) return;
    try {
      const { data, error } = await db.rpc("get_statement_summary", { stmt: stmtId });
      if (error) throw error;
      const s = data || {};
      if (!s.count) {
        summaryBox.innerHTML =
          '<p class="empty-state">No responses yet - yours can start the conversation.</p>';
        return;
      }
      let html =
        '<p class="resp-count">' + s.count +
        (s.count === 1 ? " response" : " responses") + "</p>" +
        bar("Agreement", s.agreement_avg) +
        bar("Importance", s.importance_avg) +
        bar("In practice", s.practice_avg);
      if (s.importance_avg && s.practice_avg) {
        const gap = (s.importance_avg - s.practice_avg).toFixed(1);
        if (gap > 0.5) {
          html +=
            '<p class="gap-callout">Practice gap: <strong>' + gap +
            "</strong> - respondents rate this as more important than current practice reflects.</p>";
        }
      }
      summaryBox.innerHTML = html;
    } catch (e) {
      console.error("Could not load summary", e);
    }
  }

  /* ---------------- Published observations ---------------- */

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  async function loadObservations() {
    if (!listEl) return;
    try {
      const { data, error } = await db.rpc("get_published_observations", { stmt: stmtId });
      if (error) throw error;
      const rows = data || [];
      if (rows.length === 0) {
        listEl.innerHTML =
          '<p class="empty-state">No published observations yet.</p>';
        return;
      }
      listEl.innerHTML = rows
        .map((r) => {
          const name = r.display_name ? esc(r.display_name) : "Anonymous";
          const bits = [r.role, r.country].filter(Boolean).map(esc).join(", ");
          const date = new Date(r.created_at).toLocaleDateString("en-IE", {
            year: "numeric", month: "short", day: "numeric",
          });
          return (
            '<article class="observation"><div class="meta"><span class="name">' +
            name + "</span>" + (bits ? "<span>" + bits + "</span>" : "") +
            "<span>" + date + "</span></div><p>" + esc(r.observation) + "</p></article>"
          );
        })
        .join("");
    } catch (e) {
      console.error("Could not load observations", e);
      listEl.innerHTML =
        '<p class="empty-state">Observations could not be loaded right now.</p>';
    }
  }

  /* ---------------- Submission ---------------- */

  function getScale(name) {
    const el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? Number(el.value) : null;
  }

  function setStatus(msg, cls) {
    formStatus.textContent = msg;
    formStatus.className = "form-status" + (cls ? " " + cls : "");
  }

  if (localStorage.getItem(storageKey)) {
    setStatus("You have already responded to this statement on this device. Thank you.", "ok");
    if (submitBtn) submitBtn.disabled = true;
    document
      .querySelectorAll("#share-form input, #share-form select, #share-form textarea")
      .forEach((el) => (el.disabled = true));
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", async () => {
      // Honeypot: silently pretend success for bots.
      if ($("#hp-website") && $("#hp-website").value) {
        setStatus("Thank you. Your response has been received.", "ok");
        return;
      }

      const agreement = getScale("agreement");
      const importance = getScale("importance");
      const practice = getScale("practice");
      const observation = $("#observation").value.trim();
      const consent = $("#consent").checked;

      if (!consent) {
        setStatus("Please tick the consent box to submit a response.", "err");
        return;
      }
      if (!agreement && !importance && !practice && !observation) {
        setStatus("Please answer at least one scale or write an observation.", "err");
        return;
      }
      if (observation && observation.length > 1000) {
        setStatus("Observations are limited to 1,000 characters.", "err");
        return;
      }

      submitBtn.disabled = true;
      setStatus("Sending…");
      try {
        const { error } = await db.from("statement_responses").insert({
          statement_id: stmtId,
          agreement,
          importance,
          practice,
          observation: observation || null,
          display_name: $("#resp-name").value.trim() || null,
          role: $("#resp-role").value || null,
          discipline: $("#resp-discipline").value.trim() || null,
          country: $("#resp-country").value.trim() || null,
          consent: true,
        });
        if (error) throw error;
        localStorage.setItem(storageKey, "1");
        setStatus(
          observation
            ? "Thank you. Your ratings are counted, and your observation will appear once reviewed."
            : "Thank you. Your response has been counted.",
          "ok"
        );
        document
          .querySelectorAll("#share-form input, #share-form select, #share-form textarea")
          .forEach((el) => (el.disabled = true));
        updateProgress();
        loadSummary();
      } catch (e) {
        console.error(e);
        setStatus("Something went wrong submitting your response. Please try again.", "err");
        submitBtn.disabled = false;
      }
    });
  }

  loadSummary();
  loadObservations();
})();
