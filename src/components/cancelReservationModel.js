
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import BaseModal from "./baseModal";
import styles from "../styles/subvenue.module.css";

function CancelInfoDetail({ setShow, record }) {
    const { t } = useTranslation();

    const handleCancel = () => {
        setShow(false);
    };


    // TODO
    const handleConfirm = () => {
        setShow(false);
    };



    return (
        <div>
            <Container>
                {/* 使用人數 */}
                <Row>
                    <Col>
                        <span className={styles.joinAttrTitle}>{t("使用人數")}</span>
                        <span>{record.numOfPeople}</span>
                    </Col>
                </Row>

                {/* People */}
                <Row>
                    <Col>
                        <span className={styles.joinAttrTitle}>{t("Members")}</span>
                        {record.members.map((member, index) => (
                            <text>{member.name}{index < record.members.length - 1 && ","}</text>
                        ))}
                    </Col>
                </Row>


                {/* Button */}
                <Row className='mt-3'>
                    <Col className='text-center'>
                        <button className={styles.cancelButton} onClick={handleCancel}>{t("取消")}</button>
                    </Col>
                    <Col className='text-center'>
                        <button className={styles.confirmButton} onClick={handleConfirm}>{t("確定")}</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

function CancelResvationModel({ show, setShow, record }) {
    const { t } = useTranslation();

    if (!show) {
        return null;
    }

    return (
        <BaseModal
            show={show}
            handleClose={() => setShow(false)}
            title={t("Confirm Cancellation?")}
            content={<CancelInfoDetail setShow={setShow} record={record} />}
            customStyles={{ width: "35vw" }}
        />
    );
}



export default CancelResvationModel;
