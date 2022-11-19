import Link from "next/link";
import IconHome from "../icons/IconHome";
import WikiSearch from "../WikiSearch/WikiSearch";
import classNames from "classnames";
import styles from "./WikiHeader.module.scss";
import React, { useEffect, useState, useRef } from "react";

export default function WikiHeader(props) {
  const { title = "耳斯名言" } = props;
  const [HeaderContent, setHeaderContent] = useState(null);
  const headerRef = useRef(null);

  const Header = React.forwardRef((props, ref) => {
    const { text = "耳斯名言", className, ...rest } = props;

    return (
      <div
        className={classNames("sm:show", styles.header, className)}
        ref={ref}
        {...rest}
      >
        <div className={styles.nav}>
          <Link href="/">
            <a className={styles.iconHome}>
              <IconHome />
            </a>
          </Link>
          <div className={styles.logoText}>
            <Link href="/">{text}</Link>
          </div>
          <WikiSearch />
        </div>
      </div>
    );
  });

  useEffect(() => {
    const onScroll = () => {
      const percentage = Math.max(
        0,
        Math.min(
          (window.pageYOffset - 100) /
            (document.documentElement.clientHeight - 100) /
            0.17,
          1
        )
      );
      if (window.scrollY > 100) {
        headerRef.current.style.opacity = percentage;
      } else {
        headerRef.current.style.opacity = 0;
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  useEffect(() => {
    setHeaderContent(
      <Header
        text={title}
        ref={headerRef}
        className={styles.contentHeader}
        style={{
          opacity: 0,
        }}
      />
    );
  }, []);

  return (
    <>
      {HeaderContent}
      <Header />
    </>
  );
}
