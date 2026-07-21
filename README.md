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

Without valid Supabase credentials in `shared/config.js`, the site renders fully but response forms and statistics stay disabled.

## Deploying

The site is static and can be hosted on any static host (GitHub Pages, Netlify, an ordinary web server, etc.). Upload the repository contents as‑is; the live deployment is served at `https://manifesto.genain3.ie/`. Canonical URLs and Open Graph tags throughout the pages assume that domain — update them if you host elsewhere.

## Editing content

Statement text currently lives in **three** places that must be kept in sync when a statement changes:

1. `index.html` — the `statements` array (text, icon, rationale).
2. `explore/index.html` — the `STATEMENTS` array (plain + HTML text).
3. `NN/index.html` — the individual statement page.

## Credits

- Manifesto by **Farrell & McCarthy, GenAI:N3 (2025)**.
- Thanks to reviewers Dr Tom Farrelly (MTU) and Sue Beckingham (Sheffield Hallam University).
- Interactive HTML developed with assistance from Claude.
- Fonts: Fraunces and Source Sans 3 (SIL Open Font License).

Questions and comments welcome: [manifesto@genain3.ie](mailto:manifesto@genain3.ie)

## Known issues / TODO

These are opportunities noted during a review of the repository — see the project discussion for details:

- **Missing `supabase_setup.sql`.** `shared/config.js` refers to it for schema and RLS setup, but it is not in the repo, so the backend cannot be reproduced from source alone.
- **No `LICENSE` file.** The site declares CC BY‑SA 4.0 but the repository has no licence file.
- **Encoding artefacts in `index.html`.** The (currently unused) `themeInfo` glyph values are mojibake (`â–²`, `â– `, `â—`) instead of `▲`, `■`, `●`.
- **Duplicated statement content** across `index.html`, `explore/index.html`, and the 30 statement pages (see [Editing content](#editing-content)).
- **Third‑party requests.** `base.css` notes fonts are self‑hosted for GDPR friendliness, but pages still load Font Awesome, Supabase, and the analytics script from external CDNs.
