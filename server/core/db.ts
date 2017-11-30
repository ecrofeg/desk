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

	buildQuery() {
		return this._query.join(' ');
	}
}

const builder = new QueryBuilder(db);
builder.select(['id', 'name'], 'project').where({
	name: 'Desk Project'
});

db.query(builder.buildQuery(), (error, results) => {
	console.log(results);
});

export const getBuilder = (connection: Connection = db): QueryBuilder => {
	return new QueryBuilder(connection);
};
