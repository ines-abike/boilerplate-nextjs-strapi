import { useRef } from "react";
import Button from "../ui/Button";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { generatePdf } from "@/src/utils/generatePDF";
import QuoteTemplate from "./QuoteTemplate";

export default function Step3Preview() {
  const { state } = useQuoteForm();
  const { clientInfo } = state;
  const templateRef = useRef<HTMLDivElement>(null);
  const handleTelecharger = async () => {
    if (!templateRef.current) return;
    await generatePdf(
      templateRef.current,
      `${clientInfo.eventName || "devis"}.pdf`,
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold text-black-500">
            Prévisualisation du devis
          </h2>
          <Button onClick={handleTelecharger}>Télécharger le devis</Button>
        </div>

        <div className="border border-gray-100 rounded-md max-w-xl mx-auto overflow-hidden">
          <QuoteTemplate
            ref={templateRef}
            id={state.step.toString()}
            clientInfo={state.clientInfo}
            products={state.products}
            reference={state.reference}
            createdAt={state.createdAt}
          />
        </div>
      </div>
    </>
  );
}
