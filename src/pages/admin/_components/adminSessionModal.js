import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BaseModal from "../../../components/baseModal";
import { handleDisableSession, handleEnableSession } from "../../../hooks/handleSessionStatus";
import styles from "@/styles/modal.module.css";

function AdminSessionModal({
  venueInfo,
  clickEditData,
  show,
  setShow,
  windowSize
}) {
  const { t } = useTranslation();
  const [modalWidth, setModalWidth] = useState("30vw");
  const venue = `${venueInfo.name} ${venueInfo.venue_name}`;
  const { date, startTime, endTime, status } = clickEditData || {
    date: "2021-10-20",
    startTime: 14,
    endTime: 15,
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

  function formatDateTime() {
    const formattedDateTime = `${date} ${startTime}-${endTime}`;
    console.log("formattedDateTime", formattedDateTime);
    return formattedDateTime;
  }

  function formatTitle() {
    if (status === "disable") {
      return t("上架特定時段場地");
    }
    return t("下架特定時段場地");

  };

  return (
    // TODO: pass info to Content
    <BaseModal
      venue={venue}
      date={date}
      startTime={startTime}
      endTime={endTime}
      show={show}
      handleClose={() => setShow(false)}
      title={formatTitle()}
      content={<Content setShow={setShow} venueInfo={venueInfo} clickEditData={clickEditData} />}
      customStyles={{ width: modalWidth }}
    />
  );
}

export default AdminSessionModal;

function Content({ setShow, venueInfo, clickEditData }) {

  const { t } = useTranslation();
  const venueId = venueInfo?.id;
  const date = clickEditData?.date;
  const startHour = parseInt(clickEditData.startTime.split(":")[0], 10);
  const endHour = parseInt(clickEditData.endTime.split(":")[0], 10);
  const status = clickEditData?.status;


  return (
    <Row>
      {status === "no_order" ? (
        <>
          <Col className='text-center' >
            <button className={styles.cancelButton} onClick={() => setShow(false)}>{t("取消")}</button>
          </Col>
          <Col className='text-center'>
            <button className={styles.confirmButton} onClick={() => {
              handleDisableSession(venueId, date, startHour, endHour);
              setShow(false);
            }}>{t("下架場地")}</button>
          </Col>
        </>
      ) : status === "disable" ? (
        <>
          <Col className='text-center' >
            <button className={styles.cancelButton} onClick={() => setShow(false)}>{t("取消")}</button>
          </Col>
          <Col className='text-center'>
            <button className={styles.confirmButton} onClick={() => {
              handleEnableSession(venueId, date, startHour, endHour);
              setShow(false);
            }}>{t("上架場地")}</button>
          </Col>
        </>
      ) : (
        <p>Status unknown</p>
      )
      }
    </Row >
  );
};
