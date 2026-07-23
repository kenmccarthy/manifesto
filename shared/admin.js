/* Manifesto — admin / moderation console
   Requires: window.MANIFESTO_CONFIG (shared/config.js) and supabase-js v2.
   Access is enforced server-side by Supabase Auth + RLS (see admin_setup.sql);
   this page ships only the public anon key. */

(function () {
  "use strict";

  const cfg = window.MANIFESTO_CONFIG || {};
  const configured =
    cfg.SUPABASE_URL &&
    !cfg.SUPABASE_URL.includes("YOUR-PROJECT-REF") &&
    cfg.SUPABASE_ANON_KEY &&
    !cfg.SUPABASE_ANON_KEY.includes("YOUR-ANON");

  const $ = (id) => document.getElementById(id);
  const loginView = $("login-view");
  const appView = $("app-view");
  const loginStatus = $("login-status");
  const appStatus = $("app-status");
  const list = $("resp-list");
  const who = $("who");

  // Short statement texts, for context in the queue.
  const STMT = {
    1: "We teach in an age of abundance, not scarcity.",
    2: "Inquiry has become the new intelligence.",
    3: "GenAI does not replace thinking - it reveals the cost of not thinking.",
    4: "Detection chases the past; thoughtful design shapes the future.",
    5: "Courage opens the door, but resources build the path.",
    6: "Curiosity surpasses completion.",
    7: "Students must learn with GenAI before they can question it.",
    8: "Students are collaborators, not spectators.",
    9: "We cannot ask students to be collaborators in systems designed to constrain them.",
    10: "Our job is not to tame the machine, but to awaken the human next to it.",
    11: "Transparency is the new integrity.",
    12: "Academic judgement is augmented, not automated.",
    13: "Institutions must lead ethically, not just efficiently.",
    14: "Accountability scales with influence.",
    15: "Efficiency is seductive; wisdom lingers.",
    16: 'There is no "neutral" data - only stories told by systems.',
    17: "Prompting is pedagogy.",
    18: "GenAI is not one thing - it lives differently in every discipline.",
    19: "Writing remains an act of thinking, even when machines hold the pen.",
    20: "Ease is not the enemy; uncritical learning is.",
    21: "We owe students more than caution - we owe them courage.",
    22: "Every technological shift doesn't just change tools; it changes power.",
    23: "Inclusion is not optional.",
    24: "Sustainability is a learning outcome.",
    25: "Constraint is not the enemy of creativity; it is a catalyst.",
    26: "Ethics is a foundation, not a footnote.",
    27: "Privacy is practice.",
    28: "GenAI challenges us to teach why, not just how.",
    29: "The horizon is still ours to shape.",
    30: "The future classroom is a conversation, and it can be extraordinary.",
  };

  const COLS =
    "id, statement_id, observation, agreement, importance, practice, display_name, role, discipline, country, created_at, approved, rejected";

  // Filters that define each queue. The moderation queues are restricted to
  // rows with an observation; "all" shows every submission (optionally filtered
  // by statement) so rating-only submissions are visible too.
  function applyScope(q, tab) {
    if (tab === "all") {
      if (allStmt) q = q.eq("statement_id", Number(allStmt));
      return q;
    }
    q = q.not("observation", "is", null);
    if (tab === "pending") return q.eq("approved", false).eq("rejected", false);
    if (tab === "published") return q.eq("approved", true);
    return q.eq("rejected", true); // rejected
  }

  function statusOf(r) {
    if (r.approved) return { label: "Published", cls: "b-pub" };
    if (r.rejected) return { label: "Rejected", cls: "b-rej" };
    if (r.observation != null) return { label: "Pending", cls: "b-pend" };
    return { label: "Ratings only", cls: "b-rate" };
  }

  if (!configured) {
    loginStatus.textContent =
      "The site is not connected to its database yet (shared/config.js).";
    loginStatus.className = "status-line err";
    $("login-btn").disabled = true;
    return;
  }

  const db = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  let currentTab = "pending";
  let allStmt = ""; // statement filter for the "all" tab
  let allOffset = 0; // pagination offset for the "all" tab
  const PAGE = 50;

  /* ---------------- View switching ---------------- */
  function showLogin() {
    appView.hidden = true;
    who.hidden = true;
    loginView.hidden = false;
  }
  function showApp(email) {
    loginView.hidden = true;
    appView.hidden = false;
    who.hidden = false;
    $("who-email").textContent = email || "";
    populateFilter();
    selectTab("pending");
  }

  function populateFilter() {
    const sel = $("stmt-filter");
    if (!sel || sel.dataset.ready) return;
    for (let i = 1; i <= 30; i++) {
      const o = document.createElement("option");
      o.value = String(i);
      o.textContent =
        "Statement " + String(i).padStart(2, "0") + " — " + (STMT[i] || "");
      sel.appendChild(o);
    }
    sel.dataset.ready = "1";
  }
  function setAppStatus(msg, err) {
    appStatus.textContent = msg || "";
    appStatus.className = "status-line" + (err ? " err" : "");
  }

  /* ---------------- Auth ---------------- */
  async function isAdmin() {
    const { data, error } = await db.rpc("is_admin");
    if (error) return false;
    return data === true;
  }

  async function boot() {
    const { data } = await db.auth.getSession();
    const session = data && data.session;
    if (session && (await isAdmin())) {
      showApp(session.user.email);
    } else {
      if (session) await db.auth.signOut(); // signed in but not an admin
      showLogin();
    }
  }

  $("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = $("login-btn");
    loginStatus.textContent = "";
    loginStatus.className = "status-line";
    btn.disabled = true;
    try {
      const { data, error } = await db.auth.signInWithPassword({
        email: $("email").value.trim(),
        password: $("password").value,
      });
      if (error) throw error;
      if (!(await isAdmin())) {
        await db.auth.signOut();
        throw new Error("This account is not authorised for moderation.");
      }
      $("password").value = "";
      showApp(data.user.email);
    } catch (err) {
      loginStatus.textContent =
        err && err.message ? err.message : "Sign in failed.";
      loginStatus.className = "status-line err";
    } finally {
      btn.disabled = false;
    }
  });

  $("logout").addEventListener("click", async () => {
    await db.auth.signOut();
    showLogin();
  });

  /* ---------------- Tabs ---------------- */
  function selectTab(tab) {
    currentTab = tab;
    document.querySelectorAll(".tab").forEach((t) => {
      t.setAttribute("aria-selected", t.dataset.tab === tab ? "true" : "false");
    });
    $("all-controls").hidden = tab !== "all";
    allOffset = 0;
    loadList();
  }
  document.querySelectorAll(".tab").forEach((t) => {
    t.addEventListener("click", () => selectTab(t.dataset.tab));
  });

  $("stmt-filter").addEventListener("change", (e) => {
    allStmt = e.target.value;
    allOffset = 0;
    loadList();
  });

  $("load-more").addEventListener("click", () => loadList(true));

  /* ---------------- Data ---------------- */
  async function refreshCounts() {
    for (const tab of ["pending", "published", "rejected", "all"]) {
      try {
        let q = db
          .from("statement_responses")
          .select("id", { count: "exact", head: true });
        // The "all" tab count is the overall total, ignoring the statement filter.
        if (tab !== "all") q = applyScope(q, tab);
        const { count, error } = await q;
        if (!error) $("count-" + tab).textContent = count == null ? "0" : count;
      } catch (e) {
        /* leave the placeholder */
      }
    }
  }

  async function loadSummary() {
    const box = $("all-summary");
    if (!box) return;
    box.textContent = "";
    try {
      let cq = db
        .from("statement_responses")
        .select("id", { count: "exact", head: true });
      if (allStmt) cq = cq.eq("statement_id", Number(allStmt));
      const { count } = await cq;
      let txt = (count || 0) + (count === 1 ? " submission" : " submissions");
      if (allStmt) {
        const { data } = await db.rpc("get_statement_summary", {
          stmt: Number(allStmt),
        });
        if (data && data.count) {
          const f = (v) => (v == null ? "–" : Number(v).toFixed(1));
          txt +=
            " · agreement " + f(data.agreement_avg) +
            " · importance " + f(data.importance_avg) +
            " · in practice " + f(data.practice_avg);
        }
      }
      box.textContent = txt;
    } catch (e) {
      /* summary is best-effort */
    }
  }

  async function loadList(append) {
    if (!append) {
      list.innerHTML = "";
      setAppStatus("Loading…");
      allOffset = 0; // a fresh (non-append) load always starts at the first page
    }
    try {
      let q = db.from("statement_responses").select(COLS);
      q = applyScope(q, currentTab).order("created_at", { ascending: false });
      if (currentTab === "all") q = q.range(allOffset, allOffset + PAGE - 1);
      const { data, error } = await q;
      if (error) throw error;
      setAppStatus("");

      if ((!data || data.length === 0) && !append) {
        const p = document.createElement("p");
        p.className = "empty";
        p.textContent =
          currentTab === "pending"
            ? "Nothing awaiting review."
            : currentTab === "all"
            ? "No submissions yet."
            : "Nothing here.";
        list.appendChild(p);
      } else if (data) {
        data.forEach((r) => list.appendChild(card(r)));
      }

      const more = $("load-more");
      if (currentTab === "all") {
        allOffset += data ? data.length : 0;
        more.hidden = !(data && data.length === PAGE);
        loadSummary();
      } else {
        more.hidden = true;
      }

      if (!append) refreshCounts();
    } catch (e) {
      setAppStatus("Could not load responses: " + (e.message || e), true);
    }
  }

  function ratingBits(r) {
    const parts = [];
    if (r.agreement != null) parts.push(["Agreement", r.agreement]);
    if (r.importance != null) parts.push(["Importance", r.importance]);
    if (r.practice != null) parts.push(["In practice", r.practice]);
    return parts;
  }

  function actionButton(label, cls, handler) {
    const b = document.createElement("button");
    b.className = "btn small " + cls;
    b.textContent = label;
    b.addEventListener("click", handler);
    return b;
  }

  function card(r) {
    const el = document.createElement("article");
    el.className = "resp";

    const head = document.createElement("div");
    head.className = "resp-head";
    const stmt = document.createElement("span");
    stmt.className = "stmt";
    stmt.textContent = "Statement " + String(r.statement_id).padStart(2, "0");
    head.appendChild(stmt);
    const stext = document.createElement("span");
    stext.textContent = STMT[r.statement_id] || "";
    head.appendChild(stext);
    if (currentTab === "all") {
      const st = statusOf(r);
      const badge = document.createElement("span");
      badge.className = "badge " + st.cls;
      badge.textContent = st.label;
      head.appendChild(badge);
    }
    const meta = [r.display_name, r.role, r.discipline, r.country]
      .filter(Boolean)
      .join(" · ");
    if (meta) {
      const m = document.createElement("span");
      m.textContent = meta;
      head.appendChild(m);
    }
    const date = document.createElement("span");
    try {
      date.textContent = new Date(r.created_at).toLocaleString("en-IE", {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      date.textContent = r.created_at;
    }
    head.appendChild(date);
    el.appendChild(head);

    const obs = document.createElement("div");
    if (r.observation) {
      obs.className = "resp-obs";
      obs.textContent = r.observation;
    } else {
      obs.className = "resp-obs muted";
      obs.textContent = "No written observation.";
    }
    el.appendChild(obs);

    const bits = ratingBits(r);
    if (bits.length) {
      const rt = document.createElement("div");
      rt.className = "resp-ratings";
      bits.forEach(([label, val]) => {
        const s = document.createElement("span");
        s.textContent = label + ": ";
        const b = document.createElement("b");
        b.textContent = val + "/5";
        s.appendChild(b);
        rt.appendChild(s);
      });
      el.appendChild(rt);
    }

    const actions = document.createElement("div");
    actions.className = "resp-actions";
    if (currentTab === "pending") {
      actions.appendChild(actionButton("Approve", "ok", () => act(r.id, "approve")));
      actions.appendChild(actionButton("Reject", "ghost warn", () => act(r.id, "reject")));
      actions.appendChild(actionButton("Delete", "ghost danger", () => act(r.id, "delete")));
    } else if (currentTab === "published") {
      actions.appendChild(actionButton("Un-publish", "ghost warn", () => act(r.id, "unpublish")));
      actions.appendChild(actionButton("Delete", "ghost danger", () => act(r.id, "delete")));
    } else if (currentTab === "rejected") {
      actions.appendChild(actionButton("Restore to pending", "ghost", () => act(r.id, "restore")));
      actions.appendChild(actionButton("Delete", "ghost danger", () => act(r.id, "delete")));
    } else {
      // all submissions — browse only, with Delete for spam removal
      actions.appendChild(actionButton("Delete", "ghost danger", () => act(r.id, "delete")));
    }
    el.appendChild(actions);

    return el;
  }

  /* ---------------- Actions ---------------- */
  const PATCH = {
    approve: { approved: true, rejected: false },
    reject: { rejected: true, approved: false },
    unpublish: { approved: false },
    restore: { approved: false, rejected: false },
  };

  async function act(id, type) {
    if (
      type === "delete" &&
      !window.confirm("Permanently delete this response? This cannot be undone.")
    ) {
      return;
    }
    try {
      let error;
      if (type === "delete") {
        ({ error } = await db.from("statement_responses").delete().eq("id", id));
      } else {
        ({ error } = await db
          .from("statement_responses")
          .update(PATCH[type])
          .eq("id", id));
      }
      if (error) throw error;
      loadList();
    } catch (e) {
      setAppStatus("Action failed: " + (e.message || e), true);
    }
  }

  boot();
})();
