import classNames from "classNames";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useMount } from "../../lib/hooks";
import allPosts from "../../content/posts.json";
import styles from "./WikiPcSearch.module.scss";

let path = "/item/";

export default function WikiPcSearch(props) {
	const { style, title } = props;
	const router = useRouter();
	const [placeholder, setPlaceholder] = useState("搜索词条");
	const [isStartSearch, setIsStartSearch] = useState(false);
	// const [isFetchContent, setIsFetchContent] = useState(false);
	const [searchTips, setSearchTips] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [articles, setArticles] = useState([]);

	const inputElRef = useRef(null);

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
			return String(content).toLocaleLowerCase().includes(query) && content;
		});
		setArticles(search);
	};

	const onresize = () => {
		path = window.outerWidth < 500 ? "/wiki/" : "/item/";
	};

	const onClickSearchInput = (e) => {
		e.preventDefault();
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

	useEffect(() => {
		setSearchTips("");
		setSearchQuery("");
		setIsStartSearch(false);
		inputElRef.current.value = "";
	}, [title]);

	const SearchItem = ({ articles }) => {
		return articles.map((article) => (
			<li
				className={styles.link}
				onClick={() => {
					setIsStartSearch(false);
					inputElRef.current.value = "";
					// router.push(path + article);
				}}
				key={article}
			>
				<a href={path + article}>
					<span className={styles.item}>{article}</span>
				</a>
			</li>
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
					// onClick={onClickSearchInput}
					ref={inputElRef}
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
