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
        var _this = this;
        this._query.push("SELECT " + columns.map(function (colName) { return _this.connection.escape(colName); }).join(', '));
        if (from) {
            this.from(from);
        }
        return this;
    };
    QueryBuilder.prototype.from = function (table) {
        this._query.push("FROM " + this.connection.escape(table));
        return this;
    };
    QueryBuilder.prototype.buildQuery = function () {
        return this._query.join(' ');
    };
    return QueryBuilder;
}());
// const builder = new QueryBuilder(db);
// builder.select(['id', 'name'], 'project');
exports.getBuilder = function (connection) {
    if (connection === void 0) { connection = db; }
    return new QueryBuilder(connection);
};
