import Modal from "../components/daisyui/Modal";

export default function Dev() {
	return (
		<>
			<Modal button="open" closeByClickOutside={true} close={false}>
				<h3 className="text-lg font-bold">
					Congratulations random Internet user!
				</h3>
				<p className="py-4">
					You've been selected for a chance to get one year of subscription to
					use Wikipedia for free!
				</p>
			</Modal>
			<Modal button="aaaaaaaa" closeByClickOutside={true} close={false}>
				<h3 className="text-lg font-bold">aaaaaaaa</h3>
				<p className="py-4">
					You've been selected for a chance to get one year of subscription to
					use Wikipedia for free!
				</p>
			</Modal>
			<Modal button="bbbbbbbb" closeByClickOutside={true} close={false}>
				<h3 className="text-lg font-bold">bbbbbbbb</h3>
				<p className="py-4">
					You've been selected for a chance to get one year of subscription to
					use Wikipedia for free!
				</p>
			</Modal>
		</>
	);
}
