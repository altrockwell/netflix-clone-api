import express from 'express';
import passport from 'passport';
import checkNotAuth from '../middlewares/checkNotAuth';
import { register } from '../controllers/auth';
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

// POST /register returns 201 status and {name, email}

// Return 400 if name is not provided
// Return 400 if email is not provided
// Return 400 if provider is "local" and password is not provided
// Check if password is hashed
// Return 400 if email is already exist in db
// Return 201 if request is validate
// Save user in the DB
// Return user

router.post('/register', async (req, res) => {
	// should return 400 when name
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
