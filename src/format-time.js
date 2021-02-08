function formatDate(date) {
    return [(date.getMonth()+1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getFullYear()].join('/')+' - '+
       [date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0")].join(':');
}

function formatDateIntoHours(date) {
    if (!date) {
        return null;
    }
    return [date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0")].join(':'); 
}

module.exports.formatDate = formatDate;
module.exports.formatDateIntoHours = formatDateIntoHours;