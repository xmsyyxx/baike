import useSWR from "swr";
import Skeleton from "@mui/material/Skeleton";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API_ENDPOINT = "https://service.erssbk.com/api/preview/";

const Card = (props) => {
  const { item, image, tags, text } = props;
  return (
    <AspectRatioPrimitive.Root ratio={16 / 9}>
      <div className="card w-full max-w-96 h-full bg-base-100 shadow-xl image-full mb-4">
        <div className="w-auto h-auto">
          <picture>
            <source
              srcSet={image + "/card.webp"}
              type="image/webp"
              className="w-full h-full"
            />
            <img
              src={image + "/card.jpg"}
              alt={item}
              className="w-full h-full"
            />
          </picture>
        </div>
        <a className="card-body p-8" href={"/item/" + item}>
          <div className="flex justify-between">
            <h2 className="card-title font-bold text-white mb-0">{item}</h2>
            <div className="justify-end">
              {Array.isArray(tags) &&
                tags.length &&
                tags.map((tag) => {
                  return <div className="badge badge-outline ml-2">{tag}</div>;
                })}
            </div>
          </div>
          <p className="text-white indent-[2em] font-medium">{text}</p>
        </a>
      </div>
    </AspectRatioPrimitive.Root>
  );
};

export default function WikiPreviewCard(props) {
  const { item = "解恪布" } = props;

  const { data, error } = useSWR(
    `${API_ENDPOINT}${encodeURIComponent(item)}.json`,
    fetcher
  );

  const previewImage = data?.img
    ? data.img
    : "https://wikioss.xhemj.work/static/ersswiki-placeholder-image-1.jpg";
  const previewBody = data?.preview;
  const previewTags = data?.tags;

  if (error) return null;
  if (!data) {
    // return (
    //   <>
    //     <Skeleton variant="text" sx={{ fontSize: "1.75rem" }} width={150} />
    //     <Skeleton variant="rounded" width="100%" height={150} />
    //   </>
    // );
    return (
      <AspectRatioPrimitive.Root ratio={16 / 9}>
        <Skeleton variant="rounded" width="100%" height="100%" />
      </AspectRatioPrimitive.Root>
    );
  }
  return (
    <Card
      item={item}
      image={previewImage}
      text={previewBody}
      tags={previewTags}
    />
  );
}
