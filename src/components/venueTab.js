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
import TimeTable from "./timetable";

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

	const handleChange = (event, newValue) => {
		setValue(newValue);
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
						<Col>
							<p>
								<span className='text-lg'>{ `${t("場館地址")}：${venueInfo?.address}` }</span>
								<Link href='https://www.google.com/maps/place/NTU+Sports+Center/@25.0216636,121.5352783,15z/data=!4m2!3m1!1s0x0:0x861db0f2b5ef52a3?sa=X&ved=2ahUKEwj_yNTW2LGCAxWIe_UHHbiTAVcQ_BJ6BAhJEAA'>
									<IconButton>
										<RoomIcon fontSize='inherit' color='secondary'/>
									</IconButton>
								</Link>
							</p>
							<p className='text-lg'>{ `${t("單一場地可容納人數")}：${venueInfo?.max_number_of_people} ${t("人")}` }</p>
							<p className='text-lg'>{ `${t("場地數量")}：${venueInfo?.number_of_court} ${t("場")}` }</p>
							<p className='text-lg'>{`${t("場地面積")}：${venueInfo?.area} ${t("Square Meter")}`}</p>
							<p className='text-lg'>{ `${t("開放時間")}：08 : 00 至 22 : 00` }</p>
						</Col>
						<Col>
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
