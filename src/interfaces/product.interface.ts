export interface IProduct {
  id?: number;
  name: string;
  amount: string;
}

export interface IProductReturn {
  code: number;
  result: IProduct;
}
