import classNames from "classnames";
import { useEffect, useState } from "react";
import WikiLogo from "../WikiLogo/WikiLogo";
import styles from "./WikiFooter.module.scss";

export default function WikiFooter(props) {
  const { isHome } = props;
  const version = require("../../package.json").version;
  const copyright = `Copyright © 2021-${new Date().getFullYear()} IYAMAYA 耳斯工作室`;
  const [isMounted, setIsMounted] = useState(false);

  // 判断是否有滚动条
  const [isScroll, setIsScroll] = useState(false);
  const handleScroll = () => {
    // if (
    //   document.querySelector(".wiki-contents__body").offsetHeight +
    //     document.querySelector(".wiki-footer").offsetHeight >
    //   window.innerHeight
    // ) {
    //   setIsScroll(true);
    // }
    setIsMounted(true);
  };
  useEffect(() => {
    handleScroll();
    // const observer = new MutationObserver(handleScroll);
    //   observer.observe(document.querySelector(".wiki-contents__body"), {
    //     attributes: true,
    //     childList: true,
    //     subtree: true,
    //   });
  });

  return (
    <div
      className={classNames(styles.footer, {
        [styles.home]: isHome,
        [styles.scroll]: isScroll,
        WikiFooter_mounted: isMounted,
      })}
    >
      <div className={styles.box}>
        <div className={styles.copyright}>
          <span className={classNames(styles.homehide, styles.name)}>
            <span className={styles.ersswiki}>耳斯百科</span>
            <span>开发版 {version}</span>
          </span>
          {/* <span>最后更新：{ buildTime }</span> */}
          <span id="beian">
            互联网ICP备案：{" "}
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#333" }}
            >
              闽ICP备2022010207号-2
            </a>
          </span>
          <span id="copyright">{copyright}</span>
          <hr className={classNames(styles.pcshow, styles.homehide)} />
          <span className={classNames(styles.pcshow, styles.homehide)}>
            此网站为 厦门市音乐学校 <strong>非官方</strong>百科网，
          </span>
          <span className={classNames(styles.pcshow, styles.homehide)}>
            如需了解更多学校详情，请点此{" "}
            <a
              href="https://xmyyxx.xmedu.cn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              进入学校官网
            </a>
            。
          </span>
          <span>
            <strong>开发中页面，不代表最终品质，且不保证访问质量</strong>
          </span>
        </div>
        <div className={classNames(styles.fill, styles.homehide)}></div>
        <div className={classNames(styles.tips, styles.homehide)}>
          <span className={styles.logo}>
            <WikiLogo isHome={isHome} isFooter={true} />
          </span>
        </div>
      </div>
    </div>
  );
}
