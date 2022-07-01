import express, { Application } from 'express';
import flash from 'express-flash';
import session from 'express-session';
import passport from 'passport';
import methodOverride from 'method-override';

import passportConfig from '../configs/passport';

import { IUser } from '../interfaces/user';
import User from '../models/user';

export default function middlewares(app: Application) {
	passportConfig(passport);
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.set('view-engine', 'ejs');
	app.use(flash());
	app.use(
		session({
			secret: process.env.SESSION_SECRET || 'secret',
			resave: false,
			saveUninitialized: false,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(methodOverride('_method'));
}
