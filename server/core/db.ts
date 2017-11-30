import * as mysql from 'mysql';
import { Connection } from 'mysql';

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

class QueryBuilder {
	private _query: string[] = [];

	constructor(public connection: Connection) {
		this.connection = connection;
	}

	select(columns: string[], from?: string): QueryBuilder {
		this._query.push(`SELECT ${columns.map(colName => this.connection.escape(colName)).join(', ')}`);

		if (from) {
			this.from(from);
		}

		return this;
	}

	from(table: string) {
		this._query.push(`FROM ${this.connection.escape(table)}`);
		return this;
	}

	buildQuery() {
		return this._query.join(' ');
	}
}

// const builder = new QueryBuilder(db);
// builder.select(['id', 'name'], 'project');

export const getBuilder = (connection?: Connection = db): QueryBuilder => {
	return new QueryBuilder(connection);
};
