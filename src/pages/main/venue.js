import Head from "next/head";
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "@/utils/axios";
import NavBar from "@/components/mainComponents/navbar";
import VenueTab from "@/components/mainComponents/venueTab";
import styles from "@/styles/venue.module.css";

function Venue() {

	const { t } = useTranslation();
	const [venueIsReady, setVenueIsReady] = useState(false);
	const [venueInfo, setVenueInfo] = useState(null);

	const fetchVenueInfo = async (id) => {
		const params = {
			stadium_id: id,
		};
		const res = await axios.post("/api/v1/stadium/info", {}, { params });

		setVenueInfo(res.data);
		setVenueIsReady(true);
	};

	useEffect(() => {
		const { search } = window.location;
		const searchParams = new URLSearchParams(search);
		const id = searchParams.get("venue");
		if (id) {
			fetchVenueInfo(id);
		}
	}, []);

	return venueIsReady ? (
		<>
			<Head>
				<title>{t("Stadium Matching System")}</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar />
			<Container className={styles.container}>
				{/* Subsection */}
				<Row>
					<Col className="text-center">
						<h3>{venueInfo?.name}</h3>
					</Col>
				</Row>

				{/* Section */}
				<Row>
					<Col className="text-center my-2">
						<h1>{venueInfo?.venue_name}</h1>
					</Col>
				</Row>

				{/* Description */}
				<Row>
					<Col className="text-center">
						<p>{venueInfo?.description}</p>
					</Col>
				</Row>

				{/* Tab */}
				<Row>
					<Col xs={{ span: 10, offset: 1 }}>
						<VenueTab venueInfo={venueInfo} />
					</Col>
				</Row>
			</Container>
		</>
	) : null;
}

export default Venue;
