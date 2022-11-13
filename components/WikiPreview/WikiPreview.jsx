import useSWR from "swr";
import { CardContents, CardSkeleton } from "./PreviewWithCard";
import { TextContents, TextSkeleton } from "./PreviewWithText";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API_ENDPOINT = "https://service.erssbk.com/api/preview/";

export default function WikiPreview(props) {
  const {
    item = "解恪布",
    type = "card", // card, text
  } = props;

  const { data, error } = useSWR(
    `${API_ENDPOINT}${encodeURIComponent(item)}.json`,
    fetcher
  );

  const previewImage = data?.img;
  const previewBody = data?.preview;
  const previewTags = data?.tags;

  if (error) return null;
  if (!data) {
    if (type === "card") {
      return <CardSkeleton />;
    } else if (type === "text") {
      return <TextSkeleton />;
    }
  }
  const attrs = {
    item: item,
    image: previewImage,
    text: previewBody,
    tags: previewTags,
  };
  if (type === "card") {
    return <CardContents {...attrs} />;
  } else if (type === "text") {
    return <TextContents {...attrs} />;
  }
}
