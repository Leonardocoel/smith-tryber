export interface IOrder {
  id: number;
  userId:number;
  // productsIds:number;
}

export interface IOrderGrouped {
  id: number;
  userId:number;
  productsIds:number[];
}

export interface IProductsId {
  id: number
}

export interface IOrderReturn {
  code: number;
  result: IOrderGrouped[]
}
