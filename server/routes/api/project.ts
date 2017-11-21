import * as express from 'express';
import * as mysql from 'mysql';
import db from '../../core/db';
import redis from '../../core/redis';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	const cacheKey: string = `projects`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			db.query('SELECT * from project', (error: mysql.MysqlError | null, results: any) => {
				let projects: Object[] = [];

				if (results instanceof Array && results.length) {
					projects = results;
					redis.set(cacheKey, JSON.stringify(projects));
				}

				res.json(projects);
			});
		}
	});
});

router.get('/:id', (req: express.Request, res: express.Response) => {
	const { id: projectId } = req.params;
	const cacheKey: string = `project_${projectId}`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			db.query(`
				SELECT project.name, project.description, project.created_at, project.updated_at
				FROM project
				WHERE project.id=? 
				LIMIT 1`,
				projectId,
				(error: mysql.MysqlError | null, results: any) => {
					let project: any = null;

					if (results instanceof Array && results.length) {
						project = results.shift();
						redis.set(cacheKey, JSON.stringify(project));
					}

					res.json(project);
				}
			);
		}
	});
});

export default router;
