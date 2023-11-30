import axios from "@/utils/axios";

export const handleDisableSession = async (id, date, startTime, endTime) => {
    const requestData = {
        stadium_id: id,
        sessions: [
            {
                date,
                start_time: startTime,
                end_time: endTime ?? startTime + 1
            }
        ]
    };
    console.log("disable request data", requestData);

    await axios.post("/api/v1/stadium/disable/", requestData, {})
        .then((res) => console.log("disable res", res));

};

export const handleEnableSession = async (id, date, startTime, endTime) => {
    // TODO: enable session
    const data = {
        stadium_id: id,
        sessions: [
            {
                date,
                start_time: startTime,
                end_time: endTime ?? startTime + 1
            }
        ]
    };

    await axios.delete("/api/v1/stadium/undisable/", { data })
        .then((res) => console.log("undisable res", res));
};
