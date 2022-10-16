import dynamic from "next/dynamic";
import Head from "next/head";
const WikiAudio = dynamic(() => import("../components/WikiAudio/WikiAudio"));
const WikiAvatarCard = dynamic(() =>
	import("../components/WikiAvatarCard/WikiAvatarCard")
);
const WikiBackTop = dynamic(() =>
	import("../components/WikiBackTop/WikiBackTop")
);
const WikiBaseIntroductions = dynamic(() =>
	import("../components/WikiBaseIntroductions/WikiBaseIntroductions")
);
const WikiDetailsList = dynamic(() =>
	import("../components/WikiDetailsList/WikiDetailsList")
);
const WikiLastModified = dynamic(() =>
	import("../components/WikiLastModified/WikiLastModified")
);
const WikiPicture = dynamic(() =>
	import("../components/WikiPicture/WikiPicture")
);
const WikiSuggestion = dynamic(() =>
	import("../components/WikiSuggestion/WikiSuggestion")
);
const WikiTitle = dynamic(() => import("../components/WikiTitle/WikiTitle"));

export default function Dev() {
	return (
		<>
			<Head>
				<title>耳斯百科开发 组件测试页面</title>
			</Head>
			<style global jsx>{`
				.DevPage {
					margin: 1rem auto;
					padding: 1rem;
					max-width: 750px;
					text-align: center;
				}

				@media only screen and (max-width: 500px) {
					.DevPage {
						max-width: 100%;
						padding: 1rem;
					}
				}

				h2 {
					margin-top: 40px;
				}
			`}</style>
			<div className="DevPage">
				<h1>百科组件测试页面</h1>

				<h2>WikiAudio 音频组件</h2>
				<WikiAudio
					src="https://wikioss.xhemj.work/krzfs/wiki-media/4d799f987a66e00ce6699def290a2c68.mp3"
					title="爬步走音频"
					name="爬步走"
				/>

				<h2>WikiAvatarCard 头像框组件</h2>
				<WikiAvatarCard img="https://wikioss.xhemj.work/krzfs/wiki/007a9c5b7ddd1594adbe9f687883aa61.jpg">
					解恪布 TOY
				</WikiAvatarCard>

				<h2>WikiBackTop 百科返回顶部组件</h2>
				<WikiBackTop />
				<span>
					<p>详细效果请查看浏览器右下角。</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
					<p>我是一篇很长的文章~~</p>
				</span>

				<h2>WikiBaseIntroductions 百科简介</h2>
				<WikiBaseIntroductions
					data={
						"解恪布，2006 年 01 月 27 日出生于福建厦门，恪人族成员、恪人族创始人之一、哔哩哔哩 up 主、IYAMAYA 工作室创始人。\n截止 2022 年 8 月 24 日，其哔哩哔哩粉丝数量达 3328，总播放量达 67.6 万。"
					}
					style={{ marginBottom: "1rem" }}
				/>

				<h2>WikiDetailsList 百科详细信息</h2>
				<WikiDetailsList
					data={{
						中文名: "解恪布",
						外文名: "Black Toy",
						国籍: "中国",
						民族: "汉族",
						出生地: "福建厦门",
						出生日期: "2006年1月27日",
						星座: "水瓶座",
						身高: "179cm",
						体重: "62.3kg",
						性别: "男",
					}}
					style={{ maxWidth: "400px" }}
				/>

				<h2>WikiLastModified 百科更新时间</h2>
				<WikiLastModified lastModified="2022-10-10T01:32:40.115Z" />

				<h2>WikiPicture 百科图片组件</h2>
				<WikiPicture
					src="https://wikioss.xhemj.work/krzfs/wiki/d148ed5899f3d7f1a6bbdb48014f039c.jpg"
					title="解恪布 TOY"
				/>

				<h2>WikiSuggestion 首页推荐组件</h2>
				<div>
					<WikiSuggestion
						data={[
							"aaaaa",
							"bbbbb",
							"ccccc",
							"ddddd",
							"eeeee",
							"fffff",
							"ggggg",
							"hhhhh",
							"iiiii",
							"jjjjj",
						].map((text) => {
							return {
								title: text,
							};
						})}
					/>
				</div>

				<h2>WikiTitle 百科标题</h2>
				<WikiTitle
					title="厦门市音乐学校"
					description="厦门市一所中等音乐专业学校"
					style={{ maxWidth: "400px" }}
				/>
			</div>
		</>
	);
}
