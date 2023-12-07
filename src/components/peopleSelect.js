import styled from "styled-components";

const StyledSelect = styled.select`
	color: ${(props) => props.disabled ? "gray" : "dark-blue"};
	border-color: ${(props) => props.disabled ? "gray" : "dark-blue"};
`;

function PeopleSelect ({ className, disabled, people, maxPeople, onChange }) {

	const getOptions = () => {
		const options = [];
		if (maxPeople <= 0) {
			options.push(<option value={0}>{0}</option>);
		}
		else {
			for (let i = 1; i <= maxPeople; i+=1) {
				options.push(<option value={i} selected={i===people}>{i}</option>);
			}
		}
		return options;
	};

	return (
		<StyledSelect
			className={className}
			disabled={disabled ?? false}
			value={people}
			onChange={(e) => onChange(e.target.value)}
		>
			{getOptions()}
		</StyledSelect>
	);
}

export default PeopleSelect;
