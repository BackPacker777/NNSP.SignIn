// todo:

"use strict";

const DATA_HANDLER = require('./node/DataHandler');

class app {
    constructor() {
        this.ejsData = null;
        this.loadServer();
    }

    loadServer() {
        const HTTP = require('http');
        const PORT = 8111;
        const EJS = require('ejs');

        HTTP.createServer((request, response) => {

            let httpHandler = (error, string, contentType) => {
                if (error) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.end('An error has occurred: ' + error.message);
                } else if (contentType.indexOf('css') >= 0 || contentType.indexOf('js') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'utf-8');
                } else if (contentType.indexOf('html') >= 0) {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(EJS.render(string, {
                        data: this.ejsData,
                        filename: 'index.ejs'
                    }));
                } else {
                    response.writeHead(200, {'Content-Type': contentType});
                    response.end(string, 'binary');
                }
            };

            if (request.method === 'POST') {
                if (request.headers['x-requested-with'] === 'fetch.0') {
                    DATA_HANDLER.setBaseData((patrollerData) => {
                        response.writeHead(200, {'content-type': 'application/json'});
                        response.end(patrollerData);
                    });
                } else if(request.headers['x-requested-with'] === 'fetch.1') {
                    let body = [];
                    request.on('data', (chunk) => {
                        body.push(chunk);
                    }).on('end', () => {
                        body = Buffer.concat(body).toString();
                        DATA_HANDLER.updatePatrollerDays(body, (results) => {
                            console.log(results);
                            response.writeHead(200, {'content-type': 'application/json'});
                            response.end(results);
                            /*response.writeHead(200, {'content-type': 'application/json'});
                            DATA_HANDLER.renderDom('public/views/results.ejs', 'text/html', httpHandler, 'utf-8');
                            response.renderDom(`./results.ejs`, {
                                results: results
                            });
                            response.end(`Done`);*/
                        });
                    });
                } else {
                    console.log(`Yo, somethings super wrong BDH!`);
                }
            } else if (request.url.indexOf('.css') >= 0) {
                DATA_HANDLER.renderDom(request.url.slice(1), 'text/css', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.js') >= 0) {
                DATA_HANDLER.renderDom(request.url.slice(1), 'application/javascript', httpHandler, 'utf-8');
            } else if (request.url.indexOf('.png') >= 0) {
                DATA_HANDLER.renderDom(request.url.slice(1), 'image/png', httpHandler, 'binary');
            } else if (request.url.indexOf('.ico') >= 0) {
                DATA_HANDLER.renderDom(request.url.slice(1), 'image/x-icon', httpHandler, 'binary');
            } else if (request.url.indexOf('results.ejs') >= 0) {
                DATA_HANDLER.renderDom('public/views/results.ejs', 'text/html', httpHandler, 'utf-8');
            } else if (request.url.indexOf('/') >= 0) {
                DATA_HANDLER.renderDom('public/views/index.ejs', 'text/html', httpHandler, 'utf-8');
            } else {
                DATA_HANDLER.renderDom(`HEY! What you're looking for: It's not here!`, 'text/html', httpHandler, 'utf-8');
            }
        }).listen(PORT);
    }
}

module.exports = app;