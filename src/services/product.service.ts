import connection from '../models/connection';
import { IProduct, IProductReturn } from '../interfaces/product.interface';
import ProductModel from '../models/product.model';
import { SUCESS } from '../httpStatusCodes';
import { ProductSchema, RequiredSchema } from '../schemas/products.schema';

const validateProduct = (product: IProduct): IProduct => {
  const validation = RequiredSchema.validate(product);
  
  if (validation.error) throw validation.error;
  
  const { error, value } = ProductSchema.validate(validation.value);
  if (error) {
    const e = new Error(error.message);
    e.name = 'UnprocessableEntityError';
    throw e;
  }

  return value;
};

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }
 
  public async create(product: IProduct): Promise<IProductReturn> {
    const productValidated = validateProduct(product);
    
    const result = await this.model.create(productValidated);

    return { code: SUCESS.CREATED, result };
  }

  public async getAll(): Promise<IProductReturn> {
    const result = await this.model.getAll();

    return { code: SUCESS.OK, result };
  }
}
