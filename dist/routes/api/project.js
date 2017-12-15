"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../../core/db");
var redis_1 = require("../../core/redis");
var api_1 = require("../../core/api");
var router = express.Router();
router.get('/', function (req, res) {
    var cacheKey = "projects";
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.getBuilder()
                .select(['*'])
                .from('project')
                .execute()
                .catch(function (reason) { return api_1.handleError(res, reason); })
                .then(function (results) {
                var projects = [];
                if (results instanceof Array && results.length) {
                    projects = results;
                    // redis.set(cacheKey, JSON.stringify(projects));
                }
                res.json(projects);
            });
        }
    });
});
router.get('/:id', function (req, res) {
    var projectId = req.params.id;
    var cacheKey = "project_" + projectId;
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.getBuilder()
                .select(['name', 'description', 'created_at', 'updated_at'])
                .from('project')
                .where({ id: 1 })
                .limit(1)
                .execute()
                .catch(function (reason) { return api_1.handleError(res, reason); })
                .then(function (results) {
                var project = null;
                if (results instanceof Array && results.length) {
                    project = results.shift();
                    // redis.set(cacheKey, JSON.stringify(project));
                }
                res.json(project);
            });
        }
    });
});
router.put('/', function (req, res) {
    var project = req.body;
    db_1.getBuilder()
        .insert('project', project)
        .execute()
        .catch(function (reason) { return api_1.handleError(res, reason); })
        .then(function (objectId) {
        res.json(objectId);
    });
});
exports.default = router;
