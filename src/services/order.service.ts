import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { SUCESS } from '../httpStatusCodes';
import { IOrderGrouped, IOrderReturn } from '../interfaces/order.interface';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrderReturn> {
    const orders = await this.model.getAll();

    const result: IOrderGrouped[] = await Promise.all(orders.map(async (order) => {
      const products = await this.model.getByOrderId(order.id);
      const productsIds = products.map(({ id }) => id);
      const ordersWithProductsIds = { ...order, productsIds };
      
      return ordersWithProductsIds;
    }));

    return { code: SUCESS.OK, result };
  }

  // public async getAll(): Promise<IOrderReturn> {
  //   const orders = await this.model.getAll();

  //   const result: IOrderGrouped[] = orders.reduce((acc: IOrderGrouped[], cur: IOrder) => {
  //     const { id, userId, productsIds } = cur;
  //     const index = acc.findIndex(({ id: ID }) => ID === id);
  //     const order: IOrderGrouped = { id, userId, productsIds: [productsIds] };

  //     if (index < 0) acc.push(order);
  //     else acc[index].productsIds.push(productsIds);

  //     return acc;
  //   }, []);

  //   return { code: SUCESS.OK, result };
  // }
}