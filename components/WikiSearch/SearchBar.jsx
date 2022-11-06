import classNames from "classnames";
import { useState } from "react";
import allPosts from "../../../content/posts.json";
import styles from "./SearchBar.module.scss";

export default function SearchBar(props) {
  const { ishome, ...rest } = props;
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
          className={classNames(
            className,
            "no-result cursor-default text-center py-4 text-base-500"
          )}
        >
          无结果
        </div>
      );
    }
    return searchResults.map((item) => {
      return (
        <li
          key={item}
          className={classNames(className, "leading-6")}
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
      <div
        className={classNames("Search flex", {
          "max-w-sm w-2/6": !ishome,
          "max-w-full w-full mx-auto": ishome,
        })}
        {...rest}
      >
        <div className="relative w-full">
          <div
            className={classNames("SearchBar max-w-full bg-transparent p-1", {
              "mx-auto": ishome,
            })}
          >
            <input
              type="text"
              className={classNames(
                "input w-full h-9 text-sm " +
                  "hover:bg-white hover:input-bordered focus:input-bordered " +
                  "focus:bg-white transition-colors duration-300",
                styles.input,
                {
                  "max-w-md": !ishome,
                  "h-12 max-w-full w-full lg:w-[710px]": ishome,
                }
              )}
              placeholder="搜索词条"
              onChange={onSearchChange}
            />
            {(searchResults.length > 0 || isStartSearch) && (
              <div
                className={classNames("relative", {
                  "translate-y-2": ishome,
                })}
              >
                <ul
                  className={classNames(
                    styles.suggest,
                    "scroll-auto bg-white rounded-lg shadow-lg " +
                      "list-none p-0 border border-solid border-neutral-200 absolute " +
                      "top-full left-0 right-0 text-left",
                    {
                      "w-full max-w-md m-0": !ishome,
                      "w-full lg:w-[710px] mx-auto": ishome,
                    }
                  )}
                >
                  <ResultItem />
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
