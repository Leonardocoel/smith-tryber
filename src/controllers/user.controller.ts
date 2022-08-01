import { Request, Response } from 'express';
import { IUser } from '../interfaces/user.interface';
import UserService from '../services/user.service';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public create = async (req: Request, res: Response) => {
    const user = req.body as IUser;

    const { code, token } = await this.service.create(user);

    res.status(code).json({ token });
  };

  // public getAll = async (req: Request, res: Response) => {
  //   const { code, result } = await this.service.getAll();

  //   res.status(code).json(result);
  // };
}