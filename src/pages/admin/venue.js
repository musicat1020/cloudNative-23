import Head from 'next/head';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PublishIcon from '@mui/icons-material/Publish';
import NavBar from '../../components/navbarAdmin';
import VenueTab from '../../components/venueTab';
import VenueDetail from '../../components/venueDetail';
import styles from '../../styles/venue.module.css';

const Venue = () => {

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
					<Col className="text-center" style={{ padding: '100px' }}>
            <PublishIcon sx={{ fontSize: 30 }}/>
						<p>{ t('點擊上傳圖片') }</p>
					</Col>
				</Row>

				<Row>
					<Col xs={{span: 10, offset: 1}}>
						{/* <VenueTab/> */}
            {/* <VenueDetail /> */}
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Venue;