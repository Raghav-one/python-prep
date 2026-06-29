import type { Metadata } from "next";
import ArticleShell from "@/components/ArticleShell";
import RapidFireQA from "@/components/RapidFireQA";
import CodingQuestion from "@/components/CodingQuestion";
import {
  rapidFireCategories,
  totalRapidFireCount,
} from "@/data/rapidFireQuestions";
import { codingQuestions, totalCodingQuestionCount } from "@/data/codingQuestions";
import { highlightPython } from "@/lib/highlight";

export const metadata: Metadata = {
  title: "Python Interview Questions: Rapid Fire & Coding | Python Interview Prep",
  description:
    `A practice bank of ${totalRapidFireCount}+ rapid-fire Python Q&A for quick recall drilling, plus ${totalCodingQuestionCount} full coding interview problems with hints, worked solutions, and complexity analysis.`,
};

export default async function InterviewQuestionsPage() {
  const solutionHtmls = await Promise.all(
    codingQuestions.map((question) => highlightPython(question.solution))
  );

  return (
    <ArticleShell
      eyebrow="Interview Questions"
      title="Drill it, then prove it: rapid-fire recall and full coding problems"
      description="Two ways to practice: a large bank of short rapid-fire questions organized by topic — click to reveal each answer and test your recall — followed by a set of complete coding problems with hints, fully worked Python solutions, explanations, and time/space complexity analysis."
      meta={`${totalRapidFireCount} rapid-fire questions · ${totalCodingQuestionCount} coding problems`}
      tocTitle="Jump to"
    >
      <h2 id="rapid-fire">Rapid fire questions</h2>
      <p>
        Short, sharp questions for testing recall — the kind interviewers use to gauge whether you
        truly understand core ideas or just recognize the syntax. They&rsquo;re grouped by the same
        topics as the <a href="/concepts">Python Concepts</a> guide, so if one stumps you, you know
        exactly where to go back and review. Click a question to reveal its answer; try to answer
        in your head first.
      </p>

      <div className="not-prose space-y-10">
        {rapidFireCategories.map((category) => (
          <section key={category.id}>
            <h3 id={category.id} className="mb-3 scroll-mt-28 text-base font-semibold tracking-tight text-navy-950">
              {category.title}
              <span className="ml-2 align-middle text-xs font-medium text-navy-500">
                {category.questions.length} questions
              </span>
            </h3>
            <div className="space-y-2">
              {category.questions.map((question, i) => (
                <RapidFireQA key={question.id} item={question} index={i + 1} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <h2 id="coding-questions">Coding questions</h2>
      <p>
        These go deeper: full problem statements, examples, progressive hints if you get stuck, and
        complete worked solutions with plain-language explanations of <em>why</em> the approach
        works — plus the time/space complexity analysis interviewers expect you to volunteer
        unprompted. Try to solve each one yourself before revealing the solution; that struggle is
        where the learning happens.
      </p>

      <div className="not-prose space-y-6">
        {codingQuestions.map((question, i) => (
          <CodingQuestion
            key={question.id}
            data={question}
            index={i + 1}
            solutionHtml={solutionHtmls[i]}
          />
        ))}
      </div>

      <p>
        That&rsquo;s the full bank — but the real practice begins when you close the answers and
        work through them cold. Revisit the <a href="/concepts">Python Concepts</a> guide for any
        topic that gave you trouble, then come back and try again in a week.
      </p>
    </ArticleShell>
  );
}
