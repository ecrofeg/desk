import { Moment } from 'moment';
import User from './User';

export default interface Task {
	id: number;
	name: string;
	description: string;
	status: string;
	priority: string;
	project: string;
	author?: User;
	assignee?: User;
	created_at: Moment;
	updated_at: Moment;
}
