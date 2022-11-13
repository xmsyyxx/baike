import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkDirective from "remark-directive";
// import wikiVideo from "../remark/wikiVideo";
import { parser } from "posthtml-parser";
import { visit } from "unist-util-visit";
import { h } from "hastscript";
import { getAllPosts, getPostBySlug } from "./api";

const customBlockPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === "textDirective" ||
        node.type === "leafDirective" ||
        node.type === "containerDirective"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(node.name || "div", node.attributes);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
};

const markToHtml = (content) => {
  if (!content) return null;
  const html = unified()
    .data("settings", { fragment: true })
    .use(remarkParse)
    .use(remarkUnwrapImages)
    .use(remarkDirective)
    .use(customBlockPlugin)
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
    "notice",
    "createdAt",
    "updatedAt",
    "wordCount",
  ]);
  const contentsTree = markToHtml(data.content);
  const introductionTree = markToHtml(data.introduction);

  const noticeList = [];
  // if (attrs.wordCount < 50) {
  //   noticeList.push(
  //     markToHtml(
  //       `本词条还在完善中，欢迎大家[补充相关内容](耳斯百科：投稿)使词条更完整，赶紧来投稿吧！`
  //     )
  //   );
  // }

  if (attrs.notice) {
    noticeList.push(attrs.notice);
  }

  return {
    props: {
      tree: contentsTree,
      introduction: introductionTree,
      noticeList,
      ...attrs,
    },
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
