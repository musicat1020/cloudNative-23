import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
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

function DeleteVenueModal({ show, handleClose, title, info, customStyles }) {

  const modalStyles = useStyles();
  const { t } = useTranslation();

  // TODO
  const handleConfirm = () => {
    handleClose();
  };

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

            {/** stadium name */}
            <Row className='mt-3'>
              <Col>
                <span className={styles.modalAttribute}>{t("場館名稱")}</span>
                <span>{info?.stadium?.stadium_name}</span>
              </Col>
            </Row>

            {/** venue name */}
            <Row className='mt-3 mb-4'>
              <Col>
                <span className={styles.modalAttribute}>{t("場地名稱")}</span>
                <span>{info?.stadium?.name}</span>
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

export default DeleteVenueModal;