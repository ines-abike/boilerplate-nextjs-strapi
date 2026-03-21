"use client";
import { useRef, useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import Link from "next/link";
import { quotesMock } from "../mocks";
import { Quote } from "../types/quote";
import Button from "../components/ui/Button";
import ModalQuoteDetail from "../components/quote/ModalQuoteDetail";
import { generatePdf } from "../utils/generatePDF";
import QuoteTemplate from "../components/quote/QuoteTemplate";


export default function HomePage() {
  const [search, setSearch] = useState("");
  const [quoteSelectioned, setQuoteSelectioned] = useState<Quote | null>(null);
  const [devisATelechager, setDevisATelecharger] = useState<Quote | null>(null);

  const templateRef = useRef<HTMLDivElement>(null);

  const filtered = quotesMock.filter(
    (d) =>
      d.reference.toLowerCase().includes(search.toLowerCase()) ||
      d.clientInfo.firstName.toLowerCase().includes(search.toLowerCase()),
  );

  const formatMontant = (montant: number) =>
    `${montant.toLocaleString("fr-FR")} €`;

  const handleTelecharger = async (devis: Quote) => {
    
    setDevisATelecharger(devis);
    await new Promise((resolve) => setTimeout(resolve, 100));
    if (!templateRef.current) return;
    await generatePdf(templateRef.current, `${devis.reference}.pdf`);
    setDevisATelecharger(null);

  };

  return (
    <div className="max-w-2xl mx-auto py-12">

      <div className="fixed -left-[9999px] -top-[9999px] w-[794px] pointer-events-none">
        {devisATelechager && (
          <QuoteTemplate
            ref={templateRef}
            id={devisATelechager.id}
            clientInfo={devisATelechager.clientInfo}
            products={devisATelechager.products}
            reference={devisATelechager.reference}
            createdAt={devisATelechager.createdAt}
          />
        )}
      </div>

      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-black-500 mb-2">
          Générez votre nouveau devis
        </h1>
        <p className="text-base mb-5">Générez votre nouveau devis</p>
        <Link href="/quote/create-quote">
          <Button>Créer un nouveau devis</Button>
        </Link>
      </div>

      {/* Compteur */}
      <p className="text-center text-xl font-bold mb-6">
        Vous avez généré{" "}
        <span className="text-secondary-500 font-bold">
          {quotesMock.length} devis
        </span>{" "}
        au total
      </p>

      {/* Liste */}
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

        {/* Items */}
        <div className="flex flex-col gap-2">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-6 text-center text-sm text-black-200">
              Aucun devis trouvé.
            </div>
          ) : (
            filtered.map((q: Quote) => (
              <div
                key={q.id}
                className="bg-white border-2 border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <p className="text-base font-bold text-black-500">
                    {q.reference}
                  </p>
                  <p className="text-xs">{q.clientInfo.firstName} {q.clientInfo.lastName}</p>
                  <p className="text-xs">{q.clientInfo.eventName}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-xl font-bold">
                      {formatMontant(q.products.reduce((acc, product) => acc + product.unitPrice * product.quantity, 0))}
                    </p>
                    <p className="text-xs text-black-200">{q.createdAt}</p>
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
      </div>

      {/* Modal détail */}
      <ModalQuoteDetail
        quote={quoteSelectioned}
        onClose={() => setQuoteSelectioned(null)}
      />
    </div>
  );
}