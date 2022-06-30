import express from 'express';
import middlewares from './startapp/middlewares';
import user from './routes/user';
import checkAuth from './middlewares/checkAuth';
import { IUser } from './interfaces/user';

// Project Modules

const app = express();
const port = process.env.PORT || 3000;

export const users: IUser[] = [];

// middlewares
middlewares(app, users);

app.get('/', checkAuth, (req, res) => {
	const user = req.user as IUser;
	res.render('index.ejs', { name: user.name });
});

app.use('/users', user);

app.listen(port, () => {
	console.log(`Server connected to ${port}...`);
});
