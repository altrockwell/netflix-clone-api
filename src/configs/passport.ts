import { PassportStatic } from 'passport';
import { VerifyCallback } from 'passport-google-oauth2';
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
import bcrypt from 'bcrypt';
import { Request } from 'express';

export default function initialize(
	passport: PassportStatic,
	getUserByEmail: any,
	getUserById: any
) {
	const authenticateUser = async (
		email: string,
		password: string,
		done: any
	) => {
		const user = getUserByEmail(email);
		if (user == null) {
			return done(null, false, { message: 'No user with that email' });
		}

		try {
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user);
			} else {
				return done(null, false, { message: 'Password incorrect' });
			}
		} catch (e) {
			return done(e);
		}
	};
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, authenticateUser)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: 'http://localhost:8000/auth/google/callback',
				passReqToCallback: true,
			},
			function (
				request: Request,
				accessToken: string,
				refreshToken: string,
				profile: any,
				done: VerifyCallback
			) {
				return done(null, profile);
			}
		)
	);
	passport.serializeUser((user: any, done: VerifyCallback) =>
		done(null, user)
	);
	passport.deserializeUser((user: any, done: VerifyCallback) => {
		return done(null, user);
	});
}
