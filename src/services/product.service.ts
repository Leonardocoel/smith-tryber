import connection from '../models/connection';
import { IProduct, IProductReturn } from '../interfaces/product.interface';
import ProductModel from '../models/product.model';
import { SUCESS } from '../httpStatusCodes';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }
  
  public async create(product: IProduct): Promise<IProductReturn> {
    const result = await this.model.create(product);

    return { code: SUCESS.CREATED, result };
  }
}
