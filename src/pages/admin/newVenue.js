import Head from "next/head";
// import Image from "next/image";

import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import PublishIcon from "@mui/icons-material/Publish";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import styles from "../../styles/venue.module.css";
import VenueInput from "./_components/venueInput";
import NavBar from "./_components/navbarAdmin";
import { mockVenueDetail } from "../../../mockData/mockData";
import EditVenueModal from "@/pages/admin/_components/editVenueModal";

function NewVenue() {
	const [venueInfo, setVenueInfo] = useState(mockVenueDetail[1]);
	const [showNewVenueModal, setShowNewVenueModal] = useState(false);
	const { t } = useTranslation();

	const hiddenFileInput = useRef();

	const handleImageClick = () => {
		hiddenFileInput.current.click();
		// console.log("handleImageClick");
	};

	const handleInputChange = (event) => {
		const file = event.target.files[0]; // Get the first selected file
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64String = reader.result; // Base64 representation of the image
			setVenueInfo((prevInfo) => ({
				...prevInfo,
				stadium: {
					...prevInfo.stadium,
					imgBase64: base64String
				}
			}));
		};
		reader.readAsDataURL(file);
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
				{venueInfo?.stadium?.imgBase64 === "" ? (
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
											style={{ display: 'none' }} // Make the file input element invisible
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
								onClick={() => setShowNewVenueModal(true)}
							>
								{t("新增")}
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
				show={showNewVenueModal}
				setShow={setShowNewVenueModal}
				handleClose={() => setShowNewVenueModal(false)}
				title={t("新增場地")}
				info={venueInfo}
			/>
		</ThemeProvider>

	);
}

export default NewVenue;
