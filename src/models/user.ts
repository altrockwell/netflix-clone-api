import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/user';

const userSchema = new Schema<IUser>({
	name: { type: String },
	email: { type: String, required: true },
	password: { type: String },
});

export default mongoose.model<IUser>('User', userSchema);
