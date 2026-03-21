import categoriesData from "./categories.json";
import quotesData from "./quotes.json";
import { Quote } from "../types/quote";

export const quotesMock: Quote[] = quotesData as Quote[];
export const categoriesMock = categoriesData;