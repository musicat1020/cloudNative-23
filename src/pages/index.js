import Head from "next/head";
import NavBar from "./main/_components/navbar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Stadium Matching System</title>
        <meta
          property="og:description"
          content="Stadium Matching System"
        />
      </Head>
      <NavBar />
    </>
  );
}
