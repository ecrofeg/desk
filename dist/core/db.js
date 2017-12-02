"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mysql = require("mysql");
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
var QueryBuilder = /** @class */ (function () {
    function QueryBuilder(connection) {
        this.connection = connection;
        this._query = [];
        this.connection = connection;
    }
    QueryBuilder.prototype.select = function (columns, from) {
        this._query.push("SELECT " + columns.join(', '));
        if (from) {
            this.from(from);
        }
        return this;
    };
    QueryBuilder.prototype.from = function (table) {
        this._query.push("FROM " + table);
        return this;
    };
    QueryBuilder.prototype.where = function (conditions) {
        for (var colName in conditions) {
            this._query.push("WHERE " + colName + "=" + this.connection.escape(conditions[colName]));
        }
        return this;
    };
    QueryBuilder.prototype.limit = function (value) {
        this._query.push("LIMIT " + value);
        return this;
    };
    QueryBuilder.prototype.join = function () {
    };
    QueryBuilder.prototype.add = function (query) {
        this._query.push(query);
        return this;
    };
    QueryBuilder.prototype.buildQuery = function () {
        return this._query.join(' ');
    };
    QueryBuilder.prototype.execute = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.connection.query(_this.buildQuery(), function (error, results) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(results);
                }
            });
        });
    };
    return QueryBuilder;
}());
var builder = new QueryBuilder(db);
builder.select(['id', 'name'], 'project').where({
    name: 'Desk Project'
}).limit(1);
db.query(builder.buildQuery(), function (error, results) {
    console.log(results);
});
exports.getBuilder = function (connection) {
    if (connection === void 0) { connection = db; }
    return new QueryBuilder(connection);
};
exports.default = db;
