import { forwardRef } from "react";
import Image from "next/image";
import { Quote } from "@/src/types/quote";


const QuoteTemplate = forwardRef<HTMLDivElement, Quote>(
  ({ clientInfo, products, reference, createdAt }, ref) => {

    const sousTotal = products.reduce(
      (acc, p) => acc + p.unitPrice *  (p.quantity || 1), 0
    );
    const totalVat = products.reduce(
      (acc, p) => acc + p.unitPrice * (p.quantity || 1) * (p.vat / 100), 0
    );
    const totalTTC = sousTotal + totalVat;

    return (
      <div ref={ref} className="bg-white p-10 font-body text-xs text-black-500 min-h-[297mm] w-full">
        <div className="flex justify-between items-start mb-8">
          <div>
            <Image src="/logo.svg" alt="Logo" width={100} height={100} />
          </div>
          <div className="text-right">
            <p className="font-serif text-sm font-bold text-black-500">
              Devis {clientInfo.eventName || "Nom de l'événement"}
            </p>
            <p className="text-xs text-black-200 mt-1">{reference}</p>
            <p className="text-xs text-black-200">{createdAt}</p>
          </div>
        </div>

        {/* Infos */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="font-bold mb-2">L&apos;Héritage 105</p>
            <p className="text-black-300">105 Rue du Faubourg Saint-Honoré</p>
            <p className="text-black-300">75008 Paris, France</p>
            <p className="text-black-300">Tél : +33 9 56 52 41 00</p>
            <p className="text-black-300">reservation@lheritage105.com</p>
            <p className="text-black-300 mt-2">N° TVA Intracommunautaire :</p>
            <p className="text-black-300">N°RNE : 94082030001</p>
            <p className="text-black-300">N°SIRET : 94082030002</p>
            <p className="text-black-300 mt-2">Code NAF : 5630A</p>
            <p className="text-black-300">RCS : Paris</p>
            <p className="text-black-300">Capital : 1 000 €</p>
          </div>
          <div>
            <p className="font-bold mb-2">Nom du client</p>
            <p className="text-black-300">
              {clientInfo.lastName} {clientInfo.firstName}
            </p>
            <p className="text-black-300">{clientInfo.phone}</p>
            <p className="text-black-300">{clientInfo.email}</p>
            <p className="text-black-300">{clientInfo.address}</p>
            {clientInfo.clientType === "entreprise" && (
              <div className="mt-2">
                <p className="text-black-300">{clientInfo.companyName}</p>
                <p className="text-black-300">
                  N° TVA : {clientInfo.vatNumber}
                </p>
                <p className="text-black-300">
                  N° SIRET : {clientInfo.siretNumber}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tableau */}
        <div className="mb-6">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-black-100 pb-2 mb-2">
            {["Produit", "Qté", "Prix unit", "VAT", "Total"].map((h) => (
              <p key={h} className="font-bold text-xs text-black-400">{h}</p>
            ))}
          </div>

          {products.map((p) => {
            const totalLigne = p.unitPrice * (p.quantity || 1) * (1 + p.vat / 100);
            return (
              <div
                key={p.id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-gray-50 py-2"
              >
                <p>{p.name}</p>
                <p>{p.quantity}</p>
                <p>{p.unitPrice}€</p>
                <p>{p.vat}%</p>
                <p>{totalLigne.toFixed(2)}€</p>
              </div>
            );
          })}

          {/* Totaux */}
          <div className="flex flex-col items-end mt-4 gap-1">
            <div className="flex gap-8">
              <p className="text-black-300">Sous-total</p>
              <p>{sousTotal.toFixed(2)}€</p>
            </div>
            <div className="flex gap-8">
              <p className="text-black-300">Total VAT</p>
              <p>{totalVat.toFixed(2)}€</p>
            </div>
            <div className="flex gap-8 border-t border-black-100 pt-2 mt-1">
              <p className="font-bold">Total (VAT inclus)</p>
              <p className="font-bold">{totalTTC.toFixed(2)}€</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-12">
          <p className="text-xs text-black-200 italic">
            Merci de choisir L&apos;Heritage 105 pour votre événement
          </p>
        </div>
      </div>
    );
  }
);

QuoteTemplate.displayName = "QuoteTemplate";
export default QuoteTemplate;