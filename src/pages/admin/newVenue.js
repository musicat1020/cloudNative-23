import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PublishIcon from "@mui/icons-material/Publish";
import { Button, Snackbar, Alert } from "@mui/material";

import NavBar from "@/components/adminComponents/navbarAdmin";
import styles from "@/styles/venuetab.module.css";
import VenueInput from "@/components/adminComponents/venueInput";
import EditVenueModal from "@/components/adminComponents/editVenueModal";

function NewVenue() {
	const initialState = {
		name: "",
		venue_name: "",
		address: "",
		picture: "",
		area: 0,
		description: "",
		created_user: 0,
		max_number_of_people: 0,
		google_map_url: "",
		stadium_courts: [],
		available_times: {
			weekdays: [],
			start_time: 0,
			end_time: 0,
		},
	};

	const [venueInfo, setVenueInfo] = useState(initialState);
	const [showNewVenueModal, setShowNewVenueModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const { t } = useTranslation();

	const handleAddClick = () => {
		// Check if all required fields are filled
		if (
			venueInfo.picture === "" ||
			venueInfo.address === "" ||
			venueInfo.name === "" ||
			venueInfo.venue_name === "" ||
			venueInfo.max_number_of_people === 0 ||
			venueInfo.stadium_courts.length === 0 ||
			venueInfo.available_times.weekdays.length === 0 ||
			venueInfo.description === "") {
			// setShowAlert(true);
			alert(t("請填寫所有必填欄位（包含圖片）"));
			return;
		}
		if (!isStartTimeBeforeEndTime()) {
			alert(t("起始時間需要早於結束時間"));
			return;
		}

		setShowNewVenueModal(true);
	};

	const isStartTimeBeforeEndTime = () => {
		const startTime = +venueInfo?.available_times?.start_time;
		const endTime = +venueInfo?.available_times?.end_time;
		return startTime < endTime;
	};

	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const hiddenFileInput = useRef();

	const handleImageClick = () => {
		hiddenFileInput.current.click();
	};

	const handleInputChange = (event) => {
		const fileUploaded = event.target.files[0]; // Get the first selected file
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result; // Base64 representation of the image
			setVenueInfo(prevInfo => ({
				...prevInfo,
				picture: base64Image,
			}));
		};
		reader.readAsDataURL(fileUploaded);
	};

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

			<Container className={styles.container}>
				{venueInfo?.picture === "" ? (
					<Row className='flex'>
						<Col className="text-center">
							<div className='rounded-6 items-center'>
								<Col className="text-center" style={{ padding: "100px" }}>
									<IconButton component="label" aria-label="delete">
										<PublishIcon sx={{ fontSize: 30 }} />
										<input
											type="file"
											onChange={handleInputChange}
											ref={hiddenFileInput}
											style={{ display: "none" }} // Make the file input element invisible
										/>
									</IconButton>
									<p>{t("點擊上傳圖片")}</p>
								</Col>
							</div>
						</Col>
					</Row>
				) : (
					<div className="flex justify-center items-center">
						<img
							className='rounded-lg object-cover w-5/6 h-96 hover:opacity-75'
							src={venueInfo?.picture}
							alt="Click to upload image"
							onClick={handleImageClick}
						/>
						<input
							type="file"
							onChange={handleInputChange}
							ref={hiddenFileInput}
							style={{ display: "none" }} // Make the file input element invisible
						/>
					</div>
				)}

				<Row>
					<Col xs={{ span: 10, offset: 1 }}>
						<VenueInput info={venueInfo} setInfo={setVenueInfo} />
					</Col>
				</Row>

				<Row className='flex'>
					<Col className="text-center ">
						<div spacing={2} direction="row" className='space-x-7'>
							<Button
								variant="outlined"
								color="secondary"
								// onClick={() => setShowNewVenueModal(true)}
								onClick={handleAddClick}
							>
								{t("新增")}
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() => window.history.back()}
							>
								{t("取消")}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
			<Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity="error">
					Please fill in all required fields (including image).
				</Alert>
			</Snackbar>
			<EditVenueModal
				show={showNewVenueModal}
				setShow={setShowNewVenueModal}
				handleClose={() => setShowNewVenueModal(false)}
				title={t("新增場地")}
				info={venueInfo}
				type="new"
			/>
		</ThemeProvider>

	);
}

export default NewVenue;
