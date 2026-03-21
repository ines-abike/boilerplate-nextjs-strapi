import { QuoteItem } from "./product";

export interface Quote {
  id: string;
  reference: string;
  createdAt: string;
  clientInfo: ClientInfo;
  products: QuoteItem[];
}

export interface QuoteFormState {
  step: number;
  clientInfo: ClientInfo;
  products: QuoteItem[];
  reference: string;
  date: string;
}

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