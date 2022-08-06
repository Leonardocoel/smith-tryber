import jwt, { SignOptions } from 'jsonwebtoken';
import { IUserWithoutPassword } from '../interfaces/user.interface';

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const createToken = (user: IUserWithoutPassword) => 
  jwt.sign({ data: user }, 'Our dirty little secret', options);

export const validateToken = (token: string) => {
  try {
    const jwtPayload = jwt.verify(token, 'Our dirty little secret');

    return jwtPayload as IUserWithoutPassword;
  } catch (_err) {
    const error = new Error('Expired or invalid token');
    error.name = 'UnauthorizedError';
    throw error;
  }
};
