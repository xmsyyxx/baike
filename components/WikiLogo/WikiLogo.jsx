import classNames from "classnames";
import styles from "./WikiLogo.module.scss";

export default function WikiLogo(props) {
  const { isHome, isFooter } = props;
  return (
    <div
      className={classNames(styles.logo, {
        [styles.home]: isHome,
        [styles.isfooter]: isFooter,
      })}
    >
      <div className={styles.box}>
        <picture className={styles.image}>
          <source
            type="image/webp"
            srcSet="
            https://wikioss.xhemj.work/static/logo/v3/512x512.png/normal.webp
          "
          />
          <img src="https://wikioss.xhemj.work/static/logo/v3/512x512.png" />
        </picture>
      </div>
      <span className={styles.text}>耳斯百科</span>
      <div className={styles.tips}>开发版</div>
    </div>
  );
}
