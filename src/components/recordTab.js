import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from 'react-bootstrap';
import { useTranslation } from 'next-i18next';
import RecordTable from './recordTable';
import { mockRentalRecords, mockPairingRecords } from '../../mockData/mockData';
import PairingTable from './pairingTable';

const theme = createTheme({
    palette: {
        primary: {
            main: '#AD5625',
        },
        secondary: {
            main: '#14274C',
        },
        text: {
            primary: '#14274C',
            secondary: '#14274C',
        },
        divider: '#BEC8DD',
    },
    typography: {
        fontFamily:
            '"Palatino", sans-serif',
    },
});

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const RecordTab = () => {

    const { t } = useTranslation();
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='wrapped basic tabs example'
                        textColor='primary'
                        indicatorColor='primary'
                    >
                        <Tab label={t('Rental Records')} {...a11yProps(0)} />
                        <Tab label={t('Pairing Records')} {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Container>
                        <RecordTable records={mockRentalRecords} />
                    </Container>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <Container>
                        <PairingTable records={mockPairingRecords} />
                    </Container>
                </CustomTabPanel>
            </Box>
        </ThemeProvider>
    );
}

export default RecordTab;