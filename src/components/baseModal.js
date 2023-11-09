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

function BaseModal({ show, handleClose, title, content, customStyles }) {

	const modalStyles = useStyles();
	const { t } = useTranslation();

	return (
		<>
			{ show && 
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

						{/** Venue */}
						<Row className='mt-3'>
							<Col>
								<span className={styles.modalAttribute}>{ t("場地") }</span>
								<span>{ t("綜合體育館 一樓多功能球場") }</span>
							</Col>
						</Row>

						{/** Session */}
						<Row className='mt-3'>
							<Col>
								<span className={styles.modalAttribute}>{ t("時段") }</span>
								<span>{ t("10/18 (Wed) 13:00 - 14:00") }</span>
							</Col>
						</Row>
						
						{/** Divider */}
						<Row className='my-3'>
							<Col>
								<Divider/>
							</Col>
						</Row>

						{/** Content */}
						{content && (
							<Row className='mb-2'>
								<Col>
									{content}
								</Col>
							</Row>
						)}
					</Container>
				</Modal>
			}
		</>
	);
}

export default BaseModal;