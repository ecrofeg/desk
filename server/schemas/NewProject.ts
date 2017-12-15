import { InsertValuesClause } from '../core/db';

export default interface NewProject extends InsertValuesClause {
	name: string;
	description: string;
	shortcut: string;
	author_id: number;
}
