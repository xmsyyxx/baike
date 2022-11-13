import { useState } from "react";
import { useId } from "react";
import * as Portal from "@radix-ui/react-portal";
import useDevice from "../../../lib/hooks/useDevice";
import IconClose from "../../icons/IconClose";
import WikiPreview from "../../WikiPreview/WikiPreview";

const CardModal = (props) => {
  const { children, item } = props;
  const labelName = useId();
  const itemName = decodeURIComponent(item);

  return (
    <>
      <a>
        <label htmlFor={labelName}>{itemName}</label>
      </a>

      <Portal.Root>
        <input type="checkbox" id={labelName} className="modal-toggle" />
        <div className="modal modal-bottom z-[1000] duration-300" {...props}>
          <div className="modal-box rounded-t-2xl w-full">
            <label
              htmlFor={labelName}
              className="btn btn-ghost absolute right-0 top-0"
            >
              <IconClose />
            </label>
            {/* <h3 className="my-2 font-bold text-lg">词条预览</h3> */}
            <WikiPreview type="text" item={itemName} />
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  location.href = `/item/${item}`;
                }}
              >
                前往词条
              </button>
            </div>
          </div>
        </div>
      </Portal.Root>
    </>
  );
};

export default function LinkWithModal(props) {
  const [device] = useDevice();
  //   const [isOpen, setIsOpen] = useState(false);
  const isMobile = device === "mobile";

  if (!isMobile) return null;
  return <CardModal {...props} />;
}
