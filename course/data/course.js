/* Authored course content — kept separate from presentation and logic.
   DRAFT copy for review: intros, prompts, and per-statement notes used by the
   activities. Edit freely; the components read from here. */

/* "What occupies your thinking?" — Before We Begin (multi-select). */
export const OCCUPIES = [
  { id: "teaching", label: "Teaching and learning" },
  { id: "assessment", label: "Assessment" },
  { id: "integrity", label: "Academic integrity" },
  { id: "equity", label: "Equity and inclusion" },
  { id: "policy", label: "Institutional policy" },
  { id: "future", label: "The future of higher education" },
];

/* Theme introductions — The Manifesto section (and theme openers later). */
export const THEME_INTRO = {
  1: { question: "How might curiosity, collaboration and critical design redefine education in an age of abundance?" },
  2: { question: "What responsibilities accompany new capabilities, and who holds the power to make decisions?" },
  3: { question: "What should remain deeply human, and what future are we choosing to create?" },
};

/* One-sentence reason each statement belongs to its theme.
   Used for the "Find the Theme" knowledge-check feedback. */
export const THEME_REASON = {
  1: "it reframes the core task of teaching once information is no longer scarce.",
  2: "it elevates asking good questions over retrieving answers — a shift in what learning values.",
  3: "it locates the lesson in how we think and learn, not in the tool's output.",
  4: "it is about how we design assessment and learning, choosing design over policing.",
  5: "it concerns the conditions — time, training, support — that make new practice possible.",
  6: "it prizes curiosity and the process of learning over mere completion.",
  7: "it is a claim about how students learn to judge a tool: through informed experience.",
  8: "it positions students as active partners in learning rather than passive recipients.",
  9: "it asks whether learning partnerships are genuine or performative.",
  10: "it defines the human purpose of teaching in an age of capable machines.",
  11: "it redefines academic integrity around honesty of process — an ethical stance.",
  12: "it draws the line on which judgements remain a human, professional responsibility.",
  13: "it is about how institutions exercise power and whose values guide their decisions.",
  14: "it ties the reach of a technology to the duty to answer for it.",
  15: "it weighs the pull of speed against the responsibility to protect deeper learning.",
  16: "it exposes the values and power hidden inside data and outputs.",
  17: "it treats prompting as a practice shaped by power, context and intention.",
  18: "it resists one-size-fits-all rules, locating responsibility within each discipline.",
  19: "it concerns responsibility for thinking and authorship even when machines assist.",
  20: "it is about the standards we hold — an ethic of learning, not ease.",
  21: "it looks forward with courage rather than caution — a choice about the future we model.",
  22: "it asks us to confront how power itself is reshaped by technology.",
  23: "it insists the future we build includes everyone — a humane commitment.",
  24: "it widens our horizon to the planet, making sustainability part of what we value.",
  25: "it reframes limitation as a spark for human imagination and creativity.",
  26: "it places ethics at the foundation of what we design and become.",
  27: "it treats privacy as a lived, human practice within a shared future.",
  28: "it reaches past technique toward meaning and purpose — the why of learning.",
  29: "it affirms that the future of education remains a human choice.",
  30: "it imagines the classroom as an ongoing, human conversation.",
};

/* Statement spotlights — authored 80–150 word interpretations (DRAFT).
   "Why this matters" defaults to each statement's rationale; the reflection
   defaults to its reflection question. Extended per theme. */
export const SPOTLIGHT = {
  1: { interpretation: "Higher education grew up around scarcity. Knowledge lived in libraries, lectures and a few expert heads, and much of teaching was the careful transfer of hard-to-reach information. Generative AI collapses that scarcity: explanations, summaries and worked examples arrive on demand. The instinct is to ask how we protect the old model — but the more useful question is what teaching is for once information is everywhere. Abundance does not make educators redundant; it moves their value upstream, to helping students decide what deserves attention, what to trust, and what to do with what they find. Scarcity rewarded access. Abundance rewards judgement." },
  2: { interpretation: "When any answer is a prompt away, being the person who holds answers matters less than being the person who asks the questions worth answering. Inquiry is not a soft skill here; it is the discipline of framing a problem precisely, noticing what is missing, and pushing past the first plausible response. A good question does work a good answer cannot: it opens a space, sets the terms, and reveals what the asker already understands. Teaching for inquiry means rewarding the quality of a student's questions as much as the correctness of their conclusions — and treating curiosity as something to be practised, not assumed." },
  3: { interpretation: "Generative AI is fluent, and fluency is persuasive. It will produce a confident paragraph on almost anything, including things that are subtly or completely wrong. That fluency is a mirror: it shows how easily any of us mistake coherence for truth, and how much of 'knowing' was really just recognising a familiar shape. Used well, the tool doesn't remove the need to think — it raises the price of skipping it, because errors now arrive polished and unattributed. The task is not to ban the mirror but to teach students to look into it critically: to verify, to doubt, and to notice when smoothness is standing in for substance." },
  4: { interpretation: "Detection is a defensive posture: it assumes the task is fixed and the job is to catch whoever cheats at it. But detection is always a step behind the tools, and it frames students as suspects rather than learners. Design starts from a different question — not 'did AI produce this?' but 'what learning do we actually need to see, and how do we make it visible?' Assessments built around reasoning, iteration, choices and reflection are harder to fake because they ask for something a generic output cannot supply: this student's thinking, in this context. Design won't end every worry, but it changes the game from policing to teaching." },
  5: { interpretation: "Enthusiasm is not enough. Educators are regularly asked to reinvent teaching, assessment and support in the cracks of already-full weeks — and then blamed when change stalls. Courage matters: someone has to be willing to try something uncertain. But courage without time, training, recognition and collaborative space quietly becomes exhaustion, and innovation collapses back into rhetoric. This statement puts responsibility where it belongs. If an institution wants bold practice, it has to resource bold practice — protected hours, real development, room to fail and learn. The door of possibility is opened by individuals; the path that makes change sustainable is built, and paid for, by the institution around them." },
  6: { interpretation: "Much of education quietly optimises for completion: finish the task, submit the assignment, move on. When machines can complete faster than any of us, completion becomes a weak signal of learning. Curiosity — the willingness to linger with a question, to follow a tangent, to be unsatisfied by the first answer — is harder to automate and more valuable because of it. This is not an argument against rigour or deadlines; it is a reminder that the point of the work was never the artefact. If students leave able to produce polished outputs but unwilling to wonder, we have optimised for the wrong thing." },
  7: { interpretation: "Critical distance is earned, not declared. You cannot meaningfully critique a tool you have never been allowed to touch; prohibition tends to produce compliance or evasion, not judgement. Learning with generative AI — seeing where it helps, where it misleads, and where it quietly encodes assumptions — is how students build the literacy to hold it at arm's length. This is uncomfortable, because it means letting learners use something we haven't fully tamed. But the alternative is graduates who meet these systems for the first time at work, with no practised sense of their limits. Windows, not walls: understanding comes from engagement, then reflection." },
  8: { interpretation: "Decisions about GenAI in education are usually made about students and rarely with them. Yet students often see the tools, the pressures and the shortcuts more clearly than anyone. Treating them as collaborators — in shaping assessment, policy and classroom norms — is not just fairer; it produces better decisions and deeper learning. Collaboration carries weight: it asks students to take responsibility, argue for their views, and live with trade-offs, rather than simply receiving rules. The risk to watch is tokenism, where 'consultation' leaves everything unchanged. Real collaboration means students can point to something that is different because they were in the room." },
  9: { interpretation: "Statement 8 invites students in as partners; this one names the condition that makes the invitation real. Asking students to co-design within structures that will not actually change is not collaboration but performance — and students see through it quickly. Consultation that never alters a decision teaches cynicism: it signals that their voice is decorative. Genuine partnership requires institutions to hold some things loosely enough to be reshaped, and to show where student input actually moved an outcome. That is uncomfortable, because it means ceding a measure of control. But trust is not built by inviting people into a room whose walls cannot move; it is built by letting what they say change the room." },
  10: { interpretation: "It is tempting to frame the whole challenge as control: the right policy, the right detector, the right restriction. But the technology keeps moving regardless, and a purely defensive education spends its energy managing tools instead of developing people. The deeper task is human: nurturing empathy, discernment, curiosity and conscience — the capacities that decide how any tool gets used. This reframes the educator's role from gatekeeper to gardener. We are not here to make the machine safe so much as to help the person beside it become someone who can act wisely, with or without it. The horizon of learning is character, not control." },
};

/* Theme 1 activity content (DRAFT). */
export const THEME1 = {
  openingHeading: "The abundance problem",
  openingBody:
    "For generations, much of education was organised around access to scarce information. But what happens when explanation, examples, summaries, drafts and answers become almost instantly available? The challenge changes. Finding an answer may matter less. Knowing what to ask, what to trust, what to challenge, and what to do with the answer may matter more.",

  spotlights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

  sort: {
    buckets: [
      { id: "then", label: "Then · scarcity" },
      { id: "now", label: "Now · abundance" },
    ],
    items: [
      { label: "Memorising information", answer: "then", feedback: "In scarcity, holding facts in your head was valuable because retrieving them was hard." },
      { label: "Locating trustworthy sources", answer: "then", feedback: "Finding reliable material was itself a skill when it was scarce and scattered." },
      { label: "Reproducing what experts knew", answer: "then", feedback: "Faithful reproduction was a reasonable proxy for learning when knowledge was hard to reach." },
      { label: "The instructor as primary source", answer: "then", feedback: "When knowledge was scarce, the lecturer was often the main route to it." },
      { label: "Evaluating information", answer: "now", feedback: "When content is abundant, judging quality and reliability becomes the core skill." },
      { label: "Framing good questions", answer: "now", feedback: "Abundance rewards those who can ask precisely, not just retrieve." },
      { label: "Verifying outputs", answer: "now", feedback: "Fluent generated text still has to be checked against reality." },
      { label: "Connecting ideas", answer: "now", feedback: "Value shifts to synthesis — linking things the tools present in isolation." },
      { label: "The instructor as designer, challenger and guide", answer: "now", feedback: "The educator's role moves from delivering content to designing experiences and provoking thought." },
    ],
    conclusion:
      "This does not mean knowledge no longer matters. Quite the opposite. Judgement depends upon having something against which to judge.",
  },

  chooseProvocation: {
    prompt: "Which one most challenges conventional teaching?",
    statements: [2, 6, 10],
  },

  essay: {
    scenario:
      "A programme team discovers that students can generate competent responses to its traditional 2,000-word essay using widely available GenAI tools. The team must decide what to do.",
    prompt: "What would you advise?",
    options: [
      { label: "Introduce AI detection software.", kind: "interpretive", feedback: "Detection promises a quick fix, but it is unreliable, escalates an arms race, and treats every student as a suspect. Even when it works, it answers 'did AI produce this?' — not 'is this student learning?' It may buy time, but it doesn't rebuild the evidence of learning the essay has lost." },
      { label: "Ban GenAI and require a signed declaration.", kind: "interpretive", feedback: "A ban is easy to state and hard to enforce, and declarations shift responsibility onto students without changing what the task rewards. It can protect the old assessment on paper while quietly hollowing it out — and it forgoes the chance to teach responsible use." },
      { label: "Redesign the assessment to make reasoning and process visible.", kind: "interpretive", feedback: "Often the most durable option: assessing drafts, choices, reflection or a short viva makes this student's thinking the thing being evidenced. It is not a magic shield — redesign takes time and can be done badly — but it moves effort from policing to teaching." },
      { label: "Keep the assessment unchanged but allow unrestricted GenAI.", kind: "interpretive", feedback: "Honest about the tools' presence, but on its own it abandons the question of what the assessment is for. Without redesign, 'use anything' can mean the artefact no longer evidences the student's learning at all. Openness needs pairing with a clear account of the judgement you still need to see." },
    ],
    conclusion:
      "Notice the shift in the question itself. Detection asks: “Did AI produce this?” Design asks: “What learning do we actually need to see?”",
    statements: [3, 4],
  },

  knowledgeCheck: [
    {
      prompt: "A colleague says: “If students can get AI to answer my quiz questions, I'll just make the quiz worth more marks so they take it seriously.” What is the most useful response?",
      options: [
        { label: "Agree — higher stakes will discourage misuse.", kind: "interpretive", feedback: "Raising the stakes tends to raise the incentive to use whatever works, including AI. Stakes change motivation, not what the task actually measures." },
        { label: "Ask what the quiz is meant to evidence, and whether that can be made visible in a way AI can't simply supply.", kind: "corrective", correct: true, feedback: "Yes. This moves from policing to design — the shift at the heart of Statement 4. The question becomes what learning you need to see, not how to deter a tool." },
        { label: "Recommend an AI detector for the quiz.", kind: "interpretive", feedback: "Detection is unreliable and reactive. It answers 'did AI produce this?' rather than redesigning the task to evidence learning." },
      ],
    },
    {
      prompt: "Complete the statement: “Detection chases the past; thoughtful design shapes the ______.”",
      options: [
        { label: "future", kind: "corrective", correct: true, feedback: "Yes — the contrast is between reacting with the tools of the past and designing for what's ahead." },
        { label: "answer", kind: "interpretive", feedback: "A tempting fit, but the statement is about design shaping the future, not the answer." },
        { label: "syllabus", kind: "interpretive", feedback: "Not quite — the word is 'future'; the point is forward-looking design." },
      ],
    },
    {
      prompt: "A lecturer wants students to spend less time producing polished summaries and more time pursuing questions that genuinely interest them. Which statement most supports this?",
      options: [
        { label: "Curiosity surpasses completion.", kind: "corrective", correct: true, feedback: "Yes — Statement 6 values lingering with a question over racing to finish." },
        { label: "Transparency is the new integrity.", kind: "interpretive", feedback: "That's about honesty of process, not curiosity over completion." },
        { label: "Efficiency is seductive; wisdom lingers.", kind: "interpretive", feedback: "Close in spirit, but that's a Theme 2 statement about resisting speed; Statement 6 is the sharper fit for curiosity over completion." },
      ],
    },
    {
      prompt: "Which of these is a misreading of the Manifesto's stance on GenAI and thinking?",
      options: [
        { label: "Because AI can sound convincing while being wrong, verifying its output becomes more important.", kind: "interpretive", feedback: "That's an accurate reading, not a misconception — it is exactly Statement 3's point." },
        { label: "“GenAI reveals the cost of not thinking” means students can safely stop thinking for themselves.", kind: "corrective", correct: true, feedback: "Yes — that's the misreading. Statement 3 argues the opposite: fluent, unattributed output makes thinking matter more, not less." },
        { label: "Learning to use GenAI can help students judge when to trust it.", kind: "interpretive", feedback: "That's a fair reading (Statement 7), not a misconception." },
      ],
    },
  ],
};
