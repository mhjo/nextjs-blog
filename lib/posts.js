import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// file system 외에 외부 API를 페칭 할 수 있음
export async function getSortedPostsDataFromAPI() {
  const res = await fetch("...");
  return res.json();
}

// 데이터베이스 쿼리
// import someDatabaseSDK from 'someDatabaseSDK'
// const databaseClient = someDatabaseSDK.createClient(...)
export async function getSortedPostsDataFromDB() {
  // return databaseClient.query("SELECT posts...")
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // [
  //   { params: { id: 'ssg-ssr' } },
  //   { params: { id: 'pre-rendering' } },
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
