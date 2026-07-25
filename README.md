# Manifesto for Generative AI in Higher Education

An interactive, static website presenting the **GenAI:N3 Manifesto for Generative AI in Higher Education** — 30 statements across three themes, with per‑statement pages where readers can rate, reflect, and add their own observations, and an aggregate "Explore Responses" view.

- **Authors:** Dr Hazel Farrell & Ken McCarthy, GenAI:N3, South East Technological University
- **Live site:** <https://manifesto.genain3.ie/>
- **Licence:** [Creative Commons BY‑SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- **Version:** 1.2

> Inspired by the *Manifesto for Teaching Online* from the Centre for Research in Digital Education at the University of Edinburgh.

## The three themes

| Theme | Title | Colour | Glyph |
|-------|-------|--------|-------|
| 1 | Rethinking Teaching and Learning | `#0b5394` | ▲ |
| 2 | Responsibility, Ethics, and Power | `#e85c41` | ■ |
| 3 | Imagination, Humanity, and the Future | `#00796b` | ● |

## Repository layout

```
.
├── index.html          # Landing page: all 30 statements, search, theme filters, modal
├── explore/
│   └── index.html      # Aggregate "Explore Responses" table (agreement, importance, practice gap)
├── 01/ … 30/
│   └── index.html      # One page per statement: rationale, reflection question, response form
├── course/             # Self-paced interactive course (see "The interactive course")
│   ├── index.html      # Course welcome / landing
│   ├── course.html     # The course app shell (nav, progress, section view)
│   ├── css/course.css  # Course styles (tokens inherited from shared/base.css)
│   ├── data/           # Content & data, separate from logic
│   │   ├── manifesto.js  #   the 30 statements (single source of truth)
│   │   └── course.js     #   authored course copy (intros, prompts, activities)
│   └── js/             # ES modules: app shell, interaction engine, sections
│       ├── app.js        #   orchestrator: routing, nav, progress
│       ├── interactions.js # reusable accessible components
│       ├── progress.js   #   localStorage persistence (no PII)
│       └── sections/     #   one renderer per course section
├── shared/
│   ├── base.css        # Self-hosted fonts + design tokens (load first)
│   ├── main.css        # Styles for the landing page
│   ├── statement.css   # Styles for statement + explore pages
│   ├── config.js       # Supabase URL + anon key
│   ├── statement.js    # Response form + conversation logic for statement pages
│   └── fonts/          # Fraunces & Source Sans 3 (self-hosted, OFL)
└── favicon.ico
```

## How it works

This is a **plain static site** — no build step, bundler, or framework. HTML is authored directly and shared CSS/JS live in `shared/`.

- **Landing page (`index.html`):** The 30 statements are defined inline as a `statements` array (text, theme, Font Awesome icon, and rationale). Client‑side JavaScript renders the cards and powers search, theme filtering, and the detail modal.
- **Statement pages (`01/`–`30/`):** Each page carries its own statement text, "why this matters" rationale, and a reflection question. `shared/statement.js` handles the rating scales (agreement / importance / practice), the free‑text observation, demographics, and submission.
- **Explore page (`explore/`):** Loads aggregate summaries and renders a sortable table, including the **practice gap** (importance minus current practice).

## The interactive course

`course/` is a self‑paced companion to the Manifesto: a guided journey through all 30 statements and three themes, with reflective activities, knowledge checks, realistic institutional dilemmas, and a personal "manifesto" the learner builds and takes away. Start at **`course/index.html`** (the welcome page); the course itself runs in **`course/course.html`**.

Like the rest of the site it is a **plain static site with no build step** — just ES modules, HTML and CSS. Its design tokens and self‑hosted fonts come from `shared/base.css`; everything else lives under `course/`.

**Nine sections**, in order: *Before We Begin · The Manifesto · Rethinking Teaching and Learning (Theme 1) · Responsibility, Ethics, and Power (Theme 2) · Imagination, Humanity, and the Future (Theme 3) · Connecting the Manifesto · Manifesto in Action · Your Practice · The Conversation Continues.*

How it is organised — **content, presentation and logic are kept separate**:

| Concern | Where |
|---------|-------|
| The 30 statements (text, rationale, reflection, theme) | `course/data/manifesto.js` |
| Authored course copy (intros, prompts, activity content, feedback) | `course/data/course.js` |
| Reusable UI components (spotlights, sorter, allocator, multiple‑choice, knowledge check, reflection, slider, accordion, modal…) | `course/js/interactions.js` |
| Per‑section renderers | `course/js/sections/*.js` |
| Routing, navigation, progress bar, focus management | `course/js/app.js` |
| Progress & persistence (localStorage, **no PII, nothing sent anywhere**) | `course/js/progress.js` |

**Editing course content:** in almost all cases you only need `course/data/course.js` (wording of activities) and `course/data/manifesto.js` (statement text). The renderers read from these, so copy can be revised without touching logic.

**Progress** is stored in a single versioned `localStorage` key (`manifesto_course_v1`) on the learner's device — visited/completed sections, activity choices, the reflection notebook, the personal five statements and anchor, and the opening/closing sentiment. Nothing is transmitted; "Reset progress" clears it. The closing section can print (or save as PDF) the learner's personal manifesto and reflections.

> **Note:** the course collects no data and does **not** use the Supabase backend below; that backend serves the statement pages and the Explore view only.

### Backend (Supabase)

Response collection and aggregation are backed by [Supabase](https://supabase.com/). Configuration lives in `shared/config.js`:

```js
window.MANIFESTO_CONFIG = {
  SUPABASE_URL: "https://<project-ref>.supabase.co",
  SUPABASE_ANON_KEY: "<publishable-anon-key>",
};
```

The anon (publishable) key is intended to be public; **[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security) is what protects the data.** If either value still contains a `YOUR-PROJECT-REF` / `YOUR-ANON` placeholder, the pages degrade gracefully: forms are disabled and a "not yet enabled" message is shown.

The frontend expects the following database objects:

| Object | Type | Used by |
|--------|------|---------|
| `statement_responses` | table (insert) | statement pages — one row per submitted response |
| `get_statement_summary(stmt)` | RPC | statement page — counts + averages for one statement |
| `get_published_observations(stmt)` | RPC | statement page — moderated observations for one statement |
| `get_all_statement_summaries()` | RPC | explore page — summaries for all statements |

Inserted columns: `statement_id`, `agreement`, `importance`, `practice`, `observation`, `display_name`, `role`, `discipline`, `country`, `consent`.

> **Note:** `shared/config.js` references a `supabase_setup.sql` that defines the schema and RLS policies, but that file is **not currently included in this repository**. See [Known issues](#known-issues--todo).

Response behaviour worth knowing:
- Submissions are throttled per device via `localStorage` (one response per statement per browser).
- Written observations are held for **moderation** before appearing publicly.
- A honeypot field guards against basic bots.

## Running locally

No dependencies are required. Because pages use relative paths and `fetch`, serve the folder over HTTP rather than opening files directly:

```bash
# From the repository root
python3 -m http.server 8000
# then visit http://localhost:8000/
```

Without valid Supabase credentials in `shared/config.js`, the site renders fully but response forms and statistics stay disabled. The interactive course needs no backend at all — with the server running, visit `http://localhost:8000/course/`.

> Because the course uses ES modules and `fetch`, it must be served over HTTP (as above) rather than opened as a `file://` URL.

## Deploying

The site is static and can be hosted on any static host (GitHub Pages, Netlify, an ordinary web server, etc.). Upload the repository contents as‑is; the live deployment is served at `https://manifesto.genain3.ie/`. Canonical URLs and Open Graph tags throughout the pages assume that domain — update them if you host elsewhere.

## Editing content

Statement text currently lives in **four** places that must be kept in sync when a statement changes:

1. `index.html` — the `statements` array (text, icon, rationale).
2. `explore/index.html` — the `STATEMENTS` array (plain + HTML text).
3. `NN/index.html` — the individual statement page.
4. `course/data/manifesto.js` — the course's `MANIFESTO` array (text, rationale, reflection).

## Credits

- Manifesto by **Farrell & McCarthy, GenAI:N3 (2025)**.
- Thanks to reviewers Dr Tom Farrelly (MTU) and Sue Beckingham (Sheffield Hallam University).
- Interactive HTML developed with assistance from Claude.
- Fonts: Fraunces and Source Sans 3 (SIL Open Font License).

Questions and comments welcome: [manifesto@genain3.ie](mailto:manifesto@genain3.ie)

## Known issues / TODO

These are opportunities noted during a review of the repository:

- **Missing `supabase_setup.sql`.** `shared/config.js` refers to it for schema and RLS setup. It is maintained offline and intentionally not committed; keep it in sync with the objects listed under [Backend (Supabase)](#backend-supabase).
- **Duplicated statement content** across `index.html`, `explore/index.html`, and the 30 statement pages (see [Editing content](#editing-content)).
- **Third‑party requests.** `base.css` notes fonts are self‑hosted for GDPR friendliness, but pages still load Font Awesome, Supabase, and the analytics script from external CDNs.

Recently addressed: a `LICENSE` file (CC BY‑SA 4.0) has been added, and the mojibake `themeInfo` glyphs in `index.html` (`â–²`/`â– `/`â—`) were corrected to `▲`/`■`/`●`.
