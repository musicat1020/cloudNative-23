import { useTranslation } from "react-i18next";
import BaseModal from "./baseModal";
import SubVenueTable from "./subVenueTable";

function SessionModal({ show, setShow }) {

	const { t } = useTranslation();

	return (
		<BaseModal 
			venue={t("綜合體育館 一樓多功能球場")}
			session={t("2021/10/20 14:00 - 16:00")}
			show={show} 
			handleClose={() => setShow(false)} 
			title={t("租借場地")}
			content={<SubVenueTable/>}
		/>
	);
}

export default SessionModal;
