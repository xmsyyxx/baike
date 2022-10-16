import classNames from "classnames";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMount } from "../../lib/hooks";
import { isMobile, randomNum } from "../../lib/init";
import IconReload from "../icons/IconReload";
import styles from "./WikiSuggestion.module.scss";

let limit = 5;
let path = "/item/";

export default function WikiSuggestion(props) {
	const { data } = props;
	// const [limit, setLimit] = useState(5);
	// const [path, setPath] = useState("/item/");
	const [suggestionList, setSuggestionList] = useState([]);

	if (!data) return null;

	const handleSuggestion = () => {
		const list = new Set();
		for (let i = 0; Array.from(list).length < limit; i++) {
			const n = randomNum(0, data.length - 1);
			if (data[n]?.title) {
				list.add(data[n].title);
			}
		}
		setSuggestionList(Array.from(list));
	};

	const onClickReload = () => {
		handleSuggestion();
	};

	const onresize = () => {
		const oldLimit = limit;
		if (window.innerWidth < 500) {
			limit = 3;
			path = "/wiki/";
		} else {
			limit = 5;
			path = "/item/";
		}
		if (oldLimit !== limit) handleSuggestion();
	};

	useMount(() => {
		handleSuggestion();
		onresize();
		window.addEventListener("resize", onresize);
		return () => window.removeEventListener("resize", onresize);
	});

	return (
		<div className={styles.suggestion}>
			<div className={styles.tips}>随便看看：</div>
			<ul className={styles.list}>
				{suggestionList.map((item, index) => (
					<li key={index + item}>
						<Link href={path + item}>
							<a className={styles.item}>{item}</a>
						</Link>
						{index !== suggestionList.length - 1 && (
							<span className={styles.separator}>|</span>
						)}
					</li>
				))}
				<li className={styles.reload} onClick={onClickReload}>
					<IconReload />
				</li>
			</ul>
		</div>
	);
}
