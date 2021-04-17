import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

export default function Home({ allPostsData }) {
  // console.log(allPostsData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// getStaticProps는 Next.js에게 이 페이지가 데이터 의존성을 가지고 있음을 알려준다.
export async function getStaticProps() {
  // 외부 데이터 가져오기 - 파일 시스템, API, DB, etc.
  const allPostsData = getSortedPostsData();

  // 'props' 키의 값이 'Home' 컴포넌트로 전달된다.
  return {
    props: {
      allPostsData,
    },
  };
}

// Server Side Rendering
// export async function getServerSideProps(context) {
//   return {
//     props: {},
//   };
// }
