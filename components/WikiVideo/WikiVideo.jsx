import React, { useState } from "react";
import { useMount } from "../../lib/hooks";
import { loadJs } from "../../lib/init";
import IconUp from "../icons/IconUp";
import styles from "./WikiVideo.module.scss";

export default function WikiVideo(props) {
	const { vcode, title } = props;
	const [isLoaded, setIsLoaded] = useState(false);
	const playerBoxRef = React.createRef();

	useMount(() => {
		loadJs("https://player.dogecloud.com/js/loader.js").then(() => {
			const player =
				window.DogePlayer &&
				new window.DogePlayer({
					container: playerBoxRef.current,
					userId: 1943,
					vcode: vcode,
					autoPlay: false,
				});
			player.on("infoLoaded", () => {
				setIsLoaded(true);
			});
		});
	});

	return (
		<div className={styles.video}>
			<div ref={playerBoxRef} className={styles.box}></div>
			{title && isLoaded && (
				<label className={styles.description}>
					<span className={styles.tips}>
						<span className={styles.tipsIcon}>
							<IconUp />
						</span>
						{title}
					</span>
				</label>
			)}
		</div>
	);
}
