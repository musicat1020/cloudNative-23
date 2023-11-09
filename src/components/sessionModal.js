import BaseModal from './baseModal';
import SubVenueTable from './subVenueTable';
import { useTranslation } from 'react-i18next';

const SessionModal = ({ show, setShow }) => {

	const { t } = useTranslation();

	return (
		<>
		<BaseModal 
			show={show} 
			handleClose={() => setShow(false)} 
			title={t('租借場地')}
			content={<SubVenueTable/>}
		/>
		</>
	);
}

export default SessionModal;