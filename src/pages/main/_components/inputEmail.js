import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "@/utils/axios";

const customTheme = (theme) => createTheme({
	...theme,
	palette: {
		primary: {
			main: "#14274C",
		},
	},
});

function InputEmail({ emails, onChange }) {

	const [options, setOptions] = useState([]);

	const fetchAllUsers = async () => {
		const res = await axios.get("/api/v1/users/get-all-users");
		setOptions(res.data);
	};

	useEffect(() => {
		fetchAllUsers();
	}, []);

	const handleChange = (e, value) => {
		onChange(value);
	};

	return (
		<ThemeProvider theme={customTheme}>
			<Autocomplete
				className="ml-4 w-5/12"
				multiple
				options={options}
				getOptionLabel={(option) => option.email}
				filterSelectedOptions
				onChange={handleChange}
				defaultValue={emails}
				renderInput={(params) => (
					<TextField 
						{...params}
						variant="standard"
						placeholder="Type Email"
					/>
				)}
			/>
		</ThemeProvider>
	);
}

export default InputEmail;
