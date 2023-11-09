import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PublishIcon from "@mui/icons-material/Publish";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Image from "next/image";
import NavBar from "../../components/navbarAdmin";
import VenueTab from "../../components/venueTab";
import VenueDetail from "../../components/venueDetail";
import styles from "../../styles/venue.module.css";
// import Image from 'react-bootstrap/Image';

function Venue() {

	const { t } = useTranslation();
	// const address = "台北市羅斯福路四段一號";
	// const stadiumName = "綜合體育館";
	// const courtName = "桌球室";
	// const capacity = 4;
	// const courtList = ["A桌", "B桌"];
	// const room = 906
	// const openTime = "08:00";
	// const closeTime = "22:00";
	// const weekDays = ["mon", "tue", "wed", "thu", "fri"];
	// const description = "可至櫃檯借用球具"

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
								src='/venue-1.jpg'
								alt="Picture of the venue"
							/>
					</div>
					
					<Row>
						<Col xs={{ span: 10, offset: 1 }}>
							<VenueDetail />
						</Col>
					</Row>

					<Row className='flex'>
						<Col className="text-center ">
							<div spacing={2} direction="row" className='space-x-7'>
								<Button variant="outlined" color="secondary">{t("修改")}</Button>
								<Button variant="outlined" color="secondary">{t("取消")}</Button>
							</div>
						</Col>
					</Row>
				</Container>
		</ThemeProvider>
	);
}

export default Venue;