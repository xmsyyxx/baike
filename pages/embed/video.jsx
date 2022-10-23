import { Fragment } from "react";
import { useEffect, useState } from "react";
import WikiVideo from "../../components/WikiVideo/WikiVideo";

export default function WikiVideoEmbed() {
  const [content, setContent] = useState(Fragment);

  useEffect(() => {
    const vcode = window.location.search.replace("?v=", "");
    setContent(<WikiVideo vcode={vcode} />);
  }, []);

  return content;
}
