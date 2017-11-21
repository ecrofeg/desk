"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var task_1 = require("./task");
var project_1 = require("./project");
var router = express.Router();
router.use('/task', task_1.default);
router.use('/project', project_1.default);
exports.default = router;
