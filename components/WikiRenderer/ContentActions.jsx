import { useEffect } from "react";
import { useState } from "react";
import WikiVideo from "../WikiVideo/WikiVideo";

export default function ContentActions(props) {
  const children = props.children;
  const [content, setContent] = useState(null);

  useEffect(() => {
    const inputValue = children[0].props.children[0];
    const name = inputValue.split("{")[0];
    const attrs = inputValue.match(/(?<=\{).*(?=\})/g)[0];
    const getAttr = (attr) => {
      const items = attrs.split(",");
      for (let item of items) {
        if (item.includes(attr)) {
          return String(item.split("=")[1]).trim();
        }
      }
    };
    switch (name) {
      case "video": {
        const vcode = getAttr("vcode");
        const title = getAttr("title");
        setContent(
          <div className="relative">
            <WikiVideo vcode={vcode} title={title} />
          </div>
        );
      }
    }
  }, []);

  return content;
}
