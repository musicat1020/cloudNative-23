import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Tabs, Tab, Box, Button, Snackbar, Alert } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavBar from "@/components/adminComponents/navbarAdmin";
import styles from "@/styles/venuetab.module.css";
import VenueDetail from "@/components/adminComponents/venueDetail";
import AdminTimeTable from "@/components/adminComponents/timetableAdmin";
import ButtonDeleteVenue from "@/components/adminComponents/buttonDeleteVenue";
import EditVenueModal from "@/components/adminComponents/editVenueModal";


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

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function EditVenue() {

	const { t } = useTranslation();
	const [venueIsReady, setVenueIsReady] = useState(false);
	const [venueInfo, setVenueInfo] = useState(null);
	const [value, setValue] = useState(1);
	const [showAlert, setShowAlert] = useState(false);
	const [showEditVenueModal, setShowEditVenueModal] = useState(false);
	const router = useRouter();

	const [refresh, setRefresh] = useState(false);// for refresh the timetable

	const fetchVenueInfo = async (id) => {
		const params = {
			stadium_id: id,
		};
		const res = await axios.post(
			"/api/v1/stadium/info/", {}, { params }
		);
		console.log("get info response", res);

		setVenueInfo(res.data);
		setVenueIsReady(true);
	};

	// fetch venue detail
	useEffect(() => {
		const { search } = window.location;
		const searchParams = new URLSearchParams(search);
		const id = searchParams.get("venue");
		if (id) {
			fetchVenueInfo(id);
		}
	}, []);

	const isStartTimeBeforeEndTime = () => {
		const startTime = +venueInfo?.available_times?.start_time;
		const endTime = +venueInfo?.available_times?.end_time;
		return startTime < endTime;
	};

	const handleEditClick = () => {
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

		setShowEditVenueModal(true);
	};



	const handleCloseAlert = () => {
		setShowAlert(false);
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const hiddenFileInput = useRef();
	const handleImageClick = () => {
		hiddenFileInput.current.click();
	};

	// handle the user-selected file 
	const handleInputChange = (event) => {
		const fileUploaded = event.target.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result;
			setVenueInfo(prevInfo => ({
				...prevInfo,
				picture: base64Image,
			}));
		};
		reader.readAsDataURL(fileUploaded);
	};

	const handleBackClick = () => {
		router.push("/admin");
	};

	return venueIsReady ? (
		<ThemeProvider theme={theme}>
			<Head>
				<title>{t("Stadium Matching System")}</title>
				<meta
					property="og:description"
					content="Stadium Matching System"
				/>
			</Head>
			<NavBar />

			<Container className={`${styles.container} relative`}>
				<div className="flex justify-center items-center">

					<img
						className='rounded-lg object-cover w-5/6 h-96 hover:opacity-75'
						src={venueInfo?.picture}
						alt="Venue here"
						onClick={handleImageClick}
					/>

					<input
						type="file"
						onChange={handleInputChange}
						ref={hiddenFileInput}
						style={{ display: "none" }} // Make the file input element invisible
					/>

				</div>

				{/* Tabs */}
				<div className="flex justify-center mt-3">
					<Box sx={{ width: "80%" }}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<div className="flex justify-between">
								<Tabs
									value={value}
									onChange={handleChange}
									aria-label='wrapped basic tabs example'
									textColor='primary'
									indicatorColor='primary'
								>
									<Tab label={t("場地資訊")} {...a11yProps(0)} />
									<Tab label={t("場地時段")} {...a11yProps(1)} />
								</Tabs>
								<ButtonDeleteVenue
									info={venueInfo}
									setRefresh={setRefresh}
								/>
							</div>
						</Box>
					</Box>
				</div>

				{/* info tab content */}
				<CustomTabPanel value={value} index={0}>
					<Container>
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
										onClick={handleEditClick}
									>
										{t("修改")}
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
				</CustomTabPanel>

				{/* timetable tab content */}
				<CustomTabPanel value={value} index={1}>
					<Container className="flex justify-center ">
						<Row className="w-4/5">
							<AdminTimeTable venueInfo={venueInfo} refresh={refresh} setRefresh={setRefresh} />
							<div className="flex justify-end mt-4">
								<div>
									<Button
										variant="outlined"
										color="secondary"
										endIcon={<ChevronRightIcon />}
										onClick={handleBackClick}>
										{t("回到場地一覽")}
									</Button>
								</div>
							</div>
						</Row>
					</Container>
				</CustomTabPanel>
			</Container>
			<Snackbar open={showAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
				<Alert onClose={handleCloseAlert} severity="error">
					Please fill in all required fields (including image).
				</Alert>
			</Snackbar>
			<EditVenueModal
				show={showEditVenueModal}
				setShow={setShowEditVenueModal}
				handleClose={() => setShowEditVenueModal(false)}
				title={t("修改場地資訊")}
				info={venueInfo}
				type="edit"
			/>
		</ThemeProvider>
	) : null;
}

export default EditVenue;
