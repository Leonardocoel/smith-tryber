import { Pool, ResultSetHeader } from 'mysql2/promise'; 
import { IUser } from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: IUser) {
    const { username, classe, level, password } = user;

    const query = 'INSERT INTO Trybesmith.Users (username,classe,level, password) VALUES (?,?,?,?)';
    const values = [username, classe, level, password];

    await this.connection.execute<ResultSetHeader>(query, values);
  }

  public async getByUsername(username: string) {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username = ?';

    const [row] = await this.connection.execute(query, [username]);
    
    return row as IUser[];
  }
}
