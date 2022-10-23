import Head from "next/head";
import { getStaticPaths } from "../../lib/getStaticData";

export async function getStaticProps({ params }) {
	return {
		props: { slug: params.item },
	};
}

export { getStaticPaths };

export default function WikiItem(props) {
	const { slug } = props;
	return (
		<>
			<Head>
				<link rel="canonical" href="https://www.erssbk.com" />
				<meta name="robots" content="noindex" />
				<meta charset="utf-8" />
				<meta http-equiv="refresh" content={"0; url=/item/" + slug} />
			</Head>
		</>
	);
}
