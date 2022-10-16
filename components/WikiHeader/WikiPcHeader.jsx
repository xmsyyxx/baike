import Link from "next/link";
import IconHome from "../icons/IconHome";
import WikiPcSearch from "../WikiSearch/WikiPcSearch";
import styles from "./WikiPcHeader.module.scss";

export default function WikiPcHeader() {
	return (
		<div className={styles.header}>
			<div className={styles.nav}>
				<div className={styles.logo}>
					<div className={styles.logoItem}>
						<picture className={styles.image}>
							<source
								type="image/webp"
								srcSet="https://wikioss.xhemj.work/static/logo/v3/512x512.png/normal.webp"
							/>
							<img src="https://wikioss.xhemj.work/static/logo/v3/512x512.png" />
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
