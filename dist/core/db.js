"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
exports.default = db;
