export interface StockData {
  product_id: number;
  status: string;
  purchase_price: number;
  expiry_date?: Date;
  updated_at: Date;
  quantity: number;
}
