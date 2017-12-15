import * as express from 'express';
import { getBuilder } from '../../core/db';
import NewProject from '../../schemas/NewProject';
import redis from '../../core/redis';
import { handleError } from '../../core/api';

const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	const cacheKey: string = `projects`;

	redis.get(cacheKey, (error, cachedData) => {
		if (cachedData) {
			res.send(cachedData);
		}
		else {
			getBuilder()
				.select(['*'])
				.from('project')
				.execute()
				.catch((reason: any) => handleError(res, reason))
				.then((results: any) => {
					let projects: Object[] = [];

					if (results instanceof Array && results.length) {
						projects = results;
						// redis.set(cacheKey, JSON.stringify(projects));
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
			getBuilder()
				.select(['name', 'description', 'created_at', 'updated_at'])
				.from('project')
				.where({ id: 1 })
				.limit(1)
				.execute()
				.catch((reason: any) => handleError(res, reason))
				.then((results: any) => {
					let project: any = null;

					if (results instanceof Array && results.length) {
						project = results.shift();
						// redis.set(cacheKey, JSON.stringify(project));
					}

					res.json(project);
				});
		}
	});
});

router.put('/', (req: express.Request, res: express.Response) => {
	const project: NewProject = req.query;

	getBuilder()
		.insert('project', project)
		.execute()
		.catch((reason: any) => handleError(res, reason))
		.then((objectId: any) => {
			res.json(objectId);
		});
});

export default router;
