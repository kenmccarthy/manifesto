#!/usr/bin/env node
/* SCORM 1.2 package builder for the Manifesto course.
 *
 * Generates a self-contained SCORM 1.2 package from the live course source so
 * the two never drift: re-run this after any course change to rebuild.
 *
 * What it does:
 *   1. Stages the course into dist/manifesto-scorm12/ (course/, the shared CSS
 *      + fonts it uses, and favicon.ico), preserving the relative paths the
 *      pages already use.
 *   2. Strips the external web-analytics <script> (LMS content should make no
 *      third-party network calls).
 *   3. Drops the four standard SCORM 1.2 control schemas at the package root.
 *   4. Writes a conformant imsmanifest.xml (single SCO, launch course.html).
 *   5. Zips it into dist/manifesto-course-scorm12.zip for LMS upload.
 *
 * No dependencies — Node built-ins + the `zip` CLI only.
 *
 * Usage:  node scorm/build.js
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "dist");
const PKG_DIR = path.join(OUT_DIR, "manifesto-scorm12");
const ZIP_PATH = path.join(OUT_DIR, "manifesto-course-scorm12.zip");
const SCHEMA_DIR = path.join(__dirname, "schemas");

/* The single SCO's launch file, relative to the package root. We launch the
 * welcome page so learners see the course intro and — importantly for an LMS /
 * accredited context — the learning outcomes before starting. The welcome page
 * carries no SCORM code, so the tracked session cleanly begins when the learner
 * clicks through to course.html. */
const LAUNCH_FILE = "course/index.html";

const COURSE_TITLE = "The Future Is Still Ours to Shape — Manifesto Course";
const ITEM_TITLE = "The Future Is Still Ours to Shape";
const MANIFEST_ID = "MANIFESTO-COURSE-SCORM12";

/* Anything the course pages reference under shared/. base.css @font-face rules
 * pull the three woff2 files from shared/fonts/. */
const SHARED_FILES = ["shared/base.css"];
const SHARED_DIRS = ["shared/fonts"];
const ROOT_FILES = ["favicon.ico"];

const log = (...a) => console.log("[scorm]", ...a);

function rmrf(p) {
  fs.rmSync(p, { recursive: true, force: true });
}

function copyInto(relSrc) {
  const src = path.join(ROOT, relSrc);
  const dest = path.join(PKG_DIR, relSrc);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
}

/* Remove any <script> whose src points at the external analytics host, so the
 * packaged course makes no third-party requests inside the LMS. */
function stripAnalytics(relFile) {
  const p = path.join(PKG_DIR, relFile);
  let html = fs.readFileSync(p, "utf8");
  const before = html;
  html = html.replace(
    /[ \t]*<script[^>]*stats\.kenmccarthy\.net[^>]*><\/script>\s*\n?/gi,
    ""
  );
  if (html !== before) {
    fs.writeFileSync(p, html);
    log("stripped analytics from", relFile);
  }
}

/* In the LMS package, show the learning outcomes up front rather than behind a
 * collapsed disclosure — outcomes are expected to be visible in an accredited
 * context. Opens the "What will I learn?" <details> on the welcome page. */
function expandOutcomes(relFile) {
  const p = path.join(PKG_DIR, relFile);
  let html = fs.readFileSync(p, "utf8");
  const before = html;
  html = html.replace(/<details(\s+class="outcomes")>/i, "<details$1 open>");
  if (html !== before) {
    fs.writeFileSync(p, html);
    log("expanded learning outcomes in", relFile);
  }
}

/* Recursively list every file under the package dir as POSIX-relative paths,
 * excluding the manifest and the control schemas (referenced via
 * schemaLocation, not declared as resource files). */
function listContentFiles(dir, base) {
  base = base || dir;
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...listContentFiles(abs, base));
    } else {
      const rel = path.relative(base, abs).split(path.sep).join("/");
      if (rel === "imsmanifest.xml") continue;
      if (/^[^/]+\.xsd$/.test(rel)) continue; // top-level schema files
      out.push(rel);
    }
  }
  return out.sort();
}

function xmlEscape(s) {
  return String(s).replace(/[<>&"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c])
  );
}

function buildManifest(files) {
  const fileEls = files.map((f) => '      <file href="' + xmlEscape(f) + '"/>').join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${MANIFEST_ID}" version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                              http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                              http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG-MANIFESTO">
    <organization identifier="ORG-MANIFESTO">
      <title>${xmlEscape(COURSE_TITLE)}</title>
      <item identifier="ITEM-MANIFESTO" identifierref="RES-MANIFESTO" isvisible="true">
        <title>${xmlEscape(ITEM_TITLE)}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES-MANIFESTO" type="webcontent" adlcp:scormtype="sco" href="${xmlEscape(LAUNCH_FILE)}">
${fileEls}
    </resource>
  </resources>
</manifest>
`;
}

function main() {
  log("cleaning", path.relative(ROOT, PKG_DIR));
  rmrf(PKG_DIR);
  rmrf(ZIP_PATH);
  fs.mkdirSync(PKG_DIR, { recursive: true });

  // 1. Stage content.
  copyInto("course");
  SHARED_FILES.forEach(copyInto);
  SHARED_DIRS.forEach(copyInto);
  ROOT_FILES.forEach(copyInto);
  log("staged course/, shared assets, favicon");

  // 2. Strip third-party analytics; surface the learning outcomes on the
  //    welcome page.
  ["course/course.html", "course/index.html"].forEach(stripAnalytics);
  expandOutcomes("course/index.html");

  // 3. Control schemas at the package root.
  for (const f of fs.readdirSync(SCHEMA_DIR)) {
    fs.copyFileSync(path.join(SCHEMA_DIR, f), path.join(PKG_DIR, f));
  }
  log("added SCORM 1.2 control schemas");

  // 4. Manifest.
  if (!fs.existsSync(path.join(PKG_DIR, LAUNCH_FILE))) {
    throw new Error("launch file missing after staging: " + LAUNCH_FILE);
  }
  const files = listContentFiles(PKG_DIR);
  fs.writeFileSync(path.join(PKG_DIR, "imsmanifest.xml"), buildManifest(files));
  log("wrote imsmanifest.xml declaring", files.length, "files; launch =", LAUNCH_FILE);

  // Sanity: manifest well-formedness (best-effort).
  try {
    execFileSync("xmllint", ["--noout", path.join(PKG_DIR, "imsmanifest.xml")]);
    log("imsmanifest.xml is well-formed (xmllint)");
  } catch (e) {
    log("warning: could not validate manifest with xmllint —", e.message);
  }

  // 5. Zip (package root must be the zip root, so cd into PKG_DIR).
  execFileSync("zip", ["-r", "-q", "-X", ZIP_PATH, "."], { cwd: PKG_DIR });
  const kb = Math.round(fs.statSync(ZIP_PATH).size / 1024);
  log("built", path.relative(ROOT, ZIP_PATH), "(" + kb + " KB)");
  log("done. Upload the .zip to any SCORM 1.2 LMS, or test at https://cloud.scorm.com");
}

main();
