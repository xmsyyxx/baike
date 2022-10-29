import Link from "next/link";
import IconHome from "../icons/IconHome";
import WikiSearch from "../WikiSearch/WikiSearch";
import classNames from "classNames";
import styles from "./WikiHeader.module.scss";

export default function WikiHeader() {
  return (
    <div className={classNames("sm:show", styles.header)}>
      <div className={styles.nav}>
        <Link href="/">
          <a className={styles.iconHome}>
            <IconHome />
          </a>
        </Link>
        <div className={styles.logoText}>
          <Link href="/">耳斯百科</Link>
        </div>
        <WikiSearch />
      </div>
    </div>
  );
}
