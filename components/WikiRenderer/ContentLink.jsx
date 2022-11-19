import Link from "./link/Link";

export default function ContentLink(props) {
  const { href, ...rest } = props;
  return <Link href={href} {...rest} />;
}
