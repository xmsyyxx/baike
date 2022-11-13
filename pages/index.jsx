import WikiHome from "../components/layouts/WikiHome";
import Head from "next/head";
import WikiFooter from "../components/WikiFooter/WikiFooter";
import SearchBar from "../components/WikiSearch/SearchBar";
import WikiSuggestion from "../components/WikiSuggestion/WikiSuggestion";
import WikiPreview from "../components/WikiPreview/WikiPreview";
const highlightWikis = ["解恪布", "厦门市音乐学校", "开圆盛世", "耳斯名言"];

export default function Index() {
  return (
    <>
      <WikiHome>
        <Head>
          <title>耳斯百科</title>
        </Head>
        <div
          className="text-center bg-white mx-auto pt-20 lg:mt-auto lg:min-h-[55vh] 
        flex justify-center align-center flex-col"
        >
          <div className="my-2 mx-auto flex flex-row lg:flex-col">
            <img
              src="https://wikioss.xhemj.work/static/logo/v3/512x512.png"
              alt="耳斯百科"
              className="w-20 h-20 lg:w-40 lg:h-40 m-0 lg:mx-auto"
            />
            <h1 className="text-4xl font-bold text-gray-700 m-auto">
              耳斯百科
            </h1>
          </div>
          <div className="flex flex-col lg:mt-4 px-4 z-50">
            <SearchBar ishome={true} />
            <div className="sm:hide">
              <WikiSuggestion />
            </div>
          </div>
          <div className="p-4 mt-2 mb-4 text-left sm:show">
            <h3 className="mx-2 mt-2 font-semibold text-gray-700 text-base">
              随便看看：
            </h3>
            <div className="PreviewCards">
              {highlightWikis.map((item) => {
                return (
                  <div className="mt-4" key={item}>
                    <WikiPreview item={item} />
                  </div>
                );
              })}
            </div>
            {/* <WikiPreviewCard /> */}
            <style global jsx>{`
              .PreviewCards .MuiSkeleton-rounded {
                border-radius: 20px !important;
              }
            `}</style>
          </div>
        </div>
        <WikiFooter ishome={true} position="relative" />
      </WikiHome>
    </>
  );
}
