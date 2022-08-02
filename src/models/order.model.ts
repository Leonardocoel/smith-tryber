import { Pool } from 'mysql2/promise';
import { IOrder, IProductsId } from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<IOrder[]> {
  //   const query = `SELECT o.id, o.userId, p.id as productsIds
  // FROM Trybesmith.Orders o
  // INNER JOIN Trybesmith.Products p
  // WHERE o.id = p.orderId
  // `;
    const query = 'SELECT * FROM Trybesmith.Orders';

    const [orders] = await this.connection.execute(query);

    return orders as IOrder[];
  }

  public async getByOrderId(id: number): Promise<IProductsId[]> {
    const query = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const value = [id];

    const [products] = await this.connection.execute(query, value);

    return products as IProductsId[];
  }
}