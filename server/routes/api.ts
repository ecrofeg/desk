import * as express from 'express';
import * as mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

router.get('/task', (req: express.Request, res: express.Response) => {
	db.query('SELECT * FROM task', (error: mysql.MysqlError | null, results: any) => {
		let tasks = [];

		if (results instanceof Array && results.length) {
			tasks = results;
		}

		res.json(tasks);
	});
});

router.get('/task/:id', (req: express.Request, res: express.Response) => {
	db.query('SELECT * FROM task WHERE id=? LIMIT 1', [req.params.id], (error: mysql.MysqlError | null, results: any) => {
		let task = null;

		if (results instanceof Array && results.length) {
			task = results.shift();
		}

		res.json(task);
	});
});

export default router;
