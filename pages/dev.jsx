import dynamic from "next/dynamic";
import Head from "next/head";
const WikiAudio = dynamic(() => import("../components/WikiAudio/WikiAudio"));
const WikiAvatarCard = dynamic(() =>
	import("../components/WikiAvatarCard/WikiAvatarCard")
);
const WikiBaseIntroductions = dynamic(() =>
	import("../components/WikiBaseIntroductions/WikiBaseIntroductions")
);
const WikiPicture = dynamic(() =>
	import("../components/WikiPicture/WikiPicture")
);

export default function Dev() {
	return (
		<>
			<Head>
				<title>耳斯百科开发 组件测试页面</title>
			</Head>
			<style global jsx>{`
				.DevPage {
					margin: 1rem auto;
					max-width: 750px;
					text-align: center;
				}

				@media only screen and (max-width: 500px) {
					.DevPage {
						max-width: 100%;
						margin: 1rem;
					}
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

				<h2>WikiBaseIntroductions</h2>
				<WikiBaseIntroductions
					data={
						"解恪布，2006 年 01 月 27 日出生于福建厦门，恪人族成员、恪人族创始人之一、哔哩哔哩 up 主、IYAMAYA 工作室创始人。\n截止 2022 年 8 月 24 日，其哔哩哔哩粉丝数量达 3328，总播放量达 67.6 万。"
					}
				/>

				<h2>WikiPicture 百科图片组件</h2>
				<WikiPicture
					src="https://wikioss.xhemj.work/krzfs/wiki/d148ed5899f3d7f1a6bbdb48014f039c.jpg"
					title="解恪布 TOY"
				/>
			</div>
		</>
	);
}
