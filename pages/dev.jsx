import {
  TextSkeleton,
  TextContents,
} from "../components/WikiPreview/PreviewWithText";

export default function Dev() {
  return (
    <>
      <div className="relative">
        <TextSkeleton />
      </div>
    </>
  );
}
