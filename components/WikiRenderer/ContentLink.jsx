/**
 * @author Sukka
 * @see https://blog.skk.moe/post/use-nextjs-and-hexo-to-rebuild-my-blog
 */

import Link from "next/link";

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

export default function ContentLink(props) {
  const { href, ...rest } = props;

  if (isExternalLink(href)) {
    return <a {...props} target="_blank" rel="noopener noreferrer nofollow" />;
  }

  return (
    // <Link href={href} passHref>
    <a href={href} {...rest} />
    // </Link>
  );
}
