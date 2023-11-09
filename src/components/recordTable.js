import { useTranslation } from "next-i18next";
import { Button } from "react-bootstrap";
import styles from "../styles/record.module.css";

function RecordTable({ records }) {
  const { t } = useTranslation();

  return (

    <div className="rounded-xl  overflow-hidden border border-cream">
      <table className="table-auto" style={{ width: "100%" }}>
        <thead>
          <tr className="bg-cream justify-center items-center">
            <th className="px-4 py-2 text-center">{t("Rental Period")}</th>
            <th className="px-4 py-2 text-center">{t("Venue")}</th>
            <th className="px-4 py-2 text-center">{t("Order Status")}</th>
            <th className="px-4 py-2 text-center">{t("Number of People")}</th>
            <th className="px-4 py-2 text-center">{t("Members")}</th>
            <th className="px-4 py-2 text-center" />
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => {
            const isCancelled = record.status === "已取消";
            return (
              <tr key={idx} className="border-t border-cream ">
                <td className={`x-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center">
                    <text>{record.date}</text>
                    <text className="text-xs">{record.time}</text>
                  </div>
                </td>

                <td className={`px-4 py-2 ${isCancelled ? "text-gray" : ""}`}>
                  <div className="flex flex-col justify-center items-center">
                    <text>{record.stadium}</text>
                    <text className="text-xs">{record.venue}</text>
                  </div>
                </td>

                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>{record.status}</td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>{record.numOfPeople}</td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>{record.members.join(", ")}</td>
                <td className={`px-4 py-2 text-center ${isCancelled ? "text-gray" : ""}`}>
                  <Button
                    className={styles.cancelButton}
                    disabled={isCancelled}
                  >
                    {t("Cancel Rental")}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecordTable;
