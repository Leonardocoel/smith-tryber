import { ILogin } from '../interfaces/login.interface';
import { IUserLogged } from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import loginSchema from '../schemas/login.schema';
import { createToken, validateToken } from './jwt.service';
import { passwordChecker } from './password.service';

export default class LoginService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }
  
  public validateBody = (body: ILogin): ILogin => {
    const { error, value } = loginSchema.validate(body);

    if (error) throw error;

    return value as ILogin;
  };

  public async validateUser({ username, password }: ILogin): Promise<string> {
    const [user] = await this.model.getByUsername(username);
    
    if (!user) {
      const error = new Error('Username or password invalid');
      error.name = 'UnauthorizedError';
      throw error;
    }

    await passwordChecker(password, user.password);

    const { password: pass, ...userWithoutPassword } = user;
    const token = createToken(userWithoutPassword);

    return token;
  }

  public async validateToken(token: string): Promise<IUserLogged> {
    if (!token) {
      const e = new Error('Token not found');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const { username } = validateToken(token);
    const [{ id }] = await this.model.getByUsername(username);

    return { id, username } as IUserLogged;
  }
}
