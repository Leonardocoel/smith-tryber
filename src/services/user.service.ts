import connection from '../models/connection';
import UserModel from '../models/user.model';
import { IToken, IUser } from '../interfaces/user.interface';
import { SUCESS } from '../httpStatusCodes';
import { createToken } from './jwt.service';
// import { passwordEncrypter } from './password.service';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }
  
  public async create(user: IUser): Promise<IToken> {
    // const passwordEncrypted = await passwordEncrypter(user.password);
    const { password, ...userWithoutPassword } = user;

    await this.model.create({ ...userWithoutPassword, password });

    const token = createToken(user);

    return { code: SUCESS.CREATED, token };
  }
}