export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface QuoteItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  vat: number;
}