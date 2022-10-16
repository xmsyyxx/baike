import "normalize.css";
import "../styles/global.scss";
import "../styles/custom.scss";

import "react-photo-view/dist/react-photo-view.css";

import Common from "../components/Common";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Common />
    </>
  );
}
