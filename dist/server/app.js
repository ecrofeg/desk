"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Load .env file
var express = require("express");
var path = require("path");
var index_1 = require("./routes/index");
var api_1 = require("./routes/api");
var app = express();
app.use(express.static(path.resolve(__dirname, './')));
app.use('/', index_1.default);
app.use('/api', api_1.default);
app.set('port', process.env.PORT || 5555);
app.listen(app.get('port'));
