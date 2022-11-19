import React from "react";

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

export default React.forwardRef((props, ref) => {
  const { href, _onclick, ...rest } = props;

  if (isExternalLink(href)) {
    return (
      <a
        {...props}
        ref={ref}
        target="_blank"
        rel="noopener noreferrer nofollow"
      />
    );
  }

  if (isHashLink(href)) {
    return <a href={href} ref={ref} {...rest} />;
  }

  return (
    <a
      href={href}
      onClick={(e) => {
        typeof _onclick === "function" && _onclick(e);
      }}
      ref={ref}
      {...rest}
    />
  );
});