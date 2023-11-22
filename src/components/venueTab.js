import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomIcon from "@mui/icons-material/Room";
import IconButton from "@mui/material/IconButton";
import { Link } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import TimeTable from "./timeTable";
import styles from "../styles/venuetab.module.css";

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

function VenueTab({ venueInfo }) {

	const { t } = useTranslation();

	const levelList = ["beginner", "intermediate", "advanced"];
	const [value, setValue] = useState(1);
	const [people, setPeople] = useState(2);
	const [level, setLevel] = useState(levelList[1]);

	const mapWeekday = {
		1: t("週一"),
		2: t("週二"),
		3: t("週三"),
		4: t("週四"),
		5: t("週五"),
		6: t("週六"),
		7: t("週日"),
	};

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const getCourtList = () => {
		const courtList = [];
		venueInfo?.stadium_courts?.forEach((court) => {
			courtList.push(<span className={styles.courtListCell}>{court?.name}</span>);
		});
		return courtList;
	};

	const getCloseWeekdays = () => {
		const weekdays = Array.from({length: 7}, (_, i) => i + 1);
		const openWeekdays = venueInfo?.available_times?.weekdays;
		const closeWeekdays = weekdays.filter((weekday) => !openWeekdays.includes(weekday)).map((x) => mapWeekday[x]);
		const result = [];
		if (closeWeekdays.length === 0) {
			result.push(<span className={styles.courtListCell}>{t("無")}</span>);
		}
		else {
			closeWeekdays?.forEach((weekday) => {
				result.push(<span className={styles.courtListCell}>{weekday}</span>);
			});
		}
		return result;
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs 
					value={value} 
					onChange={handleChange} 
					aria-label='wrapped basic tabs example'
					textColor='primary'
					indicatorColor='primary'
				>
					<Tab label={ t("場地資訊")} {...a11yProps(0)}/>
					<Tab label={ t("場地時段") } {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<Container>
					<Row>
						<Col lg={12} xl={6}>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("Location")}</span>
								<span>{venueInfo?.address}</span>
								<Link href='https://www.google.com/maps/place/NTU+Sports+Center/@25.0216636,121.5352783,15z/data=!4m2!3m1!1s0x0:0x861db0f2b5ef52a3?sa=X&ved=2ahUKEwj_yNTW2LGCAxWIe_UHHbiTAVcQ_BJ6BAhJEAA'>
									<IconButton>
										<RoomIcon fontSize='inherit' color='secondary'/>
									</IconButton>
								</Link>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("場地面積")}</span>
								<span>{`${venueInfo?.area} ${t("Square Meter")}`}</span>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("單一場地可容納人數")}</span>
								<span>{`${venueInfo?.max_number_of_people} ${t("人")}`}</span>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("場地數量")}</span>
								<span>{`${venueInfo?.stadium_courts?.length} ${t("場")}`}</span>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("場地列表")}</span>
								<span>{getCourtList()}</span>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("開放時間")}</span>
								<span>{`${venueInfo?.available_times?.start_time}:00 ~ ${venueInfo?.available_times?.end_time}:00`}</span>
							</p>
							<p className="text-lg">
								<span className={styles.infoAttr}>{t("休館日")}</span>
								<span>{getCloseWeekdays()}</span>
							</p>
						</Col>
						<Col lg={12} xl={6}>
							<Carousel>
								<Carousel.Item>
									<img 
										src='/venue-1.jpg'
										className='d-block w-100 h-80'
										alt='image 1'/>
								</Carousel.Item>
								<Carousel.Item>
									<img 
										src='/venue-2.jpg'
										className='d-block w-100 h-80'
										alt='image 2'/>
								</Carousel.Item>
								<Carousel.Item>
									<img 
										src='/venue-3.jpg'
										className='d-block w-100 h-80'
										alt='image 3'/>
								</Carousel.Item>
							</Carousel>
						</Col>
					</Row>
				</Container>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<Container>
					<Row>
						<Col xs={12} md={6} xl={4} className='my-2'>
							<span>{ t("欲使用人數") }</span>
							<input 
								type='number'
								className='ml-4 mr-2 w-12'
								value={people}
								min="0"
								onChange={(e) => setPeople(e.target.value)}
							/>
							<span>{ t("人") }</span>
						</Col>
						<Col xs={12} md={6} xl={4} className='my-2'>
							<span>{ t("球技程度") }</span>
							<select 
								className='mx-4 px-2 text-center' 
								value={level}
								onChange={(e) => setLevel(e.target.value)}
							>
								<option value={levelList[0]}>{ t("初級") }</option>
								<option value={levelList[1]}>{ t("中級") }</option>
								<option value={levelList[2]}>{ t("高級") }</option>
							</select>
						</Col>
					</Row>
					<Row className='my-3'>
						<TimeTable people={people} venueInfo={venueInfo}/>
					</Row>
				</Container>
			</CustomTabPanel>
			</Box>
		</ThemeProvider>
	);
}

export default VenueTab;
