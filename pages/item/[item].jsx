import WikiPcContents from "../../components/layouts/WikiPcContents";
import styles from "./item.module.scss";

// export const getStaticProps = async () => {
// 	const allPosts = getAllPosts(["title"]);

// 	return {
// 		props: { allPosts },
// 	};
// };

export default function WikiItem() {
	return (
		<>
			<WikiPcContents></WikiPcContents>
		</>
	);
}
