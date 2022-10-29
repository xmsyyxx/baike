import classNames from "classNames";
import React, { Fragment, useEffect, useState } from "react";
import { getStaticProps, getStaticPaths } from "../../lib/getStaticData";
import WikiRenderer from "../../components/WikiRenderer/WikiRenderer";
import Header from "../../components/WikiHeader/Header";
import WikiTitle from "../../components/WikiTitle/WikiTitle";
import WikiTags from "../../components/WikiTags/WikiTags";
import WikiBaseIntroductions from "../../components/WikiBaseIntroductions/WikiBaseIntroductions";
import WikiPicture from "../../components/WikiPicture/WikiPicture";
import WikiPcDetailsList from "../../components/WikiDetailsList/WikiPcDetailsList";
import WikiDetailsList from "../../components/WikiDetailsList/WikiDetailsList";
// import WikiStatus from "../../components/WikiStatus/WikiStatus";
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

    setSearchModalContent(SearchModal);
  }, [title]);

  return (
    <>
      <div className={styles.item}>
        <Header title={title} />
        <div className={styles.box}>
          <div className={styles.content}>
            <WikiTitle title={title} description={description} />
            {tags && <WikiTags tags={tags} />}
            <div className={styles.main}>
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
            </div>
          </div>
        </div>
        <WikiFooter />
      </div>
      {SearchModalContent}
    </>
  );
}
