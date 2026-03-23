import { strapi } from "@/src/api/api-config";
import { StrapiResponse } from "@/src/types/strapi";
import { Category } from "@/src/types/category";

export async function getCategories() {
  const res = await strapi<StrapiResponse<Category[]>>(
    "/categories?populate[products][fields][0]=name&populate[products][fields][1]=unitPrice&populate[products][fields][2]=vat"
  );
  return res.data;
}