const getYesterdaysDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    let monthString = '';
    let dayString = '';
    if (month < 10) {
        monthString = '0'.concat(month);
    } else {
        monthString = month;
    }
    if (day < 10) {
        dayString = '0'.concat(day);
    } else {
        dayString = day;
    }
    const dateString = year+'-'+monthString+'-'+dayString;
    return dateString;
}

const getTodaysDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    let monthString = '';
    let dayString = '';
    if (month < 10) {
        monthString = '0'.concat(month);
    } else {
        monthString = month;
    }
    if (day < 10) {
        dayString = '0'.concat(day);
    } else {
        dayString = day;
    }
    const dateString = year+'-'+monthString+'-'+dayString;
    return dateString;
}

module.exports = {getYesterdaysDate: getYesterdaysDate, getTodaysDate: getTodaysDate}