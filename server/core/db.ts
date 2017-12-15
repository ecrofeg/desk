import * as mysql from 'mysql';
import { Connection } from 'mysql';

const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

interface WhereClause {
	[colName: string]: any;
}

export interface InsertValuesClause {
	[colName: string]: string|number;
}

class QueryBuilder {
	private _query: string[] = [];

	constructor(public connection: Connection) {
		this.connection = connection;
	}

	escape(value: any) {
		return this.connection.escape(value);
	}

	insert(table: string, values: InsertValuesClause) {
		const columnsPack: string[] = [];
		const valuesPack: string[] = [];

		for (const colName in values) {
			columnsPack.push(colName);
			valuesPack.push(this.escape(values[colName]));
		}

		this._query.push(`INSERT INTO ${table} (${columnsPack.join(', ')}) VALUES (${valuesPack.join(', ')})`);

		return this;
	}

	select(columns: string[], from?: string): QueryBuilder {
		this._query.push(`SELECT ${columns.join(', ')}`);

		if (from) {
			this.from(from);
		}

		return this;
	}

	from(table: string, as?: string): QueryBuilder {
		let query = `FROM ${table}`;

		if (as) {
			query += `as ${as}`;
		}

		this._query.push(query);

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

	join(table: string, from: string, to: string, type: string = 'LEFT') {
		this._query.push(`${type} JOIN ${table} ON ${from} = ${to}`);
		return this;
	}

	buildQuery(): string {
		return this._query.join(' ');
	}

	execute(): Promise<Object[]> {
		const promise: Promise<Object[]> = new Promise<Object[]>((resolve: Function, reject: Function) => {
			this.connection.query(this.buildQuery(), (error: mysql.MysqlError | null, results: any) => {
				if (error) {
					reject(error);
				}
				else if (results instanceof Array) {
					resolve(results);
				}
				else if (typeof results === 'object' && 'insertId' in results) {
					resolve(results.insertId);
				}
				else {
					reject();
				}
			});
		});

		this.clear();

		return promise;
	}

	clear() {
		this._query = [];
	}
}

export const getBuilder = (connection: Connection = db): QueryBuilder => {
	return new QueryBuilder(connection);
};

export default db;
