import Skeleton from "@mui/material/Skeleton";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";
import { imageSuffix } from "../../lib/init";

export const CardContents = (props) => {
  const { item, image, tags, text, isClickable = true } = props;
  const imgUrl =
    image || "https://cdn.erssbk.com/static/ersswiki-placeholder-image-1.jpg";

  return (
    <div className="card w-full max-w-full h-full bg-base-100 shadow-xl image-full mb-4">
      <div className="w-auto h-auto">
        <picture>
          <source
            srcSet={imgUrl + imageSuffix.twitter_card_webp}
            type="image/webp"
          />
          <img
            src={imgUrl + imageSuffix.twitter_card_jpg}
            alt={item}
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      <div
        className="card-body p-8"
        onClick={() => {
          isClickable && (location.href = "/item/" + item);
        }}
      >
        <div className="flex justify-between">
          <h2 className="card-title font-bold text-white mb-0">{item}</h2>
          <div className="flex justify-end my-auto">
            {Array.isArray(tags) &&
              tags.length &&
              tags.map((tag) => {
                return (
                  <div className="badge badge-outline ml-2" key={tag}>
                    {tag}
                  </div>
                );
              })}
          </div>
        </div>
        <p className="text-white indent-[2em] font-medium">{text}</p>
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <AspectRatioPrimitive.Root ratio={16 / 9}>
      <Skeleton variant="rounded" width="100%" height="100%" />
    </AspectRatioPrimitive.Root>
  );
};
