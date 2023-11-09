import Head from "next/head";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import PublishIcon from "@mui/icons-material/Publish";
// import VenueTab from '../../components/venueTab';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import styles from "../../styles/venue.module.css";
import VenueInput from "../../components/venueInput";
import NavBar from "../../components/navbarAdmin";

function Venue() {

	const { t } = useTranslation();

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

	const VisuallyHiddenInput = styled("input")({
		clip: "rect(0 0 0 0)",
		clipPath: "inset(50%)",
		height: 1,
		overflow: "hidden",
		position: "absolute",
		bottom: 0,
		left: 0,
		whiteSpace: "nowrap",
		width: 1,
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

			<Container className={styles.container}>
				<Row className='flex'>
					<Col className="text-center">
						<div className='rounded-6 items-center'>
							<Col className="text-center" style={{ padding: "100px" }}>
								<IconButton component="label" aria-label="delete">
									<PublishIcon sx={{ fontSize: 30 }} />
									<VisuallyHiddenInput type="file" />
								</IconButton>
								<p>{t("點擊上傳圖片")}</p>

							</Col>
						</div>
					</Col>
				</Row>

				<Row>
					<Col xs={{ span: 10, offset: 1 }}>
						<VenueInput />
					</Col>
				</Row>

				<Row className='flex'>
					<Col className="text-center ">
						<div spacing={2} direction="row" className='space-x-7'>
							<Button variant="outlined" color="secondary">{t("新增")}</Button>
							<Button variant="outlined" color="secondary">{t("取消")}</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</ThemeProvider>

	);
}

export default Venue;
