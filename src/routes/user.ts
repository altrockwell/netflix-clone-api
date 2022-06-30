import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/user';
import checkNotAuth from '../middlewares/checkNotAuth';
import checkAuth from '../middlewares/checkAuth';
import { users } from '../index';
const router = express.Router();

router.get('/', checkAuth, (req, res) => {
	const user = req.user as IUser;
	res.render('index.ejs', { name: user.name });
});

router.get('/login', checkNotAuth, (req, res) => {
	res.render('login.ejs');
});
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true,
	})
);
router.get('/register', checkNotAuth, (req, res) => {
	res.render('register.ejs');
});
router.post('/register', async (req, res) => {
	try {
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		const user = {
			id: Date.now().toString(),
			name: req.body.name,
			email: req.body.email,
			password: hashedPassword,
		};
		users.push(user);
		res.redirect('/users/login');
	} catch (error) {
		res.redirect('/users/register');
	}
});

router.delete('/logout', function (req, res, next) {
	req.logOut(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/users/login');
	});
});

export default router;
