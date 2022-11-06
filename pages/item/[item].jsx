import classNames from "classnames";
import Head from "next/head";
import React, { Fragment, useEffect, useState } from "react";
import { getStaticProps, getStaticPaths } from "../../lib/getStaticData";
import Meta from "../../components/meta";
import WikiRenderer from "../../components/WikiRenderer/WikiRenderer";
import Header from "../../components/WikiHeader/Header";
import WikiTitle from "../../components/WikiTitle/WikiTitle";
import WikiTags from "../../components/WikiTags/WikiTags";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions/WikiBaseIntroductions";
import WikiPicture from "../../components/WikiPicture/WikiPicture";
import WikiPcDetailsList from "../../components/WikiDetailsList/WikiPcDetailsList";
import WikiDetailsList from "../../components/WikiDetailsList/WikiDetailsList";
import WikiLastModified from "../../components/WikiLastModified/WikiLastModified";
import WikiPcStatus from "../../components/WikiStatus/WikiPcStatus";
import WikiFooter from "../../components/WikiFooter/WikiFooter";
import SearchModal from "../../components/WikiSearch/SearchModal";
import styles from "./item.module.scss";

export { getStaticProps, getStaticPaths };
export default function WikiItem(props) {
  const [DetailsContent, setDetailsContent] = useState(Fragment);
  const [SearchModalContent, setSearchModalContent] = useState(Fragment);

  const {
    tree,
    title,
    description,
    tags,
    introduction,
    img,
    info,
    createdAt,
    updatedAt,
  } = props;

  const wikiImgObj =
    typeof img === "string"
      ? {
          url: img,
          title: null,
        }
      : {
          url: img?.url,
          title: img?.title,
        };

  useEffect(() => {
    setDetailsContent(
      <div className={classNames("sm:hide", styles.sticky)}>
        <WikiPcDetailsList data={info} title={title} tags={tags} />
        {(createdAt || updatedAt) && (
          <WikiPcStatus created={createdAt} updated={updatedAt} />
        )}
      </div>
    );

    setSearchModalContent(<SearchModal />);
  }, [title]);

  return (
    <>
      <Meta />
      <Head>
        <title>{`${title} - 耳斯百科`}</title>
        <link rel="canonical" href={`https://www.erssbk.com/item/${title}`} />
        <meta name="description" content={description} />
        <meta name="keywords" content={`${title},耳斯百科`} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={`${title} - 耳斯百科`} />
        <meta name="og:site_name" content="耳斯百科" />
        <meta name="og:url" content={`https://www.erssbk.com/item/${title}`} />
        <meta name="og:description" content={description} />
      </Head>
      <div className={styles.item}>
        <Header title={title} />
        <div className={styles.box}>
          <div className={styles.content}>
            <WikiTitle title={title} description={description} />
            {tags && <WikiTags tags={tags} />}
            <div className={styles.main}>
              {/* 左侧内容 */}
              <div className={styles.left}>
                {introduction && <WikiBaseIntroductions data={introduction} />}
                {info && (
                  <div className="sm:show">
                    <WikiDetailsList data={info} />
                  </div>
                )}
                <hr className={classNames("sm:show", styles.hr)} />
                <div className={classNames("wiki-contents", styles.article)}>
                  <WikiRenderer tree={tree} />
                </div>
              </div>
              {/* 左侧内容结束 */}

              {/* 右侧内容 */}
              <div className={styles.right}>
                {wikiImgObj.url && (
                  <WikiPicture
                    src={wikiImgObj.url}
                    alt={wikiImgObj.title || title}
                    normalSuffix="/twitter_card"
                    thumbSuffix="/twitter_card"
                  />
                )}
                {DetailsContent}
              </div>
              {/* 右侧内容结束 */}
            </div>
          </div>
        </div>
        <WikiLastModified lastModified={updatedAt} />
        <WikiFooter />
      </div>
      <div className="sm:show">{SearchModalContent}</div>
    </>
  );
}
