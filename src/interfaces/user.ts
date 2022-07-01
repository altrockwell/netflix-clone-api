export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	provider?: 'local' | 'google';
}
