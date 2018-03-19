//   todo:

`use strict`;

const FS = require(`fs`);

class DataHandler {

    static renderDom(path, contentType, callback, encoding) {
        FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
            callback(error, string, contentType);
        });
    }

    static setBaseData(callback) {
        let filePath = `data/patrollers.csv`, columns = 5;

        FS.readFile(filePath, `utf8`, (err, file) => {
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

    static updatePatrollerDays(patrollerData) {
        patrollerData = JSON.parse(patrollerData);
        let tempFilePath = `data/temp.csv`, columns = 5, finalFilePath = `data/patrollers.csv`;
        FS.readFile(finalFilePath, `utf8`, (err, file) => {
            let tempArray, finalData = [];
            tempArray = file.split(/\r?\n/); //remove newlines
            for (let i = 0; i < tempArray.length; i++) {
                finalData[i] = tempArray[i].split(/,/).slice(0, columns);
            }
            for (let i = 0; i < finalData.length; i++) {
                for (let j = 0; j < patrollerData.length; j++) {
                    if (Number(finalData[i][0]) === Number(patrollerData[j].ID)) {
                        finalData[i][4] = patrollerData[j].DAYS;
                        patrollerData.splice(j, 1);
                    }
                }
            }
            let cells = [];
            finalData.forEach((writeData) => {
                let row = writeData.join(`,`);
                cells += `${row}\n`;
            });
            cells = cells.replace(/\n*$/,``);
            FS.writeFile(tempFilePath, cells, `utf8`, (err) => {
                if (err) throw err;
            });
            FS.unlinkSync(finalFilePath);
            FS.renameSync(tempFilePath, finalFilePath)
        });
    }
}

module.exports = DataHandler;