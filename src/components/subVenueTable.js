import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import styles from '../styles/subvenue.module.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BorderRight } from '@mui/icons-material';

function createData(id, venue, renter, people, levels, status) {
	return { id, venue, renter, people, levels, status };
}

const SubVenueTable = () => {

	const { t } = useTranslation();

	const rows = [
		createData(1, 'A場', '丁丁', '2/4', [t('中級'), t('高級')], t('加入')),
		createData(2, 'B場', '星星','3/6', [t('初級')], t('加入')),
		createData(3, 'C場', '容容','4/4', [t('高級')], t('已滿')),
		createData(4, 'D場', '安安','2/5', [t('無')], t('加入')),
		createData(5, 'E場', '無','0', [t('無')], t('租借')),
	];

	const handleJoin = () => {
		alert('join');
	}

	const handleRent = () => {
		alert('rent');
	}
	
	return (
		<>
    		<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table' className={styles.table}>
					<TableHead>
						<TableRow>
							<TableCell className={styles.tableTitle}>{ t('場地') }</TableCell>
							<TableCell className={styles.tableTitle}>{ t('租借人') }</TableCell>
							<TableCell className={styles.tableTitle}>{ t('使用人數') }</TableCell>
							<TableCell className={styles.tableTitle}>{ t('程度要求') }</TableCell>
							<TableCell className={styles.tableTitle} style={{borderRight: 0}}>
								{ t('狀態') }
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.id}
						>
							<TableCell component='th' scope='row' className={styles.tableCell}>
								{row.venue}
							</TableCell>
							<TableCell className={styles.tableCell}>{row.renter}</TableCell>
							<TableCell className={styles.tableCell}>{row.people}</TableCell>
							<TableCell className={styles.tableCell}>
								{
									row.levels.map((item, index) => (
										<span key={index} className={styles.level}>{item}</span>
									))
								}
							</TableCell>
							<TableCell className={styles.tableCell}>
								{
									(row.status == t('加入')) ?
										<button onClick={handleJoin} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
									: (row.status == t('租借')) ? 
										<button onClick={handleRent} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
									:
										<span className='text-gray cursor-default'>{row.status}</span>
								}
							</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

export default SubVenueTable;