export interface StockData {
  product_id: number;
  status: string;
  purchase_price: number;
  expiry_date: Date | null;
  updated_at: Date;
  quantity: number;
}
