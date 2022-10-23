const fs = require("fs");
const path = require("path");

const postsDirectory = path.join(process.cwd(), "content/wiki");
const posts = fs.readdirSync(postsDirectory);
fs.writeFileSync(
	path.join(process.cwd(), "content/posts.json"),
	JSON.stringify(posts.map((name) => name.split(".")[0])),
	"utf-8"
);
