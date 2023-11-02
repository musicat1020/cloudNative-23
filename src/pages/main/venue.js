import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import NavBar from '../../components/navbar';
import { useTranslation } from 'next-i18next';

const Venue = () => {

	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{ t('Stadium Matching System') }</title>
				<meta
					property='og:description'
					content='Stadium Matching System'
				/>
			</Head>
			<NavBar/>
			<Container>
				<Row>
					<Col className='text-center text-3xl'>
						<h1>{ t('Venue') }</h1>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Venue;