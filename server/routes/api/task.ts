import * as express from 'express';
import { getBuilder } from '../../core/db';
import redis from '../../core/redis';
import Task from '../../schemas/Task';
import NewTask from '../../schemas/NewTask';
import Project from '../../schemas/Project';

const router = express.Router();

interface TasksResponse {
	tasks: {
		[taskId: number]: Task
	};
	projects?: {
		[projectId: number]: Project;
	};
	users?: any;
}

router.get('/', (req: express.Request, res: express.Response) => {
	const { assignee_id } = req.query;
	const cacheKey: string = `user_tasks_${assignee_id}`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			getBuilder()
				.select([
					'task.id',
					'task.name',
					'task.description',
					'task.created_at',
					'task.updated_at',
					'priority.value as priority'
				])
				.from('task')
				.join('priority', 'task.priority_id', 'priority.id')
				.where({
					'assignee_id': assignee_id
				})
				.execute()
				.then((results: any) => {
					const response: TasksResponse = {
						tasks: {}
					};

					if (results instanceof Array && results.length) {
						results.forEach((task) => {
							response.tasks[task.id] = <Task>task;
						});

						// redis.set(cacheKey, JSON.stringify(response));
					}

					res.json(response);
				});
		}
	});
});

router.get('/:id', (req: express.Request, res: express.Response) => {
	const { id: taskId } = req.params;
	const cacheKey: string = `task_${taskId}`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			getBuilder()
				.select([
					'task.*',
					'assignee.name as assignee_name',
					'author.name as author_name',
					'status.name as status_name',
					'project.name as project_name',
					'project.author_id as project_author_id',
					'project.description as project_description',
					'project.author_id as project_author_id',
					'project.created_at as project_created_at',
					'project.updated_at as project_updated_at',
					'priority.value as priority',
				])
				.from('task')
				.join('user as assignee', 'task.assignee_id', 'assignee.id')
				.join('user as author', 'task.author_id', 'author.id')
				.join('status', 'task.status_id', 'status.id')
				.join('project', 'task.project_id', 'project.id')
				.join('priority', 'task.priority_id', 'priority.id')
				.where({
					'task.id': taskId
				})
				.limit(1)
				.execute()
				.then((results: any) => {
					const response: TasksResponse = {
						tasks: {},
						users: {},
						projects: {}
					};

					if (results instanceof Array && results.length) {
						interface TaskFromDB extends Task {
							author_name: string;
							project_name: string;
							project_description: string;
							project_author_id: number;
							project_created_at: string;
							project_updated_at: string;
						}

						const task: TaskFromDB = results.shift();

						response.tasks[task.id] = {
							id: task.id,
							name: task.name,
							description: task.description,
							author_id: task.author_id,
							assignee_id: task.assignee_id,
							status_id: task.status_id,
							project_id: task.project_id,
							priority_id: task.priority_id,
							created_at: task.created_at,
							updated_at: task.updated_at,
							status_name: task.status_name,
							priority: task.priority
						};

						response.users[task.author_id] = {
							id: task.author_id,
							name: task.author_name
						};

						response.users[task.assignee_id] = {
							id: task.assignee_id,
							name: task.author_name
						};

						response.projects[task.project_id] = {
							id: task.project_id,
							name: task.project_name,
							description: task.project_description,
							author_id: task.project_author_id,
							created_at: task.project_created_at,
							updated_at: task.project_updated_at
						};

						// redis.set(cacheKey, JSON.stringify(response));
					}

					res.json(response);
				});
		}
	});
});

router.put('/', (req: express.Request, res: express.Response) => {
	const task: NewTask = req.query;

	getBuilder()
		.insert('task', task)
		.execute()
		.then((objectId: any) => {
			res.json(objectId);
		});
});

export default router;
