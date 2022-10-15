import WikiPicture from "../WikiPicture/WikiPicture";
import styles from "./WikiAvatarCard.module.scss";

export default function WikiAvatarCard(props) {
  const { img, children } = props;

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <WikiPicture src={img} clickable={false} />
        </div>
        <div className={styles.name}>{children}</div>
      </div>
      <style global jsx>{`
        .wiki-avatar__list {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }

        @media only screen and (max-width: 500px) {
          .wiki-avatar__list {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
