/**
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

import { useEffect, useCallback, useState, useRef } from "react";

const hasIntersectionObserver = typeof IntersectionObserver !== "undefined";

export default function useIntersection({ rootRef, rootMargin, disabled }) {
	// 通过 isDisabled 控制 useEffect 中副作用是否需要执行
	const isDisabled = disabled || !hasIntersectionObserver;
	// 通过 Ref 缓存上一次调用 useIntersection 时生成的 unobserve 方法
	const unobserve = useRef();
	const [visible, setVisible] = useState(false);
	// 设置 IntersectionObserver 的 root
	const [root, setRoot] = useState(rootRef ? rootRef.current : null);
	// React 回调 Ref
	const setRef = useCallback(
		(el) => {
			// unobserve 上一次调用 useIntersection 时观察的元素
			if (unobserve.current) {
				unobserve.current();
				unobserve.current = undefined;
			}

			if (isDisabled || visible) return;

			// 如果传入的 el 是一个 HTMLElement
			if (el && el.tagName) {
				unobserve.current = observe(
					el,
					(isVisible) => isVisible && setVisible(isVisible),
					{ root, rootMargin }
				);
			}
		},
		[isDisabled, root, rootMargin, visible]
	);

	useEffect(() => {
		if (!hasIntersectionObserver) {
			// 如果当前 Runtime 没有 IntersectionObserver（如 Node.js 服务端、或浏览器不兼容）
			// 在 rIC 后显示图片，作为 fallback。rIC 额外引入 Polyfill。
			if (!visible) {
				const idleCallback = requestIdleCallback(() => setVisible(true));
				return () => cancelIdleCallback(idleCallback);
			}
		}
	}, [visible]);

	useEffect(() => {
		if (rootRef) setRoot(rootRef.current);
	}, [rootRef]);

	// 暴露重置 visible 的方法
	const resetVisible = useCallback(() => setVisible(false), []);
	return [setRef, visible, resetVisible];
}

// 缓存 IntersectionObserver 实例
const observers = new Map();
const idList = [];

function createObserver(options) {
	const id = { root: options.root || null, margin: options.rootMargin || "" };
	const existing = idList.find(
		(obj) => obj.root === id.root && obj.margin === id.margin
	);
	let instance;
	// 复用已有的 IntersectionObserver 实例
	if (existing) {
		instance = observers.get(existing);
	} else {
		instance = observers.get(id);
		idList.push(id);
	}
	if (instance) return instance;

	// 记录每个 IntersectionObserver 实例观察的元素，在所有观察的元素都进入 Viewport 后销毁实例
	const elements = new Map();
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const callback = elements.get(entry.target);
			const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
			if (callback && isVisible) callback(isVisible);
		});
	}, options);

	observers.set(id, (instance = { id, observer, elements }));
	return instance;
}

function observe(element, callback, options) {
	const { id, observer, elements } = createObserver(options);
	elements.set(element, callback);

	observer.observe(element);
	return function unobserve() {
		elements.delete(element);
		observer.unobserve(element);

		// 当没有元素需要观察时，销毁 IntersectionObserver 实例
		if (elements.size === 0) {
			observer.disconnect();
			observers.delete(id);
			const index = idList.findIndex(
				(obj) => obj.root === id.root && obj.margin === id.margin
			);
			if (index > -1) {
				idList.splice(index, 1);
			}
		}
	};
}
