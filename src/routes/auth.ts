import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces/user';
import checkNotAuth from '../middlewares/checkNotAuth';
import checkAuth from '../middlewares/checkAuth';
import { users } from '../index';
const router = express.Router();

router.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: '/',
		failureRedirect: '/auth/google/failure',
	})
);

router.get('/auth/google/failure', (req, res) => {
	res.send('Failed to authenticate..');
});

router.get('/login', checkNotAuth, (req, res) => {
	res.render('login.ejs');
});
router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
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
		res.redirect('/login');
	} catch (error) {
		res.redirect('/register');
	}
});

router.delete('/logout', function (req, res, next) {
	req.logOut(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect('/login');
	});
});

export default router;
