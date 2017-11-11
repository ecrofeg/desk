import * as express from 'express';
import * as mysql from 'mysql';

const router = express.Router();
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

router.get('/task', (req, res) => {
	db.query('SELECT * FROM task', (error: mysql.MysqlError | null, results: any) => {
		res.json(results);
	});
});

export default router;
