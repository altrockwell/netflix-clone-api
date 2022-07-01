import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

export async function register(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// const schema = Joi.object({
	// 	name: Joi.string().min(3).max(255).required(),
	// 	email: Joi.string().email().required(),
	// });
	// schema.validate(req.body);
	// try {
	// 	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	// 	const user = await new User({
	// 		name: req.body.name,
	// 		email: req.body.email,
	// 		password: hashedPassword,
	// 	});
	// 	await user.save();
	// 	res.status(201).json(user);
	// 	// res.redirect('/login');
	// } catch (error) {
	// 	res.status(500).json({ error: error });
	// 	// res.redirect('/register');
	// }
}
