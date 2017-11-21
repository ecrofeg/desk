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
exports.default = router;
