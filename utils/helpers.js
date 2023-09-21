const moment = require('moment')
module.exports = {
    format_time: (rawDate) => {
        return rawDate.toLocaleDateString();
    },
    formatDate: (date, format) => {
            let momentDate = moment(date);
            return momentDate.format(format);
    },
    json: (obj) => {
        return JSON.stringify(obj);
    },
};

/*
const moment = require('moment')
module.exports = {
  format_date: (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }, 

formatDate: (date, format) => {
    let momentDate = moment(date).local();
    return momentDate.format(format);
  },
};
*/