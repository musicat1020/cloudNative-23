export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(date.getDate()).padStart(2, "0");

    // Construct the date string in "YYYY-MM-DD" format
    const formattedDateString = `${year}-${month}-${day}`;
    return formattedDateString;
};

export const formatTime = (date) => {
    const hour = date.getHours();
    return hour;
};
