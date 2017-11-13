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
        var tasks = [];
        if (results instanceof Array && results.length) {
            tasks = results;
        }
        res.json(tasks);
    });
});
router.get('/task/:id', function (req, res) {
    db.query('SELECT * FROM task WHERE id=? LIMIT 1', [req.params.id], function (error, results) {
        var task = null;
        if (results instanceof Array && results.length) {
            task = results.shift();
        }
        res.json(task);
    });
});
exports.default = router;
