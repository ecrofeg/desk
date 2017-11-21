"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var db_1 = require("../../core/db");
var redis_1 = require("../../core/redis");
var router = express.Router();
router.get('/', function (req, res) {
    var cacheKey = "projects";
    redis_1.default.get(cacheKey, function (error, cachedData) {
        if (cachedData) {
            res.send(cachedData);
        }
        else {
            db_1.default.query('SELECT * from project', function (error, results) {
                var projects = [];
                if (results instanceof Array && results.length) {
                    projects = results;
                    redis_1.default.set(cacheKey, JSON.stringify(projects));
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
            db_1.default.query("\n\t\t\t\tSELECT project.name, project.description, project.created_at, project.updated_at\n\t\t\t\tFROM project\n\t\t\t\tWHERE project.id=? \n\t\t\t\tLIMIT 1", projectId, function (error, results) {
                var project = null;
                if (results instanceof Array && results.length) {
                    project = results.shift();
                    redis_1.default.set(cacheKey, JSON.stringify(project));
                }
                res.json(project);
            });
        }
    });
});
exports.default = router;
