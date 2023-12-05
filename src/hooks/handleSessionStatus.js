import axios from "@/utils/axios";

export const handleDisableSession = async (id, startDate, startTime, endDate, endTime) => {
    const requestData = {
        stadium_id: id,
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime ?? startTime + 1
    };

    await axios.post("/api/v1/stadium/disable/", requestData, {})
        .then((res) => console.log("disable res", res));
};

export const handleEnableSession = async (id, startDate, startTime, endDate, endTime) => {
    const data = {
        stadium_id: id,
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime ?? startTime + 1
    };
    console.log("requestData", data);

    await axios.delete("/api/v1/stadium/undisable/", { data })
        .then((res) => console.log("undisable res", res));
};
