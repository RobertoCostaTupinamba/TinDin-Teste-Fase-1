import { Response, Request } from 'express';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user';

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const errosCamposFaltando = [];

  // Validação
  if (!email) {
    errosCamposFaltando.push('O nome é obrigatório');
  }

  if (!password) {
    errosCamposFaltando.push('A senha é obrigatório');
  }

  if (errosCamposFaltando.length !== 0) {
    return res.status(400).json({ message: errosCamposFaltando });
  }

  // check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ msg: 'E-mail ou senha inválida!' });
  }

  // check password
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(422).json({ msg: 'E-mail ou senha inválida!' });
  }

  try {
    const secret: string = process.env.SECRET || '';

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
      {
        expiresIn: '30m', // Expira em 30 minutos
      },
    );

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ msg: 'Houve um erro inesperado' });
  }
}
