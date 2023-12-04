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
import axios from "@/utils/axios";
import LevelEnum from "@/utils/levelEnum";
import BaseModal from "@/components/baseModal";
import BaseSwitch from "@/components/baseSwitch";
import BaseCheckbox from "@/components/baseCheckbox";
import PeopleSelect from "@/components/peopleSelect";
import InputEmail from "@/pages/main/_components/inputEmail";
import styles from "@/styles/court.module.css";

function CourtTable({ venueInfo, date, startTime, endTime, windowSize, people, level }) {

	const { t } = useTranslation();

	const levelList = {
		"EASY": t("初級"),
		"MEDIUM": t("中級"),
		"HARD": t("高級"),
	};
	const statusList = {
		"join": "加入",
		"rent": "租借",
		"full": "已滿",
	};
	const reverseLevelEnum = Object.fromEntries(
		Object.entries(LevelEnum).map(([key, value]) => [value, key])
	);

	const [showJoin, setShowJoin] = useState(false);
	const [showJoinRes, setShowJoinRes] = useState(false);
	const [joinResponse, setJoinResponse] = useState({});
	const [peopleJoin, setPeopleJoin] = useState(people);

	const [showRent, setShowRent] = useState(false);
	const [showRentRes, setShowRentRes] = useState(false);
	const [rentResponse, setRentResponse] = useState({});
	const [peopleUsed, setPeopleUsed] = useState(people);
	const [emails, setEmails] = useState([]);
	const [allowMatching, setAllowMatching] = useState(false);
	const [peopleMatching, setPeopleMatching] = useState(1);
	const [levelChecked, setLevelChecked] = useState([]);
	
	const [joinModalWidth, setJoinModalWidth] = useState("35vw");
	const [rentModalWidth, setRentModalWidth] = useState("45vw");
	const [rentSuccessModalWidth, setRentSuccessModalWidth] = useState("45vw");

	const [courtData, setCourtData] = useState([]);
	const [currCourtInfo, setCurrCourtInfo] = useState({});

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
			setJoinModalWidth("40vw");
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

	const clearJoinInput = () => {
		setPeopleJoin(people);
		setEmails([]);
	};

	const clearRentInput = () => {
		setPeopleUsed(people);
		setEmails([]);
		setAllowMatching(true);
		setPeopleMatching(1);
		setLevelChecked([]);
	};

	const handleOpenJoin = (e) => {
		const courtId = e.target.id;
		const courtInfo = courtData.find((item) => item.stadium_court_id === parseInt(courtId, 10));
		setCurrCourtInfo(courtInfo);
		setShowJoin(true);
	};

	const handleOpenRent = (e) => {
		const courtId = e.target.id;
		const courtInfo = courtData.find((item) => item.stadium_court_id === parseInt(courtId, 10));
		setCurrCourtInfo(courtInfo);
		setShowRent(true);
	};

	const handleCloseJoin = () => {
		clearJoinInput();
		setShowJoin(false);
	};

	const handleCloseRent = () => {
		clearRentInput();
		setShowRent(false);
	};

	const handleCloseJoinRes = () => {
		setJoinResponse({});
		setCurrCourtInfo({});
		setShowJoinRes(false);
	};

	const handleCloseRentRes = () => {
		setRentResponse({});
		setCurrCourtInfo({});
		setShowRentRes(false);
	};

	const checkRentInput = (data) => {
		let flag = true; 
		const text = [];

		if (data.current_member_number <= 0) {
			text.push(t("使用人數不可為0"));
			flag = false;
		}

		if (data.is_matching && data.max_number_of_member <= 0) {
			text.push(t("可加入人數不可為0"));
			flag = false;
		}

		if (data.team_member_emails?.length !== (data.current_member_number-1)) {
			text.push(t("隊友Email不符合人數"));
			flag = false;
		}

		if (data.level_requirement === undefined || data.level_requirement === null) {
			text.push(t("請選擇球友球技要求"));
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

	const checkJoinInput = (data) => {
		let flag = true; 
		const text = [];

		if (data.people <= 0) {
			text.push(t("使用人數不可為0"));
			flag = false;
		}

		if (data.team_member_emails?.length !== (peopleJoin-1)) {
			text.push(t("隊友Email不符合人數"));
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

	const handleJoin = async (e) => {

		const data = {
			team_id: parseInt(e.target.dataset.teamId, 10),
			team_member_emails: emails?.map((item) => item.email),
		};

		// Check if input is valid
		if (!checkJoinInput(data)) {
			return;
		}

		const res = await axios.post("/api/v1/stadium-court/join", data, {});

		setJoinResponse(res);

		// Close modal
		handleCloseJoin();

		 // Show join response modal
		setShowJoinRes(true);
	};

	const convertLevelRequirement = (levels) => {
		const mapLevels = levels.sort().map(item => reverseLevelEnum[parseInt(item, 10)]);
		return LevelEnum[mapLevels.join("_")];
	};

	const handleRent = async () => {

		const data = {
			stadium_court_id: currCourtInfo.stadium_court_id,
			date,
			start_time: parseInt(startTime, 10),
			end_time: parseInt(endTime, 10),
			current_member_number: peopleUsed,
			max_number_of_member: allowMatching ? parseInt(peopleUsed, 10) + parseInt(peopleMatching, 10) : parseInt(peopleUsed, 10),
			is_matching: allowMatching,
			level_requirement: convertLevelRequirement(levelChecked),
			team_member_emails: emails?.map((item) => item.email),
		};

		// Check if input is valid
		if (!checkRentInput(data)) {
			return;
		}

		const res = await axios.post("/api/v1/stadium-court/rent", data, {});

		setRentResponse(res);

		// Close modal
		handleCloseRent();

		// Show rent response modal
		if (res.message === "success") {
			setShowRentRes(true);
		}
		else {
			Swal.fire({
				icon: "error",
				title: "Error",
				text: t("Please rent again."),
				confirmButtonColor: "#14274C",
			});
		}
	};

	const handleEmailChange = (value) => {
		setEmails(value);
	};

	const getJoinContent = () => (
		<Container>
			{/* Renter */}
			<Row>
				<Col>
					<span className={styles.borderAttrTitle}>{t("租借人")}</span>
					<span>{currCourtInfo?.renter_name}</span>
				</Col>
			</Row>

			{/* People */}
			<Row>
				<Col>
					<span className={styles.borderAttrTitle}>{t("目前人數")}</span>
					<span>{`${currCourtInfo?.current_member_number}/${currCourtInfo?.max_number_of_member}`}</span>
				</Col>
			</Row>


			{/* Levels */}
			<Row>
				<Col>
					<span className={styles.borderAttrTitle}>{t("球技要求")}</span>
					{
						currCourtInfo?.level_requirement?.map((item, index) => (
							<span key={index} className={styles.level}>{t(item)}</span>
						))
					}
				</Col>
			</Row>

			{/* People Join */}
			<Row>
				<Col>
					<span className={styles.borderAttrTitle}>{t("欲加入人數")}</span>
					<PeopleSelect 
						className="mr-4 px-2 text-center"
						people={peopleJoin} 
						maxPeople={currCourtInfo.max_number_of_member - currCourtInfo.current_member_number} 
						onChange={setPeopleJoin}
					/>
					<span>{ t("人") }</span>
				</Col>
			</Row>

			{/* Temmates Email */}
			<Row>
				<Col className="flex items-center mt-2">
					<span className={styles.borderAttrTitle}>{t("隊友Email")}</span>
					<InputEmail emails={emails} onChange={handleEmailChange}/>
				</Col>
			</Row>

			{/* Button */}
			<Row className='mt-3'>
				<Col className='text-center'>
					<button 
						data-court-id={currCourtInfo?.stadium_court_id} 
						data-team-id={currCourtInfo?.team_id}
						className={styles.confirmButton} 
						onClick={(e) => handleJoin(e)}
					>
						{t("確定")}
					</button>
				</Col>
			</Row>
		</Container>
	);

	const getJoinResContent = () => {
		const { team } = joinResponse;
		const levels = reverseLevelEnum[team?.level_requirement]?.split("_");

		return (
			<Container>
				{/* Renter */}
				<Row>
					<Col>
						<span className={styles.borderAttrTitle}>{t("租借人")}</span>
						<span>{currCourtInfo?.renter_name}</span>
					</Col>
				</Row>

				{/* People */}
				<Row>
					<Col>
						<span className={styles.borderAttrTitle}>{t("目前人數")}</span>
						<span>{`${team?.current_member_number}/${team?.max_number_of_member}`}</span>
					</Col>
				</Row>


				{/* Levels */}
				<Row>
					<Col>
						<span className={styles.borderAttrTitle}>{t("球技要求")}</span>
						{		
							levels?.map((item, index) => (
								<span key={index} className={styles.level}>{t(levelList[item])}</span>
							))
						}
					</Col>
				</Row>

				{/* Button */}
				<Row className='mt-3'>
					<Col className='text-center'>
						<button className={styles.confirmButton} onClick={handleCloseJoinRes}>
							{t("確定")}
						</button>
					</Col>
				</Row>
			</Container>
		);
	};

	const getRentContent = () => (
		<Container>

			{/* People */}
			<Row>
				<Col>
					<span className={styles.noBorderAttrTitle}>{t("使用人數")}</span>
					<PeopleSelect 
						className="mx-4 px-2 text-center"
						people={peopleUsed} 
						maxPeople={venueInfo?.max_number_of_people} 
						onChange={setPeopleUsed}
					/>
					<span>{ t("人") }</span>
				</Col>
			</Row>

			{/* Temmates Email */}
			<Row>
				<Col className="flex items-center mt-2">
					<span className={styles.noBorderAttrTitle}>{t("隊友Email")}</span>
					<InputEmail emails={emails} onChange={handleEmailChange}/>
				</Col>
			</Row>

			{/* Allow Matching */}
			<Row>
				<Col>
					<span className={styles.noBorderAttrTitle}>{t("允許配對球友?")}</span>
					<BaseSwitch 
						checked={allowMatching}
						handleChange={setAllowMatching}
					/>
				</Col>
			</Row>

			{/* People Matching */}
			<Row>
				<Col>
					<span className={styles.noBorderAttrTitle}>{t("想再找幾名球友?")}</span>
					<PeopleSelect 
						className="mx-4 px-2 text-center"
						disabled={!allowMatching}
						people={peopleMatching} 
						maxPeople={venueInfo.max_number_of_people - peopleUsed} 
						onChange={setPeopleMatching}
					/>
					<span>{ t("人") }</span>
				</Col>
			</Row>

			{/* Levels */}
			<Row>
				<Col className='flex flex-row'>
					<span className={styles.noBorderAttrTitle}>{t("球友球技要求")}</span>
					<FormGroup className='ml-4'>
						<FormControlLabel control={<BaseCheckbox value={LevelEnum.EASY} checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.EASY} />
						<FormControlLabel control={<BaseCheckbox value={LevelEnum.MEDIUM} checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.MEDIUM} />
						<FormControlLabel control={<BaseCheckbox value={LevelEnum.HARD} checkedList={levelChecked} handleChecked={setLevelChecked} />} label={levelList.HARD} />
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

	const convertLevelIndexToList = (levelIndex) => {
		const levels = reverseLevelEnum[levelIndex]?.split("_");
		if (levels?.length === 0) {
			return <span key={0} className={styles.level}>{t("無")}</span>;
		}

		return levels?.map((item, index) => (
			<span key={index} className={styles.level}>{t(levelList[item])}</span>
		));
	};

	const getRentResContent = () => {
		const { data } = rentResponse;

		return (
			<Container>
				
				{/* People */}
				<Row>
					<Col>
						<span className={styles.rentSuccAttrTitle}>{t("目前使用人數")}</span>
						<span>{`${data?.current_member_number}`}</span>
						<span className="ml-2">{ t("人") }</span>
					</Col>
				</Row>

				{/* Allow Matching */}
				<Row>
					<Col>
						<span className={styles.rentSuccAttrTitle}>{t("允許配對")}</span>
						<span>{ data?.is_matching ? t("是") : t("否") }</span>
					</Col>
				</Row>

				{/* People Matching */}
				<Row>
					<Col>
						<span className={styles.rentSuccAttrTitle}>{t("可配對人數")}</span>
						<span>{data ? data.max_number_of_member-data.current_member_number : 0}</span>
						<span className="ml-2">{ t("人") }</span>
					</Col>
				</Row>

				{/* Levels */}
				<Row>
					<Col>
						<span className={styles.rentSuccAttrTitle}>{t("球技要求")}</span>
						{convertLevelIndexToList(data?.level_requirement)}
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
	};

	const getModalVenueName = () => `${venueInfo?.name} ${venueInfo?.venue_name} ${currCourtInfo?.name}`;
	
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
										<span key={index} className={styles.level}>{t(item)}</span>
									)))
									|| 
									<span className={styles.level}>{t("無")}</span>
								}
							</TableCell>
							<TableCell className={styles.tableCell}>
								{
									row.status === statusList.join &&
									<button id={row.stadium_court_id} data-name={row.name} onClick={(e) => handleOpenJoin(e)} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{t(row.status)}</button>
								}
								{
									row.status === statusList.rent &&
									<button id={row.stadium_court_id} data-name={row.name} onClick={(e) => handleOpenRent(e)} className={`${styles.statusButton} ${styles.statusButtonBlack}`}>{t(row.status)}</button>
								}
								{
									row.status !== statusList.join && row.status !== statusList.rent &&
									<span className='text-gray cursor-default'>{t(row.status)}</span>
								}
							</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Modal for joined */}
			<BaseModal 
				venue={getModalVenueName()}
				date={date}
				startTime={startTime}
				endTime={endTime}
				show={showJoin}
				handleClose={handleCloseJoin}
				title={t("加入隊伍")}
				content={getJoinContent()}
				customStyles={{width: joinModalWidth}}
			/>

			{/* Modal for joined resopnse */}
			<BaseModal 
				venue={getModalVenueName()}
				date={date}
				startTime={startTime}
				endTime={endTime}
				show={showJoinRes}
				handleClose={handleCloseJoinRes}
				title={t("加入成功")}
				content={getJoinResContent()}
				customStyles={{width: joinModalWidth}}
			/>

			{/* Modal for rental */}
			<BaseModal 
				venue={getModalVenueName()}
				date={date}
				startTime={startTime}
				endTime={endTime}
				show={showRent}
				handleClose={handleCloseRent}
				title={t("租借場地")}
				content={getRentContent()}
				customStyles={{width: rentModalWidth}}
			/>

			{/* Modal for rental response */}
			<BaseModal 
				venue={getModalVenueName()}
				date={date}
				startTime={startTime}
				endTime={endTime}
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
