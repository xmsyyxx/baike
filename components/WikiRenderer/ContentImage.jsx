import WikiPicture from "../WikiPicture/WikiPicture";

export default function ContentImage(props) {
  const { src, title, ...rest } = props;

  return <WikiPicture src={src} title={title} {...rest} />;
}
