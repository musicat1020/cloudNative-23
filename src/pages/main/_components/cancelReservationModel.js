
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import BaseModal from "@/components/baseModal";
import styles from "@/styles/court.module.css";
import axios from "@/utils/axios";

function CancelInfoDetail({ setShow, record, onCancelConfirmed }) {
    const { t } = useTranslation();
    const apiUrl = record.team_id ? "/api/v1/team-member/leave/" : "/api/v1/order/order-cancel/";
    const params = record.team_id ? { team_id: record.team_id } : { order_id: record.id };

    const handleCancel = () => {
        setShow(false);
    };

    const handleConfirm = async () => {
        await axios.post(apiUrl, {}, { params });
        onCancelConfirmed();
        setShow(false);
    };



    return (
        <Container>
            {/* Renter */}
            <Row>
                <Col>
                    <span className={styles.cancelInfoAttrTitle}>{t("使用人數")}</span>
                    <span>{record.current_member_number}/{record.max_number_of_member}</span>
                </Col>
            </Row>

            {/* People */}
            <Row>
                <Col>
                    <span className={styles.cancelInfoAttrTitle}>{t("Members")}</span>
                    {record.team_members.map((member, index) => (
                        <text>{member.name}{index < record.team_members.length - 1 && ","}</text>
                    ))}
                </Col>
            </Row>


            {/* Button */}
            <Row className='mt-3'>
                <Col className='text-center'>
                    <button className={styles.cancelButton} onClick={handleCancel}>
                        {t("取消")}
                    </button>

                    <button className={styles.confirmButton} onClick={handleConfirm}>
                        {t("確定")}
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

function CancelResvationModel({ show, setShow, record, onCancelConfirmed }) {
    const { t } = useTranslation();
    if (!record) return null;
    const venue = `${record.stadium_name} ${record.venue_name} ${record.court_name}`;
    const date = record.order_time;
    const startTime = record.start_time;
    const endTime = record.end_time;

    if (!show) {
        return null;
    }

    return (
        <BaseModal
            venue={venue}
            date={date}
            show={show}
            startTime={startTime}
            endTime={endTime}
            handleClose={() => setShow(false)}
            title={t("Confirm Cancellation?")}
            content={<CancelInfoDetail setShow={setShow} record={record} onCancelConfirmed={onCancelConfirmed} />}
            customStyles={{ width: "35vw" }}
        />
    );
}



export default CancelResvationModel;
