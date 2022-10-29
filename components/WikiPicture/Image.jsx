/**
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

import React, { useMemo, useRef, useLayoutEffect } from "react";
import useIntersection from "../../lib/hooks/useIntersection";

const SMALLEST_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";

export const Image = React.forwardRef((props, ref) => {
  const { src, ...rest } = props;
  const imageElRef = ref; // useRef(null);

  const previousSrcRef = useRef(src);
  const isLazy = useMemo(() => {
    // 至少在 HTML5 spec 中，img 允许没有 src 属性，需要特殊处理
    if (!src) return false;
    if (src?.startsWith("data:") || src?.startsWith("blob:")) return false;
    return true;
  }, [src]);

  const [setIntersection, isIntersected, resetIntersected] = useIntersection({
    rootMargin: "200px",
    disabled: false,
  });

  useLayoutEffect(() => {
    // 在 React Reconcile 中，同一个 Image 组件可能会被复用、DOM 中的 HTMLImageElement 也会被复用
    // 而 useIntersection 中副作用的依赖仅为 HTMLImageElement，因此需要手动重置 visible state
    if (previousSrcRef.current !== src) {
      previousSrcRef.current = src;
      resetIntersected();
    }
    setIntersection(imageElRef.current);
  }, [resetIntersected, setIntersection, src]);

  const isVisible = !isLazy || isIntersected;
  // 由 React 控制显示 1px 占位图还是真实图片
  const srcString = isVisible ? src : SMALLEST_GIF;

  return (
    <img
      {...rest}
      ref={imageElRef}
      decoding="async"
      crossOrigin="anonymous"
      src={srcString}
    />
  );
});
