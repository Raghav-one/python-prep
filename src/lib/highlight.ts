import { codeToHtml } from "shiki";

/** Server-side syntax highlighting for Python snippets stored as plain strings in data files. */
export async function highlightPython(code: string): Promise<string> {
  return codeToHtml(code, {
    lang: "python",
    theme: "github-dark-default",
  });
}
