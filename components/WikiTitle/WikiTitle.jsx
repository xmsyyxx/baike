import classNames from "classnames";
import IconPrinter from "../icons/IconPrinter";
import styles from "./WikiTitle.module.scss";

export default function WikiTitle(props) {
  const { title, description } = props;

  const print = () => {
    const body = document.body;
    body.classList.add("wiki-printing");
    window.print();
    body.classList.remove("wiki-printing");
  };

  return (
    <div className={styles.infomation}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      <div className={styles.right}>
        <div
          className={classNames(styles.print, "wiki-action")}
          onClick={print}
        >
          <IconPrinter />
          <span>打印</span>
        </div>
      </div>
    </div>
  );
}
