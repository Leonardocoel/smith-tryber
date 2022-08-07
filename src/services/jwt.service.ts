import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { IUser, IUserWithoutPassword } from '../interfaces/user.interface';

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

export const createToken = (user: IUserWithoutPassword) => 
  jwt.sign({ data: user }, 'Our dirty little secret', options);

export const validateToken = (token: string) => {
  try {
    const jwtPayload = jwt.verify(token, 'Our dirty little secret');
    const { data } = jwtPayload as JwtPayload;

    return data as IUser;
  } catch (_err) {
    const error = new Error('Invalid token');
    error.name = 'UnauthorizedError';
    throw error;
  }
};
