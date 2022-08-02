import { Request, Response } from 'express';
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
}