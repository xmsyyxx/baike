import { createElement, Fragment } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkGfm from "remark-gfm";
import rehypeStringify from "rehype-stringify";
import remarkUnwrapImages from "remark-unwrap-images";
import rehypeSlug from "rehype-slug";
import { parser } from "posthtml-parser";
import { getAllPosts, getPostBySlug } from "./api";

export async function getStaticProps({ params }) {
	const data = getPostBySlug(params.item, ["content"]);
	const attrs = getPostBySlug(params.item, [
		"title",
		"slug",
		"title",
		"description",
		"introduction",
		"img",
		"info",
		"tags",
		"createdAt",
		"updatedAt",
	]);
	const html = unified()
		.use(remarkParse)
		.use(remarkUnwrapImages)
		.use(remarkRehype)
		.use(remarkGfm)
		.use(rehypeSlug)
		.use(rehypeStringify)
		.processSync(String(data.content));
	const result = parser(String(html));
	let tree = Array.isArray(result) ? result : [result];

	function walk(root) {
		if (!root.content) return;
		let i = 0;
		while (i < root.content.length) {
			let node = root.content[i];
			if (node.tag === "section") {
				node.content = [""];
			} else {
				i += 1;
			}
			walk(node);
		}
	}
	walk(tree);

	return {
		props: { tree, ...attrs },
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
