import * as express from 'express';
import * as mysql from 'mysql';
import db from '../../core/db';
import redis from '../../core/redis';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	const { assignee_id } = req.query;
	const cacheKey: string = `user_tasks_${assignee_id}`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			db.query('SELECT * FROM task WHERE assignee_id=?', assignee_id, (error: mysql.MysqlError | null, results: any) => {
				let tasks: Object[] = [];

				if (results instanceof Array && results.length) {
					tasks = results;
					redis.set(cacheKey, JSON.stringify(tasks));
				}

				res.json(tasks);
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
			db.query(`
				SELECT 
					task.name, task.description, task.created_at, task.updated_at,
					user.name as author_name,
					file.path as author_picture,
					status.name as task_status,
					project.name as task_project,
					priority.name as task_priority
				FROM task 
					LEFT JOIN user
						ON task.author_id = user.id
					LEFT JOIN file
						ON user.picture_id = file.id
					LEFT JOIN status
						ON task.status_id = status.id
					LEFT JOIN project
						ON task.project_id = project.id
					LEFT JOIN priority
						ON task.priority_id = priority.id
				WHERE task.id=? 
				LIMIT 1`,
				taskId,
				(error: mysql.MysqlError | null, results: any) => {
					let task: any = null;

					if (results instanceof Array && results.length) {
						task = results.shift();
						redis.set(cacheKey, JSON.stringify(task));
					}

					res.json(task);
				}
			);
		}
	});
});

export default router;
