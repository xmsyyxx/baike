import { useMount } from "../lib/hooks";
import { isSupportWebp } from "../lib/init";

export default function Common() {
	useMount(() => {
		const body = document.querySelector("body");
		if (body) {
			isSupportWebp()
				? body.classList.add("webp")
				: body.classList.add("no-webp");
		}
	});
	return null;
}
