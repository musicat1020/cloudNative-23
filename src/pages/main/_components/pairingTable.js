import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import styles from "@/styles/record.module.css";
import CancelResvationModel from "./cancelReservationModel";

function PairingTable() {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [pairingRecords, setPairingRecords] = useState([]);
  const { t } = useTranslation();

  const handleModalClick = (record) => {
    setSelectedRecord(record);
    setShowCancelModal(true);
  };

  const fetchPairingRecords = async () => {

    const result = await axios.post("/api/v1/team/my-join-list/", null, {
    }).then(response => response.team_joint_list)
      .catch(error => {
        // Handle errors here
        console.error(error);
      });

    setPairingRecords(result);
  };

  useEffect(() => {
    if (pairingRecords.length === 0) {
      fetchPairingRecords();
    }
  }, [pairingRecords]);



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
          {pairingRecords.map((record, idx) => {
            const isCancelled = record.join_status
              === "已取消" || record.join_status === "已退出";
            return (
              <tr className="border-t border-cream ">
                <td className={`px-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center whitespace-nowrap">
                    <text>{record.order_time}</text>
                    <text className="text-xs">{record.start_time}:00~{record.end_time}:00</text>
                  </div>
                </td>

                <td className={`px-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center">
                    <text className="whitespace-nowrap">{record.stadium_name}</text>
                    <text className="text-xs whitespace-nowrap">{record.venue_name} {record.court_name}</text>
                  </div>
                </td>

                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>{record.join_status}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>{record.current_member_number}/{record.max_number_of_member}</td>
                <td className={`px-4 py-2 text-center whitespace-nowrap ${isCancelled ? "text-gray" : ""}`}>
                  <Tooltip placement="top" title={record.renter_email}>{record.renter_name}</Tooltip>
                </td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>
                  {record.team_members.map((member, index) => (
                    <Tooltip placement="top" title={member.email}>{member.name}{index < record.team_members.length - 1 && ","} </Tooltip>
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
