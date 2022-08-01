import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

const options: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const createToken = (user: IUser) => 
  jwt.sign({ data: user }, 'Our dirty little secret', options);

export default createToken;