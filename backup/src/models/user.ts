import mongoose, { Schema, Model } from 'mongoose';
// import { IUser } from '../interfaces/user';

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	provider?: 'local' | 'google';
}

interface UserModel extends Model<IUser> {
	findOneUserByEmail: (email: string) => IUser;
}

const userSchema = new Schema<IUser, UserModel>({
	name: { type: String, min: 3, max: 255 },
	email: { type: String, required: true, unique: true },
	password: { type: String, min: 6 },
	provider: { type: String, default: 'local', enum: ['local', 'google'] },
});

// findUserByEmail
userSchema.statics.findOneUserByEmail = function (email: string) {
	return this.findOne({ email });
};

// Joi Validations

export default mongoose.model<IUser, UserModel>('User', userSchema);
