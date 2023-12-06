import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import dayjs from "dayjs";

import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Col, Row, Form } from "react-bootstrap";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, TextField, Chip, Button, Tab, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from "@mui/joy/Stack";

function VenueInput({ info, setInfo }) {
  const { t } = useTranslation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const newCourtRef = useRef(null);

  const handleAddressChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      address: newValue
    }));
  };

  const handleStadiumNameChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      name: newValue
    }));
  };

  const handleVenueNameChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      venue_name: newValue
    }));
  };

  const handleCapacityChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      max_number_of_people: newValue
    }));
  };

  function handleListDelete(courtToDelete) {
    const updatedCourtList = info?.stadium_courts?.filter((court) => court.name !== courtToDelete.name);
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      stadium_courts: updatedCourtList
    }));
  };

  function handleAddCourt() {
    try {
      const newCourt = newCourtRef.current.value;
      if (newCourt.trim() !== "") {
        setInfo((prevInfo) => ({
          ...(prevInfo || {}),
          stadium_courts: 
          [...(prevInfo.stadium_courts || []), 
            {
            id: null,
            name: newCourt
            }
          ]
        }));
        setOpenAddModal(false);
      } else {
        alert("Please enter a valid court name.");
      }
    } catch (error) {
      console.log(error);
      alert("Error: failed to add new court");
    }
  };

  const handleClose = () => {
    setOpenAddModal(false);
  };


  const handleAreaChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      area: newValue
    }));
  };

  const handleOpenDayChange = (event, newOpenDay) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      available_times: {
        ...(prevInfo.available_times || {}),
        weekdays: newOpenDay.map(Number)
      }
    }));
  };

  const handleDecriptionChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      description: newValue
    }));
  };

  const handleStartTimeChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      available_times: {
        ...(prevInfo.available_times || {}),
        start_time: +newValue
      }
    }));
  };

  const handleEndTimeChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      available_times: {
        ...(prevInfo.available_times || {}),
        end_time: +newValue
      }
    }));
  };
  
  const handleLocationLinkChange = (newValue) => {
    setInfo((prevInfo) => ({
      ...(prevInfo || {}),
      google_map_url: newValue
    }));
  };



  const theme = createTheme({
    palette: {
      primary: {
        main: "#AD5625",
      },
      secondary: {
        main: "#14274C",
      },
      text: {
        primary: "#14274C",
        secondary: "#14274C",
      },
      divider: "#BEC8DD",
    },
    typography: {
      fontFamily:
        "\"Palatino\", sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Row style={{ padding: "20px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tab label={t("場地資訊")} textColor='primary' />
        </Box>
      </Row>
      <Row style={{ padding: "20px" }}>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="address">
            <Form.Label column sm="2">
              {t("場館地址")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="address"
                placeholder={t("場館地址")}
                value={info?.address}
                onChange={(e) => handleAddressChange(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="stadiumName">
            <Form.Label column sm="2">
              {t("場館名稱")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="stadium-name"
                placeholder={t("場館名稱")}
                value={info?.name}
                onChange={(e) => handleStadiumNameChange(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="courtType">
            <Form.Label column sm="2">
              {t("場地名稱")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="court-type"
                placeholder={t("場地名稱")}
                value={info?.venue_name}
                onChange={(e) => handleVenueNameChange(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="capacityPerCourt">
            <Form.Label column sm="2">
              {t("單一場地可容納人數")}
            </Form.Label>
            <Col sm="10" className='flex items-center'>
              <Form.Control
                type="capacity"
                style={{ width: "80px" }}
                value={info?.max_number_of_people}
                onChange={(e) => handleCapacityChange(e.target.value)}
              />
              <div className="ml-3">{t("人")}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="courtList">
            <Form.Label column sm="2">
              {t("場地列表")}
            </Form.Label>
            <Col sm="10">
                {info?.stadium_courts?.map((court) => (
                  <Chip
                    className="mr-2 mb-1"
                    label={court.name}
                    key={court.id}
                    variant="outlined"
                    color='secondary'
                    onDelete={() => handleListDelete(court)} />
                ))}
                <Chip
                  variant="outlined"
                  color='secondary'
                  key="addCourt"
                  label={t("新增")}
                  onClick={() => setOpenAddModal(true)}
                  onDelete={() => setOpenAddModal(true)}
                  deleteIcon={<AddIcon />} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="room">
            <Form.Label column sm="2">
              {t("場地面積")}
            </Form.Label>
            <Col sm="10" className="flex items-center">
              <Form.Control
                type="area"
                style={{ width: "80px" }}
                value={info?.area}
                onChange={(e) => handleAreaChange(e.target.value)}
              />
              <div className="ml-3">{t("平方公尺")}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="openTime">
            <Form.Label column sm="2">
              {t("開放時間")}
            </Form.Label>
            <Col sm="10" style={{ display: "flex", alignItems: "center" }} className='space-x-4'>
              <LocalizationProvider dateAdapter={AdapterDayjs} color='secondary'>
                <TimePicker
                  color='secondary'
                  value={dayjs(info?.available_times?.start_time?.toString(), "H")}
                  onChange={(newValue) => handleStartTimeChange(newValue.format("H"))}
                  views={["hours"]}
                  slotProps={{ textField: { size: "small", color: "secondary" } }} />
                <span>{t("至")}</span>
                <TimePicker
                  color='secondary'
                  value={dayjs(info?.available_times?.end_time?.toString(), "H")}
                  onChange={(newValue) => handleEndTimeChange(newValue.format("H"))}
                  views={["hours"]}
                  slotProps={{ textField: { size: "small", color: "secondary" } }} />
              </LocalizationProvider>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="openDay">
            <Form.Label column sm="2">
              {t("開放日")}
            </Form.Label>
            <Col sm="10">
              <ToggleButtonGroup
                value={info?.available_times?.weekdays?.map(String)}
                onChange={handleOpenDayChange}
                aria-label="open day setting"
                size="small"
              >
                <ToggleButton value="1" aria-label="mon" >
                  {t("週一")}
                </ToggleButton>
                <ToggleButton value="2" aria-label="tue">
                  {t("週二")}
                </ToggleButton>
                <ToggleButton value="3" aria-label="wed">
                  {t("週三")}
                </ToggleButton>
                <ToggleButton value="4" aria-label="thu">
                  {t("週四")}
                </ToggleButton>
                <ToggleButton value="5" aria-label="fri">
                  {t("週五")}
                </ToggleButton>
                <ToggleButton value="6" aria-label="sat">
                  {t("週六")}
                </ToggleButton>
                <ToggleButton value="7" aria-label="sun">
                  {t("週日")}
                </ToggleButton>
              </ToggleButtonGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="discription">
            <Form.Label column sm="2">
              {t("說明")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="discription"
                placeholder={t("說明")}
                value={info?.description}
                onChange={(e) => handleDecriptionChange(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="discription">
            <Form.Label column sm="2">
              {t("位置連結")}
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="discription"
                placeholder={t("位置連結")}
                value={info?.google_map_url}
                onChange={(e) => handleLocationLinkChange(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Form>
      </Row>

      <Dialog open={openAddModal} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            {t("球場名稱")}
          </DialogContentText>
          <TextField
            inputRef={newCourtRef}
            color="secondary"
            margin="dense"
            id="name"
            label="court name"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" >{t("取消")}</Button>
          <Button onClick={handleAddCourt} color="secondary" >{t("新增")} </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default VenueInput;