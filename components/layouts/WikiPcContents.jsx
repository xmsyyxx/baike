import WikiPcHeader from "../WikiHeader/WikiPcHeader";
import WikiFooter from "../WikiFooter/WikiFooter";
import styles from "./WikiPcContents.module.scss";

export default function WikiPcContents({ children }) {
	return (
		<>
			<style global jsx>{`
				body {
					overflow-x: auto;
				}
			`}</style>
			<WikiPcHeader />
			<div className={styles.contents}>{children}</div>
			<WikiFooter />
		</>
	);
}
