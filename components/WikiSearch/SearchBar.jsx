import classNames from "classNames";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import allPosts from "../../content/posts.json";
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [isStartSearch, setIsStartSearch] = useState(false);

  const onSearchChange = (e) => {
    const query = e.target.value;
    if (!query) {
      setSearchResults([]);
      setIsStartSearch(false);
      return;
    }
    setIsStartSearch(true);
    const search = query.toLocaleLowerCase();
    let results = allPosts.filter((content) => {
      return String(content).toLocaleLowerCase().includes(search) && content;
    });
    results = results.slice(0, 10);
    setSearchResults(results);
  };

  const ResultItem = () => {
    const className =
      "w-full border-b border-solid border-b-base-300 py-2 px-5 " +
      "hover:bg-base-200 cursor-pointer leading-5 transition-colors duration-75";
    if (searchResults.length === 0 && isStartSearch) {
      return (
        <div
          className={
            className +
            " no-result cursor-default text-center py-4 text-base-500"
          }
        >
          无结果
        </div>
      );
    }
    return searchResults.map((item) => {
      return (
        <li
          key={item}
          className={className}
          onClick={() => {
            location.href = `/item/${item}`;
          }}
        >
          <span className="font-normal text-zinc-900 hover:text-zinc-900 py-1">
            {item}
          </span>
        </li>
      );
    });
  };

  return (
    <>
      <div className="max-w-sm flex w-2/6" {...props}>
        <div className="relative w-full">
          <div className="SearchBar max-w-md w-full bg-transparent p-1">
            <input
              type="text"
              className={classNames(
                "input w-full max-w-md h-9 text-sm " +
                  "hover:bg-white hover:input-bordered focus:input-bordered " +
                  "focus:bg-white transition-colors duration-300",
                styles.input
              )}
              placeholder="搜索词条"
              onChange={onSearchChange}
            />
            {(searchResults.length > 0 || isStartSearch) && (
              <ul
                className={classNames(
                  styles.suggest,
                  "w-full max-w-md scroll-auto bg-white rounded-lg shadow-lg " +
                    "list-none p-0 m-0 border border-solid border-neutral-200 absolute " +
                    "top-full left-0 right-0"
                )}
              >
                <ResultItem />
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
