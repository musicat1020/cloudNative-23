import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/navbarAdmin';
import { useTranslation } from 'next-i18next';
import VenueListConainer from '@/components/venueListConainer';

const Index = () => {

	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{t('Stadium Matching System')}</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar />
			<VenueListConainer isAdmin={true} />
		</>
	);
}

export default Index;
