import { useMount } from "../../lib/hooks";
import React, { useState } from "react";
import classNames from "classNames";
import IconArrowUp from "../icons/IconArrowUp";
import styles from "./WikiDetailsList.module.scss";

const DetailItem = ({ data, name }) => {
	return (
		<li className={styles.item}>
			<div className={styles.title}>
				{name.split("").map((item) => (
					<span key={item}>{item}</span>
				))}
			</div>
			<div className={styles.text}>{data[name]}</div>
		</li>
	);
};

export default function WikiDetailsList(props) {
	const { data, style } = props;

	const [isNeedShowMore, setIsNeedShowMore] = useState(true);
	const [isShowMore, setIsShowMore] = useState(false);
	const [renderMaxItem, setRenderMaxItem] = useState(5);

	const infoKeys = Object.keys(data || {});
	const renderedList = infoKeys.slice(0, renderMaxItem);

	const toggleShowMore = () => {
		if (isShowMore) {
			setRenderMaxItem(5);
		} else {
			setRenderMaxItem(infoKeys.length);
		}
		setIsShowMore(!isShowMore);
	};

	useMount(() => {
		if (infoKeys.length <= renderMaxItem) {
			setIsShowMore(true);
			setIsNeedShowMore(false);
		}
	});

	if (!data) return null;
	return (
		<div className={styles.details} style={style}>
			<div className={styles.list}>
				<ul>
					{renderedList.map((key) => (
						<DetailItem data={data} name={key} key={key} />
					))}
				</ul>
				{isNeedShowMore && (
					<div
						className={classNames(styles.more, {
							[styles.arrowDown]: !isShowMore,
						})}
						onClick={toggleShowMore}
					>
						<IconArrowUp />
					</div>
				)}
			</div>
		</div>
	);
}
