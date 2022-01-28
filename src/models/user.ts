import { Schema, model } from 'mongoose';

import validateEmail from '../utils/validateEmail';

export type User = {
  name: string;
  email: string;
  password: string;
};

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'E-mail é obrigatório'],
    validate: [validateEmail, 'Insira um endereço de E-mail válido'],
  },
  password: { type: String, required: true },
});

const UserModel = model<User>('User', schema);

export default UserModel;
