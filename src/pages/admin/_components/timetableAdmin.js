import { useEffect, useState, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ButtonDatePicker from "@/components/buttonDatePicker";
import Loading from "@/components/loading";
import axios from "@/utils/axios";
import styles from "@/styles/timetable.module.css";
import AdminSessionModal from "@/pages/admin/_components/adminSessionModal";

function AdminTimeTable({ venueInfo }) {
	const { t } = useTranslation();

	const curDate = dayjs();
	const maxDate = curDate.clone().add(1, "year");
	const [startDate, setStartDate] = useState(curDate);
	const [timeTableDates, setTimeTableDates] = useState([]);
	const [timeTableData, setTimeTableData] = useState([]);
	const [dayDuration, setDayDuration] = useState(7);
	const [showSessionModal, setShowSessionModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [clickEditData, setClickEditData] = useState(null);
	const [windowSize, setWindowSize] = useState([(typeof window !== "undefined") ? [window.innerWidth, window.innerHeight] : [0, 0]]);

	const getTimeTable = async (queryDate) => {
		setLoading(true);
		const params = {
			stadium_id: venueInfo.id,
			query_date: queryDate.format("YYYY-MM-DD")
		};

		const res = await axios.post(
			"/api/v1/stadium/providertimetable/", {}, { params }
		);

		setTimeTableData(res.data);
		setLoading(false);
	};

	const handleChangeStatusConfirmed = useCallback(() => {
		getTimeTable(startDate);
		setShowSessionModal(false);
	}, []);


	// init time table data
	useEffect(() => {
		getTimeTable(startDate);
	}, [startDate]);

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

	const convertDateFormat = (date, format = "MM/DD (ddd)") => {
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
		for (let i = 0; i < dayDuration; i += 1) {
			const newDate = addDate(startDate.clone(), i);
			newTimeTableDates.push(newDate);
		}
		setTimeTableDates(newTimeTableDates);
	}, [startDate, dayDuration]);

	const handleSessionClick = (e, status) => {
		const { date, start, end } = e.target.dataset;
		setClickEditData({
			startDate: date,
			startTime: start.split(":")[0],
			endDate: date,
			endTime: end.split(":")[0],
			status
		});
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
			const status = timeTableData[i][`day_${i + 1}`][hour];

			let col;
			if (status === "no_order" || status === "has_order") {
				col =
					<Col
						key={i}
						data-date={convertDateFormat(date, "YYYY-MM-DD")}
						data-start={FormatSessionStart}
						data-end={FormatSessionEnd}
						onClick={(e) => handleSessionClick(e, status)}
						aria-disabled={false}
						className={styles.timeTableAvailableCell}
					>
						{(status === "no_order") ? t("Available") : t("Booked")}
					</Col>;
			}
			else {
				col =
					<Col
						key={i}
						data-date={convertDateFormat(date, "YYYY-MM-DD")}
						data-start={FormatSessionStart}
						data-end={FormatSessionEnd}
						onClick={(e) => handleSessionClick(e, status)}
						className={styles.timeTableDisableCell}
					>
						{t("Disabled")}
					</Col>;
			}

			timeCols.push(col);
		});

		return timeCols;
	};

	const handleDateCols = () => {

		const dateCols = [];

		/** get first cell */
		dateCols.push(<Col key={-1} className={styles.timeTableDateCell}>{t("Session")}</Col>);

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
		if (!timeTableData || timeTableData.length === 0) {
			return timeTable;
		}

		const sessions = Object.keys(timeTableData[0].day_1);
		const openingHoursStart = Math.min(...sessions);
		const openingHoursEnd = Math.max(...sessions) + 1;

		const startTime = dayjs(`${openingHoursStart}:00`, "HH:mm");
		const endTime = dayjs(`${openingHoursEnd}:00`, "HH:mm");
		const timeIntervals = endTime.diff(startTime, "hour");

		let sessionStart = startTime;
		let sessionEnd = startTime.clone().add(1, "hour");

		/** get time table body */
		for (let i = 0; i < timeIntervals; i += 1) {
			timeTable.push(<Row key={i}>{handleTimeCols(sessionStart, sessionEnd)}</Row>);
			sessionStart = sessionEnd;
			sessionEnd = sessionStart.clone().add(1, "hour");
		}

		return timeTable;
	};

	return (
		<>
			{loading && <Loading />}
			<Container className='bg-cream'>
				<Row>
					<Col className='text-center py-1'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<ButtonDatePicker
								label={startDate == null ? null : startDate.format("YYYY/MM/DD")}
								interval={dayDuration}
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
			<AdminSessionModal
				venueInfo={venueInfo}
				clickEditData={clickEditData}
				show={showSessionModal}
				setShow={setShowSessionModal}
				onChangeStatusConfirmed={handleChangeStatusConfirmed}
				windowSize={windowSize} />
		</>
	);
}

export default AdminTimeTable;
