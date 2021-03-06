const express = require('express');
const Users = require('./users.js');
const { handleGET, handlePOST } = require('./network.js'); 
const { formatDate } = require('./format-time.js');
const { readFileSync } = require('fs');
const Data = require('./data.js');

var data = new Data(`${__dirname}/../ressources/users-data/Data.db`);

var users = new Users(data);

var rawdata = readFileSync(`${__dirname}/../network-config.json`);
var config = JSON.parse(rawdata);

const hostname = config.hostname;
const port = config.port;

var app = new express();
app.use(express.static(`${__dirname}/../ressources/www/`));

app.get('/api', function(req, res) {
    handleGET(req, res, users);
});

app.post('/api', function(req, res) {
    handlePOST(req, res, users);
});

var server = app.listen(port, hostname, () => {
    console.log(`${formatDate(new Date(Date.now()))} [Info] Server listening at ${hostname} on port ${port}`);
});

process.on('SIGTERM', () => {
    data.db.close();
    server.close(() => {
        users.EndAllSessions();
        console.log(`${formatDate(new Date(Date.now()))} [Info] Closing server`);
    });
});

process.on('SIGINT', () => {
    data.db.close();
    server.close(() => {
        users.EndAllSessions();
        console.log(`${formatDate(new Date(Date.now()))} [Info] Closing server`);
    });
});