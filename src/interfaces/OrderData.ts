import { UserOrderData } from "./UserOrderData";

export interface OrderData {
  user_id: number;
  order_date: Date;
  total_amount: number;
  user_order: UserOrderData[];
}
