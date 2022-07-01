import { Application } from 'express';
import mongoose from 'mongoose';
import mongo from '../configs/mongo';

export default function (app: Application) {
	const { url, configOptions, port } = mongo();
	mongoose.connect(url, configOptions).then(async () => {
		console.log(`Connected to ${url}`);
		app.listen(port, () => console.log(`Server listening on port ${port}!`));
	});
}
