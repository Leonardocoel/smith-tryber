import connection from '../models/connection';
import UserModel from '../models/user.model';
import { IToken, IUser } from '../interfaces/user.interface';
import { SUCESS } from '../httpStatusCodes';
import { createToken } from './jwt.service';
import { UserSchema, RequiredSchema } from '../schemas/user.schema';
// import { passwordEncrypter } from './password.service';

const validateUser = (user: IUser): IUser => {
  const validation = RequiredSchema.validate(user);
  
  if (validation.error) throw validation.error;
  
  const { error, value } = UserSchema.validate(validation.value);
  if (error) {
    const e = new Error(error.message);
    e.name = 'UnprocessableEntityError';
    throw e;
  }

  return value;
};

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }
  
  public async create(user: IUser): Promise<IToken> {
    const validUser = validateUser(user);
    // const passwordEncrypted = await passwordEncrypter(user.password);
    const { password, ...userWithoutPassword } = validUser;

    await this.model.create({ ...userWithoutPassword, password });

    const token = createToken(user);

    return { code: SUCESS.CREATED, token };
  }
}