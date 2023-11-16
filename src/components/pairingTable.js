import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import styles from "../styles/record.module.css";
import CancelResvationModel from "./cancelReservationModel";

function PairingTable({ records }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { t } = useTranslation();

  const handleModalClick = (record) => {
    setSelectedRecord(record);
    setShowCancelModal(true);
  };


  return (

    <div className="overflow-auto rounded-xl border border-cream">
      <table className="table-auto" style={{ width: "100%" }}>
        <thead>
          <tr className="bg-cream justify-center items-center">
            <th className="px-4 py-2 text-center">{t("Rental Period")}</th>
            <th className="px-4 py-2 text-center">{t("Venue")}</th>
            <th className="px-4 py-2 text-center">{t("Order Status")}</th>
            <th className="px-4 py-2 text-center">{t("Number of People")}</th>
            <th className="px-4 py-2 text-center">{t("Renter")}</th>
            <th className="px-4 py-2 text-center">{t("Members")}</th>
            <th className="px-4 py-2 text-center" aria-label=" " />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const isCancelled = record.status === "已取消" || record.status === "已退出";
            return (
              <tr className="border-t border-cream ">
                <td className={`px-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center whitespace-nowrap">
                    <text>{record.date}</text>
                    <text className="text-xs">{record.time}</text>
                  </div>
                </td>

                <td className={`px-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center">
                    <text>{record.stadium}</text>
                    <text className="text-xs whitespace-nowrap">{record.venue}</text>
                  </div>
                </td>

                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>{record.status}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>{record.numOfPeople}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>
                  <Tooltip placement="top" title={record.renter.email}>{record.renter.name}</Tooltip>
                </td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>
                  {record.members.map((member, index) => (
                    <Tooltip placement="top" title={member.email}>{member.name}{index < record.members.length - 1 && ","} </Tooltip>
                  ))}
                </td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>
                  <Button
                    className={styles.cancelButton}
                    disabled={isCancelled}
                    onClick={() => handleModalClick(record)}
                  >
                    {t("Unpair")}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CancelResvationModel show={showCancelModal} setShow={setShowCancelModal} record={selectedRecord} />
    </div >
  );
}

export default PairingTable;
