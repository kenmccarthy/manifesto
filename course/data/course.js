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
  1: { short: "When explanations and answers arrive on demand, the educator's value moves upstream — helping students decide what deserves attention, what to trust, and what to do with what they find.", interpretation: "Higher education developed in a world where access to authoritative information was comparatively limited. Libraries, lecturers and disciplinary experts played a central role in helping students find and interpret knowledge. Digital technologies had already changed that landscape, but generative AI accelerates the shift: explanations, examples, summaries and drafts can now be produced on demand. The instinct is to ask how we protect the old model — but the more useful question is what teaching is for once information is everywhere. Abundance does not make educators redundant; it moves their value upstream, to helping students decide what deserves attention, what to trust, and what to do with what they find. Scarcity rewarded access. Abundance rewards judgement." },
  2: { short: "When any answer is a prompt away, the skill that matters is framing the question well: precise, curious, and alert to what the first plausible response leaves out.", interpretation: "When any answer is a prompt away, being the person who holds answers matters less than being the person who asks the questions worth answering. Inquiry is not a soft skill here; it is the discipline of framing a problem precisely, noticing what is missing, and pushing past the first plausible response. A good question does work a good answer cannot: it opens a space, sets the terms, and reveals what the asker already understands. Teaching for inquiry means rewarding the quality of a student's questions as much as the correctness of their conclusions — and treating curiosity as something to be practised, not assumed." },
  3: { short: "Fluent output is persuasive, and easily mistaken for truth. Used well, GenAI does not remove the need to think — it raises the price of skipping it.", interpretation: "Generative AI is fluent, and fluency is persuasive. It will produce a confident paragraph on almost anything, including things that are subtly or completely wrong. That fluency is a mirror: it shows how easily any of us mistake coherence for truth, and how much of 'knowing' was really just recognising a familiar shape. Used well, the tool doesn't remove the need to think — it raises the price of skipping it, because errors can now arrive polished, plausible and difficult to spot. The task is not to ban the mirror but to teach students to look into it critically: to verify, to doubt, and to notice when smoothness is standing in for substance." },
  4: { short: "Detection asks whether AI produced the work. Design asks what learning we need to see, and builds tasks around reasoning and process that a generic output cannot supply.", interpretation: "Detection is a defensive posture: it assumes the task is fixed and the job is to catch whoever cheats at it. Detection is inherently reactive, and its reliability remains contested; it also tends to frame students as suspects rather than learners. Design starts from a different question — not 'did AI produce this?' but 'what learning do we actually need to see, and how do we make it visible?' Assessments built around reasoning, iteration, choices and reflection are harder to fake because they ask for something a generic output cannot supply: this student's thinking, in this context. Design won't end every worry, but it changes the game from policing to teaching." },
  5: { short: "Individuals can open the door to new practice, but time, training and recognition build the path that makes it sustainable. Ambition without resource quietly becomes exhaustion.", interpretation: "Enthusiasm is not enough. Educators are regularly asked to reinvent teaching, assessment and support in the cracks of already-full weeks. When change then stalls, the problem can too easily be framed as reluctance rather than lack of capacity. Courage matters: someone has to be willing to try something uncertain. But courage without time, training, recognition and collaborative space quietly becomes exhaustion, and innovation collapses back into rhetoric. This statement puts responsibility where it belongs. If an institution wants bold practice, it has to resource bold practice — protected hours, real development, room to fail and learn. The door of possibility is opened by individuals; the path that makes change sustainable is built, and paid for, by the institution around them." },
  6: { short: "When machines complete tasks faster than we can, completion becomes a weak signal of learning. Curiosity — lingering with a question rather than racing to finish — is harder to automate.", interpretation: "Much of education quietly optimises for completion: finish the task, submit the assignment, move on. When machines can complete faster than any of us, completion becomes a weak signal of learning. Curiosity — the willingness to linger with a question, to follow a tangent, to be unsatisfied by the first answer — is harder to automate and more valuable because of it. This is not an argument against rigour or deadlines; it is a reminder that the point of the work was never the artefact. If students leave able to produce polished outputs but unwilling to wonder, we have optimised for the wrong thing." },
  7: { short: "Critical distance is hard to build through prohibition. Using GenAI — and then reflecting on where it helps and where it misleads — is how students develop the judgement to question it.", interpretation: "Critical distance is difficult to develop through prohibition alone. Direct experience with generative AI can help students see where it assists, where it misleads, and where it quietly encodes assumptions. That experience can then become material for critique rather than simply use. This is uncomfortable, because it means allowing learners to engage with tools we have not fully understood ourselves. But students are likely to encounter these systems beyond university. Giving them structured opportunities to use, question and reflect on them can help build the judgement they will need. Understanding grows through engagement followed by critical reflection." },
  8: { short: "Decisions about GenAI are usually made about students, rarely with them. Genuine collaboration means students can point to something that changed because they were in the room.", interpretation: "Decisions about GenAI in education are usually made about students and rarely with them. Yet students often see the tools, the pressures and the shortcuts more clearly than anyone. Treating them as collaborators — in shaping assessment, policy and classroom norms — is not just fairer; it produces better decisions and deeper learning. Collaboration carries weight: it asks students to take responsibility, argue for their views, and live with trade-offs, rather than simply receiving rules. The risk to watch is tokenism, where 'consultation' leaves everything unchanged. Real collaboration means students can point to something that is different because they were in the room." },
  9: { short: "Inviting students to co-design within structures that will not change is performance, not partnership. Trust is built by letting what they say actually reshape the room.", interpretation: "Statement 8 invites students in as partners; this one names the condition that makes the invitation real. Asking students to co-design within structures that will not actually change is not collaboration but performance — and students see through it quickly. Consultation that never alters a decision teaches cynicism: it signals that their voice is decorative. Genuine partnership requires institutions to hold some things loosely enough to be reshaped, and to show where student input actually moved an outcome. That is uncomfortable, because it means ceding a measure of control. But trust is not built by inviting people into a room whose walls cannot move; it is built by letting what they say change the room." },
  10: { short: "A purely defensive education spends its energy managing tools instead of developing people. The deeper task is human: nurturing the judgement and conscience that decide how any tool gets used.", interpretation: "It is tempting to frame the whole challenge as control: the right policy, the right detector, the right restriction. But the technology keeps moving regardless, and a purely defensive education spends its energy managing tools instead of developing people. The deeper task is human: nurturing empathy, discernment, curiosity and conscience — the capacities that decide how any tool gets used. This reframes the educator's role from gatekeeper to gardener. We are not here to make the machine safe so much as to help the person beside it become someone who can act wisely, with or without it. The horizon of learning remains human development, not technological control." },
  11: { short: "When human and machine contributions blur, honesty about process matters more than an unverifiable claim of working alone. Integrity shifts from purity of product to openness about how work was made.", interpretation: "Academic integrity has often been enforced through detection: identify the copied passage, establish the breach, apply the rule. Generative AI makes that approach increasingly incomplete. When human and machine contributions blur, 'what part of this is original?' can become harder to answer — and may no longer be the most useful question. Transparency reframes integrity around honesty of process rather than purity of product. Someone who can say clearly 'here is what I used, and here is how it shaped the work' is demonstrating something more trustworthy than an unverifiable claim of doing it all alone. This shifts the culture from suspicion to disclosure. It asks institutions to make openness safe — because people only tell the truth about their tools when honesty is not punished as if it were cheating." },
  12: { short: "GenAI can draft feedback and surface patterns, but deciding whether a student has met an outcome is a human responsibility. The risk is drift — a tool meant to inform quietly starts to decide.", interpretation: "Generative AI can surface patterns, draft feedback and suggest options — genuinely useful assistance. But assistance is not assessment. Deciding whether a student has met a learning outcome, weighing evidence, context and fairness: these are acts of professional judgement, accountable to a person. The danger is drift, where a tool meant to inform a decision quietly starts making it, because deferring is easier than deliberating. This statement draws the line: augment the educator's judgement, don't replace it. The measure of good AI use here is not how much it decides, but how much better-informed the human decision becomes." },
  13: { short: "Choosing a system is never only a procurement decision; it encodes values about privacy, equity and labour. Leading ethically means owning those trade-offs rather than letting cost decide by default.", interpretation: "Efficiency is easy to measure and easy to sell, so it tends to win institutional arguments by default. But choosing a system is never only a procurement decision; it encodes values about privacy, equity, labour and sustainability. When a university hands those choices to whatever is cheapest or fastest, it risks allowing vendor priorities to determine institutional values by default. Leading ethically means making the value trade-offs explicit and owning them — sometimes paying more, or moving slower, to protect something that matters. It also makes staff integrity possible: individuals cannot act ethically inside systems chosen with no ethics in view. Institutional choices shape how much room staff and students have to act ethically themselves." },
  14: { short: "The further a technology reaches, the greater the duty to justify it. Yet influence and accountability often drift apart — a system steers thousands of choices while no one clearly answers for it.", interpretation: "The more a technology shapes — more students, more decisions, more consequence — the greater the duty to justify it. Yet influence and accountability often drift apart: a system quietly steers thousands of choices while no clearly named person answers for it. This statement insists the two travel together. If a tool reaches far, its governance, boundaries and rationale should be visible and open to challenge, not buried in a contract. Accountability here is not the same as blame; it is the willingness to explain, to be questioned, and to put things right. Where power is diffuse, someone still has to be answerable — and the bigger the reach, the clearer that answer must be." },
  15: { short: "Automation promises more, faster. But some learning grows in reflection and revision, and part of the educator's job is protecting the slower tempos where thinking actually happens.", interpretation: "Automation promises to do more, faster — and in a pressured system that promise is hard to resist. But learning is not only a throughput problem. Understanding grows in reflection, conversation, revision and the slow turning of an idea; some of it loses something important when speed becomes the overriding goal. This statement is not anti-efficiency; routine drudgery is worth removing. It is a warning against letting speed become the only value, so that everything which resists acceleration — deliberation, difficulty, dialogue — gets quietly squeezed out. Part of the educator's job now is to protect the tempos where thinking actually happens, even when faster is available." },
  16: { short: "AI output can look like a view from nowhere, but every model carries the values, gaps and histories of its data. Reading outputs as claims to be questioned is core critical literacy.", interpretation: "It is tempting to treat AI output as a view from nowhere — objective because it came from a machine. But every model is trained on data that carries values, gaps and histories, and it reflects the cultures and choices of its makers. What looks like neutral fact is a narrative with an author, even when that author is diffuse. Teaching students to see this is core critical literacy: to ask what a dataset includes and omits, whose experience is centred, and what a confident answer might quietly be leaving out. The goal is not cynicism but discernment — reading outputs as claims to be interrogated rather than truths to be received." },
  17: { short: "How you ask shapes what you learn. A prompt frames the problem and encodes assumptions, which makes it worth studying: why this framing, what it presumes, and what a different question would surface.", interpretation: "How you ask shapes what you learn. A prompt is not a neutral request; it frames the problem, encodes assumptions and sets the terms of the answer. That makes prompting a teaching act — and a skill worth teaching. Students who learn only to extract polished outputs may become skilled at obtaining answers without becoming more skilled at framing problems. Prompting becomes educationally interesting when the learner examines why a question was framed in a particular way, what assumptions it contains, and what a different question might reveal. The educational move is to treat the prompt as an object of study: why this framing, what it presumes, what a different question would surface. Good prompting is really good questioning applied to a machine — and questioning has always been at the heart of education." },
  18: { short: "A single institutional rule flattens a landscape that is anything but flat. Responsible use is a disciplinary judgement made in context — coherence should come from shared principles, not identical rules.", interpretation: "A single institutional rule for 'AI use' flattens a landscape that is anything but flat. In computer science, generating and then critiquing code can be the point; in nursing, the same fluency near patient decisions raises safety and accountability stakes; in history, the questions are about sources and interpretation; in music, about authorship and craft. Responsible use is not a universal setting but a disciplinary judgement made in context. This statement argues against one-size-fits-all governance and for plurality: disciplines co-creating their own frameworks with their students and communities. Coherence across an institution is worth having — but it should come from shared principles, not identical rules." },
  19: { short: "Much of what we call writing is thinking made visible. GenAI can draft fluent prose, but the question for educators is which parts of that struggle we still want students to do.", interpretation: "Much of what we call writing is really thinking made visible: choosing, ordering, cutting, discovering what we mean by trying to say it. Generative tools can draft fluent prose, but a fluent draft is not the same as a thought worked through. The risk is that producing text stops requiring thinking at all. The opportunity is different: drafting, interrogating and reshaping AI-assisted text can itself be deep intellectual work — if we design for it. This statement keeps writing central not as a ritual but as cognition. The question for educators is which parts of the struggle we still want students to do, because that struggle is where the thinking lives." },
  20: { short: "The problem is not ease but passivity — accepting a fluent answer without scrutiny. When tools lighten the load, the response is to raise the intellectual ambition, not lower expectations.", interpretation: "It is easy to romanticise difficulty, as if effort were valuable in itself. It isn't — removing pointless friction is good, and offloading routine work can free attention for what matters. The real problem is not ease but passivity: accepting a fluent answer without scrutiny, mistaking a finished artefact for understanding. This statement refuses the false choice between 'make it hard' and 'let it slide'. When tools lighten the load, the response should be to raise the intellectual ambition — more critical thinking, bolder creation, deeper ethical reasoning — not to lower expectations. Assessment should reward the learning we value, not simply the polish of the final product." },
  21: { short: "An education built mainly on warnings can produce caution without capability. Courage here is thoughtful experimentation, modelled openly — including the willingness to try things that might not work.", interpretation: "Fear is a natural first response to a powerful, unpredictable technology, and caution has its place. But an education built mainly on warnings may produce caution without developing capability. Courage here is not recklessness; it is the willingness to experiment thoughtfully, to sit with uncertainty, and to trust learners to act responsibly with the tools of their time. Students learn courage by seeing it modelled — by teachers who try things that might not work and reflect openly when they don't. What we model, they remember. If we meet the future only defensively, we hand students our anxiety; if we meet it with critical courage, we hand them a way to act." },
  22: { short: "Tools redistribute advantage: they change who can do what and whose work is valued. Education can make these effects visible or leave existing advantages and exclusions unexamined.", interpretation: "It is comforting to treat a new technology as a neutral instrument — just a faster way to do what we already did. But tools redistribute advantage: they change who can do what, whose work is valued, and who gets left behind. Generative AI is no exception, carrying economic, political and social consequences into every classroom that adopts it. Education can make these visible or leave them invisible. Leaving these questions unexplored does not make their effects disappear; existing advantages and exclusions can simply remain unexamined. Teaching critically means asking, out loud and with students, who gains and who loses from a given change, and treating that question as part of the subject, not a distraction from it." },
  23: { short: "When a system works better in some languages or for some abilities, it builds inequity into everyday learning. Inclusion is a design stance from the start, not a feature added at the end.", interpretation: "When a system works better in some languages, for some abilities, or within some cultural assumptions, it builds inequity into the everyday experience of learning — often invisibly, for the people least able to object. Inclusion is not a feature to add at the end; it is a design stance from the start, asking who might be excluded by a tool or a task and changing the design to remove avoidable barriers and broaden who can participate. This is demanding, because it means noticing gaps that don't affect us and treating access and belonging as non-negotiable rather than nice-to-have. A future worth building is one that more people can actually enter." },
  24: { short: "The environmental cost of GenAI is real but easy to keep offstage. Treating sustainability as a learning outcome brings that cost into view as part of how students reason about tools.", interpretation: "The environmental cost of generative AI — energy, water, hardware — is real but easy to keep offstage, precisely because it happens far from the screen. Treating sustainability as a learning outcome means bringing that cost into view as part of digital literacy, not a separate module bolted on at the end. It asks students to weigh benefit against impact and to see technological choices as choices with consequences for a shared world. This is not about guilt or refusal; it is about awareness and responsibility becoming ordinary parts of how we reason about tools. What we treat as worth measuring signals what we treat as worth caring about." },
  25: { short: "A blank page with no rules rarely produces the best work. A well-chosen constraint focuses attention and provokes ingenuity, turning 'do anything' into 'do something well, within these limits'.", interpretation: "Unlimited possibility can be paralysing; a blank page with no rules rarely produces the best work. Constraints focus attention — they turn 'do anything' into 'do something well, within these limits' — and generative tools have limits worth working with rather than against. A well-chosen constraint (time, medium, what the AI may and may not do) becomes a canvas: it provokes ingenuity, forces judgement, and often produces more original results than boundless freedom would. For educators, this reframes design: instead of asking how to stop students misusing a tool, ask what constraints would make it a spur to human creativity rather than a substitute for it." },
  26: { short: "Ethics is too often the last slide, ticked once the real decisions are made. Treating it as a foundation means bringing 'should we?' into the design stage, where it can still shape outcomes.", interpretation: "Ethics is too often the last slide, the closing paragraph, the compliance box ticked once the real decisions are made. But by then the decisions are made. Treating ethics as a foundation means bringing it into the design stage — of a policy, a course, a prompt, a dataset — where it can actually shape outcomes rather than merely label them. This is more demanding than compliance, because it asks 'should we?' before 'can we?' and keeps asking as circumstances change. Ethical questions have most influence when they shape decisions from the beginning, rather than being added after the important choices have already been made. Where ethics lives in a process tells you how seriously it is taken." },
  27: { short: "Privacy is not a policy read once; it is enacted in small, repeated choices about what data we hand over. Educators teach it most powerfully by living it — transparently and with care.", interpretation: "Privacy is not a policy you read once; it is a habit enacted in small, repeated choices — what data you hand over for convenience, what you ask a tool to remember, what you quietly collect about students. Understanding those trades is part of digital literacy, and educators teach it most powerfully by living it: using tools transparently, anonymising where they can, questioning what is gathered and why. When privacy is treated as practice rather than paperwork, this can help students notice the privacy choices embedded in everyday digital practice rather than treating consent as an automatic click-through. The everyday example a teacher sets — careful or careless — teaches more about privacy than any single lesson on it ever will." },
  28: { short: "Technical skill without judgement produces people who can operate anything and question nothing. Teaching 'why' pairs capability with purpose — including the hard, human judgement of when not to use a tool.", interpretation: "It has never been easier to become fluent in how a tool works, and never less sufficient. Technical skill without judgement produces people who can operate anything and question nothing. Teaching 'why' means pairing capability with purpose: understanding what a tool is for, what it costs, and — crucially — when not to use it. That last judgement is the hard one, and the most human: knowing that just because a task can be automated does not mean it should be. Meaningful AI literacy joins skill to meaning, so that students leave able not only to use these systems but to decide, wisely, whether they should." },
  29: { short: "Generative AI may change how education operates, but it does not decide what education is for. The future is shaped by the ordinary decisions educators and students make, not fixed by the tools.", interpretation: "Generative AI may change how education operates, but it does not get to decide what education is for. The future classroom is not a contest between minds and machines but a space where human creativity, conscience and care keep growing — if we choose to build it that way. This statement is an antidote to determinism, the belief that technology simply happens to us. It insists on agency: the horizon is not fixed by the tools but shaped by the countless ordinary decisions educators and students make. The legacy will not be the machine we adopted, but the minds we helped form alongside it." },
  30: { short: "Learning has always been dialogue. GenAI adds new voices without needing to dominate them — the classroom is defined not by the tools it contains but by the quality of exchange it makes possible.", interpretation: "Learning has always been dialogue — between teachers and students, ideas and objections, questions and responses — and generative AI adds new voices to that exchange without needing to dominate it. The risk is that the machine talks and we listen; the opportunity is a richer conversation in which technology contributes without speaking for us. An extraordinary classroom is not defined by the tools it contains but by the quality of the exchange it makes possible: the curiosity it provokes, the disagreement it can hold, the trust that lets people think out loud. The future is not something to be delivered to students. It is something to be talked into being, together." },
};

/* Theme 1 activity content (DRAFT). */
export const THEME1 = {
  openingHeading: "The abundance problem",
  openingBody:
    "For generations, much of education was organised around access to scarce information. But what happens when explanation, examples, summaries, drafts and answers become almost instantly available? The challenge changes. Finding an answer may matter less. Knowing what to ask, what to trust, what to challenge, and what to do with the answer may matter more.",

  spotlights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],

  sort: {
    heading: "Scarcity, abundance, or both?",
    intro:
      "Some things mattered most when information was scarce. Others matter more now that it is abundant. And some matter in either world. Place each one — there is often a case for “both”.",
    buckets: [
      { id: "scarcity", label: "More strongly associated with scarcity" },
      { id: "abundance", label: "More important in abundance" },
      { id: "both", label: "Essential in both" },
    ],
    items: [
      { label: "Reproducing what experts knew", answer: "scarcity", feedback: "Reproduction once served as a stronger proxy for learning when authoritative information was harder to access. It may still matter, but it tells us less on its own in an environment of abundant generated content." },
      { label: "Instructor as primary source of information", answer: "scarcity", feedback: "Lecturers remain sources of expertise, but they are no longer the only or necessarily the fastest route to information." },
      { label: "Verifying generated outputs", answer: "abundance", feedback: "Generated content can be immediate and persuasive. Verification becomes increasingly visible as a learning practice." },
      { label: "Judging whether an answer is trustworthy", answer: "abundance", feedback: "Abundance shifts attention from simply obtaining information towards judging provenance, quality and reliability." },
      { label: "Framing good questions", answer: "both", feedback: "Good questions were never unimportant. GenAI makes their value more visible because the framing of the question strongly shapes the response." },
      { label: "Locating trustworthy sources", answer: "both", feedback: "Access has changed, but provenance has not stopped mattering. In an environment containing synthetic and generated information, source judgement may matter more than ever." },
      { label: "Connecting ideas", answer: "both", feedback: "Synthesis has always been central to higher learning. Abundance changes the volume of available material, not the need to make meaningful connections." },
      { label: "Foundational disciplinary knowledge", answer: "both", feedback: "Judgement requires something against which to judge. External tools do not remove the need for disciplinary understanding." },
      { label: "Instructor as designer, challenger and guide", answer: "both", feedback: "These roles are not new, but they become more visible when information delivery is no longer the educator's primary source of value." },
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
      prompt: "A lecturer has redesigned an assignment so students submit an AI-assisted draft, annotate where they accepted or rejected suggestions, and explain three important decisions they made. Which Manifesto idea is most clearly being put into practice?",
      options: [
        { label: "Detection chases the past; thoughtful design shapes the future.", kind: "corrective", correct: true, feedback: "The assessment is no longer trying primarily to determine whether AI was used. It is redesigning the task so that student reasoning and judgement become visible (Statement 4)." },
        { label: "Curiosity surpasses completion.", kind: "interpretive", feedback: "Curiosity is in the room, but the sharper move here is the redesign itself: the task now surfaces the student's reasoning rather than trying to detect a tool (Statement 4)." },
        { label: "Students are collaborators, not spectators.", kind: "interpretive", feedback: "There is a collaborative flavour, but what is most clearly modelled is assessment designed to make the student's thinking visible — Statement 4." },
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
      "A university introduces an AI-powered system that gives students personalised academic advice. If that advice causes harm or leads a student badly astray, where should responsibility sit? Distribute 100% across those involved — to give more to one, take it from another.",
    items: [
      { id: "student", label: "Student" },
      { id: "lecturer", label: "Lecturer" },
      { id: "programme", label: "Programme team" },
      { id: "university", label: "University" },
      { id: "provider", label: "Technology provider" },
    ],
    highestLabel: "You placed the greatest responsibility with the {x}.",
    highestTie: "You spread responsibility fairly evenly, without a single clear holder.",
    followPrompt:
      "Does the organisation or person with the greatest responsibility also hold the greatest influence over the system?",
    followOptions: [
      { label: "Yes", kind: "reflective", feedback: "Often they do — the body that selects and deploys the system usually holds real influence over it. Statement 14 asks us to keep testing whether that alignment actually holds." },
      { label: "No", kind: "reflective", feedback: "That gap is exactly what Statement 14 is concerned with: the people answering for a system are not always the ones shaping it." },
      { label: "Not necessarily", kind: "reflective", feedback: "A careful reading. Influence and accountability often travel together, but not always — and where they diverge, responsibility can fall through the gaps." },
    ],
    reveal:
      "There may be no perfect distribution. The harder question is what happens when influence and accountability come apart — when the system shaping the advice sits far from whoever has to answer for it.",
    statement: 14,
    reflection:
      "What happens when the people carrying the consequences have less influence than the people designing or selecting the system?",
  },

  spotlights: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],

  automate: {
    intro:
      "For each task, choose how much you would hand to a machine. Several responses may be defensible depending on context — the point is to notice where human judgement still needs to sit, and why.",
    buckets: [
      { id: "automate", label: "Automate" },
      { id: "augment", label: "Augment" },
      { id: "human", label: "Keep human" },
    ],
    items: [
      {
        label: "Generating formative quiz questions",
        feedbackByBucket: {
          automate: "Low-stakes and repetitive, so a reasonable candidate for automation — provided you review the questions for accuracy and alignment before students see them. What would you check before trusting a generated set?",
          augment: "Drafting questions you then curate can save time while keeping quality in your hands. Which questions would you still want to write yourself, and why?",
          human: "Writing every question yourself guarantees fit, but at a real cost in time. Is there a subset here you'd be comfortable letting a tool draft for you to check?",
        },
      },
      {
        label: "Giving initial feedback on grammar",
        feedbackByBucket: {
          automate: "Grammar is among the more automatable feedback, but tone and dialect vary, and a tool can 'correct' voice as well as error. Who checks that the feedback respects how the student writes?",
          augment: "A tool can flag surface issues so your attention goes to argument and ideas. What would you want the student to learn from a correction, rather than simply receive?",
          human: "Keeping this human is thorough but time-consuming for something a tool handles reasonably well. Would automating the surface layer free you for the feedback that matters more?",
        },
      },
      {
        label: "Deciding whether a student has met a learning outcome",
        feedbackByBucket: {
          automate: "This is a judgement with consequences for the student, and a tool cannot hold the context or fairness it needs (Statement 12). What would have to be true before you'd trust a machine with a verdict like this?",
          augment: "AI might surface evidence or patterns, but the determination stays yours. What would you refuse to let the tool decide, even as it informs you?",
          human: "Keeping this human protects professional judgement and accountability. Is there a supporting role a tool could play without touching the decision itself?",
        },
      },
      {
        label: "Identifying students considered ‘at risk’",
        feedbackByBucket: {
          automate: "Automated flags can reach students earlier, but the data carries histories and gaps, and errors fall unevenly across groups (Statements 16, 23). Who notices when the system is wrong, and about whom?",
          augment: "As a prompt for a human to look closer, a flag can help — as long as staff question it rather than defer to it. What stops a flag from quietly becoming a decision?",
          human: "Relying on human judgement avoids automated bias, but may miss students a wider net would catch. What safeguards would let you trust a tool to help here?",
        },
      },
      {
        label: "Summarising meeting notes",
        feedbackByBucket: {
          automate: "A good candidate for automation where the stakes are relatively low, provided someone checks what has been omitted or misrepresented. Who remains responsible for the official record?",
          augment: "Letting a tool draft the summary for you to correct is often the pragmatic middle — quick, but with a human owning the final version. Which errors would you specifically watch for?",
          human: "Keeping this entirely human preserves contextual judgement, but it also consumes time that a tool may genuinely save. Is this a place where retaining full human effort adds enough value to justify the cost?",
        },
      },
      {
        label: "Suggesting alternative explanations",
        feedbackByBucket: {
          automate: "Generating alternatives is a genuine strength of these tools, though not every explanation will be accurate or pitched right for your students. How would you check one before passing it on?",
          augment: "Used as a source of options you then select and adapt, this can enrich your teaching. Which explanation fits this cohort — and who is best placed to judge that?",
          human: "Your own explanations carry your knowledge of the students, but a tool can widen the range you consider. Would seeing alternatives sharpen your own, even if you don't use them?",
        },
      },
      {
        label: "Determining a final grade",
        feedbackByBucket: {
          automate: "A final grade is high-stakes, accountable and often contested — automating it hands a consequential judgement to a system that cannot answer for it (Statements 12, 14). What would ever make this defensible?",
          augment: "A tool might assemble marks or flag inconsistencies, but the grade remains a human decision. Where exactly would you draw the line between assistance and the decision itself?",
          human: "Keeping the grade human protects fairness and accountability. Could a tool still reduce the administrative load around grading without shaping the grade?",
        },
      },
      {
        label: "Responding to a distressed student",
        feedbackByBucket: {
          automate: "Speed and availability may help, but distress can involve ambiguity, vulnerability and risk that a system may not recognise. What must trigger immediate human involvement?",
          augment: "AI might help surface resources or draft an initial response, but the relationship and responsibility remain human. Which parts of this interaction would you refuse to delegate?",
          human: "This protects relationship and professional judgement. Could automation still support something around the interaction without replacing the interaction itself?",
        },
      },
    ],
  },

  transparency: {
    prompt:
      "Four students describe how they used GenAI on the same assignment. Which disclosure gives you enough to understand how AI actually contributed?",
    options: [
      { label: "“I used ChatGPT.”", kind: "interpretive", feedback: "Honest, but almost uninformative. It names a tool without saying what it did — for which parts, to what extent, or how the student checked it. Transparency is about understanding the contribution, not just admitting one." },
      { label: "“I used AI to help with my essay.”", kind: "interpretive", feedback: "Slightly fuller, but still vague. 'Help with' could mean anything from brainstorming to writing the whole thing. It doesn't let a reader judge what the student actually did." },
      { label: "“I used ChatGPT for grammar and to fix my references.”", kind: "interpretive", feedback: "More specific and genuinely useful — you now know roughly where it was used. But it is silent on the thinking: were ideas, structure or arguments AI-shaped, and did the student verify the output?" },
      { label: "“I used ChatGPT to suggest three possible structures for my introduction. I compared them, chose elements from one approach, developed the final structure myself, and checked every factual claim against the sources cited.”", kind: "corrective", correct: true, feedback: "This makes the process legible: what the tool contributed, what the student decided, and how accuracy was checked. Transparency is not about proving that a machine was absent. It is about making the contribution and the human judgement visible." },
    ],
    conclusion:
      "Notice we never asked whether using AI was allowed. Transparency is about making the process legible, so trust can rest on what actually happened.",
  },

  discipline: {
    intro: "Would responsible GenAI use look identical in all four? Open each to compare.",
    items: [
      { title: "Computer Science", body: "Generating code and then reading, testing and critiquing it can be central to the learning — the AI output is raw material for judgement, not the finished answer." },
      { title: "Nursing", body: "When GenAI sits near clinical reasoning or patient-facing decisions, inaccuracies can carry consequences beyond the assignment. Human oversight, professional accountability and patient safety therefore become particularly important." },
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
    line: "Agreement changes little on its own. What matters is what you choose to do next.",
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
    reveal: "This is the statement you chose to return to when the choices get difficult.",
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

/* "Manifesto in Action" content.
   Branching, multi-stage scenarios. Each scenario is a small decision tree:
   Situation -> Decision 1 -> Consequence -> Decision 2 -> Consequence ->
   Decision 3 -> Outcome / unresolved tension -> Reflection. Earlier choices
   change what comes next; paths may converge. No route is a clean "win" —
   every terminal option names what it protected and what it put at risk. */
export const ACTION = {
  opening: {
    line: "A principle you never have to act on costs you nothing.",
    body: "The Manifesto is easy to admire in the abstract. It earns its keep when a decision is genuinely hard — when every option has a cost and the clock is running. Below are four scenarios drawn from real institutional life. None has a perfect answer. Every choice protects something and puts something else at risk.",
  },

  intro:
    "Choose at least two scenarios to work through. Each unfolds over several decisions, and your earlier choices shape what you meet next. Notice which statements keep surfacing — and what each route quietly trades away.",

  chooseNote: (n) =>
    n === 0
      ? "Complete at least two scenarios. You can do all four if you wish."
      : n === 1
        ? "One scenario completed. Complete at least one more."
        : "You've completed " + n + " scenarios — enough to move on, though the others are here if you want them.",

  statementsLabel: "Statements in play",
  beginLabel: "Begin this scenario",
  restartLabel: "Start this scenario again",
  completedBadge: "Completed",
  summaryTitle: "Where your choices led",
  summaryLabels: {
    emphasised: "Your decisions emphasised",
    surfaced: "Statements that surfaced",
    protected: "What your choices protected",
    atRisk: "What they put at risk",
  },

  scenarios: [
    /* ---- 1. Assessment ---- */
    {
      id: "assessment",
      title: "Assessment",
      interest: "assessment",
      interestNote: "Earlier, you identified assessment as something occupying your thinking. This scenario brings that concern into focus.",
      situation: "A final-year module's major essay can now be produced competently using widely available GenAI. The exam board meets in three weeks, too soon for a complete redesign.",
      start: "d1",
      reflection: "Three weeks was never enough to solve this well. Which of the things you protected would you be least willing to give up — and how would you defend that to a colleague who chose differently?",
      nodes: {
        d1: {
          decision: "What do you advance as the immediate response?",
          options: [
            { label: "Move temporarily to an invigilated exam", consequence: "It creates a more controlled assessment environment quickly and may strengthen confidence about authorship. The cost is that the assessment may now measure a narrower range of learning.", statements: [4], principles: ["Control over authorship"], next: "exam" },
            { label: "Keep the essay and add a short oral defence", consequence: "Staff support the idea, but estimate that short vivas will require an additional 35 staff hours.", statements: [4, 19], principles: ["Making reasoning visible"], next: "viva" },
            { label: "Allow GenAI and require a process account", consequence: "Students can use the tools openly, but early submissions show that a 'process account' can be padded with detail that still doesn't evidence understanding.", statements: [11, 12], principles: ["Transparency of process"], next: "process" },
          ],
        },
        exam: {
          decision: "With an exam hall booked, how do you handle what the exam can't capture?",
          options: [
            { label: "Accept the narrower assessment for one cycle and flag it for redesign", consequence: "A defensible stopgap — but a year's cohort is assessed on less than the module intends, and the redesign question is postponed rather than answered.", statements: [4], principles: ["Buying time"], next: "d3" },
            { label: "Add a small reflective component alongside the exam", consequence: "This widens what you can see a little, but bolting reflection onto an exam under time pressure risks a token task neither you nor students take seriously.", statements: [19], principles: ["Partial visibility of thinking"], next: "d3" },
          ],
        },
        viva: {
          decision: "Short vivas would need about 35 extra staff hours. How do you proceed?",
          options: [
            { label: "Proceed anyway", consequence: "You protect the fullest picture of each student's understanding, but the hours come from somewhere — marking, feedback or staff wellbeing. Courage opened the door; without resource, the path is hard to walk (Statement 5).", statements: [5, 12], principles: ["Depth over cost"], next: "d3" },
            { label: "Reduce the viva to a random sample", consequence: "Feasible on the hours available, but students face different assessment experiences depending on whether they are sampled — a fairness question of its own.", statements: [12], principles: ["Feasibility over consistency"], next: "d3" },
            { label: "Use a five-minute structured conversation with every student", consequence: "A pragmatic compromise: every student is seen, briefly. It may not probe deeply, but it keeps a human judgement in the loop for everyone (Statement 12).", statements: [12], principles: ["Human judgement for all"], next: "d3" },
            { label: "Abandon the viva", consequence: "Understandable given the workload, but you are back where you started — an essay the tools can produce, and no new evidence of the student's thinking.", statements: [4], principles: ["Retreat under pressure"], next: "d3" },
          ],
        },
        process: {
          decision: "The process accounts vary wildly in quality. How do you make them evidence learning?",
          options: [
            { label: "Specify exactly what the account must show, and who judges it", consequence: "Precision helps — an account that must name decisions, rejections and checks is harder to fake. But it adds marking load and a new skill students must be taught (Statements 11, 12).", statements: [11, 12], principles: ["Rigour of disclosure"], next: "d3" },
            { label: "Pair the account with a short conversation about it", consequence: "Talking it through surfaces whether the thinking is real, at the cost of staff time — you have partly reinvented the viva (Statement 12).", statements: [12], principles: ["Human judgement for all"], next: "d3" },
          ],
        },
        d3: {
          decision: "A second problem now surfaces: some students report high anxiety about being assessed 'live', and disability services flag that timed oral or exam formats disadvantage particular students. How do you respond?",
          options: [
            { label: "Offer adjustments and alternative formats for those who need them", outcome: "You protect inclusion, but multiple formats make consistency across the cohort harder to guarantee — and 'the same standard, assessed differently' is a genuinely hard line to hold.", statements: [23], principles: ["Inclusion by design"], protected: "Access and belonging for students disadvantaged by a single rigid format.", atRisk: "Consistency across the cohort, and the extra work of keeping standards comparable across formats." },
            { label: "Keep one format for fairness and support students to prepare", outcome: "You protect a consistent standard, but 'the same for everyone' can still land unequally on the students the format disadvantages. Fairness of process and fairness of outcome are not the same thing.", statements: [23], principles: ["Consistency of standard"], protected: "A single, comparable standard applied to every student.", atRisk: "Students for whom the chosen format is a barrier rather than a neutral test of learning." },
          ],
        },
      },
    },

    /* ---- 2. Institutional AI Policy ---- */
    {
      id: "policy",
      title: "Institutional AI Policy",
      interest: "policy",
      interestNote: "You named institutional policy as something on your mind. Here it is, with the trade-offs made explicit.",
      situation: "The institution wants one identical rule for GenAI use across every programme, in the name of consistency and fairness to students.",
      start: "d1",
      reflection: "A policy is never finished. What would tell you, a year from now, that this one was working — for staff, for students, and across different disciplines?",
      nodes: {
        d1: {
          decision: "You are in the room where this is decided. What do you argue for?",
          options: [
            { label: "Accept one institutional rule", consequence: "Consistency is real, and students deserve not to meet a different regime in every module. But one rule flattens genuine disciplinary difference — GenAI sits differently in nursing, history and computer science (Statement 18).", statements: [18], principles: ["Uniformity"], next: "single" },
            { label: "Reject central rules", consequence: "This protects disciplinary judgement, but pure localism has costs: students meet incoherence between modules, and when no one owns the overall approach, accountability falls through the gaps (Statements 14, 18).", statements: [14, 18], principles: ["Local autonomy"], next: "local" },
            { label: "Adopt shared institutional principles interpreted locally", consequence: "You refuse the false choice — but six months on, students report that they still experience confusing differences between modules.", statements: [13, 18], principles: ["Principled pluralism"], next: "principles" },
          ],
        },
        single: {
          decision: "The single rule is in force, but staff in several disciplines say it doesn't fit their teaching and quietly work around it. What now?",
          options: [
            { label: "Hold the line and enforce the rule", consequence: "Enforced uniformity looks coherent on paper, but a rule widely worked around erodes trust and still doesn't fit the disciplines it governs (Statement 18).", statements: [18], principles: ["Enforcement"], next: "d3" },
            { label: "Allow documented exceptions by discipline", consequence: "You have reinvented local interpretation under another name — pragmatic, but now you need a way to keep the exceptions coherent (Statement 14).", statements: [14, 18], principles: ["Principled pluralism"], next: "d3" },
          ],
        },
        local: {
          decision: "With no central rule, coherence is the problem. How will the institution improve it?",
          options: [
            { label: "Create a shared disclosure vocabulary", consequence: "A common language for 'how I used AI' helps students move between modules without decoding a new system each time (Statement 11).", statements: [11], principles: ["Shared transparency"], next: "d3" },
            { label: "Require every assessment to publish its local GenAI position", consequence: "Transparency about each module's stance reduces confusion and makes someone accountable for it (Statements 11, 14) — though it only works if the positions are actually read.", statements: [11, 14], principles: ["Published accountability"], next: "d3" },
            { label: "Return to one universal rule", consequence: "This buys coherence at the price of the disciplinary difference you rejected central rules to protect (Statement 18). The pendulum has swung back.", statements: [18], principles: ["Uniformity"], next: "d3" },
          ],
        },
        principles: {
          decision: "Shared principles exist, but students still feel the differences. How do you improve coherence?",
          options: [
            { label: "Create a shared disclosure vocabulary", consequence: "A common language for disclosure lets students carry one habit across very different modules (Statement 11).", statements: [11], principles: ["Shared transparency"], next: "d3" },
            { label: "Require every assessment to publish its local GenAI position", consequence: "Publishing each module's position makes the differences legible and accountable rather than confusing (Statements 11, 14).", statements: [11, 14], principles: ["Published accountability"], next: "d3" },
            { label: "Return to one universal rule", consequence: "Coherence returns, but so does the flattening of disciplinary difference the principles were meant to honour (Statement 18).", statements: [18], principles: ["Uniformity"], next: "d3" },
          ],
        },
        d3: {
          decision: "Whatever mechanism you chose, one voice has been absent: students. Who should shape the next version of the policy?",
          options: [
            { label: "Staff and leadership finalise it, then inform students", outcome: "Efficient, but a policy about students' learning, written without them, tends to be obeyed rather than owned — and misses what students often see most clearly.", statements: [8], principles: ["Policy done to students"], protected: "Speed and a clear line of institutional authority.", atRisk: "Legitimacy and insight — the people who live with the tools daily had no hand in the rules." },
            { label: "Include students as partners in drafting the next version", outcome: "Slower and messier, and it means holding some decisions open enough to be reshaped. But students often see the pressures and workarounds staff miss, and a policy they helped write is one they are more likely to respect (Statement 8).", statements: [8, 9], principles: ["Students as collaborators"], protected: "Legitimacy, and decisions informed by the people closest to the tools.", atRisk: "Time, and institutional comfort — genuine partnership means ceding some control (Statement 9)." },
          ],
        },
      },
    },

    /* ---- 3. At-Risk Student System ---- */
    {
      id: "atrisk",
      title: "Predictive / At-Risk Student System",
      interest: "equity",
      interestNote: "You identified equity and inclusion as a concern at the beginning. Notice what becomes visible when the system performs differently for different groups.",
      situation: "A vendor offers a system that identifies students considered at risk of failing. It performs well overall but is less accurate for some groups, and the vendor provides limited explanation of its scoring. Budget is tight and the need is real.",
      start: "d1",
      reflection: "Has the problem become primarily technical, educational, ethical, or all three? Name where the real decision now sits — and who should be in the room to make it.",
      nodes: {
        d1: {
          decision: "What do you decide?",
          options: [
            { label: "Adopt", consequence: "Some students could receive useful support earlier. But uneven accuracy builds inequity into everyday practice for the students least able to object (Statements 16, 23), and you cannot answer for logic you are not allowed to see (Statement 14).", statements: [14, 16, 23], principles: ["Support at the cost of scrutiny"], next: "adopt" },
            { label: "Decline", consequence: "You refuse to normalise a black box (Statements 14, 23). The honest cost: support that could have reached struggling students earlier is delayed. Caution has a price too.", statements: [14, 23], principles: ["Scrutiny over speed"], next: "decline" },
            { label: "Pilot as decision support", consequence: "Six weeks into the pilot, staff report that they rarely challenge the system's flags because workloads are high.", statements: [12], principles: ["Cautious trial"], next: "pilot" },
          ],
        },
        pilot: {
          decision: "Staff are deferring to the flags under workload pressure. What do you change?",
          options: [
            { label: "Pause the pilot", consequence: "You stop a system being trusted without scrutiny — but also stop the support it was providing while you regroup.", statements: [12], principles: ["Scrutiny over speed"], next: "d3" },
            { label: "Provide additional training", consequence: "Training may help staff read flags critically, though training alone rarely survives a heavy workload — the pressure to defer remains (Statement 12).", statements: [12], principles: ["Capacity building"], next: "d3" },
            { label: "Reduce the number of flags and require documented human review", consequence: "Fewer, higher-confidence flags with mandatory human sign-off keeps judgement in the loop (Statements 12, 14), at the cost of catching fewer cases.", statements: [12, 14], principles: ["Judgement in the loop"], next: "d3" },
            { label: "Continue while collecting more evidence", consequence: "You keep the benefits flowing, but 'more evidence' can become a way of postponing the hard decision while deferral becomes the norm.", statements: [12], principles: ["Deferring the decision"], next: "d3" },
          ],
        },
        adopt: {
          decision: "The system is live. How do you handle the groups it serves less accurately?",
          options: [
            { label: "Monitor outcomes by group and correct course if harm appears", consequence: "Watching for uneven impact is the minimum responsible step (Statements 16, 23) — but 'we'll fix it if it shows' still exposes those students in the meantime.", statements: [16, 23], principles: ["Monitoring for harm"], next: "d3" },
            { label: "Rely on the vendor's overall accuracy figures", consequence: "Aggregate accuracy hides exactly the group differences that matter here, and you still can't see how the score is produced (Statements 14, 16).", statements: [14, 16], principles: ["Trust in aggregates"], next: "d3" },
          ],
        },
        decline: {
          decision: "You've declined the tool, but the underlying need — spotting struggling students earlier — hasn't gone away. What now?",
          options: [
            { label: "Invest in staff capacity to notice and respond instead", consequence: "This puts human judgement first (Statement 12), but staff time is the scarce resource the tool was meant to save — the need may outrun what people can do.", statements: [12], principles: ["Human judgement first"], next: "d3" },
            { label: "Ask the vendor for explainability and bias evidence as a condition of return", consequence: "Making transparency a precondition is principled (Statement 14); whether it has teeth depends on whether you can really walk away.", statements: [14], principles: ["Transparency as precondition"], next: "d3" },
          ],
        },
        d3: {
          decision: "Students discover the system exists and ask whether they can see their own risk scores. How transparent should the institution be?",
          options: [
            { label: "Show students their scores and explain how they are produced", outcome: "Openness respects students as agents (Statements 11, 27) — but a risk score can become a label that shapes how a student sees themselves, and 'explaining' a model you don't fully understand is hard.", statements: [11, 27], principles: ["Transparency with students"], protected: "Students' right to know what is held and decided about them.", atRisk: "A score hardening into a self-fulfilling label, and the limits of explaining an opaque model." },
            { label: "Keep scores internal but tell students the system exists and why", outcome: "A middle path: students know the practice exists without being handed a number that might mislabel them. But 'trust us with the score' sits awkwardly beside a system even staff can't fully explain (Statement 14).", statements: [14, 27], principles: ["Partial disclosure"], protected: "Students from a potentially misleading label, while acknowledging the system openly.", atRisk: "Full accountability — asking students to trust a score they cannot see or contest." },
          ],
        },
      },
    },

    /* ---- 4. Student Transparency and Learning ---- */
    {
      id: "transparency",
      title: "Student Transparency and Learning",
      interest: "integrity",
      interestNote: "You flagged academic integrity as something on your mind. This scenario tests it against a student who chose to be honest.",
      situation: "A student tells you, without being asked, that they used GenAI to write much of an assignment and now realise they do not understand the topic. The module's own instructions did not explicitly prohibit this use.",
      start: "d1",
      reflection: "What response would make future honesty more likely without lowering academic expectations? Notice that both instincts — protect honesty, protect the standard — are right, and still pull against each other.",
      nodes: {
        d1: {
          decision: "How do you respond?",
          options: [
            { label: "Move on because the module rule was unclear", consequence: "It avoids punishing honesty, but it steps past the real issue — the learning that didn't happen (Statements 3, 19) — and wastes a rare thing: a student telling you the truth about their process (Statement 11).", statements: [3, 11, 19], principles: ["Letting it pass"], next: "d2" },
            { label: "Use the disclosure as an opportunity for additional learning", consequence: "You treat the honesty as an opening rather than an offence (Statements 3, 11). It asks a little more of you now, but it is the response most likely to leave the student understanding the topic — and to keep the next student honest (Statement 28).", statements: [3, 11, 28], principles: ["Disclosure as learning"], next: "d2" },
            { label: "Check whether wider institutional regulations apply", consequence: "Referral may be appropriate if wider institutional regulations have been breached, but the scenario tells us the module itself set no restriction. Before escalating, clarify what rule actually applies and what educational response is still needed.", statements: [11], principles: ["Clarifying the rule"], next: "d2" },
          ],
        },
        d2: {
          decision: "The student asks whether they may use AI again while rebuilding their understanding. What do you allow?",
          options: [
            { label: "No AI this time", consequence: "Working unaided may rebuild the foundations the tool skipped over — though for some students a total ban simply recreates the struggle that sent them to the tool in the first place (Statement 7).", statements: [7, 19], principles: ["Unaided practice"], next: "d3" },
            { label: "AI allowed, but every use must be explained", consequence: "This keeps the tool available while making the thinking visible (Statements 11, 19) — using disclosure as a learning device rather than a confession.", statements: [11, 19], principles: ["Disclosure as learning"], next: "d3" },
            { label: "Let the student decide", consequence: "Trusting the student's judgement can build the very self-awareness that was missing (Statements 7, 28) — but a student who just told you they don't understand may not yet be well placed to choose.", statements: [7, 28], principles: ["Student agency"], next: "d3" },
          ],
        },
        d3: {
          decision: "The student asks directly: “Will being honest about this affect my grade?” What do you tell them?",
          options: [
            { label: "Honesty won't be penalised; the work will be assessed on what you now demonstrate", outcome: "This makes future honesty safer (Statement 11) and keeps the standard intact — the grade tracks demonstrated learning, not the confession. The tension: you must still hold the line on what counts as meeting the outcome (Statement 20).", statements: [11, 20], principles: ["Rewarding disclosure"], protected: "A culture where students can be honest about their process without fearing punishment.", atRisk: "Vigilance that 'honesty protected' never quietly becomes 'lower expectations tolerated'." },
            { label: "Honesty is expected, and the original attempt can't simply be set aside", outcome: "Holding a firm line signals that disclosure is not a reset button — but if honesty feels costly, the next student may simply stay quiet (Statement 11). Fairness to others and encouragement of honesty pull against each other here.", statements: [11, 20], principles: ["Holding the standard"], protected: "Consistency and fairness to students who did the work unaided.", atRisk: "The incentive to be honest — if candour carries a penalty, transparency goes underground." },
          ],
        },
      },
    },
  ],

  closing:
    "Notice what never happened: no choice removed every tension. The Manifesto does not remove hard choices. It gives you sharper questions and makes the values inside those choices more visible.",
};

/* "Connecting the Manifesto" content (DRAFT).
   The themes are deliberately intertwined. These activities make the seams
   visible: one situation pulling in statements from all three themes, and
   knowledge checks that ask which statements deepen or complete one another. */
export const CONNECTING = {
  opening: {
    line: "No statement stands alone.",
    body: "The three themes are a convenience, not a wall. A question that begins as 'how should I assess this?' (Theme 1) becomes 'who is accountable, and whose values decide?' (Theme 2), and then 'what future are we building?' (Theme 3). Real decisions rarely sit inside one theme. This section makes the connections visible.",
  },

  threads: {
    title: "One situation, three themes",
    intro:
      "Open each situation to see how a single, ordinary decision pulls in statements from all three themes at once. The seams are where the real thinking happens.",
    items: [
      {
        situation: "A programme decides to let students use GenAI on a major essay — and wants to do it well.",
        links: [
          { n: 4, note: "Rather than police the tool, redesign the task so the reasoning and process are what's assessed." },
          { n: 11, note: "Ask students to disclose how they used it — trust rests on a legible process, not a ban." },
          { n: 21, note: "Choosing to allow it thoughtfully, rather than forbidding it out of fear, is itself an act of critical courage." },
        ],
      },
      {
        situation: "A university is choosing an AI tutoring system that will reach thousands of students.",
        links: [
          { n: 8, note: "The students who'll use it are partners in the decision, not just its subjects." },
          { n: 13, note: "Don't let 'cheapest and fastest' quietly decide — the choice encodes values about equity and quality." },
          { n: 23, note: "Ask who the system works less well for; inclusion is a design stance, not an afterthought." },
        ],
      },
      {
        situation: "A student submits fluent, AI-assisted work — and isn't sure they actually understand it.",
        links: [
          { n: 3, note: "The fluency is a mirror: it reveals how easily coherence gets mistaken for understanding." },
          { n: 19, note: "Writing was where the thinking happened; if the tool did the writing, what did the student think?" },
          { n: 28, note: "The gap here is 'why', not 'how' — capability without judgement or purpose." },
        ],
      },
    ],
  },

  connect: {
    title: "Trace the connection",
    intro:
      "Each question links statements across themes. There's usually a strongest pairing, but the near-misses are worth weighing too — feedback on every answer.",
    questions: [
      {
        prompt: "“Let students use AI — but ask them to show how they did.” Which two statements, from different themes, does this combine?",
        options: [
          { label: "Detection chases the past; design shapes the future (T1) + Transparency is the new integrity (T2).", kind: "corrective", correct: true, feedback: "Yes. Redesigning the task instead of policing it (4) pairs naturally with asking for honest disclosure of process (11). Together they replace suspicion with design and openness." },
          { label: "Sustainability is a learning outcome (T3) + Inclusion is not optional (T3).", kind: "interpretive", feedback: "Both are important Theme 3 commitments, but they're within one theme and neither is about disclosure of AI use." },
          { label: "Prompting is pedagogy (T2) + Constraint catalyses creativity (T3).", kind: "interpretive", feedback: "A defensible pairing about how students use the tool, but it doesn't capture the disclosure move — 'show me how' is a transparency idea (11)." },
        ],
      },
      {
        prompt: "A university argues that an AI tutor should be adopted because it will reduce costs and provide 24-hour access. Which pair of statements best exposes the tension?",
        options: [
          { label: "Institutions must lead ethically, not just efficiently (T2) + Inclusion is not optional (T3).", kind: "corrective", correct: true, feedback: "Cost and access both matter. Statement 13 asks whether efficiency is driving the decision; Statement 23 complicates the picture by reminding us that access itself may be an inclusion benefit. The question becomes not simply “cheap or ethical?” but “who gains access, who may be excluded, and what trade-offs are we willing to make?”" },
          { label: "Efficiency is seductive; wisdom lingers (T2) + Curiosity surpasses completion (T1).", kind: "interpretive", feedback: "Both caution against rushing, but neither directly weighs cost and round-the-clock access against who gains and who might be excluded — the tension the argument actually raises." },
          { label: "Prompting is pedagogy (T2) + Constraint catalyses creativity (T3).", kind: "interpretive", feedback: "These are about how a tool is used in learning, not about whether cost and access should drive the decision to adopt it in the first place." },
        ],
      },
      {
        prompt: "The Manifesto asks to be read as a whole. Which statement about the themes is a misreading?",
        options: [
          { label: "A question about assessment design often turns into a question about accountability and power.", kind: "interpretive", feedback: "That's a faithful reading — exactly the kind of seam this section is about." },
          { label: "Because the themes are connected, engaging seriously with one lets you skip the others.", kind: "corrective", correct: true, feedback: "Yes — that's the misreading. Interconnection means the themes pull on each other; it's a reason to hold all three, not a shortcut to ignore two." },
          { label: "What we decide must remain human shapes how we redesign teaching and assessment.", kind: "interpretive", feedback: "That's a faithful reading — Theme 3 commitments feed straight back into Theme 1 practice." },
        ],
      },
    ],
  },

  tension: {
    title: "Where statements pull apart",
    intro:
      "Connection isn't always agreement. Some statements sit in genuine tension — and holding that tension is part of thinking well.",
    prompt: "Choose two statements from different themes that you think pull against each other.",
    labelA: "Statement A",
    labelB: "Statement B",
    tensionWord: "tension",
    sameThemeNote: "Try choosing statements from two different themes — the sharpest tensions usually cross theme boundaries.",
    priorityPrompt: "If you had to make a decision where these principles pointed in different directions, which would you prioritise?",
    contextLabel: "It depends on context",
    changePrompt: "What would make you change your mind?",
    changePlaceholder: "Optional — the condition or evidence that would shift how you'd weigh these two…",
  },
};

/* "The Conversation Continues" — the closing section (DRAFT).
   Reflects the whole journey back: a closing sentiment reading against the
   opening one, and a recap of everything the learner made. */
export const CONTINUES = {
  opening: {
    line: "This is the end of the course — but not the end of the conversation.",
    body: "The Manifesto was never a set of conclusions to accept. It was an invitation to think, and thinking doesn't finish. What you've built here is yours to keep questioning, adapting and arguing with — in your teaching, with your colleagues, and with your students.",
  },

  sentiment: {
    title: "Where are you now?",
    intro:
      "At the very start, we asked how you were feeling about Generative AI in higher education. Set the slider to where you stand now.",
    leftLabel: "Deeply concerned",
    midLabel: "Uncertain / mixed",
    rightLabel: "Full of possibility",
    noStart:
      "You didn't record a starting point, so there's nothing to compare against — but this is still worth marking: where do you stand now?",
    movement: {
      steady:
        "Barely moved — and that's not nothing. The course didn't swing you; it gave you reasons for where you already stood. A considered position held is worth more than an easy one adopted.",
      towardPossibility:
        "You've moved towards possibility. Not the naïve kind — you've reached it after exploring competing questions, risks and possibilities. That is optimism with its eyes open.",
      towardConcern:
        "You've moved toward concern. That isn't defeat or pessimism; a clearer sense of what's at stake is its own kind of readiness. Caution you can articulate is more useful than confidence you can't.",
    },
  },

  recap: {
    title: "What you've made your own",
    intro:
      "Everything below stayed on this device as you worked. It is the shape of your thinking across the course — take it with you.",
    empty:
      "You haven't built your personal manifesto yet. Head to Your Practice to choose the statements you want to carry forward.",
    anchorLabel: "Your anchor",
    fiveLabel: "The statements you're carrying forward",
    changeLabel: "The change you'll make in the next four weeks",
    changeEmpty: "You haven't named a change yet — Your Practice is where to set one.",
    notebookLabel: "From your reflections",
    /* Labels for the freeform notebook entries, keyed by reflection id. */
    notebook: {
      chooseProvocationWhy: "On the provocation that most challenges conventional teaching",
      whatMustRemainHuman: "On what must remain deeply human",
      constraintCreates: "Your constrained learning-activity design",
      oneSmallChange: "The change you'll make",
    },
  },

  takeaway: {
    title: "Take it with you",
    intro:
      "Save a copy of your manifesto, your anchor and your reflections — to keep, to share with a colleague, or to bring to a conversation about practice.",
    printLabel: "Print or save as PDF",
    printHint: "Opens your browser's print dialogue — choose “Save as PDF” to keep a copy.",
  },

  closing: {
    line: "The horizon is still ours to shape.",
    body: "The future of education with generative AI is not something that simply happens to us. It is shaped through countless decisions about teaching, learning, responsibility and what we choose to value. Those decisions remain ours to make, together. Thank you for being part of the conversation.",
    linkLabel: "Return to the Manifesto",
    linkUrl: "https://manifesto.genain3.ie",
  },
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
    intro: "Five design decisions for a future university. Choose between competing priorities — the feedback connects each choice back to the Manifesto. These decisions are not scored, but the Manifesto does lean towards some positions. The feedback will make that visible while still asking what might make another choice defensible in your context.",
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
          { label: "detection and enforcement tools", kind: "interpretive", feedback: "Detection spending is primarily reactive. Even where it serves an institutional purpose, it does not by itself redesign learning or assessment. What might be gained if some of that investment went instead towards staff and student capability?" },
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
