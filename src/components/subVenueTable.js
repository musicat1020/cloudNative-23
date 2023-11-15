import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { 
	FormGroup, 
	FormControlLabel, 
	Checkbox, 
	Paper, 
	Table, 
	TableBody, 
	TableCell,
	TableContainer, 
	TableHead, 
	TableRow 
} from "@mui/material";
import BaseModal from "./baseModal";
import BaseSwitch from "./baseSwitch";
import BaseCheckbox from "./baseCheckbox";
import styles from "../styles/subvenue.module.css";

// TODO: get data from backend
function createData(id, venue, renter, people, levels, status) {
	return { id, venue, renter, people, levels, status };
}

function SubVenueTable() {

	const { t } = useTranslation();

	const levelList = {
		"beginner": t("初級"),
		"intermediate": t("中級"),
		"advanced": t("高級"),
	};

	const [showJoined, setShowJoined] = useState(false);
	const [showRented, setShowRented] = useState(false);
	const [peopleUsed, setPeopleUsed] = useState(0);
	const [allowMatching, setAllowMatching] = useState(false);
	const [peopleMatching, setPeopleMatching] = useState(0);
	const [levelChecked, setLevelChecked] = useState([]);

	// TODO: get data from backend
	const rows = [
		createData(1, "A場", "丁丁", "2/4", ["intermediate", "advanced"], t("加入")),
		createData(2, "B場", "星星","3/6", ["beginner"], t("加入")),
		createData(3, "C場", "容容","4/4", ["advanced"], t("已滿")),
		createData(4, "D場", "安安","2/5", [], t("加入")),
		createData(5, "E場", "無","0", [], t("租借")),
	];

	const data = {
		"renter": t("丁丁"),
		"people": 2,
		"maxPeople": 4,
		"levels": ["intermediate", "advanced"],
	};

	const clearRentInput = () => {
		setPeopleUsed(0);
		setAllowMatching(true);
		setPeopleMatching(0);
		setLevelChecked([]);
	};

	const handleOpenJoin = () => {
		setShowJoined(true);
	};

	const handleOpenRent = () => {
		setShowRented(true);
	};

	const handleCloseJoin = () => {
		setShowJoined(false);
	};

	const handleCloseRent = () => {
		clearRentInput();
		setShowRented(false);
	};

	const handleRent = () => {

		// TODO: Sent rent request
		const data = {
			"people": peopleUsed,
			"allowMatching": allowMatching,
			"peopleMatching": peopleMatching,
			"levels": levelChecked,
		};

		alert(JSON.stringify(data));

		// Close modal
		handleCloseRent();
	};

	const getJoinedContent = (data) => (
			<Container>
				{/* Renter */}
				<Row>
					<Col>
						<span className={styles.joinAttrTitle}>{t("租借人")}</span>
						<span>{data.renter}</span>
					</Col>
				</Row>

				{/* People */}
				<Row>
					<Col>
						<span className={styles.joinAttrTitle}>{t("使用人數")}</span>
						<span>{`${data.people}/${data.maxPeople}`}</span>
					</Col>
				</Row>


				{/* Levels */}
				<Row>
					<Col>
						<span className={styles.joinAttrTitle}>{t("球技要求")}</span>
						{
							data.levels.map((item, index) => (
								<span key={index} className={styles.level}>{levelList[item]}</span>
							))
						}
					</Col>
				</Row>

				{/* Button */}
				<Row className='mt-3'>
					<Col className='text-center'>
						<button className={styles.confirmButton} onClick={handleCloseJoin}>{t("確定")}</button>
					</Col>
				</Row>
			</Container>
		);

	const getRentedContent = () => (
			<Container>

				{/* People */}
				<Row>
					<Col>
						<span className={styles.rentAttrTitle}>{t("使用人數")}</span>
						<input 
							type='number'
							className='ml-4 mr-2 w-12'
							value={peopleUsed}
							min="0"
							onChange={(e) => setPeopleUsed(e.target.value)}
						/>
						<span>{ t("人") }</span>
					</Col>
				</Row>

				{/* Allow Matching */}
				<Row>
					<Col>
						<span className={styles.rentAttrTitle}>{t("允許配對球友?")}</span>
						<BaseSwitch 
							checked={allowMatching}
							handleChange={setAllowMatching}
						/>
					</Col>
				</Row>

				{/* People Matching */}
				<Row>
					<Col>
						<span className={styles.rentAttrTitle}>{t("想再找幾名球友?")}</span>
						<input 
							type='number'
							className='ml-4 mr-2 w-12'
							value={peopleMatching}
							disabled={!allowMatching}
							min="0"
							onChange={(e) => setPeopleMatching(e.target.value)}
						/>
						<span>{ t("人") }</span>
					</Col>
				</Row>

				{/* Levels */}
				<Row>
					<Col className='flex flex-row'>
						<span className={styles.rentAttrTitle}>{t("球友球技要求")}</span>
						<FormGroup className='ml-4'>
							<FormControlLabel control={<BaseCheckbox value='beginner' checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.beginner} />
							<FormControlLabel control={<BaseCheckbox value='intermediate' checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.intermediate} />
							<FormControlLabel control={<BaseCheckbox value='advanced' checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.advanced} />
						</FormGroup>
					</Col>
				</Row>

				{/* Button */}
				<Row className='mt-3'>
					<Col className='text-center'>
						<button className={styles.cancelButton} onClick={handleCloseRent}>{t("取消")}</button>
						<button className={styles.confirmButton} onClick={handleRent}>{t("確定")}</button>
					</Col>
				</Row>
			</Container>
		);
	
	return (
		<>
    		<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table' className={styles.table}>
					<TableHead>
						<TableRow>
							<TableCell className={styles.tableTitle}>{ t("場地") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("租借人") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("使用人數") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("球技要求") }</TableCell>
							<TableCell className={styles.tableTitle} style={{borderRight: 0}}>
								{ t("狀態") }
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
									(row.levels.length > 0 && row.levels.map((item, index) => (
										<span key={index} className={styles.level}>{levelList[item]}</span>
									)))
									|| 
									<span className={styles.level}>{t("無")}</span>
								}
							</TableCell>
							<TableCell className={styles.tableCell}>
								{
									(row.status == t("加入")) ?
										<button onClick={handleOpenJoin} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
									: (row.status == t("租借")) ? 
										<button onClick={handleOpenRent} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
									:
										<span className='text-gray cursor-default'>{row.status}</span>
								}
							</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Modal for joined */}
			<BaseModal 
				show={showJoined}
				handleClose={handleCloseJoin}
				title={t("已加入隊伍")}
				content={getJoinedContent(data)}
				customStyles={{width: "35vw"}}
			/>

			{/* Modal for rented */}
			<BaseModal 
				show={showRented}
				handleClose={handleCloseRent}
				title={t("租借場地")}
				content={getRentedContent(data)}
				customStyles={{width: "45vw"}}
			/>
		</>
	);
}

export default SubVenueTable;