import NouveauQuoteContent from "@/src/components/quote/NouveauQuoteContent";
import { QuoteFormProvider } from "@/src/context/QuoteFormContext";


export default function NouveauDevis() {
  return (
    <QuoteFormProvider>
     <NouveauQuoteContent />
    </QuoteFormProvider>
  );
}