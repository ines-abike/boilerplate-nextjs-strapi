import { Product } from "../types/product";
import {QuoteFormState } from "../types/quote";

function createReferenceAndDate() {
  const now = new Date();
  const createdAt = now.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const reference = `DEV-${now.getFullYear()}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;

  const id = reference;

  return { id, reference, createdAt };
}

const { id, reference, createdAt } = createReferenceAndDate();

export const initialState: QuoteFormState = {
  step: 1,
  id,
  clientType: "entreprise",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  companyName: "",
  vatNumber: "",
  siretNumber: "",
  address: "",
  eventName: "",
  products: [],
  reference,
  createdAt,
};

export type Action =
  | { type: "SET_STEP"; payload: number }
  | { type: "SET_CLIENT_INFO"; payload: Partial<QuoteFormState> }
  | { type: "ADD_PRODUIT"; payload: Product }
  | { type: "REMOVE_PRODUIT"; payload: string }
  | {
      type: "UPDATE_PRODUIT";
      payload: { id: string; changes: Partial<Product> };
    }
  | { type: "RESET" };

export function devisFormReducer(
  state: QuoteFormState,
  action: Action,
): QuoteFormState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, step: action.payload };

    case "SET_CLIENT_INFO":
      return {
        ...state,
        ...action.payload,
      };

    case "ADD_PRODUIT":
      return { ...state, products: [...state.products, action.payload] };

    case "REMOVE_PRODUIT":
      return {
        ...state,
        products: state.products.filter(
          (p: Product) => p.documentId !== action.payload,
        ),
      };

    case "UPDATE_PRODUIT":
      return {
        ...state,
        products: state.products.map((p: Product) =>
          p.documentId === action.payload.id
            ? { ...p, ...action.payload.changes }
            : p,
        ),
      };

    case "RESET":
      return { ...initialState, ...createReferenceAndDate() };

    default:
      return state;
  }
}
