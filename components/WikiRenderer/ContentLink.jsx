/**
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

import { useState } from "react";
import LinkWithHoverCard from "./link/LinkWithHoverCard";

const isExternalLink = (href) => {
  if (!href) {
    return false;
  }
  if (!/^(\/\/|http(s)?:)/.test(href)) return false;
  if (href.startsWith("https://www.erssbk.com")) {
    return false;
  }

  let urlObj = undefined;
  try {
    urlObj = new URL(href, "https://www.erssbk.com");
  } catch (e) {}
  if (typeof urlObj !== "object") return false;
  if (urlObj.origin === "null") return false;
  if (urlObj.hostname !== "www.erssbk.com") return true;
  return false;
};

const isHashLink = (href) => {
  return href && href.startsWith("#");
};

export default function ContentLink(props) {
  const { href, ...rest } = props;

  if (isExternalLink(href)) {
    return <a {...props} target="_blank" rel="noopener noreferrer nofollow" />;
  }

  if (isHashLink(href)) {
    return <a {...props} />;
  }

  return (
    <LinkWithHoverCard item={href}>
      <a href={href} {...rest} />
    </LinkWithHoverCard>
  );
}
