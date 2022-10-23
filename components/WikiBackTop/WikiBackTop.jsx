import classNames from "classNames";
import { useMount } from "../../lib/hooks";
import { useEffect, useState } from "react";
import IconBackTop from "../icons/IconBackTop";
import styles from "./WikiBackTop.module.scss";

let isLastStartScroll = false;

export default function WikiBackTop() {
	const [isFadeIn, setIsFadeIn] = useState(false);
	const [isFadeOut, setIsFadeOut] = useState(false);
	// const [isStartScroll, setIsStartScroll] = useState(false);

	const onClick = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	useMount(() => {
		isLastStartScroll = false;
		window.document.addEventListener("scroll", () => {
			if (window.scrollY > 250) {
				if (isLastStartScroll) return;
				setTimeout(() => {
					setIsFadeIn(false);
				}, 300);
				isLastStartScroll = true;
				setIsFadeIn(true);
			} else {
				if (!isLastStartScroll) return;
				setTimeout(() => {
					isLastStartScroll = false;
					setIsFadeOut(false);
				}, 300);
				setIsFadeOut(true);
			}
		});
	});

	if (!isLastStartScroll) return null;
	return (
		<div
			className={classNames(styles.backtop, {
				[styles.fadein]: isFadeIn,
				[styles.fadeout]: isFadeOut,
			})}
			onClick={onClick}
		>
			<IconBackTop />
		</div>
	);
}
