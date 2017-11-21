"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../../core/db");
var redis_1 = require("../../core/redis");
var router = express.Router();
router.get('/', function (req, res) {
    var assignee_id = req.query.assignee_id;
    var cacheKey = "user_tasks_" + assignee_id;
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.default.query('SELECT * FROM task WHERE assignee_id=?', assignee_id, function (error, results) {
                var tasks = [];
                if (results instanceof Array && results.length) {
                    tasks = results;
                    redis_1.default.set(cacheKey, JSON.stringify(tasks));
                }
                res.json(tasks);
            });
        }
    });
});
router.get('/:id', function (req, res) {
    var taskId = req.params.id;
    var cacheKey = "task_" + taskId;
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.default.query("\n\t\t\t\tSELECT \n\t\t\t\t\ttask.name, task.description, task.created_at, task.updated_at,\n\t\t\t\t\tuser.name as author_name,\n\t\t\t\t\tfile.path as author_picture,\n\t\t\t\t\tstatus.name as task_status,\n\t\t\t\t\tproject.name as task_project,\n\t\t\t\t\tpriority.name as task_priority\n\t\t\t\tFROM task \n\t\t\t\t\tLEFT JOIN user\n\t\t\t\t\t\tON task.author_id = user.id\n\t\t\t\t\tLEFT JOIN file\n\t\t\t\t\t\tON user.picture_id = file.id\n\t\t\t\t\tLEFT JOIN status\n\t\t\t\t\t\tON task.status_id = status.id\n\t\t\t\t\tLEFT JOIN project\n\t\t\t\t\t\tON task.project_id = project.id\n\t\t\t\t\tLEFT JOIN priority\n\t\t\t\t\t\tON task.priority_id = priority.id\n\t\t\t\tWHERE task.id=? \n\t\t\t\tLIMIT 1", taskId, function (error, results) {
                var task = null;
                if (results instanceof Array && results.length) {
                    task = results.shift();
                    redis_1.default.set(cacheKey, JSON.stringify(task));
                }
                res.json(task);
            });
        }
    });
});
exports.default = router;
