"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Load .env file
var express = require("express");
var path = require("path");
var index_1 = require("./routes/index");
var api_1 = require("./routes/api");
var app = express();
app.use(express.static(path.resolve(__dirname, './')));
app.use('/api', api_1.default);
app.use('/', index_1.default);
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './index.html'));
});
app.set('port', process.env.PORT || 5555);
app.listen(app.get('port'));
