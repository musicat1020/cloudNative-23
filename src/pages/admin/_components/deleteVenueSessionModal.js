import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { makeStyles } from "@mui/styles";
import { Modal, Divider, Checkbox } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { formatDate, formatTime } from "@/utils/formatTime";
import { handleDisableSession } from "@/hooks/handleSessionStatus";
import styles from "@/styles/modal.module.css";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "90%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    width: "50vw",
    padding: "15px 30px",
    backgroundColor: "white",
    color: "#14274C",
    outline: 0,
    borderRadius: "5px",
    overflow: "scroll",
  }
});

function DeleteVenueSessionModal({ show, setRefresh, handleClose, title, info, customStyles }) {

  const modalStyles = useStyles();
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [checked, setChecked] = useState(false);

  // TODO
  const handleConfirm = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedStartTime = formatTime(startTime);
    const formattedEndDate = formatDate(endDate);
    const formattedEndTime = formatTime(endTime);

    handleDisableSession(info.id, formattedStartDate, formattedStartTime, formattedEndDate, formattedEndTime);
    handleClose();
    setRefresh((prev) => !prev);
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {show &&
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Container className={modalStyles.modal} style={customStyles}>
            {/** Close button */}
            <Row>
              <Col className='text-end text-3xl'>
                <button onClick={handleClose}>&times;</button>
              </Col>
            </Row>

            {/** Title */}
            <Row>
              <Col className='text-center'>
                <h1>{title}</h1>
              </Col>
            </Row>

            {/** stadium name */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute}>{t("場館名稱")}</span>
                <span>{info?.name}</span>
              </Col>
            </Row>

            {/** venue name */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute}>{t("場地名稱")}</span>
                <span>{info?.venue_name}</span>
              </Col>
            </Row>

            {/** Divider */}
            <Row className='my-3'>
              <Col>
                <Divider />
              </Col>
            </Row>

            {/** start date/time */}
            <Row className='my-3'>
              <Col className="ml-8">
                <div className="mb-3">{t("開始日期/時間")}</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="mr-5 m-1"
                    label="date"
                    onChange={(newValue) => setStartDate(new Date(newValue))} />
                  <TimePicker
                    className="m-1"
                    views={["hours"]}
                    onChange={(newValue) => setStartTime(new Date(newValue))}
                  />
                </LocalizationProvider>
              </Col>
            </Row>

            {/** end date/time */}
            <Row className='my-4'>
              <Col className="ml-8">
                <div className="mb-3">{t("結束日期/時間")}</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="mr-5 m-1"
                    label="date"
                    onChange={(newValue) => setEndDate(new Date(newValue))} />
                  <TimePicker
                    className="m-1"
                    views={["hours"]}
                    onChange={(newValue) => setEndTime(new Date(newValue))}
                  />
                </LocalizationProvider>
              </Col>
            </Row>


            <Row className='my-4'>
              <Col className='text-center mx-5 mb-3' >
                <Checkbox
                  color="secondary"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                /><text>{t("我了解一旦下架場地，則這個時段的訂單會全部取消。")}</text>
              </Col>

            </Row>
            {/* Button */}
            <Row className='mt-5'>
              <Col className='text-center m-1'>
                <button className={styles.cancelButton} onClick={handleClose}>{t("取消")}</button>
              </Col>
              <Col className='text-center m-1'>
                <button
                  disabled={!checked}
                  className={`${checked ? styles.confirmButton : styles.cancelButton}`}
                  onClick={handleConfirm}>{t("確定")}</button>
              </Col>
            </Row>
          </Container>
        </Modal>
      }
    </>
  );
}

export default DeleteVenueSessionModal;
