import { Request, Response } from 'express';
import { IUserLogged } from '../interfaces/user.interface';
import OrderService from '../services/order.service';

export default class OrderController {
  private service: OrderService;

  constructor() {
    this.service = new OrderService();
  }

  public getAll = async (req: Request, res: Response) => {
    const { code, result } = await this.service.getAll();

    res.status(code).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { id } = req.user as IUserLogged;
    const { productsIds } = req.body;
    
    const { code, result } = await this.service.create(id, productsIds);

    res.status(code).json(result);
  };
}