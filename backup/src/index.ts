import express from 'express';
import middlewares from './startapp/middlewares';
import user from './routes/user';
import auth from './routes/auth';
import checkAuth from './middlewares/checkAuth';
const path = require('path');
import { IUser } from './interfaces/user';
import connectDB from './startapp/db';
const app = express();

require('dotenv').config({
	path: path
		.join(__dirname, '..', `${app.get('env')}.env`)
		.split(' ')
		.join(''),
});

// middlewares
middlewares(app);

app.get('/', checkAuth, (req, res) => {
	const user = req.user as IUser | any;
	console.log(user);
	res.render('index.ejs', { name: user.displayName || user.name });
});

// routes
app.use('/', auth);
app.use('/users', user);

console.log('env: ', process.env.NODE_ENV);

connectDB(app);

export default app;
