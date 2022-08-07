import { Pool, ResultSetHeader } from 'mysql2/promise'; 
import { IProduct } from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
    const values = [name, amount];

    const [result] = await this.connection.execute<ResultSetHeader>(query, values);
    const { insertId: id } = result;

    const newProduct: IProduct = { id, ...product };
    return newProduct;
  }

  public async getAll(): Promise<IProduct[]> {
    const query = 'SELECT * FROM Trybesmith.Products';

    const [products] = await this.connection.execute(query);

    return products as IProduct[];
  }

  public async update(orderId: number, productId: number) {
    const query = 'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?';

    await this.connection.execute<ResultSetHeader>(query, [orderId, productId]);
  }
}