import connection from '../models/connection';
import UserModel from '../models/user.model';
import { IToken, IUser } from '../interfaces/user.interface';
import { SUCESS } from '../httpStatusCodes';
import createToken from './jwt.service';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }
  
  public async create(user: IUser): Promise<IToken> {
    await this.model.create(user);

    const token = createToken(user);

    return { code: SUCESS.CREATED, token };
  }
}