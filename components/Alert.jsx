import ChakraIconInfo from "./icons/chakra/IconInfo";

export default function Alert(props) {
	const { children } = props;
	return (
		<div
			className="w-full flex items-center relative overflow-hidden 
			bg-sky-200 px-4 py-3"
		>
			<span className="flex text-sky-600 shrink-0 my-auto mr-3 w-5 h-6">
				<ChakraIconInfo />
			</span>
			<span className="inline-block leading-6 font-medium">{children}</span>
		</div>
	);
}
