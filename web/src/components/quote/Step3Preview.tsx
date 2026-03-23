"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { generatePdf } from "@/src/utils/generatePDF";
import QuoteTemplate from "./QuoteTemplate";
import { createQuote } from "@/src/services/quote";

export default function Step3Preview() {
  const router = useRouter();
  const { state, dispatch } = useQuoteForm();
  const templateRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveAndDownload = async () => {
    if (!templateRef.current) return;
    setLoading(true);
    setError(null);

    try {
      await createQuote({
        reference: state.reference,
        clientType: state.clientType,
        firstName: state.firstName,
        lastName: state.lastName,
        phone: state.phone,
        email: state.email,
        adress: state.address,
        eventName: state.eventName,
        companyName: state.companyName || null,
        vatNumber: state.vatNumber || null,
        siretNumber: state.siretNumber || null,
        items: state.products.map((p) => ({
          productName: p.name,
          unitPrice: p.unitPrice,
          vat: p.vat,
          quantity: p.quantity ?? 1,
        })),
      });

      await generatePdf(templateRef.current, `${state.reference}.pdf`);
      dispatch({ type: "RESET" });
      router.push("/");

    } catch {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6 gap-4">
        <h2 className="text-base font-playfair font-bold">
          Prévisualisation du devis
        </h2>
        <div className="flex flex-col items-end gap-2">
          <Button className="text-nowrap" onClick={handleSaveAndDownload} disabled={loading}>
            {loading ? "Téléchargement..." : "Télécharger le devis"}
          </Button>
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>

      <div className="border border-gray-100 rounded-md max-w-xl mx-auto overflow-hidden">
        <QuoteTemplate ref={templateRef} formState={state} />
      </div>
    </div>
  );
}