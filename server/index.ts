require('dotenv').config(); // Load .env file

import * as mysql from 'mysql';
import * as express from 'express';
import * as path from 'path';

const port = 5555;
const server = express();
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

server.use(express.static(path.resolve(__dirname, './')));

server.get('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, './index.html'));
});

server.get('/test', (req, res) => {
    db.connect();
    db.query('SELECT * FROM user', (error: mysql.MysqlError | null, results: any) => {
        if (error) {
            throw error;
        }

        res.json(results);
    });
    db.end();
});

server.listen(port);
