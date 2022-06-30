import { PassportStatic } from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';
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
	passport.serializeUser((user: any, done) => done(null, user.id));
	passport.deserializeUser((id, done) => {
		return done(null, getUserById(id));
	});
}
