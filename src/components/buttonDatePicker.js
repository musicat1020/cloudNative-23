import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

const dateTheme = (theme) => createTheme({
	...theme,
	palette: {
		primary: {
			main: "#14274C",
		},
	},
});

function ButtonField(props) {
	const {
		setOpen,
		label,
		id,
		disabled,
		InputProps: { ref } = {},
		inputProps: { "aria-label": ariaLabel } = {},
	} = props;

	return (
		<Button
			id={id}
			disabled={disabled}
			ref={ref}
			aria-label={ariaLabel}
			onClick={() => setOpen?.((prev) => !prev)}
			className='text-lg'
		>
			{label ? `${label}` : "Pick a date"}
		</Button>
	);
}

function ButtonDatePicker({ ...props }) {
	const interval = 7;
	const [open, setOpen] = useState(false);
	const [navigateBeforeDisable, setNavigateBeforeDisable] = useState(false);
	const [navigateNextDisable, setNavigateNextDisable] = useState(false);

	useEffect(() => {
		dayjs.extend(isSameOrBefore);
		dayjs.extend(isSameOrAfter);
		if (props.date.isSameOrBefore(props.minDate, "days")) {
			setNavigateBeforeDisable(true);
		} else {
			setNavigateBeforeDisable(false);
		}
		if (props.date.isSameOrAfter(props.maxDate, "days")) {
			setNavigateNextDisable(true);
		} else {
			setNavigateNextDisable(false);
		}
	}, [props.date, props.maxDate, props.minDate]);

	const handleDateNavigate = (move) => {
		let newDate = props.date.clone().add(move, "days");

		if (newDate.isBefore(props.minDate, "days")) {
			newDate = props.minDate;
		}

		if (newDate.isAfter(props.maxDate, "days")) {
			newDate = props.maxDate;
		}

		props.onChange(newDate);
	};

	return (
		<ThemeProvider theme={dateTheme}>
				<Button disabled={navigateBeforeDisable} onClick={() => handleDateNavigate(-interval)}><NavigateBeforeIcon/></Button>
				<DatePicker
					slots={{ field: ButtonField, ...props.slots }}
					slotProps={{ field: { setOpen } }}
					disablePast
					{...props}
					open={open}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
				/>
				<Button disabled={navigateNextDisable} onClick={() => handleDateNavigate(interval)}><NavigateNextIcon/></Button>
			</ThemeProvider>
	);
}

export default ButtonDatePicker;
