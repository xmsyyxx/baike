import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import IconTime from "../icons/IconTime";
import styles from "./WikiLastModified.module.scss";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export default function WikiLastModified(props) {
	const { lastModified } = props;

	const lastModifiedTime = dayjs(lastModified).fromNow();

	return (
		<div className={styles.modified}>
			<div className={styles.box}>
				<div className={styles.maim}>
					<div className={styles.icon}>
						<IconTime />
					</div>
					<div className={styles.content}>
						<span>
							最后更新于 <strong>{lastModifiedTime}</strong>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
