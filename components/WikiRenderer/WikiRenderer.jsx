import { posthtmlToReact } from "./posthtmlToReact";

import ContentLink from "./ContentLink";
import ContentImage from "./ContentImage";
import ContentActions from "./ContentActions";
import { Fragment } from "react";

export default function WikiRenderer(props) {
  const { tree } = props;
  return posthtmlToReact(tree, {
    a: ContentLink,
    img: ContentImage,
    code: Fragment, // 在markdown中使用代码块时，会自动包裹一个code标签，这里直接去掉
    pre: ContentActions,
  });
}
