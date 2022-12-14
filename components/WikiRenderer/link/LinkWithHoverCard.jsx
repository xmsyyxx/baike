import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as HoverCard from "@radix-ui/react-hover-card";
import WikiPreview from "../../WikiPreview/WikiPreview";
import Link from "./Link";

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
    animation: ${fadeInUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state="closed"] {
    animation: ${fadeOutDown} 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export default function LinkWithHoverCard(props) {
  const { children, item } = props;
  // if (isMobile) return <LinkWithModal item={item}>{children}</LinkWithModal>;

  return (
    <HoverCard.Root openDelay={350}>
      <HoverCard.Trigger asChild>
        <a {...children.props} data-link />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCardContent
          className="HoverCardContent inline-white bg-white leading-5 
          w-80 z-50 rounded-lg shadow-lg hover:shadow-xl border-[1px] 
          border-gray-100 border-solid transition-shadow"
          collisionPadding={10}
        >
          <WikiPreview type="text" item={decodeURIComponent(item)} />
          <HoverCard.Arrow className="HoverCardArrow invisible" />
        </HoverCardContent>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
