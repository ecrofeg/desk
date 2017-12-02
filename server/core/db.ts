import * as mysql from 'mysql';
import { Connection } from 'mysql';

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

interface WhereClause {
	[colName:string]: any;
}

class QueryBuilder {
	private _query: string[] = [];

	constructor(public connection: Connection) {
		this.connection = connection;
	}

	select(columns: string[], from?: string): QueryBuilder {
		this._query.push(`SELECT ${columns.join(', ')}`);

		if (from) {
			this.from(from);
		}

		return this;
	}

	from(table: string): QueryBuilder {
		this._query.push(`FROM ${table}`);
		return this;
	}

	where(conditions: WhereClause): QueryBuilder {
		for (const colName in conditions) {
			this._query.push(`WHERE ${colName}=${this.connection.escape(conditions[colName])}`);
		}

		return this;
	}

	limit(value: number): QueryBuilder {
		this._query.push(`LIMIT ${value}`);
		return this;
	}

	join() {

	}

	add(query: string): QueryBuilder {
		this._query.push(query);
		return this;
	}

	buildQuery(): string {
		return this._query.join(' ');
	}

	execute(): Promise {
		return new Promise((resolve: Function, reject: Function) => {
			this.connection.query(this.buildQuery(), (error: mysql.MysqlError | null, results: any) => {
				if (error) {
					reject(error);
				}
				else {
					resolve(results);
				}
			});
		});
	}
}

const builder = new QueryBuilder(db);
builder.select(['id', 'name'], 'project').where({
	name: 'Desk Project'
}).limit(1);

db.query(builder.buildQuery(), (error, results) => {
	console.log(results);
});

export const getBuilder = (connection: Connection = db): QueryBuilder => {
	return new QueryBuilder(connection);
};

export default db;
