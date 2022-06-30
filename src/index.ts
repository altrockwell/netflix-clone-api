import express from 'express';
import middlewares from './startapp/middlewares';
import user from './routes/user';
import auth from './routes/auth';
import checkAuth from './middlewares/checkAuth';
import { IUser } from './interfaces/user';
import { VerifyCallback } from 'passport-google-oauth2';

require('dotenv').config();

// Project Modules

const app = express();
const port = process.env.PORT || 3000;

export const users: IUser[] = [];

// middlewares
middlewares(app, users);

app.get('/', checkAuth, (req, res) => {
	const user = req.user as IUser | any;
	console.log(user);
	// const name = typeof user.name == String ? user.name : user.displayName
	res.render('index.ejs', { name: user.displayName || user.name });
});

app.use('/', auth);
app.use('/users', user);

app.listen(port, () => {
	console.log(`Server connected to ${port}...`);
});
