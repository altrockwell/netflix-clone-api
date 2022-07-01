import express from 'express';
import { IUser } from '../interfaces/user';
import checkAuth from '../middlewares/checkAuth';
import User from '../models/user';
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error });
	}
});

router.get('/me', checkAuth, (req, res) => {
	const user = req.user as IUser | any;
	res.send(`Hi ${user.displayName || user.name}`);
});

router.get('/delete', async (req, res) => {
	await User.deleteMany({});
});

export default router;
