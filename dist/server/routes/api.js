"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var router = express.Router();
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
router.get('/task', function (req, res) {
    db.query('SELECT * FROM task', function (error, results) {
        res.json(results);
    });
});
exports.default = router;
