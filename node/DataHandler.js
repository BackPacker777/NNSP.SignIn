//   todo:

"use strict";

const FS = require('fs');

class DataHandler {

    static renderDom(path, contentType, callback, encoding) {
        FS.readFile(path, encoding ? encoding : 'utf-8', (error, string) => {
            callback(error, string, contentType);
        });
    }

    static setBaseData(callback) {
        let filePath = 'data/patrollers.csv', columns = 5;

        FS.readFile(filePath, 'utf8', (err, file) => {
            let tempArray, finalData = [];
            tempArray = file.split(/\r?\n/); //remove newlines
            for (let i = 0; i < tempArray.length; i++) {
                finalData[i] = tempArray[i].split(/,/).slice(0, columns);
            }
            finalData = JSON.stringify(finalData);
            callback(finalData);
            return finalData;
        });
    }
}

module.exports = DataHandler;