import { NextFunction, Request, Response } from 'express';
import { SUCESS } from '../httpStatusCodes';
import { IUserLogged } from '../interfaces/user.interface';
import LoginService from '../services/login.service';

interface RequestWithUser extends Request {
  user?: IUserLogged;
}

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) {}

  public login = async (req: RequestWithUser, res: Response) => {
    const body = this.loginService.validateBody(req.body);

    const token = await this.loginService.validateUser(body);

    res.status(SUCESS.OK).json({ token });
  };

  public validateToken = async (req:Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    const user = await this.loginService.validateToken(authorization as string);
    req.user = user;

    next();
  };
}