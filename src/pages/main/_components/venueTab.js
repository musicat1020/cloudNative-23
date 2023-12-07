import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Image from "next/image";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RoomIcon from "@mui/icons-material/Room";
import IconButton from "@mui/material/IconButton";
import { Link } from "@mui/material";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import TimeTable from "@/pages/main/_components/timetable";
import LevelEnum from "@/utils/levelEnum";
import PeopleSelect from "@/components/peopleSelect";
import styles from "@/styles/venuetab.module.css";
import Button from "@mui/material/Button";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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

	// 1 初級, 2 初＋中, 3 中, 4 初＋中＋高, 5 中＋高, 6 高
	const [value, setValue] = useState(1);
	const [people, setPeople] = useState(2);
	const [level, setLevel] = useState(LevelEnum.EASY);

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
		const weekdays = Array.from({ length: 7 }, (_, i) => i + 1);
		const openWeekdays = venueInfo?.available_times?.weekdays;
		const closeWeekdays = weekdays.filter((weekday) => !openWeekdays?.includes(weekday)).map((x) => mapWeekday[x]);
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

	const handleBackClick = () => {
		window.history.back();
	}

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
						<Tab label={t("場地資訊")} {...a11yProps(0)} />
						<Tab label={t("場地時段")} {...a11yProps(1)} />
					</Tabs>
				</Box>
				<CustomTabPanel value={value} index={0}>
					<Container>
						<Row>
							<Col lg={12} xl={6}>
								<p className="text-lg">
									<span className={styles.infoAttr}>{t("Location")}</span>
									<span>{venueInfo?.address}</span>
									{venueInfo?.google_map_url && 
										<Link 
											target="_blank"
											rel="noopener noreferrer"
											href={venueInfo?.google_map_url}>
											<IconButton>
												<RoomIcon fontSize='inherit' color='secondary' />
											</IconButton>
										</Link>
									}
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
								{venueInfo?.picture && 
									<Image
										src={venueInfo?.picture}
										className='d-block shadow-md rounded-md'
										width={500}
										height={500}
										alt="Venue Image"
									/>
								}
							</Col>
						</Row>
					</Container>
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<Container>
						<Row>
							<Col xs={12} md={6} xl={4} className='my-2'>
								<span>{t("欲使用人數")}</span>
								<PeopleSelect 
									className="mx-4 px-2 text-center"
									people={people} 
									maxPeople={venueInfo?.max_number_of_people} 
									onChange={setPeople}
								/>
								<span>{t("人")}</span>
							</Col>
							<Col xs={12} md={6} xl={4} className='my-2'>
								<span>{t("球技程度")}</span>
								<select
									className='mx-4 px-2 text-center'
									value={level}
									onChange={(e) => setLevel(e.target.value)}
								>
									<option value={LevelEnum.EASY}>{t("初級")}</option>
									<option value={LevelEnum.MEDIUM}>{t("中級")}</option>
									<option value={LevelEnum.HARD}>{t("高級")}</option>
								</select>
							</Col>
						</Row>
						<Row className='my-3'>
							<TimeTable people={people} level={level} venueInfo={venueInfo} />
							<div className="flex justify-end mt-4">
								<Button 
									variant="outlined"
									color="secondary"
									endIcon={<ChevronRightIcon />}
									onClick={handleBackClick}>
									{t("回到場地一覽")}
								</Button>
							</div>
						</Row>
					</Container>
				</CustomTabPanel>
			</Box>
		</ThemeProvider>
	);
}

export default VenueTab;
