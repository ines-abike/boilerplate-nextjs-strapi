import { strapi } from "@/src/api/api-config";
import { StrapiResponse } from "@/src/types/strapi";
import { Quote } from "@/src/types/quote";

export async function getQuotes(page = 1, pageSize = 5, search = "") {
  const searchQuery = search
    ? `&filters[$or][0][reference][$containsi]=${search}&filters[$or][1][firstName][$containsi]=${search}`
    : "";

  const res = await strapi<StrapiResponse<Quote[]>>(
    `/quotes?populate=items&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}${searchQuery}`
  );
  return res;
}

export async function getQuote(documentId: string) {
  const res = await strapi<StrapiResponse<Quote>>(
    `/quotes/${documentId}?populate=items`
  );
  return res.data;
}

export async function createQuote(
  data: Omit<
    Quote,
    "id" | "documentId" | "createdAt" | "updatedAt" | "publishedAt"
  >
) {
  return strapi<StrapiResponse<Quote>>("/quotes", {
    method: "POST",
    body: JSON.stringify({ data }),
  });
}

export async function deleteQuote(documentId: string) {
  return strapi(`/quotes/${documentId}`, { method: "DELETE" });
}