import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'You need to specify your first name.'],
			minLength: [
				3,
				'Your first name must be at least three characters long.',
			],
		},

		lastName: {
			type: String,
			required: [true, 'You need to specify your last name.'],
			minLength: [
				3,
				'Your last name must be at least three characters long.',
			],
		},

		username: {
			type: String,
			required: [true, 'You need to specify an username.'],
			minLength: [
				6,
				'Your username must be at least six characters long.',
			],
			unique: [true, 'The specified user already exists.'],
		},

		email: {
			type: String,
			required: [true, 'You need to specify a valid email.'],
			unique: [true, 'An account already exists with the given email.'],
		},

		password: {
			type: String,
			required: [true, 'You need to specify a valid password.'],
			minLength: [
				8,
				'Your password must be at least eigth characters long.',
			],
		},

		userPicture: {
			type: String,
			default: 'user-images/default-user-picture.png',
		},
		googlePicture: {
			type: String,
		},
		isGoogle: {
			type: Boolean, 
			default: false
		}
	},
	{
		timestamps: true,
	},
);
UserSchema.pre('save', async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		next(error);
	}
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('users', UserSchema);

export default User;
