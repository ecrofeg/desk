"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var api_1 = require("./api");
var router = express.Router();
router.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'));
});
router.use('/api', api_1.default);
exports.default = router;
