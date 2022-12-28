import Script from "next/script";
import Common from "../components/Common";

import "normalize.css";
import "../styles/global.scss";
import "../styles/custom.scss";
import "react-photo-view/dist/react-photo-view.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Common />
      <Script
        async
        defer
        data-website-id="8f7c6463-9ca3-48a1-b82b-55bef7bd0cc9"
        data-host-url="https://a.xhemj.work"
        src="https://cdn.erssbk.com/js/wiki.js"
      />
    </>
  );
}
