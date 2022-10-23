import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";
import wikiVideo from "../remark/wikiVideo";
import { parser } from "posthtml-parser";
import { getAllPosts, getPostBySlug } from "./api";

const markToHtml = (content) => {
  if (!content) return null;
  const html = unified()
    .data("settings", { fragment: true })
    .use(remarkParse)
    .use(remarkUnwrapImages)
    // .use(remarkDirective)
    // .use(wikiVideo)
    .use(remarkRehype)
    .use(remarkGfm)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .processSync(String(content));
  const result = parser(String(html));
  return Array.isArray(result) ? result : [result];
};

export async function getStaticProps({ params }) {
  const data = getPostBySlug(params.item, ["content", "introduction"]);
  const attrs = getPostBySlug(params.item, [
    "title",
    "slug",
    "title",
    "description",
    "img",
    "info",
    "tags",
    "createdAt",
    "updatedAt",
  ]);
  const contentsTree = markToHtml(data.content);
  const introductionTree = markToHtml(data.introduction);

  return {
    props: { tree: contentsTree, introduction: introductionTree, ...attrs },
  };
}

export async function getStaticPaths() {
  const slugs = getAllPosts(["title"]);

  const paths = slugs.map((data) => {
    return { params: { item: data.title } };
  });
  return {
    paths: paths,
    fallback: false,
  };
}
