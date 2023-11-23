import { useState , useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { 
	FormGroup, 
	FormControlLabel, 
	Paper, 
	Table, 
	TableBody, 
	TableCell,
	TableContainer, 
	TableHead, 
	TableRow 
} from "@mui/material";
import Swal from "sweetalert2";
import getConfig from "next/config";
import axios from "../../../utils/axios";
import BaseModal from "../../../components/baseModal";
import BaseSwitch from "../../../components/baseSwitch";
import BaseCheckbox from "../../../components/baseCheckbox";
import styles from "@/styles/court.module.css";

const {
	publicRuntimeConfig: {
		apiRoot,
	},
} = getConfig();

function CourtTable({ venueInfo, date, startTime, windowSize, people, level }) {

	const { t } = useTranslation();

	const levelList = {
		"beginner": t("初級"),
		"intermediate": t("中級"),
		"advanced": t("高級"),
	};
	const statusList = {
		"join": "加入",
		"rent": "租借",
		"full": "已滿",
	};

	const [showJoin, setShowJoin] = useState(false);
	const [showRent, setShowRent] = useState(false);
	const [showRentRes, setShowRentRes] = useState(false);
	const [peopleUsed, setPeopleUsed] = useState(people);
	const [allowMatching, setAllowMatching] = useState(false);
	const [peopleMatching, setPeopleMatching] = useState(0);
	const [levelChecked, setLevelChecked] = useState([]);
	const [rentResponse, setRentResponse] = useState({});
	const [joinModalWidth, setJoinModalWidth] = useState("35vw");
	const [rentModalWidth, setRentModalWidth] = useState("45vw");
	const [rentSuccessModalWidth, setRentSuccessModalWidth] = useState("45vw");
	const [courtData, setCourtData] = useState([]);

	/** handle modal width based on window size */
	useEffect(() => {
		if (windowSize[0] < 768) {
			setJoinModalWidth("90vw");
			setRentModalWidth("90vw");
			setRentSuccessModalWidth("90vw");
		}
		else if (windowSize[0] < 1024) {
			setJoinModalWidth("70vw");
			setRentModalWidth("70vw");
			setRentSuccessModalWidth("70vw");
		}
		else if (windowSize[0] < 1350) {
			setJoinModalWidth("50vw");
			setRentModalWidth("50vw");
			setRentSuccessModalWidth("50vw");
		}
		else {
			setJoinModalWidth("35vw");
			setRentModalWidth("45vw");
			setRentSuccessModalWidth("45vw");
		}
	}, [windowSize]);

	const fetchCourtInfo = async () => {
		const params = { 
			stadium_id: venueInfo.id, 
			date,
			start_time: parseInt(startTime, 10),
			headcount: people,
			level_requirement: level,
		};
		const res = await axios.post("/api/v1/stadium-court/rent-info", {}, { params });
		setCourtData(res.data);
	};

	useEffect(() => {
		fetchCourtInfo();
	}, []);

	// TODO: get data from backend
	const joinData = {
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

		// TODO: Send request to backend

		setShowJoin(true);
	};

	const handleOpenRent = () => {
		setShowRent(true);
	};

	const handleCloseJoin = () => {
		setShowJoin(false);
	};

	const handleCloseRent = () => {
		clearRentInput();
		setShowRent(false);
	};

	const handleCloseRentRes = () => {
		setRentResponse({});
		setShowRentRes(false);
	};

	const checkRentInput = (data) => {
		let flag = true; 
		const text = [];

		if (data.people <= 0) {
			text.push(t("使用人數不可為0"));
			flag = false;
		}
		if (data.allowMatching && data.peopleMatching <= 0) {
			text.push(t("可加入人數不可為0"));
			flag = false;
		}

		if (!flag) {
			Swal.fire({
				icon: "error",
				title: "Error",
				html: text.join(",<br>"),
				confirmButtonColor: "#14274C",
			});
		}
		return flag;
	};

	const handleRent = async () => {

		const data = {
			"people": peopleUsed,
			"allowMatching": allowMatching,
			"peopleMatching": allowMatching ? peopleMatching: 0,
			"levels": levelChecked,
		};

		// Check if input is valid
		if (!checkRentInput(data)) {
			return;
		}

		setRentResponse(data);

		// TODO: send request to backend
		const res = await axios.get(
			`${apiRoot}/api/healthchecker`
		);

		// Show success message
		alert(JSON.stringify(res));

		// Close modal
		handleCloseRent();

		setShowRentRes(true);
	};

	const getJoinContent = (data) => (
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

	const getRentContent = () => (
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

	const getRentResContent = () => (
		<Container>
			
			{/* People */}
			<Row>
				<Col>
					<span className={styles.rentSuccAttrTitle}>{t("使用人數")}</span>
					<span>{`${rentResponse.people}`}</span>
					<span className="ml-2">{ t("人") }</span>
				</Col>
			</Row>

			{/* Allow Matching */}
			<Row>
				<Col>
					<span className={styles.rentSuccAttrTitle}>{t("允許配對")}</span>
					<span>{ rentResponse.allowMatching ? t("是") : t("否") }</span>
				</Col>
			</Row>

			{/* People Matching */}
			<Row>
				<Col>
					<span className={styles.rentSuccAttrTitle}>{t("可加入人數")}</span>
					<span>{`${rentResponse.peopleMatching}`}</span>
					<span className="ml-2">{ t("人") }</span>
				</Col>
			</Row>

			{/* Levels */}
			<Row>
				<Col>
					<span className={styles.rentSuccAttrTitle}>{t("球技要求")}</span>
					{ rentResponse.levels && ((
						rentResponse.levels.length > 0 && 
						rentResponse.levels.map((item, index) => (
							<span key={index} className={styles.level}>{levelList[item]}</span>
						))) 
						|| (rentResponse.levels.length === 0 && <span key={0} className={styles.level}>{t("無")}</span>)
					)}
				</Col>
			</Row>

			{/* Button */}
			<Row className='mt-3'>
				<Col className='text-center'>
					<button className={styles.confirmButton} onClick={handleCloseRentRes}>{t("確定")}</button>
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
							<TableCell className={styles.tableTitle}>{ t("球場") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("租借人") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("使用人數") }</TableCell>
							<TableCell className={styles.tableTitle}>{ t("球技要求") }</TableCell>
							<TableCell className={styles.tableTitle} style={{borderRight: 0}}>
								{ t("狀態") }
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
					{courtData && courtData.map((row) => (
						<TableRow
							key={row.stadium_court_id}
						>
							<TableCell component='th' scope='row' className={styles.tableCell}>
								{row.name}
							</TableCell>
							<TableCell className={styles.tableCell}>{row.renter_name ?? t("無")}</TableCell>
							<TableCell className={styles.tableCell}>{`${row.current_member_number ?? 0}/${row.max_number_of_member ?? venueInfo.max_number_of_people}`}</TableCell>
							<TableCell className={styles.tableCell}>
								{
									(row.level_requirement?.length > 0 && row.level_requirement.map((item, index) => (
										<span key={index} className={styles.level}>{levelList[item]}</span>
									)))
									|| 
									<span className={styles.level}>{t("無")}</span>
								}
							</TableCell>
							<TableCell className={styles.tableCell}>
								{
									row.status === statusList.join &&
									<button onClick={handleOpenJoin} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
								}
								{
									row.status === statusList.rent &&
									<button onClick={handleOpenRent} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{row.status}</button>
								}
								{
									row.status !== statusList.join && row.status !== statusList.rent &&
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
				venue={t("綜合體育館 一樓多功能球場 A場")}
				session={t("2021/10/20 14:00 - 16:00")}
				show={showJoin}
				handleClose={handleCloseJoin}
				title={t("已加入隊伍")}
				content={getJoinContent(joinData)}
				customStyles={{width: joinModalWidth}}
			/>

			{/* Modal for rental */}
			<BaseModal 
				venue={t("綜合體育館 一樓多功能球場 A場")}
				session={t("2021/10/20 14:00 - 16:00")}
				show={showRent}
				handleClose={handleCloseRent}
				title={t("租借場地")}
				content={getRentContent()}
				customStyles={{width: rentModalWidth}}
			/>

			{/* Modal for rental successfully */}
			<BaseModal 
				venue={t("綜合體育館 一樓多功能球場 A場")}
				session={t("2021/10/20 14:00 - 16:00")}
				show={showRentRes}
				handleClose={() => setShowRentRes(false)}
				title={t("租借成功")}
				content={getRentResContent()}
				customStyles={{width: rentSuccessModalWidth}}
			/>
		</>
	);
}

export default CourtTable;
