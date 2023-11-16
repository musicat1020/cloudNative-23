import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/navbarAdmin";
import VenueDetail from "../../components/venueDetail";
import styles from "../../styles/venue.module.css";
import axios from "../../utils/axios";
import { mockVenueList, mockVenueDetail } from "../../../mockData/mockData";
import EditVenueModal from "@/components/editVenueModal";
// import Image from 'react-bootstrap/Image';

function EditVenue() {

	const router = useRouter();
	// the index is assigned the value of router.query.venue
	const { venue: index } = router.query;
	const [venueInfo, setVenueInfo] = useState(mockVenueDetail[0]);
	const [showEditVenueModal, setShowEditVenueModal] = useState(false);
	const { t } = useTranslation();

	const fetchVenueDetail = async (id) => {
		const params = {
			stadium_id: 1,
		};
		const res = await axios.post("/api/v1/stadium/info", {}, { params });
		console.log(res.data);
	};
	fetchVenueDetail();	
	

	const theme = createTheme({
		palette: {
			primary: {
				main: "#AD5625",
			},
			secondary: {
				main: "#14274C",
			},
			text: {
				primary: "#14274C",
				secondary: "#14274C",
			},
			divider: "#BEC8DD",
		},
		typography: {
			fontFamily:
				"\"Palatino\", sans-serif",
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{t("Stadium Matching System")}</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar />

			<Container className={`${styles.container}`}>
				<div className="flex justify-center items-center">
					<img
						className='rounded-lg object-cover w-5/6 h-96 hover:opacity-75'
						src={venueInfo?.stadium?.imgUrl}
						alt="Picture of the venue"
					/>
				</div>

				<Row>
					<Col xs={{ span: 10, offset: 1 }}>
						<VenueDetail info={venueInfo} setInfo={setVenueInfo} />
					</Col>
				</Row>

				<Row className='flex'>
					<Col className="text-center ">
						<div spacing={2} direction="row" className='space-x-7'>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => setShowEditVenueModal(true)}
							>
								{t("修改")}
							</Button>
							<Button
								variant="outlined"
								color="secondary"
							>
								{t("取消")}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			<EditVenueModal
				show={showEditVenueModal}
				setShow={setShowEditVenueModal}
				handleClose={() => setShowEditVenueModal(false)}
				title={t("新增場地")}
				info={venueInfo} />

		</ThemeProvider>
	);
}

export default EditVenue;
