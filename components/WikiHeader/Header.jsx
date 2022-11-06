import classNames from "classnames";
import WikiHeader from "./WikiHeader";
import WikiPcHeader from "./WikiPcHeader";

export default function Header(props) {
  return (
    <>
      <WikiHeader {...props} />
      <WikiPcHeader {...props} />
    </>
  );
}
