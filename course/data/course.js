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
  11: { interpretation: "Integrity used to be policed by detection: catch the copied passage, prove the misconduct. But when human and machine contributions blur, 'was this original?' becomes almost unanswerable — and beside the point. Transparency reframes integrity around honesty of process rather than purity of product. Someone who can say clearly 'here is what I used, and here is how it shaped the work' is demonstrating something more trustworthy than an unverifiable claim of doing it all alone. This shifts the culture from suspicion to disclosure. It asks institutions to make openness safe — because people only tell the truth about their tools when honesty is not punished as if it were cheating." },
  12: { interpretation: "Generative AI can surface patterns, draft feedback and suggest options — genuinely useful assistance. But assistance is not assessment. Deciding whether a student has met a learning outcome, weighing context and fairness, exercising rigour or mercy: these are acts of professional judgement, accountable to a person. The danger is drift, where a tool meant to inform a decision quietly starts making it, because deferring is easier than deliberating. This statement draws the line: augment the educator's judgement, don't replace it. The measure of good AI use here is not how much it decides, but how much better-informed the human decision becomes." },
  13: { interpretation: "Efficiency is easy to measure and easy to sell, so it tends to win institutional arguments by default. But choosing a system is never only a procurement decision; it encodes values about privacy, equity, labour and sustainability. When a university hands those choices to whatever is cheapest or fastest, it effectively outsources its conscience to vendors. Leading ethically means making the value trade-offs explicit and owning them — sometimes paying more, or moving slower, to protect something that matters. It also makes staff integrity possible: individuals cannot act ethically inside systems chosen with no ethics in view. Institutional courage is the precondition for everyone else's." },
  14: { interpretation: "The more a technology shapes — more students, more decisions, more consequence — the greater the duty to justify it. Yet influence and accountability often drift apart: a system quietly steers thousands of choices while no clearly named person answers for it. This statement insists the two travel together. If a tool reaches far, its governance, boundaries and rationale should be visible and open to challenge, not buried in a contract. Accountability here is not the same as blame; it is the willingness to explain, to be questioned, and to put things right. Where power is diffuse, someone still has to be answerable — and the bigger the reach, the clearer that answer must be." },
  15: { interpretation: "Automation promises to do more, faster — and in a pressured system that promise is hard to resist. But learning is not only a throughput problem. Understanding grows in reflection, conversation, revision and the slow turning of an idea; some of it cannot be sped up without being destroyed. This statement is not anti-efficiency; routine drudgery is worth removing. It is a warning against letting speed become the only value, so that everything which resists acceleration — deliberation, difficulty, dialogue — gets quietly squeezed out. Part of the educator's job now is to protect the tempos where thinking actually happens, even when faster is available." },
  16: { interpretation: "It is tempting to treat AI output as a view from nowhere — objective because it came from a machine. But every model is trained on data that carries values, gaps and histories, and it reflects the cultures and choices of its makers. What looks like neutral fact is a narrative with an author, even when that author is diffuse. Teaching students to see this is core critical literacy: to ask what a dataset includes and omits, whose experience is centred, and what a confident answer might quietly be leaving out. The goal is not cynicism but discernment — reading outputs as claims to be interrogated rather than truths to be received." },
  17: { interpretation: "How you ask shapes what you learn. A prompt is not a neutral request; it frames the problem, encodes assumptions and sets the terms of the answer. That makes prompting a teaching act — and a skill worth teaching. Students who learn only to extract slick outputs are learning to be served; students who learn to interrogate their own prompts are learning to think. The educational move is to treat the prompt as an object of study: why this framing, what it presumes, what a different question would surface. Good prompting is really good questioning applied to a machine — and questioning has always been at the heart of education." },
  18: { interpretation: "A single institutional rule for 'AI use' flattens a landscape that is anything but flat. In computer science, generating and then critiquing code can be the point; in nursing, the same fluency near patient decisions raises safety and accountability stakes; in history, the questions are about sources and interpretation; in music, about authorship and craft. Responsible use is not a universal setting but a disciplinary judgement made in context. This statement argues against one-size-fits-all governance and for plurality: disciplines co-creating their own frameworks with their students and communities. Coherence across an institution is worth having — but it should come from shared principles, not identical rules." },
  19: { interpretation: "Much of what we call writing is really thinking made visible: choosing, ordering, cutting, discovering what we mean by trying to say it. Generative tools can draft fluent prose, but a fluent draft is not the same as a thought worked through. The risk is that producing text stops requiring thinking at all. The opportunity is different: drafting, interrogating and reshaping AI-assisted text can itself be deep intellectual work — if we design for it. This statement keeps writing central not as a ritual but as cognition. The question for educators is which parts of the struggle we still want students to do, because that struggle is where the thinking lives." },
  20: { interpretation: "It is easy to romanticise difficulty, as if effort were valuable in itself. It isn't — removing pointless friction is good, and offloading routine work can free attention for what matters. The real problem is not ease but passivity: accepting a fluent answer without scrutiny, mistaking a finished artefact for understanding. This statement refuses the false choice between 'make it hard' and 'let it slide'. When tools lighten the load, the response should be to raise the intellectual ambition — more critical thinking, bolder creation, deeper ethical reasoning — not to lower expectations. Grades should track the depth of human growth, not the smoothness of the shortcut." },
  21: { interpretation: "Fear is a natural first response to a powerful, unpredictable technology, and caution has its place. But an education built mainly on warnings teaches students to be wary, not capable. Courage here is not recklessness; it is the willingness to experiment thoughtfully, to sit with uncertainty, and to trust learners to act responsibly with the tools of their time. Students learn courage by seeing it modelled — by teachers who try things that might not work and reflect openly when they don't. What we model, they remember. If we meet the future only defensively, we hand students our anxiety; if we meet it with critical courage, we hand them a way to act." },
  22: { interpretation: "It is comforting to treat a new technology as a neutral instrument — just a faster way to do what we already did. But tools redistribute advantage: they change who can do what, whose work is valued, and who gets left behind. Generative AI is no exception, carrying economic, political and social consequences into every classroom that adopts it. Education can make these visible or leave them invisible, and silence is not neutral — it quietly sides with whoever already benefits. Teaching critically means asking, out loud and with students, who gains and who loses from a given change, and treating that question as part of the subject, not a distraction from it." },
  23: { interpretation: "When a system works better in some languages, for some abilities, or within some cultural assumptions, it builds inequity into the everyday experience of learning — often invisibly, for the people least able to object. Inclusion is not a feature to add at the end; it is a design stance from the start, asking who might be excluded by a tool or a task and changing the design so that all voices can take part. This is demanding, because it means noticing gaps that don't affect us and treating access and belonging as non-negotiable rather than nice-to-have. A future worth building is one that more people can actually enter." },
  24: { interpretation: "The environmental cost of generative AI — energy, water, hardware — is real but easy to keep offstage, precisely because it happens far from the screen. Treating sustainability as a learning outcome means bringing that cost into view as part of digital literacy, not a separate module bolted on at the end. It asks students to weigh benefit against impact and to see technological choices as choices with consequences for a shared world. This is not about guilt or refusal; it is about awareness and responsibility becoming ordinary parts of how we reason about tools. What we treat as worth measuring signals what we treat as worth caring about." },
  25: { interpretation: "Unlimited possibility can be paralysing; a blank page with no rules rarely produces the best work. Constraints focus attention — they turn 'do anything' into 'do something well, within these limits' — and generative tools have limits worth working with rather than against. A well-chosen constraint (time, medium, what the AI may and may not do) becomes a canvas: it provokes ingenuity, forces judgement, and often produces more original results than boundless freedom would. For educators, this reframes design: instead of asking how to stop students misusing a tool, ask what constraints would make it a spur to human creativity rather than a substitute for it." },
  26: { interpretation: "Ethics is too often the last slide, the closing paragraph, the compliance box ticked once the real decisions are made. But by then the decisions are made. Treating ethics as a foundation means bringing it into the design stage — of a policy, a course, a prompt, a dataset — where it can actually shape outcomes rather than merely label them. This is more demanding than compliance, because it asks 'should we?' before 'can we?' and keeps asking as circumstances change. The most trustworthy systems are those that started with conscience, not the ones that added it afterwards. Where ethics lives in a process tells you how seriously it is taken." },
  27: { interpretation: "Privacy is not a policy you read once; it is a habit enacted in small, repeated choices — what data you hand over for convenience, what you ask a tool to remember, what you quietly collect about students. Understanding those trades is part of digital literacy, and educators teach it most powerfully by living it: using tools transparently, anonymising where they can, questioning what is gathered and why. When privacy is treated as practice rather than paperwork, students learn to make informed choices instead of clicking 'accept'. The everyday example a teacher sets — careful or careless — teaches more about privacy than any single lesson on it ever will." },
  28: { interpretation: "It has never been easier to become fluent in how a tool works, and never less sufficient. Technical skill without judgement produces people who can operate anything and question nothing. Teaching 'why' means pairing capability with purpose: understanding what a tool is for, what it costs, and — crucially — when not to use it. That last judgement is the hard one, and the most human: knowing that just because a task can be automated does not mean it should be. Meaningful AI literacy joins skill to meaning, so that students leave able not only to use these systems but to decide, wisely, whether they should." },
  29: { interpretation: "For all its power, generative AI does not rewrite the purpose of education; it changes the tools, not the point. The future classroom is not a contest between minds and machines but a space where human creativity, conscience and care keep growing — if we choose to build it that way. This statement is an antidote to determinism, the belief that technology simply happens to us. It insists on agency: the horizon is not fixed by the tools but shaped by the countless ordinary decisions educators and students make. The legacy will not be the machine we adopted, but the minds we helped form alongside it." },
  30: { interpretation: "Learning has always been dialogue — between teachers and students, ideas and objections, questions and responses — and generative AI adds new voices to that exchange without needing to dominate it. The risk is that the machine talks and we listen; the opportunity is a richer conversation in which technology contributes without speaking for us. An extraordinary classroom is not defined by the tools it contains but by the quality of the exchange it makes possible: the curiosity it provokes, the disagreement it can hold, the trust that lets people think out loud. The future is not something to be delivered to students. It is something to be talked into being, together." },
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

/* Theme 2 activity content (DRAFT). */
export const THEME2 = {
  opening: {
    line: "Capability does not remove responsibility. It redistributes it.",
    body: "Generative AI introduces questions that extend far beyond whether a particular tool works.",
    questions: [
      "Who chose the system?",
      "Whose data shaped it?",
      "Who benefits?",
      "Who may be excluded?",
      "Who is accountable when something goes wrong?",
      "And which decisions should never simply be handed to a machine?",
    ],
  },

  responsibility: {
    scenario:
      "A university introduces an AI-powered system that gives students personalised academic advice. If that advice turns out to be wrong, where should responsibility sit? Distribute 100% across those involved — to give more to one, take it from another.",
    items: [
      { id: "student", label: "Student" },
      { id: "lecturer", label: "Lecturer" },
      { id: "programme", label: "Programme team" },
      { id: "university", label: "University" },
      { id: "provider", label: "Technology provider" },
    ],
    reveal:
      "There is no official correct distribution — and that is the point. The harder question is what happens when influence and accountability come apart: when the system shaping the advice sits far from whoever has to answer for it.",
    statement: 14,
  },

  spotlights: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

  automate: {
    intro:
      "For each task, choose how much you would hand to a machine. There is no single correct answer — the point is to notice where human judgement still needs to sit, and why.",
    buckets: [
      { id: "automate", label: "Automate" },
      { id: "augment", label: "Augment" },
      { id: "human", label: "Keep human" },
    ],
    items: [
      { label: "Generating formative quiz questions" },
      { label: "Giving initial feedback on grammar" },
      { label: "Deciding whether a student has met a learning outcome" },
      { label: "Identifying students considered ‘at risk’" },
      { label: "Summarising meeting notes" },
      { label: "Suggesting alternative explanations" },
      { label: "Determining a final grade" },
      { label: "Responding to a distressed student" },
    ],
    bucketFeedback: {
      automate: "Automating this can save real time — but what checks would catch it going wrong, and who would notice if they didn't?",
      augment: "As an aid this can sharpen your work — but what must you still decide yourself, and how do you avoid quietly deferring to it?",
      human: "Keeping this human has a cost in time and effort. What would have to be true before you'd trust more of it to a tool?",
    },
  },

  transparency: {
    prompt:
      "Four students describe how they used GenAI on the same assignment. Which disclosure gives you enough to understand how AI actually contributed?",
    options: [
      { label: "“I used ChatGPT.”", kind: "interpretive", feedback: "Honest, but almost uninformative. It names a tool without saying what it did — for which parts, to what extent, or how the student checked it. Transparency is about understanding the contribution, not just admitting one." },
      { label: "“I used AI to help with my essay.”", kind: "interpretive", feedback: "Slightly fuller, but still vague. 'Help with' could mean anything from brainstorming to writing the whole thing. It doesn't let a reader judge what the student actually did." },
      { label: "“I used ChatGPT for grammar and to fix my references.”", kind: "interpretive", feedback: "More specific and genuinely useful — you now know roughly where it was used. But it is silent on the thinking: were ideas, structure or arguments AI-shaped, and did the student verify the output?" },
      { label: "“I used ChatGPT to suggest alternative structures for my introduction. I chose one, rewrote it in my own words, and checked every factual claim against the sources I cite.”", kind: "corrective", correct: true, feedback: "Yes. This tells you what the tool did, what the student decided, and how they took responsibility for accuracy. That is transparency doing its real job — making the process legible, not policing whether a tool was touched." },
    ],
    conclusion:
      "Notice we never asked whether using AI was allowed. Transparency is about making the process legible, so trust can rest on what actually happened.",
  },

  discipline: {
    intro: "Would responsible GenAI use look identical in all four? Open each to compare.",
    items: [
      { title: "Computer Science", body: "Generating code and then reading, testing and critiquing it can be central to the learning — the AI output is raw material for judgement, not the finished answer." },
      { title: "Nursing", body: "Near clinical decisions, a fluent but wrong suggestion can be dangerous. Accountability and patient safety push much more firmly toward keeping the human in charge." },
      { title: "Music", body: "Questions turn on authorship, craft and voice: what does it mean to compose or perform with a generative tool, and where does the human artist remain essential?" },
      { title: "History", body: "The discipline lives on sources and interpretation. The sharpest skills here are provenance and critique — asking where a claim came from and whose story a dataset tells." },
    ],
    conclusion: "Same tool, four different questions. That is why one universal rule struggles.",
    statement: 18,
  },

  knowledgeCheck: [
    {
      prompt: "A department buys an AI tutoring tool because it is cheaper and faster than expanding staff support. Which statement most directly challenges 'cheaper and faster' as the deciding factor?",
      options: [
        { label: "Institutions must lead ethically, not just efficiently.", kind: "corrective", correct: true, feedback: "Yes — Statement 13 warns against letting cost and speed override values like equity, privacy and educational quality." },
        { label: "Prompting is pedagogy.", kind: "interpretive", feedback: "Relevant to how the tool is used, but not to the procurement decision itself." },
        { label: "Curiosity surpasses completion.", kind: "interpretive", feedback: "A Theme 1 idea about learning, not about how institutions weigh efficiency against ethics." },
      ],
    },
    {
      prompt: "An AI system flags students as ‘at risk’ of failing so staff can offer support earlier. This one has more than one defensible answer — which concern would you prioritise?",
      options: [
        { label: "Accuracy and bias — who gets wrongly flagged, and who gets missed?", kind: "interpretive", feedback: "A strong concern: the flag reflects the data's histories and gaps (Statement 16), and errors fall unevenly. Reasonable people would also weigh the priorities below." },
        { label: "Transparency — do students and staff know how the flag is produced and used?", kind: "interpretive", feedback: "Also strong: accountability should scale with the system's influence (Statement 14), and hidden logic is hard to challenge. The other concerns are defensible too." },
        { label: "Human judgement — is the flag informing a person, or quietly making the decision?", kind: "interpretive", feedback: "Also defensible: augmentation, not automation (Statement 12) — the risk is deferring to the score. None of these is the single right answer." },
      ],
    },
    {
      prompt: "A lecturer says: “I let students use AI however they like, and I don't ask about it — it's their business.” Which statement most complicates this stance?",
      options: [
        { label: "Transparency is the new integrity.", kind: "corrective", correct: true, feedback: "Yes — Statement 11 suggests that not asking about process forgoes the openness on which trust and integrity now depend." },
        { label: "Sustainability is a learning outcome.", kind: "interpretive", feedback: "A Theme 3 concern about environmental impact, not about disclosure of use." },
        { label: "Ease is not the enemy; uncritical learning is.", kind: "interpretive", feedback: "Related — it warns against uncritical use — but the sharper challenge to 'don't ask' is transparency (Statement 11)." },
      ],
    },
    {
      prompt: "Which of these misreads “Academic judgement is augmented, not automated”?",
      options: [
        { label: "AI can help generate feedback, but a person should decide the grade.", kind: "interpretive", feedback: "That's a faithful reading, not a misconception." },
        { label: "Because AI is augmenting judgement, it's fine to let it set final grades automatically to save time.", kind: "corrective", correct: true, feedback: "Yes — that's the misreading. 'Augmented, not automated' draws the line precisely at handing the decision itself to the machine (Statement 12)." },
        { label: "Human context and fairness should shape assessment decisions.", kind: "interpretive", feedback: "That's consistent with the statement, not a misreading." },
      ],
    },
  ],
};

/* "Your Practice" section content (DRAFT).
   The payoff of the course: choose five statements to carry forward, name the
   one that anchors your practice, and commit to one realistic change. */
export const PRACTICE = {
  opening: {
    line: "A manifesto you disagree with changes nothing. A manifesto you make your own changes how you teach.",
    body: "You have questioned thirty provocations. Now the course asks something harder than agreement: commitment. Not to all thirty — to the few that speak to your context, your discipline, your students. This is where reflection becomes intention.",
  },

  choose: {
    title: "Choose your five",
    intro:
      "From the thirty, select up to five statements you want to carry into your own practice. Not the five you admire most in the abstract — the five you would actually act on. Choosing is the point: leaving twenty-five behind is what makes the five mean something.",
    limit: 5,
    seedPrompt: "you marked earlier while exploring",
    empty: "Nothing chosen yet. Pick the ones you'd defend in a staff meeting.",
    counter: (n, limit) =>
      n === 0
        ? "Choose up to " + limit + "."
        : n + " of " + limit + " chosen" + (n === limit ? " — your manifesto is full." : "."),
    full: "Your manifesto holds five — remove one to make room for another.",
  },

  anchor: {
    title: "Name your anchor",
    intro:
      "Of your chosen statements, which one matters most — the principle you would keep if you could keep only one? This is your anchor: the idea you return to when a decision is genuinely hard.",
    prompt: "Your anchor statement",
    empty: "Choose your five above first, then return here to pick the one that matters most.",
    reveal: "This is the sentence to pin above your desk. Everything else is commentary on it.",
  },

  change: {
    title: "One small change",
    intro:
      "Principles are easy to hold and hard to enact. So make it concrete and make it small. Name one change you could realistically make in the next four weeks — a single assessment redesigned, one conversation with students, one policy questioned. Small and real beats grand and hypothetical.",
    prompt: "In the next four weeks, I will…",
    placeholder: "One specific, achievable change — a sentence is plenty.",
  },

  closing:
    "That is the work. Five statements, one anchor, one change. In the final section you'll see everything you've made — and revisit the feeling you started with.",
};

/* Theme 3 activity content (DRAFT). */
export const THEME3 = {
  opening: {
    line: "The future is not something technology does to us.",
    body: "Technology changes what becomes possible. People still decide what becomes desirable. This theme moves beyond immediate questions of tools and policies to the university we are creating.",
  },

  remainHuman: {
    prompt: "As GenAI becomes more capable, what part of education must remain deeply human?",
    concepts: ["care", "curiosity", "judgement", "belonging", "dialogue", "empathy", "imagination", "uncertainty", "challenge", "relationships"],
  },

  spotlights: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],

  futureUniversity: {
    intro: "Five design decisions for a future university. Choose between competing priorities — the feedback connects each choice back to the Manifesto. There are no scored answers.",
    decisions: [
      {
        prompt: "AI systems should primarily be selected because they:",
        options: [
          { label: "reduce institutional costs", kind: "interpretive", feedback: "Cost matters, but making it the primary driver is exactly what Statement 13 warns against — leading efficiently rather than ethically, letting the cheapest option set educational values." },
          { label: "improve the educational experience", kind: "interpretive", feedback: "This aligns with the Manifesto's values — though in the real world cost can't be ignored; the skill is keeping educational value the deciding factor when the two conflict (Statements 13, 15)." },
          { label: "do both — but educational value stays the deciding factor", kind: "interpretive", feedback: "A pragmatic stance: acknowledge cost, but let educational value decide the close calls. Statements 13 and 15 both push this way — resisting efficiency as the default arbiter." },
        ],
      },
      {
        prompt: "Students should encounter GenAI:",
        options: [
          { label: "only after mastering foundational skills", kind: "interpretive", feedback: "There's a real worry about skipping foundations — but a blanket 'not until later' can delay the critical literacy Statement 7 says comes from using the tool. Timing isn't one-size-fits-all." },
          { label: "from the beginning of their studies", kind: "interpretive", feedback: "Early exposure builds familiarity and critical distance (Statement 7), but 'from day one, everywhere' ignores that GenAI lives differently in every discipline (Statement 18) and every stage." },
          { label: "differently depending on discipline, stage and learning outcome", kind: "interpretive", feedback: "This matches Statements 7, 18 and 28: learn with the tool, but calibrate to discipline, stage and purpose. The judgement is when it helps and when to hold off." },
        ],
      },
      {
        prompt: "When GenAI can draft almost any assignment, assessment should mainly:",
        options: [
          { label: "move to closed, in-person conditions", kind: "interpretive", feedback: "Controlled conditions suit some outcomes, but as a default they narrow what education can assess and treat every task as a security problem — chasing detection rather than design (Statement 4)." },
          { label: "focus on process, reasoning and reflection", kind: "interpretive", feedback: "Assessing process fits Statements 4 and 19 — it makes this student's thinking visible — though it takes design effort and clear criteria to stay fair." },
          { label: "mix both, matched to what each module must evidence", kind: "interpretive", feedback: "Often the realistic answer: some outcomes need controlled conditions, others need visible process. Human judgement about what each module must evidence stays central (Statement 12)." },
        ],
      },
      {
        prompt: "Who should set the rules for GenAI use? The institution should:",
        options: [
          { label: "issue one clear university-wide policy", kind: "interpretive", feedback: "Consistency is genuinely valuable — students deserve fairness across modules — but a single rule flattens real disciplinary differences (Statement 18) and can be blunt where nuance is needed." },
          { label: "let each discipline set its own approach", kind: "interpretive", feedback: "Disciplinary autonomy respects Statement 18, but pure localism risks incoherence, inequity between students, and gaps in accountability (Statement 14)." },
          { label: "agree shared principles centrally, interpreted locally", kind: "interpretive", feedback: "This tries to hold both: institutional accountability and ethical leadership (Statements 13, 14) alongside disciplinary plurality (Statement 18). Harder to run, but it refuses a false choice." },
        ],
      },
      {
        prompt: "Faced with GenAI, the university's first investment should go to:",
        options: [
          { label: "detection and enforcement tools", kind: "interpretive", feedback: "Detection spending is reactive and quickly outdated (Statement 4); it rarely improves learning and can erode trust. It may feel urgent, but it builds little." },
          { label: "staff time and development to redesign teaching", kind: "interpretive", feedback: "Investing in staff time matches Statement 5 — courage needs resources — and is what makes thoughtful redesign real rather than rhetorical." },
          { label: "student-facing AI tools and access", kind: "interpretive", feedback: "Access matters for inclusion (Statement 23), and unequal access creates new divides — though tools without redesigned teaching can underdeliver. The order you'd fund these in reveals the priorities." },
        ],
      },
    ],
  },

  constraint: {
    intro: "Constraint is not the enemy of creativity; it is a catalyst. Here is a deliberately constrained challenge.",
    challenge: "Redesign one learning activity so that GenAI contributes meaningfully, but a human judgement stays at its heart.",
    constraints: [
      "It should take a student no more than 20 minutes.",
      "Students may not use GenAI to produce the final answer.",
      "GenAI must contribute something meaningful along the way.",
      "Students must make at least one important judgement themselves.",
    ],
    prompt: "Describe your activity in two sentences.",
  },

  knowledgeCheck: [
    {
      prompt: "A university drafting its ten-year strategy worries it is reacting to each new tool instead of deciding what it wants education to be. Which statement most directly speaks to that dilemma?",
      options: [
        { label: "The horizon is still ours to shape.", kind: "corrective", correct: true, feedback: "Yes — Statement 29 insists the future is shaped by our choices, not dictated by the tools; a direct answer to feeling led by technology." },
        { label: "Privacy is practice.", kind: "interpretive", feedback: "Important, but about everyday data habits, not the strategic question of who shapes the future." },
        { label: "Ease is not the enemy; uncritical learning is.", kind: "interpretive", feedback: "A Theme 2 idea about standards and passivity, not about long-term agency over the future." },
      ],
    },
    {
      prompt: "A course team wants students to weigh the environmental cost of the AI tools they use. Which statement best supports building this in?",
      options: [
        { label: "Sustainability is a learning outcome.", kind: "corrective", correct: true, feedback: "Yes — Statement 24 makes environmental awareness part of the learning, not a footnote to it." },
        { label: "Inclusion is not optional.", kind: "interpretive", feedback: "Vital, but about access and belonging rather than environmental impact." },
        { label: "Constraint is not the enemy of creativity.", kind: "interpretive", feedback: "A creativity idea; not the sustainability point." },
      ],
    },
    {
      prompt: "“We owe students more than caution — we owe them courage.” A colleague reads this as 'anything goes — let students use AI freely.' What is the better reading?",
      options: [
        { label: "Courage means modelling thoughtful, critical experimentation — not removing all limits.", kind: "corrective", correct: true, feedback: "Yes — Statement 21 is about critical courage, not a free-for-all; it pairs boldness with reflection and responsibility." },
        { label: "It means banning nothing, since caution is the problem.", kind: "interpretive", feedback: "That mistakes courage for the absence of judgement — the statement values bold and critical practice together." },
        { label: "It means avoiding GenAI until students are cautious enough.", kind: "interpretive", feedback: "That inverts the statement, which argues against letting caution dominate pedagogy." },
      ],
    },
    {
      prompt: "Which reading best captures “GenAI challenges us to teach why, not just how”?",
      options: [
        { label: "Once students can operate the tools well, the teaching job is essentially done.", kind: "interpretive", feedback: "That's the view the statement pushes against — fluency without purpose is exactly the gap it names." },
        { label: "Students should understand a tool's purpose and limits, including when not to use it.", kind: "corrective", correct: true, feedback: "Yes — Statement 28 joins skill to judgement, and the hardest, most human part is knowing when to hold off." },
        { label: "Teaching 'why' means dropping technical skills entirely.", kind: "interpretive", feedback: "Not quite — it's about joining skill to purpose, not abandoning skill." },
      ],
    },
  ],
};
