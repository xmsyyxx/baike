import dayjs from "dayjs";
import styles from "./WikiPcStatus.module.scss";

export default function WikiPcStatus(props) {
	const { created, updated } = props;

	const formatTime = (time) => dayjs(time).format("YYYY年MM月DD日");

	return (
		<div className={styles.status}>
			<div className={styles.tips}>统计信息</div>
			<div className={styles.list}>
				<ul>
					<li v-if="created" className={styles.item}>
						<div className={styles.title}>创建时间</div>
						<div className={styles.text}>{formatTime(created)}</div>
					</li>
					<li v-if="updated" className={styles.item}>
						<div className={styles.title}>更新时间</div>
						<div className={styles.text}>{formatTime(updated)}</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
