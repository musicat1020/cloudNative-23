import Head from "next/head";
import { Container } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import NavBar from "../../components/navbar";
import RecordTab from "@/components/recordTab";
import styles from "@/styles/record.module.css";

function Record() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("Stadium Matching System")}</title>
        <meta
          property="og:description"
          content="Stadium Matching System"
        />
      </Head>
      <NavBar />
      <Container className={styles.container}>
        <RecordTab />
      </Container>
    </>
  );
}

export default Record;
