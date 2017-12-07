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
    QueryBuilder.prototype.from = function (table, as) {
        var query = "FROM " + table;
        if (as) {
            query += "as " + as;
        }
        this._query.push(query);
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
    QueryBuilder.prototype.join = function (table, from, to, type) {
        if (type === void 0) { type = 'LEFT'; }
        this._query.push(type + " JOIN " + table + " ON " + from + " = " + to);
        return this;
    };
    QueryBuilder.prototype.buildQuery = function () {
        return this._query.join(' ');
    };
    QueryBuilder.prototype.execute = function () {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.connection.query(_this.buildQuery(), function (error, results) {
                if (error) {
                    reject(error);
                }
                else if (results instanceof Array) {
                    resolve(results);
                }
                else {
                    reject();
                }
            });
        });
        this.clear();
        return promise;
    };
    QueryBuilder.prototype.clear = function () {
        this._query = [];
    };
    return QueryBuilder;
}());
exports.getBuilder = function (connection) {
    if (connection === void 0) { connection = db; }
    return new QueryBuilder(connection);
};
exports.default = db;
