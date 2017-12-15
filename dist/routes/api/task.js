"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../../core/db");
var redis_1 = require("../../core/redis");
var api_1 = require("../../core/api");
var router = express.Router();
router.get('/', function (req, res) {
    var assignee_id = req.query.assignee_id;
    var cacheKey = "user_tasks_" + assignee_id;
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.getBuilder()
                .select([
                'task.id',
                'task.name',
                'task.description',
                'task.created_at',
                'task.updated_at',
                'priority.value as priority'
            ])
                .from('task')
                .join('priority', 'task.priority_id', 'priority.id')
                .where({
                'assignee_id': assignee_id
            })
                .execute()
                .catch(function (reason) { return api_1.handleError(res, reason); })
                .then(function (results) {
                var response = {
                    tasks: {}
                };
                if (results instanceof Array && results.length) {
                    results.forEach(function (task) {
                        response.tasks[task.id] = task;
                    });
                    // redis.set(cacheKey, JSON.stringify(response));
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
            db_1.getBuilder()
                .select([
                'task.*',
                'assignee.name as assignee_name',
                'author.name as author_name',
                'status.name as status_name',
                'project.name as project_name',
                'project.author_id as project_author_id',
                'project.description as project_description',
                'project.author_id as project_author_id',
                'project.created_at as project_created_at',
                'project.updated_at as project_updated_at',
                'priority.value as priority',
            ])
                .from('task')
                .join('user as assignee', 'task.assignee_id', 'assignee.id')
                .join('user as author', 'task.author_id', 'author.id')
                .join('status', 'task.status_id', 'status.id')
                .join('project', 'task.project_id', 'project.id')
                .join('priority', 'task.priority_id', 'priority.id')
                .where({
                'task.id': taskId
            })
                .limit(1)
                .execute()
                .catch(function (reason) { return api_1.handleError(res, reason); })
                .then(function (results) {
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
                        priority: task.priority
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
                    // redis.set(cacheKey, JSON.stringify(response));
                }
                res.json(response);
            });
        }
    });
});
router.put('/', function (req, res) {
    var task = req.query;
    db_1.getBuilder()
        .insert('task', task)
        .execute()
        .catch(function (reason) { return api_1.handleError(res, reason); })
        .then(function (objectId) {
        res.json(objectId);
    });
});
exports.default = router;
