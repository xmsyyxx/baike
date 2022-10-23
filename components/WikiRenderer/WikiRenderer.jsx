import { posthtmlToReact } from "./posthtmlToReact";

import ContentLink from "./ContentLink";
import ContentImage from "./ContentImage";

export default function WikiRenderer(props) {
	const { tree } = props;
	return posthtmlToReact(tree, {
		a: ContentLink,
		img: ContentImage,
	});
}
