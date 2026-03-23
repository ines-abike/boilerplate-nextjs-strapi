"use client";
import { useRef, useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import { Quote } from "@/src/types/quote";
import ModalQuoteDetail from "./ModalQuoteDetail";
import QuoteTemplate from "./QuoteTemplate";
import { generatePdf } from "@/src/utils/generatePDF";

interface Props {
  quotes: Quote[];
}

export default function QuoteListClient({ quotes }: Props) {
  const [search, setSearch] = useState("");
  const [quoteSelectioned, setQuoteSelectioned] = useState<Quote | null>(null);
  const [devisATelechager, setDevisATelecharger] = useState<Quote | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const filtered = quotes.filter(
    (q) =>
      q.reference.toLowerCase().includes(search.toLowerCase()) ||
      q.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const formatMontant = (quote: Quote) => {
    const total = quote.items.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity * (1 + item.vat / 100),
      0
    );
    return `${total.toLocaleString("fr-FR")} €`;
  };

  const handleTelecharger = async (quote: Quote) => {
    setDevisATelecharger(quote);
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!templateRef.current) return;
    await generatePdf(templateRef.current, `${quote.reference}.pdf`);
    setDevisATelecharger(null);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-black-500">Récemment générés</h2>

      {/* Search */}
      <div className="relative py-2 px-4 rounded-lg bg-white">
        <input
          type="text"
          placeholder="Rechercher un devis"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none"
        />
      </div>

      {/* Template caché pour le PDF */}
      <div className="fixed -left-[9999px] -top-[9999px] w-[794px] pointer-events-none">
        {devisATelechager && (
          <QuoteTemplate ref={templateRef} quote={devisATelechager} />
        )}
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-6 text-center text-sm text-black-200">
            Aucun devis trouvé.
          </div>
        ) : (
          filtered.map((q: Quote) => (
            <div
              key={q.documentId}
              className="bg-white border-2 border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex flex-col gap-1.5">
                <p className="text-base font-bold text-black-500">{q.reference}</p>
                <p className="text-xs">{q.firstName} {q.lastName}</p>
                <p className="text-xs">{q.eventName}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-left">
                  <p className="text-xl font-bold">{formatMontant(q)}</p>
                  <p className="text-xs text-black-200">{formatDate(q.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FiEye
                    size={16}
                    className="text-primary-500 cursor-pointer hover:text-primary-600"
                    onClick={() => setQuoteSelectioned(q)}
                  />
                  <FiDownload
                    size={16}
                    className="text-primary-500 cursor-pointer hover:text-primary-600"
                    onClick={() => handleTelecharger(q)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal détail */}
      <ModalQuoteDetail
        quote={quoteSelectioned}
        onClose={() => setQuoteSelectioned(null)}
      />
    </div>
  );
}