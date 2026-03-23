import { Product } from "./product";

export interface Category {
  documentId: string;
  slug: string; 
  name: string;
  products?: Product[];
}