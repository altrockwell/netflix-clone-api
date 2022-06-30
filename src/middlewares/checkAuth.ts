import { NextFunction, Request, Response } from 'express';

export default async function checkAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (req.isAuthenticated()) {
		return next();
	}
	// res.status(400).send('Not Logged In');
	res.redirect('/users/login');
}
