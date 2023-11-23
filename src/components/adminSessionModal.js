import { Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BaseModal from "./baseModal";

import styles from "../styles/modal.module.css";

function AdminSessionModal({ show, setShow, windowSize }) {

  const { t } = useTranslation();

  const [modalWidth, setModalWidth] = useState("30vw");
  // session info: id, date, start_time, status
  const { venue, date, start_time, status } = {
    venue: "綜合體育館 一樓多功能球場",
    date: "2021-10-20",
    start_time: 14,
    status: "Available"
  };

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

  function formatDateTime(date, start_time) {
    const eventDate = new Date(date); // Convert the date string to a Date object
    const year = eventDate.getFullYear();
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
    const day = eventDate.getDate().toString().padStart(2, '0');

    const startHour = start_time.toString().padStart(2, '0');
    const endHour = (start_time + 1).toString().padStart(2, '0'); // Assuming one hour duration

    const formattedDateTime = `${year}-${month}-${day} ${startHour}:00-${endHour}:00`;
    return formattedDateTime;
  }

  function formatTitle(status) {
    if (status === "disabled") {
      return t("上架特定時段場地");
    } else {
      return t("下架特定時段場地");
    }
  };

  return (
    // TODO: pass info to Content
    <BaseModal
      venue={venue}
      session={formatDateTime(date, start_time)}
      show={show}
      handleClose={() => setShow(false)}
      title={formatTitle(status)}
      content={<Content setShow={setShow} venue={venue} date={date} startTime={start_time} status={status} />}
      customStyles={{ width: modalWidth }}
    />
  );
}

export default AdminSessionModal;

function Content({ setShow, venue, date, startTime, status }) {

  const handleDisableSession = () => {
    // TODO: disable session
  };

  const handleEnableSession = () => {
    // TODO: enable session
  };

  const { t } = useTranslation();

  return (
    <Row>
      {status === "Available" || "booked" ? (
        <>
          <Col className='text-center' >
            <button className={styles.confirmButton} onClick={() => setShow(false)}>{t("取消")}</button>
          </Col>
          <Col className='text-center'>
            <button className={styles.confirmButton} onClick={handleDisableSession}>{t("下架場地")}</button>
          </Col>
        </>
      ) : status === "disabled" ? (
        <>
          <Col className='text-center' >
            <button className={styles.confirmButton} onClick={() => setShow(false)}>{t("取消")}</button>
          </Col>
          <Col className='text-center'>
            <button className={styles.confirmButton} onClick={handleEnableSession}>{t("上架場地")}</button>
          </Col>
        </>

      ) : (
        <p>Status unknown</p>
      )}
    </Row>
  );
};
