const dayjs = require("dayjs");

module.exports = (date) => {
    const formattedDate = dayjs(date).format("MMM D, YYYY - hh:mm:ss")
    return formattedDate;
}
