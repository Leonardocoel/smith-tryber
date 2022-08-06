import { IUserLogged } from '../../interfaces/user.interface';

declare module 'express' {
  interface Request {
    user?: IUserLogged;
  }
}