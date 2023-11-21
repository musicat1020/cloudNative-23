import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
// import Image from "next/image";

import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import NavBar from "../../components/navbarAdmin";
import VenueDetail from "../../components/venueDetail";
import styles from "../../styles/venue.module.css";
import axios from "../../utils/axios";
import { mockVenueDetail } from "../../../mockData/mockData";
import EditVenueModal from "@/components/editVenueModal";
import ButtonDeleteVenue from "@/components/buttonDeleteVenue";
import AdminTimeTable from "@/components/timetableAdmin";
// import Image from 'react-bootstrap/Image';

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

	const [value, setValue] = useState(1);
	const [venueInfo, setVenueInfo] = useState(mockVenueDetail[0]);
	const [showEditVenueModal, setShowEditVenueModal] = useState(false);

	// the index is assigned the value of router.query.venue
	const router = useRouter();
	const { venue: index } = router.query;

	// useEffect(() => {
	//   const fetchVenueDetail = async () => {
	//     try {
	//       // TODO:
	//       const accessToken = localStorage.getItem("accessToken");
	//       console.log("accessToken", accessToken);
	//       const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/info/`;
	//       const headers = {
	//         "Accept": "application/json",
	//         "Authorization": `Bearer ${accessToken}`, // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
	//       };
	// 			const request = {
	// 				stadium_id: index,
	// 			};

	//       const venueDetail = await axios.post(url, { request }, { headers })
	//         .then(response => {
	//           console.log("Response:", response.data);
	//           return response.data;
	//         })
	//         .catch(error => {
	//           console.error("Error:", error.message);
	//         });
	//       setVenueInfo(venueDetail);
	//     } catch (error) {
	//       throw new Error(error);
	//     }
	//   };
	//   fetchVenueDetail();
	// }, []);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// Create a reference to the hidden file input element
	const hiddenFileInput = useRef();

	// Programatically click the hidden file input element
	// when the Button component is clicked
	const handleImageClick = () => {
		hiddenFileInput.current.click();
		console.log("handleImageClick");
	};

	// handle the user-selected file 
	const handleInputChange = (event) => {
		console.log("handleInputChange");
		const fileUploaded = event.target.files[0];
		console.log("fileUploaded", fileUploaded);
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result;
			console.log("base64Image", base64Image);
			setVenueInfo(prevInfo => ({
				...prevInfo,
				stadium: {
					...prevInfo.stadium,
					imgBase64: base64Image,
				},
			}));
		};
		reader.readAsDataURL(fileUploaded);
	};

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
						// src={venueInfo?.stadium?.imgUrl}
						src={venueInfo?.stadium?.imgBase64}
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
							<AdminTimeTable />
						</Row>
					</Container>
				</CustomTabPanel>

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
