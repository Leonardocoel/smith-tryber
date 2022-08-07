import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { SUCESS } from '../httpStatusCodes';
import { IOrderCreated, IOrderGrouped, IOrderReturn } from '../interfaces/order.interface';
import ProductModel from '../models/product.model';
import { OrderSchema, RequiredSchema } from '../schemas/order.schema';

const validateOrder = (productsIds: number[]) => {
  const validation = RequiredSchema.validate({ productsIds });
  if (validation.error) throw validation.error;

  const { error } = OrderSchema.validate(validation.value);
  if (error) {
    const e = new Error(error.message);
    e.name = 'UnprocessableEntityError';
    throw e;
  }
};

export default class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<IOrderReturn> {
    const orders = await this.orderModel.getAll();

    const result: IOrderGrouped[] = await Promise.all(orders.map(async (order) => {
      const products = await this.orderModel.getByOrderId(order.id);
      const productsIds = products.map(({ id }) => id);
      const ordersWithProductsIds = { ...order, productsIds };
      
      return ordersWithProductsIds;
    }));

    return { code: SUCESS.OK, result };
  }

  public async create(userId: number, productsIds: number[]): Promise<IOrderCreated> {
    validateOrder(productsIds);
    
    const orderId = await this.orderModel.create(userId);

    await Promise.all(productsIds.map(async (productId) => {
      await this.productModel.update(orderId, productId);
    }));
    
    const result = { userId, productsIds };

    return { code: SUCESS.CREATED, result };
  }
}
//   public async getAll(): Promise<IOrderReturn> {
//     const orders = await this.model.getAll();

//     const result: IOrderGrouped[] = orders.reduce((acc: IOrderGrouped[], cur: IOrder) => {
//       const { id, userId, productsIds } = cur;
//       const index = acc.findIndex(({ id: ID }) => ID === id);
//       const order: IOrderGrouped = { id, userId, productsIds: [productsIds] };

//       if (index < 0) acc.push(order);
//       else acc[index].productsIds.push(productsIds);

//       return acc;
//     }, []);

//     return { code: SUCESS.OK, result };
//   }
// }