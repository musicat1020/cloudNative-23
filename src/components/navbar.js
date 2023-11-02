import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import { getCookie, setCookie } from "cookies-next";
import getConfig from "next/config";
import i18n from '../utils/i18n';
import styles from '../styles/navbar.module.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
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
		const oriLang = getCookie('lang') ?? navigator.language.split("-")[0];
		const newLang = (oriLang === 'en') ? 'zh' : 'en';
		setCookie('lang', newLang);
		i18n.changeLanguage(newLang); 
	}

	return (
		<>
		<Navbar collapseOnSelect expand='lg' bg='cream' className='m-4'>
			<Container className='flex flex-row justify-between'>
				<Navbar.Brand href='/' className='text-2xl text-dark-blue'>{ t('Stadium Matching System') }</Navbar.Brand>
				<Navbar.Toggle/>
				<Navbar.Collapse>
					<Nav className='me-auto'></Nav>
					<Nav className='d-flex align-items-center'>
						<Nav.Link href='/' className={styles.navLink}>{ t('Home') }</Nav.Link>
						<Nav.Link href='/main/venue' className={styles.navLink}>{ t('Venue') }</Nav.Link>
						<Nav.Link href='/' className={styles.navLink}>{ t('Login') }</Nav.Link>
						<Button 
							className={styles.navLink}
							onClick={handleLanguage}
						>
							<FontAwesomeIcon icon={faEarthAmericas} className='mr-2 flex flex-row'/>{'中 | EN'}
						</Button>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
	);
}

export default NavBar;