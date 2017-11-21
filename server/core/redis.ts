import * as Redis from 'redis';

const redis = Redis.createClient(process.env.REDIS_PORT);

redis.on('error', error => {
	console.log(error);
});

export default redis;
