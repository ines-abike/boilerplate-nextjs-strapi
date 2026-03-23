import { forwardRef } from "react";
import Image from "next/image";
import { Quote, QuoteFormState } from "@/src/types/quote";


type Props =
  | { quote: Quote; formState?: never }
  | { formState: QuoteFormState; quote?: never };

const QuoteTemplate = forwardRef<HTMLDivElement, Props>(({ quote, formState }, ref) => {
  // Normalise les données selon la source
  const reference = quote?.reference ?? formState?.reference ?? "";
  const createdAt = quote?.createdAt ?? formState?.createdAt ?? "";
  const eventName = quote?.eventName ?? formState?.eventName ?? "";
  const firstName = quote?.firstName ?? formState?.firstName ?? "";
  const lastName = quote?.lastName ?? formState?.lastName ?? "";
  const phone = quote?.phone ?? formState?.phone ?? "";
  const email = quote?.email ?? formState?.email ?? "";
  const address = quote?.adress ?? formState?.address ?? "";
  const clientType = quote?.clientType ?? formState?.clientType;
  const companyName = quote?.companyName ?? formState?.companyName ?? "";
  const vatNumber = quote?.vatNumber ?? formState?.vatNumber ?? "";
  const siretNumber = quote?.siretNumber ?? formState?.siretNumber ?? "";

  const items = quote
    ? quote.items.map((item) => ({
        id: undefined,
        name: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        vat: item.vat,
      }))
    : (formState?.products ?? []).map((p) => ({
        id: p.id,
        name: p.name,
        quantity: p.quantity ?? 1,
        unitPrice: p.unitPrice,
        vat: p.vat,
      }));

  const sousTotal = items.reduce((acc, p) => acc + p.unitPrice * p.quantity, 0);
  const totalVat = items.reduce((acc, p) => acc + p.unitPrice * p.quantity * (p.vat / 100), 0);
  const totalTTC = sousTotal + totalVat;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.includes(" ")) return dateStr;
    return new Date(dateStr).toLocaleDateString("fr-FR");
  };

  return (
    <div ref={ref} className="bg-white p-10 font-body text-xs text-black-500 min-h-[297mm] w-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        <div className="text-right">
          <p className="font-serif text-sm font-bold text-black-500">
            Devis {eventName}
          </p>
          <p className="text-xs text-black-200 mt-1">{reference}</p>
          <p className="text-xs text-black-200">{formatDate(createdAt)}</p>
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
          <p className="text-black-300">{lastName} {firstName}</p>
          <p className="text-black-300">{phone}</p>
          <p className="text-black-300">{email}</p>
          <p className="text-black-300">{address}</p>
          {clientType === "entreprise" && (
            <div className="mt-2">
              <p className="text-black-300">{companyName}</p>
              <p className="text-black-300">N° TVA : {vatNumber}</p>
              <p className="text-black-300">N° SIRET : {siretNumber}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tableau produits */}
      <div className="mb-6">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-black-100 pb-2 mb-2">
          {["Produit", "Qté", "Prix unit", "VAT", "Total"].map((h) => (
            <p key={h} className="font-bold text-xs text-black-400">{h}</p>
          ))}
        </div>

        {items.map((p, index) => {
          const totalLigne = p.unitPrice * p.quantity * (1 + p.vat / 100);
          return (
            <div
              key={index}
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
});

QuoteTemplate.displayName = "QuoteTemplate";
export default QuoteTemplate;