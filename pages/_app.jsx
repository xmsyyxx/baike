import { useEffect } from "react";
import { useRouter } from "next/router";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { styletron } from "../styletron";
import Common from "../components/Common";

import "normalize.css";
import "../styles/global.scss";
import "../styles/custom.scss";
import "react-photo-view/dist/react-photo-view.css";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      console.log(
        `App is changing to ${url} ${
          shallow ? "with" : "without"
        } shallow routing`
      );
    };

    router.events.on("routeChangeStart", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  return (
    <>
      <StyletronProvider value={styletron} debug={debug} debugAfterHydration>
        <Component {...pageProps} />
        <Common />
      </StyletronProvider>
    </>
  );
}
