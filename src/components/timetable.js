import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ButtonDatePicker from '../components/buttonDatePicker';
import styles from '../styles/timetable.module.css';

const TimeTable = () => {
	const { t } = useTranslation();

	
	const curDate = dayjs();
	const maxDate = curDate.clone().add(1, 'year');
	const [startDate, setStartDate] = useState(curDate);
	const [scheduleDates, setScheduleDates] = useState([]);
	const [dayDuration, setDayDuration] = useState(7);

	const [windowSize, setWindowSize] = useState([(typeof window !== 'undefined') ? [window.innerWidth, window.innerHeight] : [0, 0]]);

	/** handle window resize */
	useEffect(() => {
		if (typeof window !== 'undefined') {
			const handleResize = () => {
				setWindowSize([window.innerWidth, window.innerHeight]);
			}

			setWindowSize([window.innerWidth, window.innerHeight]);
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
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
	})

	/** handle schedule dates based on startDate and dayDuration */
	useEffect(() => {
		var scheduleDates = [];
		for (var i=0; i<dayDuration; i++) {
			const newDate = addDate(startDate.clone(), i);
			scheduleDates.push(newDate);
		}
		setScheduleDates(scheduleDates);
	}, [startDate, dayDuration]);

	const convertDateFormat = (date, format='MM/DD (ddd)') => {
		const dateString = dayjs(date).format(format);
		return dateString;
	}

	const addDate = (date, add) => {
		const newDate = date.add(add, 'days');
		return newDate;
	}

	const convertTimeFormat = (time) => {
		return time.format('HH:mm');
	}

	const handleSessionClick = () => {
		alert('Session clicked');
	}

	const handleTimeCols = (sessionStart, sessionEnd) => {
		
		var timeCols = [];
		
		/** get session time */
		sessionStart = convertTimeFormat(sessionStart);
		sessionEnd = convertTimeFormat(sessionEnd);
		const sessionTime = sessionStart + ' - ' + sessionEnd;
		timeCols.push(<Col key={-1} className={styles.timeTableSessionCell}>{sessionTime}</Col>)

		/** get time columns */
		scheduleDates.forEach((date) => {
			/** TODO */
			const i = scheduleDates.indexOf(date);
			if (i%2 == 0) { 
				var col = 
					<Col 
						key={i} 
						data-date={convertDateFormat(date, 'YYYY-MM-DD')} 
						data-start={sessionStart}
						data-end={sessionEnd}
						aria-disabled={true} 
						className={styles.timeTableSessionCell}
					>
						{ t('已租借') }
					</Col>;
			}
			else {
				var col = 
					<Col 
						key={i}
						data-date={convertDateFormat(date, 'YYYY-MM-DD')}
						data-start={sessionStart}
						data-end={sessionEnd}
						onClick={handleSessionClick} 
						className={styles.timeTableSessionCell}
					>
						{ t('開放中') }
					</Col>;
			}

			timeCols.push(col);
		});

		return timeCols;
	}

	const handleTimeTable = (data) => {

		var timeTable = [];

		/** get time table header */
		timeTable.push(<Row key={-1}>{handleDateCols()}</Row>);

		/** TODO */
		const startTime = dayjs('08:00', 'HH:mm');
		const endTime = dayjs('22:00', 'HH:mm');
		const timeIntervals = endTime.diff(startTime, 'hour');

		var sessionStart = startTime;
		var sessionEnd = startTime.clone().add(1, 'hour');

		/** get time table body */
		for (var i=0; i<timeIntervals; i++) {
			timeTable.push(<Row key={i}>{handleTimeCols(sessionStart, sessionEnd)}</Row>)
			sessionStart = sessionEnd;
			sessionEnd = sessionStart.clone().add(1, 'hour');
		}

		return timeTable;
	}

	const handleDateCols = () => {

		var dateCols = [];

		/** get first cell */
		dateCols.push(<Col key={-1} className={styles.timeTableDateCell}>{ t('Session') }</Col>);

		/** get date columns */
		scheduleDates.forEach((date) => {
			dateCols.push(<Col key={date} className={styles.timeTableDateCell}>{convertDateFormat(date)}</Col>);
		});

		return dateCols;
	}

	return (
		<>
			<Container className='bg-cream'>
				<Row>
					<Col className='text-center py-1'>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<ButtonDatePicker
								label={startDate == null ? null : startDate.format('YYYY/MM/DD')}
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
		</>
	);
}

export default TimeTable;