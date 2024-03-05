import { StockData } from "./StockData";

export interface ProductData extends StockData {
  name: string;
  price: number;
  image?: string | null;
  black_friday: boolean;
  discount: number;
  average_score?: number;
  description: string;
  color_id: number;
  storage_id: number;
  categorie_id: number;
  ean: string;
  highlight: boolean;
}
