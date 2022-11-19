import LinkWithHoverCard from "./link/LinkWithHoverCard";

export default function ContentLink(props) {
  const { href, ...rest } = props;
  return (
    <LinkWithHoverCard item={href}>
      <a href={href} {...rest} />
    </LinkWithHoverCard>
  );
}
