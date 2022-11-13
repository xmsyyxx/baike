import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "../content/wiki");

function formatTimeToISO(time) {
  return new Date(String(time)).toISOString();
}

function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const fileStats = fs.statSync(fullPath);
  const { data, content } = matter(fileContents);

  const items = {};

  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (field === "createdAt") {
      items[field] = formatTimeToISO(fileStats.ctime);
    }

    if (field === "updatedAt") {
      items[field] = formatTimeToISO(fileStats.mtime);
    }

    if (field === "wordCount") {
      items[field] = content.split(/\s+/gu).length;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.updatedAt > post2.updatedAt ? -1 : 1));
  return posts;
}
