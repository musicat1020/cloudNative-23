import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavBar from "./_components/navbarAdmin";
import VenueDetail from "./_components/venueDetail";
import styles from "../../styles/venue.module.css";
import axios from "../../utils/axios";
import { mockVenueDetail } from "../../../mockData/mockData";
import EditVenueModal from "@/pages/admin/_components/editVenueModal";
import ButtonDeleteVenue from "@/pages/admin/_components/buttonDeleteVenue";
import AdminTimeTable from "@/pages/admin/_components/timetableAdmin";

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
	// const [venueInfo, setVenueInfo] = useState(mockVenueDetail[0]);
	const [venueInfo, setVenueInfo] = useState(null);
	const [value, setValue] = useState(1);
	const [showEditVenueModal, setShowEditVenueModal] = useState(false);


	const fetchVenueInfo = async (id) => {
		console.log("fetching venue info");
		const accessToken = localStorage.getItem("accessToken");
		const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/info`;
		const headers = {
			"Accept": "application/json",
			"Authorization": `Bearer ${accessToken}`, // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
		};
		const params = {
			stadium_id: id,
		};

		// const res = await axios.post("/api/v1/stadium/info", {}, { params });
		const res = await axios.post(url, {}, { params, headers }).then((response) => {
			console.log("get info response", response.data);
			return response.data;
		});

		setVenueInfo(res);
		setVenueIsReady(true);
	};

	// fetch venue detail
	useEffect(() => {
		const { search } = window.location;
		const searchParams = new URLSearchParams(search);
		const id = searchParams.get("venue");
		// const id = 1;
		if (id) {
			fetchVenueInfo(id);
		}
	}, []);

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

			<Container className={`${styles.container}`}>
				<div className="flex justify-center items-center">

					<img
						className='rounded-lg object-cover w-5/6 h-96 hover:opacity-75'
						// src={venueInfo?.stadium?.imgUrl}
						src={venueInfo?.picture}
						alt="Venue here"
						onClick={handleImageClick}
					/>
					<input
						type="file"
						onChange={handleInputChange}
						ref={hiddenFileInput}
						style={{ display: 'none' }} // Make the file input element invisible
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
										onClick={() => setShowEditVenueModal(true)}
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
							<AdminTimeTable venueInfo={venueInfo}/>
						</Row>
					</Container>
				</CustomTabPanel>

			</Container>
			<EditVenueModal
				show={showEditVenueModal}
				setShow={setShowEditVenueModal}
				handleClose={() => setShowEditVenueModal(false)}
				title={t("修改場地資訊")}
				info={venueInfo} />

		</ThemeProvider>
	): null;
}

export default EditVenue;
