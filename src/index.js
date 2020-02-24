import 'dotenv/config';
import express from 'express';
import cors from 'cors'

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', routes.user);
app.use('/match', routes.match);

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`),
);
