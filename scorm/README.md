# SCORM 1.2 package

This folder builds a **SCORM 1.2** version of the interactive course (`/course/`)
so it can be delivered inside a Learning Management System (LMS) — Moodle,
Canvas, TalentLMS, Cornerstone, SCORM Cloud, etc. — with progress and
completion tracked by the LMS.

The package is **generated** from the live course, never hand-maintained, so the
two can't drift. Re-run the build after any course change.

## Build it

```bash
node scorm/build.js
```

Output (git-ignored, under `dist/`):

- `dist/manifesto-scorm12/` — the unpacked package (inspectable)
- `dist/manifesto-course-scorm12.zip` — **upload this to your LMS**

The build has no dependencies beyond Node and the `zip` CLI.

## Test it

Before rolling out to a production LMS, upload the `.zip` to
[SCORM Cloud](https://cloud.scorm.com) (free tier) and launch it. Confirm:

- the course loads and all nine sections are navigable;
- closing and relaunching **resumes** where you left off;
- clicking **“Mark course complete”** on the final section flips the LMS
  status to *Completed*.

## What the build does

1. **Stages** `course/`, the `shared/` CSS + fonts it uses, and `favicon.ico`,
   preserving the relative paths the pages already rely on.
2. **Strips** the third-party web-analytics `<script>` — packaged LMS content
   should make no external network calls.
3. **Adds** the four standard SCORM 1.2 control schemas (`imscp_rootv1p1p2.xsd`,
   `adlcp_rootv1p2.xsd`, `imsmd_rootv1p2p1.xsd`, `ims_xml.xsd`) at the package
   root (in `scorm/schemas/`).
4. **Opens** the “What will I learn?” disclosure on the welcome page so the
   learning outcomes are visible up front (expected in an accredited context).
5. **Writes** a conformant `imsmanifest.xml`: a single SCO whose launch file is
   the welcome page, `course/index.html`.
6. **Zips** the result.

## How tracking works

The course is a self-contained client-side app that *also* runs inside an LMS.
All LMS communication is isolated in **`course/js/scorm.js`** — a small SCORM
1.2 runtime adapter (finds the LMS `API` on a parent/opener frame; wraps
`LMSInitialize` / `LMSGetValue` / `LMSSetValue` / `LMSCommit` / `LMSFinish`).

**Off-LMS it is completely inert**, so the standalone web course at `/course/`
behaves exactly as before — `scorm.js` finds no API and every call is a safe
no-op. This is why the SCORM wiring can live in the shared source.

`course/js/progress.js` mirrors a **compact subset** of learner state to the
LMS on every save:

| SCORM 1.2 data element   | Holds                                                        |
| ------------------------ | ----------------------------------------------------------- |
| `cmi.core.lesson_status` | `incomplete` on start → `completed` on the Finish action    |
| `cmi.core.lesson_location` | last section opened (LMS resume point)                    |
| `cmi.suspend_data`       | compact JSON: visited/completed sections, selected statements, anchor, sentiment, saved statements, scenario progress, stakeholders |
| `cmi.core.session_time`  | time spent, written on exit                                 |

**Freeform reflection text stays in `localStorage` only** and is deliberately
*not* sent to the LMS. SCORM 1.2 caps `cmi.suspend_data` at 4096 characters;
keeping the long text local means the LMS payload stays tiny (a full run is a
few hundred characters) and safe on every LMS. Learners’ written reflections
remain private to their device — consistent with the course’s existing “kept on
this device, never submitted” promise.

### Completion

Completion is an **explicit learner action**: a *“Mark course complete”* button
on the final section (*The Conversation Continues*). It appears only inside an
LMS session, so the standalone web course is visually unchanged. Clicking it
reports `cmi.core.lesson_status = completed`.

### Resume across devices

If a learner starts in the LMS on one device and returns on another, the course
seeds itself from `cmi.suspend_data` (progress + selections + resume point).
Freeform reflections, being local-only, don’t travel between devices.

## Notes & limits

- **One SCO.** The whole course is one SCORM object, launched at the welcome
  page (`course/index.html`). The welcome page carries no SCORM code, so the
  tracked session begins when the learner clicks through to the course
  (`course.html`, a single-page app); `cmi.core.total_time` accumulates across
  visits. On LMS-driven resume the learner re-enters via the welcome page and
  the app restores their place from `suspend_data` / local state.
- **No score / pass–fail.** The course is reflective, so no `cmi.core.score` or
  mastery score is reported — only completion.
- **SCORM 1.2 specifically** (not 2004). It has the broadest LMS support; a
  2004 edition could be added later if sequencing or objectives are needed.
