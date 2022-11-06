import classNames from "classnames";
import React, { useEffect, useState, useRef } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { isSupportWebp } from "../../lib/init";
import { useImageFullyLoaded } from "../../lib/hooks/useImageFullyLoaded";
import IconUp from "../icons/IconUp";
import { Image } from "./Image";
import styles from "./WikiPicture.module.scss";

/**
 * 百科正文和其它组件中的图片组件
 */
export default function WikiPicture(props) {
  const { alt, clickable = true, normalSuffix = "/normal" } = props;
  const webpSuffix = normalSuffix + ".webp";
  const _src = String(props.src).split("?");
  const src = _src?.[0] ? _src[0] : _src;
  const imageSize = _src?.[1] ? _src[1] : "x";
  const [imageURL, setImageURL] = useState(src + webpSuffix);

  const imageWidth = imageSize.split("x")[0] || "1024";
  const imageHeight = imageSize.split("x")[1] || "576";

  const imageElRef = useRef(null);

  const isSvg = () => String(src).endsWith(".svg");
  const isGif = () => String(src).endsWith(".gif");

  const isNeedShowNormalImage = () => {
    return src && (isSvg() || isGif());
  };

  useEffect(() => {
    const _suffix = normalSuffix + (isSupportWebp() ? ".webp" : ".jpg");
    setImageURL(src + (isNeedShowNormalImage() ? "" : _suffix));
  }, [src]);

  const isImageFullyLoaded = useImageFullyLoaded(imageElRef, imageURL);

  const ImageElement = React.forwardRef((props, ref) => {
    return (
      <Image
        className={styles.realImage}
        width={imageWidth}
        height={imageHeight}
        ref={ref}
        decoding="async"
        crossOrigin="anonymous"
        src={imageURL}
        alt={alt}
        title={alt}
        {...props}
      />
    );
  });

  return (
    <div className={classNames("wiki-picture", styles.picture)}>
      <div className={styles.box}>
        <PhotoProvider maskOpacity={0.8}>
          <div className={styles.placeholder}>
            <div
              className={styles.loadingBox}
              style={{
                backgroundColor: isImageFullyLoaded ? undefined : "#eee",
              }}
            >
              <img
                width={imageWidth}
                height={imageHeight}
                alt={alt}
                src={`data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27${imageWidth}%27%20height=%27${imageHeight}%27/%3e`}
              />
            </div>
            {isNeedShowNormalImage() ? (
              // <a href={imageURL} target="_blank">
              //   {ImageElement}
              // </a>
              <ImageElement
                ref={imageElRef}
                onClick={() => {
                  return window.open(imageURL, "_blank");
                }}
              />
            ) : (
              <PhotoView
                src={imageURL}
                key={imageURL}
                width={imageWidth}
                height={imageHeight}
              >
                <ImageElement ref={imageElRef} />
              </PhotoView>
            )}
          </div>
        </PhotoProvider>
      </div>
      {alt && (
        <label className={styles.description}>
          <div className={styles.tips}>
            <div className={styles.tipsIcon}>
              <IconUp />
            </div>
            {alt}
          </div>
          <div className={styles.tipsItem}>（点击可查看大图）</div>
        </label>
      )}
    </div>
  );
}
