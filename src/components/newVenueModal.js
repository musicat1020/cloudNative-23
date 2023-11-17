import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import styles from "../styles/modal.module.css";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    width: "50vw",
    padding: "15px 30px",
    backgroundColor: "white",
    color: "#14274C",
    outline: 0,
    borderRadius: "5px",
  }
});

function NewVenueModal({ show, handleClose, title, info, customStyles }) {

  const modalStyles = useStyles();
  const { t } = useTranslation();

  const dayMap = {
    1: t("週一"),
    2: t("週二"),
    3: t("週三"),
    4: t("週四"),
    5: t("週五"),
    6: t("週六"),
    7: t("週日"),
  };

  // TODO
  const handleConfirm = () => {
    handleClose();
  }

  return (
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

            {/** Divider */}
            <Row className='my-3'>
              <Col>
                <Divider />
              </Col>
            </Row>

            {/** Location */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場館地址")}</span>
                <span>{info?.stadium?.address}</span>
              </Col>
            </Row>

            {/** stadium name */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場館名稱")}</span>
                <span>{info?.stadium?.stadium_name}</span>
              </Col>
            </Row>

            {/** venue name */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場地名稱")}</span>
                <span>{t("name name")}</span>
              </Col>
            </Row>

            {/** capacity */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("容納人數")}</span>
                <span>n {t("人")}</span>
              </Col>
            </Row>

            {/** court list */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場地列表")}</span>
                <span>{t("A, B")}</span>
              </Col>
            </Row>

            {/** area */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場地面積")}</span>
                <span>n {t("平方公尺")}</span>
              </Col>
            </Row>

            {/** open time */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("開放時間")}</span>
                <span>{t("1. ~ 2.")}</span>
              </Col>
            </Row>

            {/** open day */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("開放日")}</span>
                <span>n {t("週一 週二")}</span>
              </Col>
            </Row>

            {/** description */}
            <Row className='mt-3 mb-10'>
              <Col>
                <span className={styles.modalAttribute}>{t("說明")}</span>
                <span>{t("說明說明")}</span>
              </Col>
            </Row>

            {/* Button */}
            <Row className='mt-3'>
              <Col className='text-center' >
                <button className={styles.confirmButton} onClick={handleClose}>{t("取消")}</button>
              </Col>
              <Col className='text-center'>
                <button className={styles.confirmButton} onClick={handleConfirm}>{t("確定")}</button>
              </Col>
            </Row>
          </Container>
        </Modal>
      }
    </>
  );
}

export default NewVenueModal;