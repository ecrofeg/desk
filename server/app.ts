require('dotenv').config(); // Load .env file

import * as express from 'express';
import * as path from 'path';
import routes from './routes/index';
import routesAPI from './routes/api';

const app = express();

app.use(express.static(path.resolve(__dirname, './')));
app.use('/', routes);
app.use('/api', routesAPI);
app.set('port', process.env.PORT || 5555);

app.listen(app.get('port'));
