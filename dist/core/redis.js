"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Redis = require("redis");
var redis = Redis.createClient(process.env.REDIS_PORT);
redis.on('error', function (error) {
    console.log(error);
});
exports.default = redis;
