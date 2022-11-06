import classNames from "classnames";
import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import EventBus from "../../lib/eventBus";
import styles from "./WikiPopups.module.scss";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API_ENDPOINT = "https://wikioss.xhemj.work/wiki/preview/";

const timerWaitOpen = null;
const timerWaitClose = null;

export default function WikiPopups(props) {
  return null;
  const { children, name, ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);
  const [isFadeIn, setIsFadeIn] = useState(false);
  const [isFadeOut, setIsFadeOut] = useState(false);
  const [isMouseEnterModule, setIsMouseEnterModule] = useState(false);
  const [targetText, setTargetText] = useState("");

  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const { data, error } = useSWR(
    `https://wikioss.xhemj.work/wiki/preview/%E8%A7%A3%E6%81%AA%E5%B8%83.json?v=2`,
    fetcher
  );

  const previewImage = data?.img ? data.img + "/twitter_card.webp" : null;
  const previewBody = data?.preview;

  const onMouseEnter = async (e) => {
    console.log("onMouseEnter");
    const linkElement = e.target;
    setIsMouseEnterModule(true);
    openPopups(linkElement);
    // setTimeout(async () => {
    //   const nowElementTargetText = linkElement.textContent;
    //   // 防止在等待时鼠标移动到别的链接去
    //   if (targetText && targetText !== nowElementTargetText) {
    //     await closePopups(true); // 强制关闭当前弹窗
    //     openPopups(linkElement);
    //   } else if (isMouseEnterModule) {
    //     return openPopups(linkElement);
    //   }
    // }, 350);
  };

  const onMouseLeave = () => {
    console.log("onMouseLeave");
    setIsMouseEnterModule(false);
    closePopups();
  };

  const openPopups = async (linkElement) => {
    if (isVisible) {
      await closePopups();
    }
    return new Promise((resolve) => {
      const left = linkElement.offsetLeft;
      const top = linkElement.offsetTop;
      setLeft(left);
      setTop(top + 35);
      setIsVisible(true);
      setIsFadeIn(true);
      setTimeout(() => {
        setIsFadeIn(false);
        resolve();
      }, 300);
    });
  };

  const closePopups = async (isForce = false) => {
    console.log("closePopups");
    return new Promise((resolve) => {
      console.log(!isForce && (!isVisible || isMouseEnterModule));
      if (!isForce && (!isVisible || isMouseEnterModule)) return;
      setIsFadeOut(true);
      setTargetText("");
      setTimeout(
        () => {
          setIsVisible(false);
          setIsFadeOut(false);
          resolve();
        },
        isForce ? 0 : 200
      );
    });
  };

  const onMouseLeaveModule = () => {
    if (isVisible) {
      setIsMouseEnterModule(false);
      timerWaitClose = setTimeout(() => {
        if (isMouseEnterModule) {
          closePopups();
        }
      }, 350);
    }
  };

  useEffect(() => {
    EventBus.on("showWikiPopup", onMouseEnter);
    EventBus.on("hideWikiPopup", onMouseLeave);

    return () => {
      EventBus.off("showWikiPopup", onMouseEnter);
      EventBus.off("hideWikiPopup", onMouseLeave);
    };
  });

  if (!isVisible) return;
  if (error) {
    console.log(error);
    return <div>failed to load</div>;
  }
  if (!data) return <div>loading...</div>;

  return (
    <div
      className={classNames(styles.popups, {
        [styles.show]: isVisible,
        [styles.fadein]: isFadeIn,
        [styles.fadeout]: isFadeOut,
      })}
      style={{
        left: left,
        top: top,
      }}
      onMouseEnter={() => {
        setIsMouseEnterModule(true);
      }}
      onMouseLeave={onMouseLeaveModule}
      {...rest}
    >
      <div className={classNames(styles.arrow, styles.shadow)}></div>
      <div className={classNames(styles.arrow, styles.top)}></div>
      <div className={styles.module}>
        <div className={styles.text}>
          <p>
            {previewImage && (
              <span
                className={styles.img}
                style={{
                  backgroundImage: "url(" + previewImage + ")",
                }}
              ></span>
            )}
            <span className={styles.description}>
              {name && <strong>{name}：</strong>}
              {previewBody}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
