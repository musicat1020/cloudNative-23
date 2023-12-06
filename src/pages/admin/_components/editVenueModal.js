import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { Modal, Divider } from "@mui/material";
import { useRouter } from "next/router";

import axios from "@/utils/axios";
import styles from "@/styles/modal.module.css";
import { getAccessToken } from "@/utils/cookies";


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

export default function EditVenueModal({ show, handleClose, title, info, customStyles, type }) {

  const modalStyles = useStyles();
  const router = useRouter();
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

  // PUT api/v1/stadium/
  const updateVenue = async () => {
    const accessToken = getAccessToken();
    const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/`;
    const headers = {
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`, // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
    };
    await axios.put(url, info, { headers });
  };

  // POST api/v1/stadium/create
  const createVenue = async (data) => {
    const accessToken = getAccessToken();
    const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/create`;
    const headers = {
      "Accept": "application/json",
      "Authorization": `Bearer ${accessToken}`, // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
    };
    await axios.post(url, data, { headers });
  };

  const transformData = (input) => {
    const transformedData = {
      stadium: {
        id: input.id || 0,
        name: input.name || "",
        venue_name: input.venue_name || "",
        address: input.address || "",
        picture: input.picture || "",
        area: parseInt(input.area) || 0,
        description: input.description || "",
        max_number_of_people: parseInt(input.max_number_of_people) || 0,
        google_map_url: input.google_map_url || "",
      },
      stadium_available_times: {
        weekday: input.available_times.weekdays || [],
        start_time: input.available_times.start_time || 0,
        end_time: input.available_times.end_time || 0,
      },
      stadium_court_name: input.stadium_courts.map(court => court.name || ""),
    };
    return transformedData;
  };

  const handleConfirm = () => {
    if (type === "new") {
      // Create new venue
      const transformedData = transformData(info);
      createVenue(transformedData);
    }
    else if (type === "edit") {
      // Update venue
      updateVenue();
    }
    handleClose();
    // redirect to venue list page
    // revalidatePath("/admin/");
    router.push("/admin/");
  };

  const getCourtList = () => {
    const courtList = [];
    info?.stadium_courts?.forEach((court) => {
      courtList.push(<span className={styles.courtListCell}>{court?.name}</span>);
    });
    return courtList;
  };

  const getWeekdays = () => {
    const weekdays = [];
    info?.available_times?.weekdays?.forEach((weekday) => {
      weekdays.push(<span className={styles.courtListCell}>{dayMap[weekday]}</span>);
    });
    return weekdays;
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
          <Container className={`${modalStyles.modal}`} style={customStyles}>
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
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("場館地址")}</span>
                <span>{info?.address}</span>
              </Col>
            </Row>

            {/** stadium name */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("場館名稱")}</span>
                <span>{info?.name}</span>
              </Col>
            </Row>

            {/** venue name */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("場地名稱")}</span>
                <span>{info?.venue_name}</span>
              </Col>
            </Row>

            {/** capacity */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("容納人數")}</span>
                <span>{info?.max_number_of_people}  {t("人")}</span>
              </Col>
            </Row>

            {/** court list */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("場地列表")}</span>
                <span>{getCourtList()}</span>
              </Col>
            </Row>

            {/** area */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("場地面積")}</span>
                <span>{info?.area} {t("平方公尺")}</span>
              </Col>
            </Row>

            {/** open time */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("開放時間")}</span>
                <span>{`${info?.available_times?.start_time}:00 ~ ${info?.available_times?.end_time}:00`}</span>
              </Col>
            </Row>

            {/** open day */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={styles.modalAttribute} style={{ width: "100px" }}>{t("開放日")}</span>
                <span className={`${styles.modalTextArea}`}>{getWeekdays()}</span>
              </Col>
            </Row>

            {/** description */}
            <Row className='mt-3'>
              <Col className="flex items-center">
                <span className={`${styles.modalAttribute}`} style={{ width: "100px" }}>{t("說明")}</span>
                <span className={`${styles.modalTextArea}`}>{info?.description}</span>
              </Col>
            </Row>

            {/* link */}
            <Row className='mt-3 mb-10'>
              <Col className="flex items-center">
                <span className={`${styles.modalAttribute}`} style={{ width: "100px" }}>{t("地圖連結")}</span>
                <a className={`${styles.modalTextArea}`} href={info?.google_map_url} target="_blank" rel="noopener noreferrer">
                  {info.google_map_url}
                </a>
              </Col>
            </Row>


            {/* Button */}
            <Row className='mt-3 mb-10'>
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
