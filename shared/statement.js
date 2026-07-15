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

  /* ------------- progress note (localStorage only, works regardless) ------- */
  function updateProgress() {
    const note = $("#progress-note");
    if (!note) return;
    let n = 0;
    for (let i = 1; i <= 30; i++) {
      if (localStorage.getItem("manifesto_response_" + String(i).padStart(2, "0"))) n++;
    }
    if (n > 0) {
      note.textContent =
        "You have shared your view on " + n + " of 30 statements.";
    }
  }
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
