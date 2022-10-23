import { visit } from "unist-util-visit";
import { h } from "hastscript";

export default function wikiVideo() {
  return (tree) => {
    visit(tree, (node) => {
      if (
        (node.type === "textDirective" ||
          node.type === "leafDirective" ||
          node.type === "containerDirective") &&
        node.name === "video"
      ) {
        const data = node.data || (node.data = {});
        const hast = h(".foo#some-id", [
          h("span", "some text"),
          h("input", { type: "text", value: "foo" }),
          h("a.alpha", { class: "bravo charlie", download: "download" }, [
            "delta",
            "echo",
          ]),
        ]);

        data.hName = hast.tagName;
        data.hProperties = hast.properties;
      }
    });
  };
}
