import { Product } from './product';

export interface Order {
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: {
    count: number;
    product: Product;
    price: number;
  }[];
  createdAt: string;
}
