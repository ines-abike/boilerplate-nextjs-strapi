import { strapi } from "@/src/api/api-config";
import { StrapiResponse } from "@/src/types/strapi";
import { Quote } from "@/src/types/quote";

export async function getQuotes() {
  const res = await strapi<StrapiResponse<Quote[]>>(
    "/quotes?populate=items"
  );
  return res.data;
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