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
            db_1.default.query("SELECT * FROM task WHERE assignee_id=?", assignee_id, function (error, results) {
                var response = {
                    tasks: {}
                };
                if (results instanceof Array && results.length) {
                    results.forEach(function (task) {
                        response.tasks[task.id] = task;
                    });
                    redis_1.default.set(cacheKey, JSON.stringify(response));
                }
                res.json(response);
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
            db_1.default.query("\n\t\t\t\tSELECT \n\t\t\t\t\ttask.*,\n\t\t\t\t\tassignee.name as assignee_name,\n\t\t\t\t\tauthor.name as author_name,\n\t\t\t\t\tstatus.name as status_name,\n\t\t\t\t\tproject.name as project_name,\n\t\t\t\t\tproject.author_id as project_author_id,\n\t\t\t\t\tproject.description as project_description,\n\t\t\t\t\tproject.author_id as project_author_id,\n\t\t\t\t\tproject.created_at as project_created_at,\n\t\t\t\t\tproject.updated_at as project_updated_at,\n\t\t\t\t\tpriority.value as priority_value\n\t\t\t\tFROM task \n\t\t\t\t\tLEFT JOIN user as assignee\n\t\t\t\t\t\tON task.assignee_id = assignee.id\n\t\t\t\t\tLEFT JOIN user as author\n\t\t\t\t\t\tON task.author_id = author.id\n\t\t\t\t\tLEFT JOIN status\n\t\t\t\t\t\tON task.status_id = status.id\n\t\t\t\t\tLEFT JOIN project\n\t\t\t\t\t\tON task.project_id = project.id\n\t\t\t\t\tLEFT JOIN priority\n\t\t\t\t\t\tON task.priority_id = priority.id\n\t\t\t\tWHERE task.id=? \n\t\t\t\tLIMIT 1", taskId, function (error, results) {
                var response = {
                    tasks: {},
                    users: {},
                    projects: {}
                };
                if (results instanceof Array && results.length) {
                    var task = results.shift();
                    response.tasks[task.id] = {
                        id: task.id,
                        name: task.name,
                        description: task.description,
                        author_id: task.author_id,
                        assignee_id: task.assignee_id,
                        status_id: task.status_id,
                        project_id: task.project_id,
                        priority_id: task.priority_id,
                        created_at: task.created_at,
                        updated_at: task.updated_at,
                        status_name: task.status_name,
                        priority_value: task.priority_value
                    };
                    response.users[task.author_id] = {
                        id: task.author_id,
                        name: task.author_name
                    };
                    response.users[task.assignee_id] = {
                        id: task.assignee_id,
                        name: task.author_name
                    };
                    response.projects[task.project_id] = {
                        id: task.project_id,
                        name: task.project_name,
                        description: task.project_description,
                        author_id: task.project_author_id,
                        created_at: task.project_created_at,
                        updated_at: task.project_updated_at
                    };
                    redis_1.default.set(cacheKey, JSON.stringify(response));
                }
                res.json(response);
            });
        }
    });
});
exports.default = router;
