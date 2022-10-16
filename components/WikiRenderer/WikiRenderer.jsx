import MarkdownIt from "markdown-it";
import { parser } from "posthtml-parser";
import { posthtmlToReact } from "./posthtmlToReact";

import ContentLink from "./ContentLink";

export default function WikiRenderer(props) {
	const $md = new MarkdownIt();
	const markdown = props.data;
	const html = $md.render(markdown);
	const result = parser(html);
	const tree = Array.isArray(result) ? result : [result];

	return posthtmlToReact(tree, {
		a: ContentLink,
	});
}
