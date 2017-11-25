export default interface Task {
	id: number;
	name: string;
	description: string;
	author_id: number;
	assignee_id: number;
	status_id: number;
	project_id: number;
	priority_id: number;
	created_at: string;
	updated_at: string;

	status_name?: string;
	priority_value?: number;
}
