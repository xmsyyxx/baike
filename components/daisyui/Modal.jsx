import classNames from "classNames";
import { useId } from "react";

export default function Modal(props) {
	const {
		button = "点击",
		position = "center",
		close = "关闭",
		closeByClickOutside = false,
		children,
	} = props;
	const modalId = "modal-" + useId();

	let modalClassName = "";
	if (position === "bottom") modalClassName += "modal-bottom sm:modal-middle";

	return (
		<>
			<label htmlFor={modalId} className="btn modal-button">
				{button}
			</label>

			<input type="checkbox" id={modalId} className="modal-toggle" />
			<label
				className={classNames("modal", modalClassName, {
					"cursor-pointer": closeByClickOutside,
				})}
				htmlFor={closeByClickOutside ? modalId : null}
			>
				<label className="modal-box relative">
					{children}
					{close && (
						<div className="modal-action">
							<label htmlFor={modalId} className="btn">
								{close}
							</label>
						</div>
					)}
				</label>
			</label>
		</>
	);
}
