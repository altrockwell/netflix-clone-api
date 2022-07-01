import { NextFunction, Request, Response } from 'express';

export default async function checkNotAuth(
	req: Request,
	res: Response,
	next: NextFunction
) {
	if (!req.isAuthenticated()) {
		return next();
	}
	// res.status(400).send('Not Logged In');
	res.redirect('/');
}
