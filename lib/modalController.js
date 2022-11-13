import React, { Fragment, useEffect, useState } from "react";
import * as ReactDOM from "react-dom/client";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import IconClose from "../components/icons/IconClose";

const randomId = () => Math.random().toString(36).substr(2, 5);

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

const Modal = React.forwardRef((props, ref) => {
  const { modalId, children, onClose, ...rest } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsShown, setModalIsShown] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setIsOpen(true);
      ref.current.checked = true;
    }
  }, [isOpen]);

  if (!modalIsShown) return null;

  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" ref={ref} />
      <div className="modal modal-bottom z-[1000] duration-300" {...rest}>
        <div className="modal-box rounded-t-2xl w-full">
          <label
            htmlFor={modalId}
            className="btn btn-ghost absolute right-0 top-0 z-[1000]"
            onClick={() => {
              setModalIsShown(false);
              //   ref.current.checked = false;
              onClose();
            }}
          >
            <IconClose />
          </label>
          {children}
        </div>
      </div>
    </>
  );
});

const AnimetedModal = Modal;

export default class ModalController {
  constructor(children = Fragment) {
    this.children = children;
    this.inputRef = React.createRef();
    this.modalId = "modal-" + randomId();
    this.targetElement = null;
  }

  open() {
    const modalContainer = document.getElementById("modal-controller");
    const modalElement = document.createElement("div");
    modalElement.id = this.modalId;
    modalContainer.appendChild(modalElement);
    const root = ReactDOM.createRoot(modalElement);

    const onClose = () => {
      root.unmount();
      modalContainer.removeChild(modalElement);
    };

    root.render(
      <AnimetedModal
        modalId={this.modalId}
        onClose={onClose}
        ref={this.inputRef}
      >
        {this.children}
      </AnimetedModal>
    );
  }

  close() {
    this.targetElement.remove();
    this.targetElement = null;
    this.inputRef.current.checked = false;
  }
}
