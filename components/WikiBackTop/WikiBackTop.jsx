import classNames from "classnames";
import { useEffect, useState } from "react";
import IconBackTop from "../icons/IconBackTop";
import styles from "./WikiBackTop.module.scss";

export default function WikiBackTop() {
	const [isFadeIn, setIsFadeIn] = useState(false);
	const [isFadeOut, setIsFadeOut] = useState(false);
	const [isStartScroll, setIsStartScroll] = useState(false);

	const onClick = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		window.document.addEventListener("scroll", () => {
			if (window.scrollY > 250) {
				if (isStartScroll) return;
				setIsStartScroll(true);
				setIsFadeIn(true);
				setTimeout(() => {
					setIsFadeIn(false);
				}, 300);
			} else {
				if (!isStartScroll) return;
				setIsFadeOut(true);
				setTimeout(() => {
					setIsStartScroll(false);
					setIsFadeOut(false);
				}, 300);
			}
		});
	});

	return (
		<div
			className={classNames(styles.backtop, {
				[styles.fadein]: isFadeIn,
				[styles.fadeout]: isFadeOut,
			})}
			style={{ display: isStartScroll ? "block" : "none" }}
			onClick={onClick}
		>
			<IconBackTop />
		</div>
	);
}
