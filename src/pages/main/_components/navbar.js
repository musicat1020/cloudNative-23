import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useRef, useEffect } from "react";
import {
  Navbar, Nav, Container
} from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { getCookie, setCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "@/styles/navbar.module.css";
import i18n from "@/utils/i18n";
import UserMenu from "@/components/buttonUserMenu";
import { setUserCookies, clearAllCookies, getAllCookies, getIsProvider } from "@/utils/cookies";

function NavBar() {
  const { t } = useTranslation();
  const { data, status } = useSession();
  const timeoutRef = useRef(null);
  const [isProvider, setIsProvider] = useState(false);

  const handleLanguage = () => {
    const oriLang = getCookie("lang") ?? "en";
    const newLang = oriLang === "en" ? "zh" : "en";
    setCookie("lang", newLang);
    i18n.changeLanguage(newLang);
  };

  const handleLogout = () => {
    signOut();
    clearAllCookies();
  };

  useEffect(() => () => {
    clearTimeout(timeoutRef.current);
    setIsProvider(getIsProvider() === "true");
  }, []);

  useEffect(() => {
    // After login, set user cookies and reload the page
    // to show the admin if the user is provider
    if (data?.user !== undefined && Object.keys(getAllCookies()).length === 0) {
      setUserCookies(data?.user).then(() => {
        window.location.reload(false);
      });
    }

    // If token is expired, sign out and clear all cookies
    if (data?.user !== undefined && Object.keys(getAllCookies()).length === 2) {
      signOut();
      clearAllCookies();
      alert(t("連線逾時，請重新登入！"));
    }
  }, [data?.user]);

  const [expanded, setExpanded] = useState(false);

  const setToggle = () => {
    setExpanded(true);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light-cream" onToggle={setToggle}>
      <Container className="m-2" style={{ maxWidth: "initial" }}>
        <Navbar.Brand href="/main" bsPrefix="text-2xl no-underline" className="text-dark-blue">
          {t("Stadium Matching System")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="flex justify-end mt-1 border-b-white">
          <Nav className="me-auto" />
          <Nav>
            {
              isProvider && (
                <Nav.Link href="/admin">
                  <span className={styles.navAdmin}>{t("Admin")}</span>
                </Nav.Link>
              )
            }
            <Nav.Link href="/main" className={styles.navLink}>
              {t("Home")}
            </Nav.Link>
            {status === "authenticated" ? (
              <>
                {/* Check if the Navbar is collapsed */}
                <UserMenu
                  data={data}
                  signOut={handleLogout}
                  expanded={expanded}
                />
              </>
            ) : (
              <button className={styles.navLink} onClick={() => signIn("google")}>
                {t("Login")}
              </button>
            )}
            <Nav.Link className={styles.navLink} onClick={handleLanguage}>
              <FontAwesomeIcon icon={faEarthAmericas} className="mr-2 flex flex-row" />
              中 | EN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default NavBar;
