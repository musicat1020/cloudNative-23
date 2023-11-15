import { useState , useEffect} from "react";
import { useTranslation } from "react-i18next";
import BaseModal from "./baseModal";
import SubVenueTable from "./subVenueTable";

function SessionModal({ show, setShow, windowSize }) {

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
			venue={t("綜合體育館 一樓多功能球場")}
			session={t("2021/10/20 14:00 - 16:00")}
			show={show} 
			handleClose={() => setShow(false)} 
			title={t("租借場地")}
			content={<SubVenueTable windowSize={windowSize}/>}
			customStyles={{width: modalWidth}}
		/>
	);
}

export default SessionModal;
