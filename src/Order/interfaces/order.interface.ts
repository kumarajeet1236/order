export interface IAddress {
  address1?: string;
  address2?: string;
  pincde?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IOrder {
  productId: string;
  userId: string;
  address?: IAddress;
}
