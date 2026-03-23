import { StrapiEntity } from "./strapi";

export interface Product extends Partial<Omit<StrapiEntity, "documentId">> {
  documentId: string;
  name: string;
  unitPrice: number;
  vat: number;
  category?: string;
  quantity?: number;
}