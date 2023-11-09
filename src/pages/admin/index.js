import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/navbarAdmin';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/venue.module.css';


const Index = () => {

	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{ t('Stadium Matching System') }</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar/>
			<Container className={styles.container}>
				<Row>
					<Col className="text-center text-3xl">
						<h1>{ t('Venue') }</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Index;