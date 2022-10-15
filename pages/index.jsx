import WikiHome from "../components/layouts/WikiHome";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import WikiFooter from "../components/WikiFooter/WikiFooter";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <WikiHome>
        <Head>
          <title>耳斯百科</title>
        </Head>
        <div className="wiki-app"></div>
        <WikiFooter isHome={true} />
      </WikiHome>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
