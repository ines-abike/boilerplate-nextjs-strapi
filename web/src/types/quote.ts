import { Product } from "./product";


export type ClientType = "particulier" | "entreprise";

export interface ClientInfo {
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
}

export interface Quote {
  id: string;
  reference: string;
  createdAt: string;
  clientInfo: ClientInfo;
  products: Product[];
}

export interface QuoteFormState extends Quote {
  step: number;
}