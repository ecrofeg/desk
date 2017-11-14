import * as express from 'express';
import * as mysql from 'mysql';
import * as Redis from 'redis';

const redis = Redis.createClient(6379);
const router = express.Router();
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

redis.on('error', error => {
	console.log(error);
});

router.get('/task', (req: express.Request, res: express.Response) => {
	const { assignee_id } = req.query;
	const cacheKey = `user_tasks_${assignee_id}`;

	redis.get(cacheKey, (error, reply) => {
		if (reply) {
			res.send(reply);
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

router.get('/task/:id', (req: express.Request, res: express.Response) => {
	const { id: taskId } = req.params;
	const cacheKey = `task_1`;

	redis.get(cacheKey, (error, reply) => {
		if (reply) {
			res.send(reply);
		}
		else {
			db.query('SELECT * FROM task WHERE id=? LIMIT 1', taskId, (error: mysql.MysqlError | null, results: any) => {
				let task = null;

				if (results instanceof Array && results.length) {
					task = results.shift();
					redis.set(cacheKey, JSON.stringify(task));
				}

				res.json(task);
			});
		}
	});
});

export default router;
