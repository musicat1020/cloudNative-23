import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TimeTable from './timetable';

const theme = createTheme({
	palette: {
		primary: {
			main: '#AD5625',
		},
		secondary: {
			main: '#14274C',
		},
		text: {
			primary: '#14274C',
			secondary: '#14274C',
		},
		divider: '#BEC8DD',
	},
	typography: {
		fontFamily: 
		'"Palatino", sans-serif',
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
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

const VenueTab = () =>  {

	const { t } = useTranslation();

	const levelList = ['beginner', 'intermediate', 'advanced'];
	const [value, setValue] = useState(1);
	const [people, setPeople] = useState(2);
	const [level, setLevel] = useState(levelList[1]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs 
					value={value} 
					onChange={handleChange} 
					aria-label='wrapped basic tabs example'
					textColor='primary'
					indicatorColor='primary'
				>
					<Tab label={ t('場地資訊')} {...a11yProps(0)}/>
					<Tab label={ t('場地時段') } {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<Container>
					<Row>
						<Col>Item One</Col>
					</Row>
				</Container>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<Container>
					<Row>
						<Col xs={12} md={6} xl={3} className='my-2'>
							<span>{ t('欲使用人數') }</span>
							<input 
								type='number'
								className='ml-4 mr-2 w-12'
								value={people}
								min="0"
								onChange={(e) => setPeople(e.target.value)}
							/>
							<span>{ t('人') }</span>
						</Col>
						<Col xs={12} md={6} xl={4} className='my-2'>
							<span>{ t('球技程度') }</span>
							<select 
								className='mx-4 px-2 text-center' 
								value={level}
								onChange={(e) => setLevel(e.target.value)}
							>
								<option value={levelList[0]}>{ t('初級') }</option>
								<option value={levelList[1]}>{ t('中級') }</option>
								<option value={levelList[2]}>{ t('高級') }</option>
							</select>
						</Col>
					</Row>
					<Row className='my-3'>
						<TimeTable/>
					</Row>
				</Container>
			</CustomTabPanel>
			</Box>
		</ThemeProvider>
	);
}

export default VenueTab;