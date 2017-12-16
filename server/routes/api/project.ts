import * as express from 'express';
import { getBuilder } from '../../core/db';
import NewProject from '../../schemas/NewProject';
import Project from '../../schemas/Project';
import redis from '../../core/redis';
import { handleError } from '../../core/api';

const router = express.Router();

interface ProjectsResponse {
	projects: {
		[projectId: number]: Project;
	};
}

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
					const response: ProjectsResponse = {
						projects: {}
					};

					if (results instanceof Array && results.length) {
						results.forEach((project: Project) => {
							response.projects[project.id] = project;
						});

						// redis.set(cacheKey, JSON.stringify(projects));
					}

					res.json(response);
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
					let project: Project;
					const response: ProjectsResponse = {
						projects: {}
					};

					if (results instanceof Array && results.length) {
						project = results.shift();
						response.projects[project.id] = project;
						// redis.set(cacheKey, JSON.stringify(project));
					}

					res.json(response);
				});
		}
	});
});

router.put('/', (req: express.Request, res: express.Response) => {
	const project: NewProject = req.body;

	getBuilder()
		.insert('project', project)
		.execute()
		.catch((reason: any) => handleError(res, reason))
		.then((objectId: any) => {
			res.json(objectId);
		});
});

export default router;
