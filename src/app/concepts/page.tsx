import type { Metadata } from "next";
import ArticleShell from "@/components/ArticleShell";
import ConceptsContent from "./content.mdx";

export const metadata: Metadata = {
  title: "Python Concepts, Top to Bottom | Python Interview Prep",
  description:
    "A single, sequential walkthrough of Python — from variables and data types through OOP, generators, decorators, concurrency, and performance — written for interview prep.",
};

export default function ConceptsPage() {
  return (
    <ArticleShell
      eyebrow="Python Concepts"
      title="Python, top to bottom: every concept you need for an interview"
      description="One continuous, sequential walkthrough of Python — read it start to finish like a tutorial, or jump to any section from the outline. Every idea builds on the last, with runnable examples and the kind of detail interviewers actually probe."
      meta="21 sections · expand any topic · long-form reference"
      tocTitle="Outline"
    >
      <ConceptsContent />
    </ArticleShell>
  );
}
