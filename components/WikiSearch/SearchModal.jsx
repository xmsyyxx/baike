import * as Portal from "@radix-ui/react-portal";
import useDevice from "../../lib/hooks/useDevice";
import IconClose from "../icons/IconClose";
import SearchBar from "./SearchBar";

export default function SearchModal(props) {
  const [device] = useDevice();
  const isMobile = device === "mobile";

  if (!isMobile) return null;
  return (
    <Portal.Root>
      <input type="checkbox" id="search" className="modal-toggle" />
      <div className="modal modal-bottom z-[1000] duration-300" {...props}>
        <div className="modal-box rounded-t-2xl w-full h-[85vh]">
          <label
            htmlFor="search"
            className="btn btn-ghost absolute right-0 top-0 z-[1000]"
          >
            <IconClose />
          </label>
          <h3 className="my-2 font-bold text-lg">搜索</h3>
          <SearchBar className="w-full flex" />
        </div>
      </div>
    </Portal.Root>
  );
}
