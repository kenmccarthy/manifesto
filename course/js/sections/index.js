/* Section registry — metadata (kicker/title/lead) for every section, and the
   renderers built so far. Sections without a renderer fall back to a
   placeholder in app.js. */

import before from "./before.js";
import manifesto from "./manifesto.js";
import theme1 from "./theme1.js";
import theme2 from "./theme2.js";
import theme3 from "./theme3.js";
import practice from "./practice.js";
import continues from "./continues.js";
import connecting from "./connecting.js";
import action from "./action.js";

export const SECTION_META = {
  before: {
    kicker: "Before We Begin",
    title: "Where are you starting from?",
    lead: "A moment to notice where you stand before we explore the statements. There are no right answers here — only your honest starting point.",
  },
  manifesto: {
    kicker: "The Manifesto",
    title: "This is not a rulebook.",
    lead: "The Manifesto was created as an invitation to think, question and act with intention — 30 statements organised into three interconnected themes.",
  },
  "theme-1": {
    kicker: "Theme 1",
    title: "Rethinking Teaching and Learning",
    theme: 1,
    lead: "For generations, education was organised around scarce information. What changes when explanations, examples and answers become almost instant?",
  },
  "theme-2": {
    kicker: "Theme 2",
    title: "Responsibility, Ethics, and Power",
    theme: 2,
    lead: "Capability does not remove responsibility. It redistributes it. Who chose the system? Whose data shaped it? Who is accountable?",
  },
  "theme-3": {
    kicker: "Theme 3",
    title: "Imagination, Humanity, and the Future",
    theme: 3,
    lead: "The future is not something technology does to us. Technology changes what becomes possible; people still decide what becomes desirable.",
  },
  connecting: {
    kicker: "Connecting the Manifesto",
    title: "The statements don't live alone.",
    lead: "The three themes are deliberately intertwined. Questions about teaching quickly become questions about power, judgement and value.",
  },
  action: {
    kicker: "Manifesto in Action",
    title: "Principles become meaningful when choices become difficult.",
    lead: "Work through real institutional dilemmas — assessment, policy, procurement, the everyday — and see which statements bear on each decision. There are no scored answers, only better questions.",
  },
  practice: {
    kicker: "Your Practice",
    title: "From Manifesto to Practice",
    lead: "Turn reflection into intention: the statements you want to carry forward, and one small change you could realistically make.",
  },
  continues: {
    kicker: "The Conversation Continues",
    title: "The end of the course — but not the Manifesto.",
    lead: "The Manifesto is meant to be questioned, debated, adapted and developed. Here is what you have made your own.",
  },
};

export const RENDERERS = { before, manifesto, "theme-1": theme1, "theme-2": theme2, "theme-3": theme3, practice, continues, connecting, action };
