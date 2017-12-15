import { InsertValuesClause } from '../core/db';

export default interface NewTask extends InsertValuesClause {
	name: string;
	description: string;
	author_id: number;
	assignee_id: number;
	status_id: number;
	project_id: number;
	priority_id: number;
}
