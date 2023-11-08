import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useTranslation } from "next-i18next";
import { getCookie, setCookie } from "cookies-next";
import getConfig from "next/config";
import i18n from "../utils/i18n";
import styles from "../styles/navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const {
	publicRuntimeConfig: {
		apiRoot,
		frontendRoot,
		accessTokenMaxAge,
		refreshTokenMaxAge,
	},
} = getConfig();

const NavBar = () => {

	const { t } = useTranslation();
	const [login, setLogin] = React.useState(false);

	const handleLanguage = () => {
		const oriLang = getCookie("lang") ?? "en";
		const newLang = (oriLang === "en") ? "zh" : "en";
		setCookie("lang", newLang);
		i18n.changeLanguage(newLang);
	};

	const handleLoginClick = () => {
		setLogin(true);
	};

	const handleLogoutClick = () => {
		console.log("out...");
		setLogin(false);

	};

	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="cream">
				<Container className="m-2">
					<Navbar.Brand href="/main" bsPrefix="text-2xl no-underline" className="text-dark-blue">{t("Stadium Matching System")}</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto"></Nav>
						<Nav>
							<Nav.Link href="/admin">
								<span className={styles.navAdmin}>{t("Admin")}</span>
							</Nav.Link>
							<Nav.Link href="/main" className={styles.navLink}>{t("Home")}</Nav.Link>
							{login ? (

								<div class="relative group flex justify-end">
									<button onClick={handleLoginClick} class="relative">

										<Image
											src="/userProfile.png"
											alt="User Profile"
											width={50}
											height={50}
											className="rounded-full object-cover h-10 w-10  group-hover:ring-1 ring-dark-blue ring-offset-2 ring-offset-cream"
										/>
									</button>
									<div className="absolute right-0 shadow-md top-12 bg-white p-2 rounded-md hidden group-hover:block">

										<div className="flex flex-col justify-center items-center">
											<Nav.Link href='/main/records' className={styles.manageList}>{t("Records")}</Nav.Link>
											<button className={styles.manageList} onClick={handleLogoutClick}>{t("Logout")}</button>
										</div>
									</div>

								</div>


							) : (
								<button className={styles.navLink} onClick={handleLoginClick}>
									{t("Login")}
								</button>
							)}
							<Nav.Link
								className={styles.navLink}
								onClick={handleLanguage}
							>
								<FontAwesomeIcon icon={faEarthAmericas} className='mr-2 flex flex-row' />{"中 | EN"}
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
