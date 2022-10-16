import styles from "./WikiTags.module.scss";

export default function WikiTags(props) {
	const { tags } = props;

	if (!(Array.isArray(tags) && tags.length)) return null;
	return (
		<div className={styles.tags}>
			<ul className={styles.list}>
				{tags.map((item) => (
					<li key={item} className={styles.item}>
						# {item}
					</li>
				))}
			</ul>
		</div>
	);
}
