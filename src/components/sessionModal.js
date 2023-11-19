import { useState , useEffect} from "react";
import { useTranslation } from "react-i18next";
import BaseModal from "./baseModal";
import CourtTable from "./courtTable";

function SessionModal({ venueInfo, date, startTime, endTime, show, setShow, windowSize, people }) {

	const { t } = useTranslation();

	const [modalWidth, setModalWidth] = useState("50vw");

	/** handle modal width based on window size */
	useEffect(() => {
		if (windowSize[0] < 1024) {
			setModalWidth("90vw");
		}
		else if (windowSize[0] < 1350) {
			setModalWidth("60vw");
		}
		else {
			setModalWidth("50vw");
		}
	}, [windowSize]);

	return (
		<BaseModal 
			venue={`${t("綜合體育館")} ${venueInfo?.name}`}
			session={`${date ? date.replaceAll("-", "/"): date} ${startTime}-${endTime}`}
			show={show} 
			handleClose={() => setShow(false)} 
			title={t("租借場地")}
			content={<CourtTable venueInfo={venueInfo} windowSize={windowSize} people={people}/>}
			customStyles={{width: modalWidth}}
		/>
	);
}

export default SessionModal;
