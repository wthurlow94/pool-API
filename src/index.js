import 'dotenv/config';
import express from 'express';
import cors from 'cors'

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', routes.user);
app.use('/mock/users', routes.mockUser);

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`),
);
