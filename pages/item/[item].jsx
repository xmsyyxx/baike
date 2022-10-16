import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import WikiPcContents from "../../components/layouts/WikiPcContents";
import WikiRenderer from "../../components/WikiRenderer/WikiRenderer";
import styles from "./item.module.scss";

export async function getStaticProps({ params }) {
	const wikiData = getPostBySlug(params.item, ["title", "content"]);

	return {
		props: { wikiData },
	};
}

export async function getStaticPaths() {
	const slugs = getAllPosts(["title"]);

	const paths = slugs.map((data) => {
		return { params: { item: data.title } };
	});
	return {
		paths: paths,
		fallback: false, // can also be true or 'blocking'
	};
}

export default function WikiItem({ wikiData }) {
	return (
		<>
			<WikiPcContents>
				<div className={styles.content}>
					<div className={styles.article}>
						<WikiRenderer data={wikiData.content} />
					</div>
				</div>
			</WikiPcContents>
		</>
	);
}
