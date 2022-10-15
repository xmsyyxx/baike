import styles from "./WikiBaseIntroductions.module.scss";

export default function WikiBaseIntroductions(props) {
	const { data } = props;
	const introductions = data
		? String(data)
				.split("\n")
				.filter((content) => {
					return content && content.trim();
				})
		: [];

	if (!data) return null;
	return (
		<div className={styles.introductions}>
			{introductions.map((text) => (
				<p className={styles.text} key={text}>
					{text}
				</p>
			))}
		</div>
	);
}
