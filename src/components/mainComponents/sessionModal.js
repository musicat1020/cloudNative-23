import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BaseModal from "@/components/baseModal";
import CourtTable from "@/components/mainComponents/courtTable";

function SessionModal({ venueInfo, date, startTime, endTime, show, setShow, windowSize, people, level }) {

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
			venue={`${venueInfo?.name} ${venueInfo?.venue_name}`}
			date={date ? date.replaceAll("-", "/") : date}
			startTime={startTime}
			endTime={endTime}
			show={show}
			handleClose={() => setShow(false)}
			title={t("租借場地")}
			content={<CourtTable
				venueInfo={venueInfo}
				date={date}
				startTime={startTime}
				endTime={endTime}
				windowSize={windowSize}
				people={people}
				level={level} />
			}
			customStyles={{ width: modalWidth }}
		/>
	);
}

export default SessionModal;
