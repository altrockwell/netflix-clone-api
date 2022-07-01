import { NextFunction, Request, Response } from 'express';

export default async function checkAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	console.log('Is Authenticated ', req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}
	// res.status(400).send('Not Logged In');
	res.redirect('/login');
}
