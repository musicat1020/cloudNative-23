import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import NavBar from "../../components/navbar";
import VenueTab from "../../components/venueTab";
import styles from "../../styles/venue.module.css";

function Venue() {

	const { t } = useTranslation();

	return (
		<>
			<Head>
				<title>{ t("Stadium Matching System") }</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar/>
			<Container className={styles.container}>
				{/* Subsection */}
				<Row>
					<Col className="text-center">
						<h3>{ t("綜合體育館") }</h3>
					</Col>
				</Row>

				{/* Section */}
				<Row>
					<Col className="text-center my-2">
						<h1>{ t("桌球室") }</h1>
					</Col>
				</Row>

				{/* Description */}
				<Row>
					<Col className="text-center">
						<p>{ t("共有15桌球桌，若該租借時段借用桌數小於六桌，將會調整至B109室使用。借用面號僅為示意不等於現場使用面號。") }</p>
					</Col>
				</Row>

				{/* Tab */}
				<Row>
					<Col xs={{span: 10, offset: 1}}>
						<VenueTab/>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Venue;