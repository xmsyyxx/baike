import classNames from "classNames";
import WikiRenderer from "../WikiRenderer/WikiRenderer";
import styles from "./WikiBaseIntroductions.module.scss";

export default function WikiBaseIntroductions(props) {
	const { data, style } = props;
	if (!data) return null;
	return (
		<div
			className={classNames("wiki-introductions", styles.introductions)}
			style={style}
		>
			<WikiRenderer tree={data} />
		</div>
	);
}
