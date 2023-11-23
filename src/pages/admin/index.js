import Head from "next/head";
import { useTranslation } from "next-i18next";
import NavBar from "./_components/navbarAdmin";
import VenueListConainer from "@/components/venueListConainer";

function Index() {
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
      <VenueListConainer isAdmin />
    </>
  );
}

export default Index;
