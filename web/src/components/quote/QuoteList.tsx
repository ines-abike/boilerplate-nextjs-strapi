"use client";
import { useRef, useState, useTransition } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import { Quote } from "@/src/types/quote";
import ModalQuoteDetail from "./ModalQuoteDetail";
import QuoteTemplate from "./QuoteTemplate";
import { generatePdf } from "@/src/utils/generatePDF";
import { getQuotes } from "@/src/services/quote";

interface Props {
  initialQuotes: Quote[];
  totalQuotes: number;
}

const PAGE_SIZE = 5;

export default function QuoteListClient({ initialQuotes, totalQuotes }: Props) {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [total, setTotal] = useState(totalQuotes);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [quoteSelectioned, setQuoteSelectioned] = useState<Quote | null>(null);
  const [devisATelechager, setDevisATelecharger] = useState<Quote | null>(null);
  const templateRef = useRef<HTMLDivElement>(null);

  const hasMore = quotes.length < total;

  const handleSearch = (value: string) => {
    setSearch(value);
    startTransition(async () => {
      const { data, meta } = await getQuotes(1, PAGE_SIZE, value);
      setQuotes(data);
      setTotal(meta.pagination?.total ?? 0);
      setPage(1);
    });
  };

  const handleVoirPlus = async () => {
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { data } = await getQuotes(nextPage, PAGE_SIZE, search);
      setQuotes((prev) => [...prev, ...data]);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("fr-FR");

  return (
    <div className="flex flex-col gap-4 p-6">
      <h2 className="font-bold text-2xl font-playfair">Récemment générés</h2>
      <div className="relative text-black-500 py-2 px-4 rounded-lg bg-white">
        <input
          type="text"
          placeholder="Rechercher un devis"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className={`outline-none placeholder-black-400 ${isPending ? "opacity-50" : ""}`}
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
        {quotes.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white px-4 py-6 text-center text-sm text-black-200">
            Aucun devis trouvé.
          </div>
        ) : (
          quotes.map((q) => (
            <div
              key={q.documentId}
              className="bg-white border-2 border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
            >
              <div className="flex flex-col gap-1.5">
                <p className="text-base font-bold">{q.reference}</p>
                <p className="text-xs">{q.firstName} {q.lastName}</p>
                <p className="text-xs">{q.eventName}</p>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-left">
                  <p className="text-xl font-bold">{formatMontant(q)}</p>
                  <p className="text-xs text-black-200">{formatDate(q.createdAt)}</p>
                </div>
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
          ))
        )}
      </div>

      {/* Voir plus */}
      {hasMore && (
        <div className="flex justify-center mt-2 text-primary-500">
          <button onClick={handleVoirPlus} disabled={loadingMore} className="underline cursor-pointer">
            {loadingMore ? "Chargement..." : `Voir plus`}
          </button>
        </div>
      )}

      <ModalQuoteDetail
        quote={quoteSelectioned}
        onClose={() => setQuoteSelectioned(null)}
      />
    </div>
  );
}