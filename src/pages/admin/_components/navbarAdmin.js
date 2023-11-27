import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { getCookie, setCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import i18n from "@/utils/i18n";
import styles from "@/styles/navbar.module.css";

function NavBar() {
  const { t } = useTranslation();

  const handleLanguage = () => {
    const oriLang = getCookie("lang") ?? "en";
    const newLang = (oriLang === "en") ? "zh" : "en";
    setCookie("lang", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light-cream">
      <Container className="m-2">
        <Navbar.Brand href="/admin" bsPrefix="text-2xl no-underline" className="text-dark-blue">{t("Stadium Matching System")}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" />
          <Nav>
            <Nav.Link href="/main">
              <span className={styles.navAdmin}>{t("Rent")}</span>
            </Nav.Link>
            <Nav.Link href="/admin" className={styles.navLink}>{t("Home")}</Nav.Link>
            <Nav.Link href="/" className={styles.navLink}>{t("Login")}</Nav.Link>
            <Nav.Link
              className={styles.navLink}
              onClick={handleLanguage}
            >
              <FontAwesomeIcon icon={faEarthAmericas} className="mr-2 flex flex-row" />
              中 | EN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;

