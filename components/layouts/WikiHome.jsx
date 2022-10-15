import Meta from "../meta";
import styles from "./WikiHome.module.scss";

export default function WikiHome({ children }) {
  return (
    <>
      <Meta />
      <div className={styles.body}>{children}</div>
    </>
  );
}
