import Skeleton from "@mui/material/Skeleton";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

export const TextContents = (props) => {
  const { item, image, text } = props;

  return (
    <div
      className="relative overflow-hidden w-full cursor-pointer"
      onClick={() => {
        location.href = `/item/${encodeURIComponent(item)}`;
      }}
    >
      <div className="m-4 leading-normal text-sm font-normal">
        {image && (
          <AspectRatioPrimitive.Root ratio={16 / 9} className="mb-2">
            <picture>
              <source srcSet={image + "/twitter_card.webp"} type="image/webp" />
              <img
                src={image + "/twitter_card.jpg"}
                alt={item}
                className="w-full h-full object-cover mb-2 rounded-md bg-slate-50"
              />
            </picture>
          </AspectRatioPrimitive.Root>
        )}
        <p className="block min-h-16 max-h-32 overflow-hidden indent-0 m-0">
          <strong className="font-bold">{item}</strong>：{text}
        </p>
        <div className="flex justify-end mt-2">
          <a className="text-md" href={"/item/" + item}>
            了解更多
          </a>
        </div>
      </div>
    </div>
  );
};

export const TextSkeleton = () => {
  return (
    <div className="relative m-4">
      {/* <AspectRatioPrimitive.Root ratio={16 / 9} className="mb-2">
        <Skeleton variant="rounded" width="100%" height="100%" />
      </AspectRatioPrimitive.Root> */}
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} />
      <Skeleton variant="text" sx={{ fontSize: "0.875rem" }} width="60%" />
    </div>
  );
};
