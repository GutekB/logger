import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express from 'express';
import { join } from 'path';
import config from './config/config';
import auth from './routes/auth';
import log from './routes/log';
import token from './routes/token';
import exception from "./routes/exception";
import passport from './config/passport';
import { notFound, catchErrors } from './middlewares/errors';
import bodyParser from 'body-parser';
import cors from "cors";

// Connect to database
import dbConfig from './config/database';
import mongoose from 'mongoose';

// Configure passport
passport();

mongoose.connect(dbConfig.mongoUrl, dbConfig.settings);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

const app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes config
app.use('/api/auth', auth());
app.use('/api/logs', log());
app.use('/api/tokens', token());
app.use('/api/exceptions', exception());

// errors handling
app.use(notFound);
app.use(catchErrors);

// let's play!
app.listen(config.server.port, () => {
    console.log(`Server is up!`);
});