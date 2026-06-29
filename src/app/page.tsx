import Link from "next/link";
import { totalRapidFireCount } from "@/data/rapidFireQuestions";
import { totalCodingQuestionCount } from "@/data/codingQuestions";

const stats = [
  { value: "20", label: "sequential concept sections" },
  { value: `${totalRapidFireCount}+`, label: "rapid-fire questions" },
  { value: `${totalCodingQuestionCount}`, label: "full coding problems" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-surface to-white">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-600">
            Python Interview Prep
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl lg:text-6xl">
            Walk in ready for any Python interview question
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-navy-700 sm:text-lg">
            One sequential, comprehensive guide to every core Python concept — paired with a
            practice bank of rapid-fire recall questions and full coding problems with worked
            solutions. Read it like a tutorial, drill it like flashcards, then prove it like an
            interview.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/concepts"
              className="inline-flex items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-900"
            >
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-500" />
              Start with the concepts
            </Link>
            <Link
              href="/interview-questions"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition-colors hover:border-navy-500/40 hover:bg-surface"
            >
              Jump to practice questions
            </Link>
          </div>

          <dl className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                  {stat.value}
                </dd>
                <p className="mt-1 text-xs font-medium leading-snug text-navy-500 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Two paths */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            Two pages. Everything you need.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-navy-700">
            No scattered tabs, no half-finished cheat sheets — just a complete, sequential
            reference and a practice bank, both written specifically for interview prep.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Link
            href="/concepts"
            className="group flex flex-col rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-500/50 hover:shadow-md sm:p-8"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-lg font-bold text-accent-500">
              01
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy-950">
              Python Concepts, top to bottom
            </h3>
            <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-navy-700">
              A single, sequential walkthrough — from how the interpreter actually runs your code,
              through data types, OOP, generators, decorators, concurrency and the GIL, all the way
              to performance and standard-library idioms. Read it start to finish, or jump to any
              section from the outline.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
              Read the guide
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>

          <Link
            href="/interview-questions"
            className="group flex flex-col rounded-2xl border border-border bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-500/50 hover:shadow-md sm:p-8"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-950 text-lg font-bold text-accent-500">
              02
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight text-navy-950">
              Interview questions: rapid fire &amp; coding
            </h3>
            <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-navy-700">
              Drill recall with {totalRapidFireCount}+ short rapid-fire questions organized by
              topic — click to reveal each answer. Then go deeper with {totalCodingQuestionCount}{" "}
              full coding problems: progressive hints, worked Python solutions, plain-language
              explanations, and the time/space complexity analysis interviewers expect.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-700">
              Start practicing
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </Link>
        </div>
      </section>

      {/* How to use it */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-20">
          <h2 className="text-center text-2xl font-bold tracking-tight text-navy-950 sm:text-3xl">
            A suggested way to use this
          </h2>
          <ol className="mx-auto mt-10 max-w-2xl space-y-6">
            {[
              {
                step: "1",
                title: "Read the Concepts guide sequentially",
                body: "Each section builds on the last — the mutable-default-argument trap in Functions sets up the closures-and-cycles discussion in Memory, the GIL discussion explains why asyncio exists, and so on. Reading in order builds connections that flashcards alone can't.",
              },
              {
                step: "2",
                title: "Drill the rapid-fire bank by topic",
                body: "After finishing a section, jump to its matching rapid-fire category and test recall — answer in your head before revealing each card. If something stumps you, that's a precise signal of exactly what to re-read.",
              },
              {
                step: "3",
                title: "Work the coding problems cold, then check your reasoning",
                body: "Read the problem, try it yourself (use the hints sparingly), and only then reveal the solution. Compare not just whether your code works, but whether your complexity analysis matches — that's what interviewers are really scoring.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-5 rounded-xl border border-border bg-white p-5 sm:p-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-sm font-bold text-accent-500">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
