"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Load .env file
var mysql = require("mysql");
var express = require("express");
var path = require("path");
var port = 5555;
var server = express();
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
server.use(express.static(path.resolve(__dirname, './')));
server.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'));
});
server.get('/test', function (req, res) {
    db.connect();
    db.query('SELECT * FROM user', function (error, results) {
        if (error) {
            throw error;
        }
        res.json(results);
    });
    db.end();
});
server.listen(port);
