import classNames from "classnames";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMount } from "../../lib/hooks";
import styles from "./WikiPcSearch.module.scss";

let path = "/item/";

export default function WikiPcSearch(props) {
	const { allPosts, style } = props;
	const [placeholder, setPlaceholder] = useState("搜索词条");
	const [isStartSearch, setIsStartSearch] = useState(false);
	// const [isFetchContent, setIsFetchContent] = useState(false);
	const [searchTips, setSearchTips] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [articles, setArticles] = useState([]);

	const onSearchChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		setArticles([]);
		if (!query) {
			setSearchTips("尝试搜索点什么……");
			return;
		}
		setIsStartSearch(true);
		setSearchTips("");
		query = query.toLocaleLowerCase();
		let search = allPosts;
		search = search.filter((content) => {
			return (
				String(content.title).toLocaleLowerCase().includes(query) && content
			);
		});
		setArticles(search);
	};

	const onresize = () => {
		path = window.outerWidth < 500 ? "/wiki/" : "/item/";
	};

	const onClickSearchInput = () => {
		setSearchTips("尝试搜索点什么……");
		setIsStartSearch(true);
		setPlaceholder("");
	};

	const onBlurSearchInput = () => {
		setPlaceholder("搜索词条");
		setSearchTips("");
	};

	useMount(() => {
		onresize();
		window.addEventListener("resize", onresize);
		return () => window.removeEventListener("resize", onresize);
	});

	const SearchItem = ({ articles }) => {
		return articles.map((article) => (
			<Link key={article.title} href={path + article.title}>
				<a>
					<li
						className={styles.link}
						onClick={() => {
							setIsStartSearch(false);
						}}
					>
						<span className={styles.item}>{article.title}</span>
					</li>
				</a>
			</Link>
		));
	};

	return (
		<div className={styles.search} style={style}>
			<div className={styles.input}>
				<input
					type="search"
					autoComplete="off"
					placeholder={placeholder}
					className={classNames(styles.search, {
						[styles.inputQuery]: searchQuery,
					})}
					value={searchQuery}
					onChange={onSearchChange}
					onBlur={onBlurSearchInput}
					onClick={onClickSearchInput}
				/>

				{isStartSearch && articles.length ? (
					<ul className={styles.list}>
						<SearchItem articles={articles} />
					</ul>
				) : !articles.length && searchTips ? (
					<ul className={styles.list}>
						<li className={styles.itemTips}>{searchTips}</li>
					</ul>
				) : (
					searchQuery &&
					isStartSearch && (
						<ul className={styles.list}>
							<li className={styles.itemTips}>无结果</li>
						</ul>
					)
				)}
			</div>
		</div>
	);
}
