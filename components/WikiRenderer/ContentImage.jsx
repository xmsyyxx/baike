import { useEffect, useState } from "react";
import WikiPicture from "../WikiPicture/WikiPicture";

export default function ContentImage(props) {
  const { src, title, ...rest } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // return <WikiPicture src={src} title={title} {...rest} />;
  return isClient ? <WikiPicture src={src} title={title} {...rest} /> : null;
}
