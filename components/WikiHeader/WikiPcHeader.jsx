import Link from "next/link";
import WikiPcSearch from "../WikiSearch/WikiPcSearch";
import classNames from "classnames";
import styles from "./WikiPcHeader.module.scss";

export default function WikiPcHeader() {
  return (
    <div className={classNames("sm:hide", styles.header)}>
      <div className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoItem}>
            <picture className={styles.image}>
              <source
                type="image/webp"
                srcSet="https://cdn.erssbk.com/static/logo/v3/512x512.png?fmt=webp"
              />
              <img src="https://cdn.erssbk.com/static/logo/v3/512x512.png" />
            </picture>
          </div>
          <Link href="/">耳斯百科</Link>
        </div>
        <WikiPcSearch />
        <div className={styles.tips}></div>
      </div>
    </div>
  );
}
