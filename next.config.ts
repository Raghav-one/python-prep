import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: "export",
  basePath: process.env.BASE_PATH || "",
};

// Turbopack requires loader options to be JSON-serializable, so it can't accept
// these function-reference remark/rehype plugins — run dev/build with --webpack
// (see the "dev"/"build" scripts in package.json).
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark-default",
          keepBackground: true,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
