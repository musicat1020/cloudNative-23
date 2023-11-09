import { Checkbox } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';

const BaseCheckbox = ({ value, checkedList, handleChecked }) => {

	const handleChange = (e) => {
		if (e.target.checked) {
			handleChecked(prevArray => [...prevArray, e.target.value]);
		}
		else {
			handleChecked(checkedList.filter(item => item !== e.target.value));
		}
	}

	return (
		<Checkbox 
			value={value}
			icon={<CircleIcon className='text-light-blue'/>}
			checkedIcon={<CheckCircleIcon />}
			onChange={handleChange}
			sx={{
				color: '#14274C',
				'&.Mui-checked': {
					color: '#14274C',
				},
			}}
		/>
	)
}

export default BaseCheckbox;