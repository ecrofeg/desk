"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mysql = require("mysql");
var Redis = require("redis");
var redis = Redis.createClient(6379);
var router = express.Router();
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
redis.on('error', function (error) {
    console.log(error);
});
router.get('/task', function (req, res) {
    var assignee_id = req.query.assignee_id;
    var cacheKey = "user_tasks_" + assignee_id;
    redis.get(cacheKey, function (error, reply) {
        if (reply) {
            res.send(reply);
        }
        else {
            db.query('SELECT * FROM task WHERE assignee_id=?', assignee_id, function (error, results) {
                var tasks = [];
                if (results instanceof Array && results.length) {
                    tasks = results;
                    redis.set(cacheKey, JSON.stringify(tasks));
                }
                res.json(tasks);
            });
        }
    });
});
router.get('/task/:id', function (req, res) {
    var taskId = req.params.id;
    var cacheKey = "task_1";
    redis.get(cacheKey, function (error, reply) {
        if (reply) {
            res.send(reply);
        }
        else {
            db.query('SELECT * FROM task WHERE id=? LIMIT 1', taskId, function (error, results) {
                var task = null;
                if (results instanceof Array && results.length) {
                    task = results.shift();
                    redis.set(cacheKey, JSON.stringify(task));
                }
                res.json(task);
            });
        }
    });
});
exports.default = router;
