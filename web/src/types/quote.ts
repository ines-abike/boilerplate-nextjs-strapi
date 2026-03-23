import { Product } from "./product";
import { StrapiEntity } from "./strapi";

export type ClientType = "particulier" | "entreprise";

export interface QuoteItem {
  productName: string;
  unitPrice: number;
  vat: number;
  quantity: number;
}

export interface Quote extends StrapiEntity {
  reference: string;
  clientType: ClientType;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  adress: string; // orthographe Strapi
  eventName: string;
  companyName: string | null;
  vatNumber: string | null;
  siretNumber: string | null;
  items: QuoteItem[];
}

export interface QuoteFormState {
  step: number;
  id: string;
  clientType: ClientType;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  vatNumber: string;
  siretNumber: string;
  address: string;
  eventName: string;
  products: Product[];
  reference: string;
  createdAt: string;
}