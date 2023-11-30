import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { revalidatePath } from "next/cache";
import styles from "@/styles/modal.module.css";
import axios from "@/utils/axios";
import { getAccessToken } from "@/utils/cookies";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
    width: "30vw",
    // width: "50px",
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
  const router = useRouter();

  // DELETE api/v1/stadium/delete
  const deleteVenue = async (id) => {
    try {
      const accessToken = getAccessToken();
      const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/delete`;
      const headers = {
        "Accept": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      };
      const params = { stadium_id: id };
      const response = await axios.delete(url, { headers, params });

      return response; // or handle as needed
    } catch (error) {
      // Handle error
      console.error("Error:", error);
      throw new Error(error.message); // or handle as needed
    }
  };


  const handleConfirm = () => {
    const { search } = window.location;
    const searchParams = new URLSearchParams(search);
    const id = searchParams.get("venue");
    if (id) {
      deleteVenue(id)
        .then((data) => {
          console.log("Delete successful:", data);
        })
        .catch((error) => {
          console.error("Delete failed:", error);
        });
    }
    handleClose();
    // revalidatePath("/admin/");
    router.push("/admin/");
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

            {/** Divider */}
            <Row className='my-3'>
              <Col>
                <Divider />
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
            <Row className='mt-3 mb-10'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute}>{t("場地名稱")}</span>
                <span>{info?.venue_name}</span>
              </Col>
            </Row>

            {/* Button */}
            <Row className='mt-3 mb-3'>
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
