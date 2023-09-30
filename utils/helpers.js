// Import moment for date formatting.
const moment = require('moment')
// Define utility functions for date and JSON.
module.exports = {
    // Function to format a raw date into a localized date string.
    format_time: (rawDate) => {
        return rawDate.toLocaleDateString();
    },
    // Function to format a date using a specified format.
    formatDate: (date, format) => {
            let momentDate = moment(date);
            return momentDate.format(format);
    },
    // Function to convert an object to a JSON string.
    json: (obj) => {
        return JSON.stringify(obj);
    },
};


// Template Structure and Code Snippets from Mini Project 14 & Group Project 2.