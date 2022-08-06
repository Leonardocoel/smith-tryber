export interface IUserWithoutPassword {
  username: string;
  classe: string;
  level: number;
}

export interface IUser extends IUserWithoutPassword{
  id?: number
  password: string;
}

export interface IUserE extends IUserWithoutPassword{
  passwordEncrypted: string;
}

export interface IUserLogged {
  id: number
  username: string
}

export interface IToken{
  code: number;
  token: string;
}
