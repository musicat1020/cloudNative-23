import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ButtonDatePicker from '../components/buttonDatePicker';
import styles from '../styles/timetable.module.css';

const TimeTable = () => {
	const { t } = useTranslation();

	const dayDuration = 7;
	const curDate = dayjs();
	const [startDate, setStartDate] = useState(curDate);

	const convertDateFormat = (date) => {
		const dateString = dayjs(date).format('MM/DD (ddd)');
		return dateString;
	}

	const addDate = (add) => {
		const newDate = startDate.clone().add(add, 'days');
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
		const sessionTime = convertTimeFormat(sessionStart) + ' - ' + convertTimeFormat(sessionEnd);
		timeCols.push(<Col key={-1} className={styles.timeTableSessionCell}>{sessionTime}</Col>)

		/** get time columns */
		for (var i=0; i<dayDuration; i++) {
			if (i%2 == 0) { /** TODO */
				var col = 
					<Col key={i} aria-disabled={true} className={styles.timeTableSessionCell}>
						{ t('已租借') }
					</Col>;
			}
			else {
				var col = 
					<Col key={i} onClick={handleSessionClick} className={styles.timeTableSessionCell}>
						{ t('開放中') }
					</Col>;
			}
			
			timeCols.push(col);
		}

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
		for (var i=0; i<dayDuration; i++) {
			const newDate = convertDateFormat(addDate(i));
			dateCols.push(<Col key={i} className={styles.timeTableDateCell}>{newDate}</Col>);
		}

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
							maxDate={curDate.clone().add(1, 'year')}
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