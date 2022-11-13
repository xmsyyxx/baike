import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as HoverCard from "@radix-ui/react-hover-card";
import useDevice from "../../../lib/hooks/useDevice";
import WikiPreview from "../../WikiPreview/WikiPreview";
import LinkWithModal from "./LinkWithModal";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutDown = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translateY(30px);
  }
`;

const HoverCardContent = styled(HoverCard.Content)`
  &[data-state="open"] {
    animation: ${fadeInUp} 0.3s ease-in-out;
  }
  &[data-state="closed"] {
    animation: ${fadeOutDown} 0.25s ease-in-out;
  }
`;

export default function LinkWithHoverCard(props) {
  const { children, item } = props;
  const [device] = useDevice();
  const isMobile = device === "mobile";
  if (isMobile) return <LinkWithModal item={item}>{children} </LinkWithModal>;

  return (
    <HoverCard.Root openDelay={350}>
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCardContent
          className="HoverCardContent inline-white bg-white leading-5 w-80 z-50 
        rounded-lg shadow-xl border-[1px] border-gray-100 border-solid"
        >
          <WikiPreview type="text" item={decodeURIComponent(item)} />
          <HoverCard.Arrow className="HoverCardArrow fill-gray-100" />
        </HoverCardContent>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
