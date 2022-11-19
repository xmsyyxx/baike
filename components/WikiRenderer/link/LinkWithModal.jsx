import { useState } from "react";
import { useId } from "react";
import * as Portal from "@radix-ui/react-portal";
import useDevice from "../../../lib/hooks/useDevice";
import IconClose from "../../icons/IconClose";
import WikiPreview from "../../WikiPreview/WikiPreview";
import ModalController from "../../../lib/modalController";

const CardModal = (props) => {
  const { children, item, ...rest } = props;
  const itemName = decodeURIComponent(item);

  return (
    <>
      <a
        {...children.props}
        onClick={() => {
          const modal = new ModalController(
            (
              <>
                {/* <h3 className="my-2 font-bold text-lg">词条预览</h3> */}
                <WikiPreview type="text" item={itemName} />
                <div className="modal-action">
                  <a
                    onClick={() => {
                      location.href = `/item/${item}`;
                    }}
                  >
                    前往词条
                  </a>
                </div>
              </>
            )
          );
          modal.open();
        }}
      />
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
