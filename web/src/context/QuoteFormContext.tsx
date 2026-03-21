'use client'
import { createContext, useContext, useReducer } from "react"
import { initialState, devisFormReducer, type Action } from "../reducers/DevisFormReducer"
import { QuoteFormState } from "../types/quote"

interface QuoteFormContextType {
  state: QuoteFormState
  dispatch: React.Dispatch<Action>
}

export const QuoteFormContext = createContext<QuoteFormContextType | null>(null)

export function QuoteFormProvider({ children }: { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(devisFormReducer, initialState)

  return (
    <QuoteFormContext.Provider value={{ state, dispatch }}>
      {children}
    </QuoteFormContext.Provider>
  )
}

export function useQuoteForm() {
  const context = useContext(QuoteFormContext)
  if (!context) {
    throw new Error("useQuoteForm doit être utilisé dans QuoteFormProvider")
  }
  return context
}