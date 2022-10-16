import React, { useState } from "react";
import { useMount } from "../../lib/hooks";
import { loadCss, loadJs } from "../../lib/init";
import IconUp from "../icons/IconUp";
import styles from "./WikiAudio.module.scss";

/**
 * 百科正文内音乐播放组件
 */
export default function WikiAudio(props) {
  const { src, name, title } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const playerBoxRef = React.createRef();

  useMount(() => {
    // 为什么嵌套两个 Promise 而不直接 Promise.all ？
    // 因为部分浏览器不支持 Promise.all （指微信QQ这类）
    loadJs("https://staticoss.xhemj.work/npm/aplayer/1.10.1/APlayer.min.js")
      .then(() =>
        loadCss(
          "https://staticoss.xhemj.work/npm/aplayer/1.10.1/APlayer.min.css"
        )
      )
      .then(() => {
        const player = new window.APlayer({
          container: playerBoxRef.current,
          audio: [
            {
              name: name,
              artist: "耳斯百科",
              url: src,
              cover:
                "https://wikioss.xhemj.work/static/logo/v3/white.png/normal.webp",
            },
          ],
          //   lrcType: 2,
          theme: "#5755d9",
          loop: "none",
        });
        player.on("loadedmetadata", () => {
          setIsLoaded(true);
        });
      });
  });

  return (
    <div className={styles.audio}>
      <div ref={playerBoxRef} className={styles.box}></div>
      {isLoaded && title && (
        <label className={styles.description}>
          <span className={styles.tips}>
            <span className={styles.tipsIcon}>
              <IconUp />
            </span>
            {title}
          </span>
        </label>
      )}
      <style global jsx>{`
        .aplayer .aplayer-author {
          display: none !important;
        }
        .aplayer .aplayer-music {
          color: #282828;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
