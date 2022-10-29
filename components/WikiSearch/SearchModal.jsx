import IconClose from "../icons/IconClose";
import SearchBar from "./SearchBar";

export default function SearchModal(props) {
  return (
    <>
      <input type="checkbox" id="search" className="modal-toggle" {...props} />
      <div className="modal modal-bottom z-[999999]">
        <div className="modal-box rounded-t-2xl w-full h-[90vh]">
          <label
            htmlFor="search"
            className="btn btn-xs btn-circle absolute right-2 top-2"
          >
            <IconClose />
          </label>
          <h3 className="mt-2 font-bold text-lg">百科搜索</h3>
          <SearchBar className="w-full" />
        </div>
      </div>
    </>
  );
}
