const bodyParser = require('body-parser');

require('dotenv').config(); // Load .env file

import * as express from 'express';
import * as path from 'path';
import routes from './routes/index';

const app = express();

app.use(express.static(path.resolve(__dirname, './')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './index.html')));
app.set('port', process.env.PORT || 5555);
app.listen(app.get('port'));
