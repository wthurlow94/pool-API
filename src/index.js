import "@babel/polyfill";
import 'dotenv/config';
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import mongoose from'mongoose';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


app.use('/users', routes.user);
app.use('/matches',routes.match);
app.use('/mock/users', routes.mockUser);
app.use('/mock/matches',routes.mockMatch);
app.use('/mock/auth',routes.mockAuth);
app.listen(process.env.PORT, () => 
	console.log(`Example app listening on port ${process.env.PORT}!`),
);



module.exports = app;
