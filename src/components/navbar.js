import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import React from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { getCookie, setCookie } from "cookies-next";
import getConfig from "next/config";
import i18n from '../utils/i18n';
import styles from '../styles/navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmericas } from '@fortawesome/free-solid-svg-icons';

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

	const handleLanguage = () => {
		const oriLang = getCookie('lang') ?? 'en';
		const newLang = (oriLang === 'en') ? 'zh' : 'en';
		setCookie('lang', newLang);
		i18n.changeLanguage(newLang); 
	}

	return (
		<>
		<Navbar collapseOnSelect expand="lg" bg="light-cream" className='flex-col'>
			<Container className="m-2">
				<Navbar.Brand href="/main/venue" bsPrefix="text-2xl no-underline" className="text-dark-blue">{ t('Stadium Matching System') }</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav"/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto"></Nav>
					<Nav>
						<Nav.Link href="/admin">
							<span className={styles.navAdmin}>{ t('Admin') }</span>
						</Nav.Link>
						<Nav.Link href="/main" className={styles.navLink}>{ t('Home') }</Nav.Link>
						<Nav.Link href="/" className={styles.navLink}>{ t('Login') }</Nav.Link>
						<Nav.Link 
							className={styles.navLink}
							onClick={handleLanguage}
						>
							<FontAwesomeIcon icon={faEarthAmericas} className='mr-2 flex flex-row'/>{'中 | EN'}
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
	);
}

export default NavBar;