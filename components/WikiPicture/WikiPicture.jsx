import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { isSupportWebp } from "../../lib/init";
import IconUp from "../icons/IconUp";
import styles from "./WikiPicture.module.scss";

/**
 * 百科正文和其它组件中的图片组件
 */
export default function WikiPicture(props) {
  const {
    src,
    title,
    clickable = true,
    thumbSuffix = "/thumb",
    normalSuffix = "/normal",
  } = props;
  const [suffix, setSuffix] = useState(thumbSuffix + ".jpg");
  const [webpSuffix, setWebpSuffix] = useState(thumbSuffix + ".webp");
  const [imageURL, setImageURL] = useState(src);

  const isPreFetchBot = () => {
    const search = window.location.search;
    const URLSearchParams = window.URLSearchParams;
    return (
      URLSearchParams && !!(new URLSearchParams(search).get("bot") === "1")
    );
  };

  const isGif = () => {
    return src && String(src).endsWith(".gif");
  };

  const onNormalLoad = () => {
    if (isPreFetchBot()) return;
    setSuffix(normalSuffix + ".jpg");
    setWebpSuffix(normalSuffix + ".webp");
  };

  const WikiImage = React.forwardRef((props, ref) => (
    <img
      src={src + (!isGif() ? suffix : "")}
      alt={title}
      title={title}
      className={classNames({
        [styles.clickable]: clickable,
      })}
      onLoad={onNormalLoad}
      ref={ref}
      {...props}
    />
  ));

  useEffect(() => {
    onNormalLoad();
    const suffix = "/normal" + (isSupportWebp() ? ".webp" : ".jpg");
    const url = src + (isGif() ? "" : suffix);
    setImageURL(url);
  });

  return (
    <div className={styles.picture}>
      <div className={styles.fill}></div>
      <div className={styles.box}>
        <PhotoProvider maskOpacity={0.8}>
          <picture
            className={classNames(styles.img, {
              "wiki--click--WikiPicture": clickable,
            })}
          >
            {!isGif() && <source type="image/webp" srcSet={src + webpSuffix} />}
            {clickable ? (
              <PhotoView key={src} src={imageURL}>
                <WikiImage />
              </PhotoView>
            ) : (
              <WikiImage />
            )}
          </picture>
        </PhotoProvider>
        {title && (
          <label className={styles.description}>
            <span className={styles.tips}>
              <span className={styles.tipsIcon}>
                <IconUp />
              </span>
              {title}
            </span>
            <div className={styles.tipsItem}>（点击可查看大图）</div>
          </label>
        )}
      </div>
    </div>
  );
}
