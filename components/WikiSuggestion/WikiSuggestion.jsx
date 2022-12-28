import { useState } from "react";
import { useMount } from "../../lib/hooks";
import { randomNum } from "../../lib/init";
import IconReload from "../icons/IconReload";
import styles from "./WikiSuggestion.module.scss";
import allPosts from "../../../content/posts.json";
import { useEffect } from "react";

let limit = 5;
const path = "/item/";

export default function WikiSuggestion(props) {
  const data = allPosts;
  const [suggestionList, setSuggestionList] = useState([]);
  const [content, setContent] = useState(null);

  if (!data) return null;

  const handleSuggestion = () => {
    const list = new Set();
    for (let i = 0; Array.from(list).length < limit; i++) {
      const n = randomNum(0, data.length - 1);
      list.add(data[n]);
    }
    setSuggestionList(Array.from(list));
  };

  const onClickReload = () => {
    handleSuggestion();
  };

  const onresize = () => {
    const oldLimit = limit;
    if (oldLimit !== limit) handleSuggestion();
  };

  useMount(() => {
    handleSuggestion();
    onresize();
    window.addEventListener("resize", onresize);
    return () => window.removeEventListener("resize", onresize);
  });

  useEffect(() => {
    setContent(
      <div className={styles.suggestion} {...props}>
        <div className={styles.tips}>随便看看：</div>
        <ul className={styles.list}>
          {suggestionList.map((item, index) => (
            <li key={index + item}>
              <a href={path + item} className={styles.item}>
                {item}
              </a>
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
  }, [suggestionList]);

  return content;
}
