import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ButtonDatePicker from "./buttonDatePicker";
import axios from "../utils/axios";
import styles from "../styles/timetable.module.css";
import AdminSessionModal from "./adminSessionModal";

const {
	publicRuntimeConfig: {
		apiRoot,
	},
} = getConfig();

function AdminTimeTable() {
	const { t } = useTranslation();

	const curDate = dayjs();
	const maxDate = curDate.clone().add(1, "year");
	const [startDate, setStartDate] = useState(curDate);
	const [timeTableDates, setTimeTableDates] = useState([]);
	const [timeTableData, setTimeTableData] = useState([]);
	const [dayDuration, setDayDuration] = useState(7);
	const [showSessionModal, setShowSessionModal] = useState(false);

	const [windowSize, setWindowSize] = useState([(typeof window !== "undefined") ? [window.innerWidth, window.innerHeight] : [0, 0]]);

	const getTimeTable = async () => {
		// const params = {
		// 	stadium_id: 1,
		// 	query_date: "2023-11-30T00:00:00"
		// };
		// const res = await axios.get(
		// 	`${apiRoot}/api/v1/stadium/timetable`,
		// 	{ params }
		// );

		// TODO: Remove this after backend is done
    // 3 status: Available, Booked, Disable
		const res = {
			status: 200,
			stadium_id: 1,
			query_date: "2023-11-30T00:00:00",
			message: "success",
			data: [
				{
					day_1: {
						"9":"Available",
						"10":"Aavailable",
						"11":"Available",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_2: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_3: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_4: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_5: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_6: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
				{
					day_7: {
						"9":"Disable",
						"10":"Aavailable",
						"11":"Booked",
						"12":"Available",
						"13":"Available",
						"14":"Available",
						"15":"Available",
						"16":"Available",
						"17":"Available",
						"18":"Available",
					}
				},
			]
		};

		setTimeTableData(res.data);
	};

	// init time table data
	useEffect(() => {
		getTimeTable();
	}, []);

	/** handle window resize */
	useEffect(() => {
		if (typeof window !== "undefined") {
			const handleResize = () => {
				setWindowSize([window.innerWidth, window.innerHeight]);
			};

			setWindowSize([window.innerWidth, window.innerHeight]);
			window.addEventListener("resize", handleResize);
			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, []);

	/** handle day duration based on window size */
	useEffect(() => {
		if (windowSize[0] < 768) {
			setDayDuration(2);
		}
		else if (windowSize[0] < 1024) {
			setDayDuration(3);
		}
		else if (windowSize[0] < 1350) {
			setDayDuration(5);
		}
		else {
			setDayDuration(7);
		}
	}, [windowSize]);

	const convertDateFormat = (date, format="MM/DD (ddd)") => {
		const dateString = dayjs(date).format(format);
		return dateString;
	};

	const addDate = (date, add) => {
		const newDate = date.add(add, "days");
		return newDate;
	};

	const convertTimeFormat = (time) => time.format("HH:mm");

	/** handle time table dates based on startDate and dayDuration */
	useEffect(() => {
		const newTimeTableDates = [];
		for (let i=0; i<dayDuration; i+=1) {
			const newDate = addDate(startDate.clone(), i);
			newTimeTableDates.push(newDate);
		}
		setTimeTableDates(newTimeTableDates);
	}, [startDate, dayDuration]);

	const handleSessionClick = (status) => {
		setShowSessionModal(true);
	};

	const handleTimeCols = (sessionStart, sessionEnd) => {
		
		const timeCols = [];
		
		/** get session time */
		const FormatSessionStart = convertTimeFormat(sessionStart);
		const FormatSessionEnd = convertTimeFormat(sessionEnd);
		const sessionTime = `${FormatSessionStart} - ${FormatSessionEnd}`;
		timeCols.push(<Col key={-1} className={styles.timeTableSessionCell}>{sessionTime}</Col>);

		/** get time columns */
		timeTableDates.forEach((date) => {

			const i = timeTableDates.indexOf(date);

			/** get session status */
			const hour = sessionStart.hour().toString();
			const status = timeTableData[i][`day_${i+1}`][hour];

			let col;
			if (status === "Available") {
				col = 
				<Col 
					key={i}
					data-date={convertDateFormat(date, "YYYY-MM-DD")}
					data-start={FormatSessionStart}
					data-end={FormatSessionEnd}
					onClick={handleSessionClick} 
					className={styles.timeTableSessionCell}
				>
					{ t("Available") }
				</Col>;
			}
			else {
				col = 
					<Col 
						key={i} 
						data-date={convertDateFormat(date, "YYYY-MM-DD")} 
						data-start={FormatSessionStart}
						data-end={FormatSessionEnd}
						// aria-disabled
            onClick={handleSessionClick} 
						className={styles.timeTableSessionCell}
					>
						{ (status === "Booked") ? t("Booked") : t("Disabled") }
					</Col>;
			}

			timeCols.push(col);
		});

		return timeCols;
	};

	const handleDateCols = () => {

		const dateCols = [];

		/** get first cell */
		dateCols.push(<Col key={-1} className={styles.timeTableDateCell}>{ t("Session") }</Col>);

		/** get date columns */
		timeTableDates.forEach((date) => {
			dateCols.push(<Col key={date} className={styles.timeTableDateCell}>{convertDateFormat(date)}</Col>);
		});

		return dateCols;
	};

	const handleTimeTable = () => {

		const timeTable = [];

		/** get time table header */
		timeTable.push(<Row key={-1}>{handleDateCols()}</Row>);

		/** time table data is empty */
		if (timeTableData.length === 0) {
			return timeTable;
		}

		const sessions = Object.keys(timeTableData[0].day_1);
		const openingHoursStart = Math.min(...sessions);
		const openingHoursEnd = Math.max(...sessions)+1;

		const startTime = dayjs(`${openingHoursStart}:00`, "HH:mm");
		const endTime = dayjs(`${openingHoursEnd}:00`, "HH:mm");
		const timeIntervals = endTime.diff(startTime, "hour");

		let sessionStart = startTime;
		let sessionEnd = startTime.clone().add(1, "hour");

		/** get time table body */
		for (let i=0; i<timeIntervals; i+=1) {
			timeTable.push(<Row key={i}>{handleTimeCols(sessionStart, sessionEnd)}</Row>);
			sessionStart = sessionEnd;
			sessionEnd = sessionStart.clone().add(1, "hour");
		}

		return timeTable;
	};

	return (
		<>
			<Container className='bg-cream'>
				<Row>
					<Col className='text-center py-1'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<ButtonDatePicker
								label={startDate == null ? null : startDate.format("YYYY/MM/DD")}
								date={startDate}
								minDate={curDate}
								maxDate={maxDate}
								onChange={(newDate) => setStartDate(newDate)}
							/>
						</LocalizationProvider>
					</Col>
				</Row>
				{handleTimeTable()}
			</Container>
			<AdminSessionModal show={showSessionModal} setShow={setShowSessionModal} windowSize={windowSize}/>
		</>
	);
}

export default AdminTimeTable;
