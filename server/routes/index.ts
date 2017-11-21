import * as express from 'express';
import * as path from 'path';
import api from './api';

const router = express.Router();

router.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './index.html'));
});

router.use('/api', api);

export default router;
