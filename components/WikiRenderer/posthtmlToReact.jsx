/**
 * 将 PostHTML AST 渲染为 React Node
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

const SINGLE_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
  "WikiPicture",
]);

let totalIndex = 0;

const isFalsyNode = (node) => {
  return !!(node == null || node === "" || Number.isNaN(node));
};

export const posthtmlToReact = (tree, components = {}, level = 0) => {
  const treeLen = tree.length;
  if (treeLen === 0) return [];

  totalIndex = totalIndex + 1;
  const result = [];

  for (let i = 0; i < treeLen; i++) {
    const node = tree[i];

    if (isFalsyNode(node)) continue;

    if (Array.isArray(node)) {
      if (node.length !== 0) {
        result.push(...posthtmlToReact(node, components, level + 1));
      }
      continue;
    }

    if (typeof node === "number" || typeof node === "string") {
      result.push(node);
      continue;
    }

    if (!Array.isArray(node.content)) {
      if (isFalsyNode(node.content)) {
        node.content = [];
      } else {
        node.content = [node.content];
      }
    }

    if (!node.tag) {
      result.push(...posthtmlToReact(node.content, components, level + 1));
      continue;
    }

    // 自定义脚注样式
    if (node?.attrs?.class) {
      node.attrs.className = node.attrs.class;
      delete node.attrs.class;
    }

    // if (node?.attrs?.id === "footnote-label") {
    //   node.content = ["参考资料"];
    // }

    if (node?.attrs?.className === "footnotes") {
      node.tag = "div";
    }

    if (node?.attrs?.className === "data-footnote-backref") {
      node.content = [""];
    }

    const tag = typeof node.tag === "string" ? node.tag : "div";
    const compProps = node.attrs ?? {};
    const Comp = components[tag] ? components[tag] : tag;
    const key = `${totalIndex}-${i}-${level}`;

    if (SINGLE_TAGS.has(tag)) {
      result.push(<Comp {...compProps} key={key} />);
      result.push(...posthtmlToReact(node.content, components, level + 1));
    } else {
      result.push(
        <Comp key={key} {...compProps}>
          {posthtmlToReact(node.content, components, level + 1)}
        </Comp>
      );
    }
  }

  return result;
};
