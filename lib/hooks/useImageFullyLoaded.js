/**
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

import { useCallback, useEffect, useState } from "react";

const LOADED_IMAGE_URLS = new Set();

export const useImageFullyLoaded = (imageElRef, srcString) => {
	const [isFullyLoaded, setIsFullyLoaded] = useState(false);
	const handleLoad = useCallback(() => {
		if (srcString) {
			const img = imageElRef.current;
			if (!img) return;
			// 真实图片元素当前的 src（currentSrc，当网页用 picture / source 元素指定了变种后，浏览器实际采用的 src）
			const imgSrc = img.currentSrc || img.src;
			if (imgSrc && imgSrc !== null) {
				// 利用 HTMLImageElement.prototype.decode API，获取图片解码后的回调
				// 在不兼容的浏览器上直接等待一个 microtask
				const promise = "decode" in img ? img.decode() : Promise.resolve();
				promise
					.catch(() => {})
					.then(() => {
						if (!imageElRef.current) return;
						// 记录已经加载完、解码的图片
						LOADED_IMAGE_URLS.add(srcString);
						setIsFullyLoaded(true);
					});
			}
		}
	}, [imageElRef, srcString]);
	// 由于 SSR 输出了完整 HTML，而页面的 JS 又全部都是异步加载。
	// 浏览器可能在 React DOM 还没 Hydration 时就完成了图片的下载，因此不能直接添加 onLoad
	useEffect(() => {
		if (imageElRef.current) {
			if (imageElRef.current.complete) {
				handleLoad();
			} else {
				imageElRef.current.onload = handleLoad;
			}
		}
	}, [handleLoad, imageElRef]);

	return isFullyLoaded;
};
