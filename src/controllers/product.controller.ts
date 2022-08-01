import { Request, Response } from 'express';
import ProductService from '../services/product.service';
import { IProduct } from '../interfaces/product.interface';

export default class ProductController {
  private service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  public create = async (req: Request, res: Response) => {
    const product = req.body as IProduct;

    const { code, result } = await this.service.create(product);

    res.status(code).json(result);
  };
}