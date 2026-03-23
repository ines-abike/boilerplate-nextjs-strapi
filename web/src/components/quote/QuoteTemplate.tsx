import { forwardRef } from "react";
import Image from "next/image";
import { Quote, QuoteFormState } from "@/src/types/quote";

type Props =
  | { quote: Quote; formState?: never }
  | { formState: QuoteFormState; quote?: never };

const QuoteTemplate = forwardRef<HTMLDivElement, Props>(
  ({ quote, formState }, ref) => {
    // Normalise les données selon la source
    const reference = quote?.reference ?? formState?.reference ?? "";
    const createdAt = quote?.createdAt ?? formState?.createdAt ?? "";
    const eventName = quote?.eventName ?? formState?.eventName ?? "";
    const firstName = quote?.firstName ?? formState?.firstName ?? "";
    const lastName = quote?.lastName ?? formState?.lastName ?? "";
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

    const sousTotal = items.reduce(
      (acc, p) => acc + p.unitPrice * p.quantity,
      0,
    );
    const totalVat = items.reduce(
      (acc, p) => acc + p.unitPrice * p.quantity * (p.vat / 100),
      0,
    );
    const totalTTC = sousTotal + totalVat;

    const formatDate = (dateStr: string) => {
      if (!dateStr) return "";
      if (dateStr.includes(" ")) return dateStr;
      return new Date(dateStr).toLocaleDateString("fr-FR");
    };

    return (
      <div
        ref={ref}
        className="bg-white pt-10 px-10 pb-20 font-body text-xs h-full w-full"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <Image src="/logo.svg" alt="Logo" width={150} height={150} />
          <div className="text-right">
            <p className="font-serif text-2xl font-bold">Devis {eventName}</p>
            <p className="text-xs text-black-200 mt-1">{reference}</p>
            <p className="text-xs text-black-200">{formatDate(createdAt)}</p>
          </div>
        </div>

        {/* Infos */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold mb-2 font-playfair">
              L&apos;Héritage 105
            </p>
            <p className="text-black-300">105 Rue du Faubourg Saint-Honoré</p>
            <p className="text-black-300">75008 Paris 08, France</p>
            <p className="text-black-300">Tel : +33 9 66 82 41 08</p>
            <p className="text-black-300">direction@lheritage105.com</p>
            <p className="text-black-300 mt-2">
              N° TVA Intracommunautaire : FR74984132274
            </p>
            <p className="text-black-300">N° SIRET : 98413227400023</p>
            <p className="text-black-300">Code NAF : 5610A</p>
            <p className="text-black-300">RCS : Paris</p>
            <p className="text-black-300">Capital : 1 000 €</p>
          </div>
          <div>
            <p className="text-xl font-bold mb-2 font-playfair">
              Nom du client
            </p>
            <p className="text-black-300">
              {lastName} {firstName}
            </p>
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
          <div className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-2 border-b-2 border-black-500 pb-2 mb-2">
            {["Produit", "Qté", "Prix unit", "VAT"].map((h) => (
              <p
                key={h}
                className="font-bold text-lg text-nowrap text-start font-playfair"
              >
                {h}
              </p>
            ))}
            <p className="font-bold text-xl font-playfair text-end">Total</p>
          </div>

          {items.map((p, index) => {
            const totalLigne = p.unitPrice * p.quantity * (1 + p.vat / 100);
            return (
              <div
                key={index}
                className="grid grid-cols-[2fr_2fr_1fr_1fr_2fr] gap-2 border-gray-50 py-2 text-base"
              >
                <p>{p.name}</p>
                <p>{p.quantity}</p>
                <p>{p.unitPrice}€</p>
                <p>{p.vat}%</p>
                <p className="text-end">{totalLigne.toFixed(2)}€</p>
              </div>
            );
          })}

          {/* Totaux */}
          <div className="flex flex-col items-end justify-between mt-4 gap-1">
            <div className="w-full max-w-64">
              <div className="flex gap-8 text-base justify-between">
                <p className="text-black-300">Sous-total</p>
                <p>{sousTotal.toFixed(2)}€</p>
              </div>
              <div className="flex gap-8 text-base justify-between">
                <p className="text-black-300">Total VAT</p>
                <p>{totalVat.toFixed(2)}€</p>
              </div>
            </div>
            <div className="flex w-full max-w-64 justify-between border-t text-xl font-playfair border-[#E6E6E6] pt-2 mt-1">
              <p className="font-bold">Total (VAT inclus)</p>
              <p className="font-bold">{totalTTC.toFixed(2)}€</p>
            </div>
          </div>
        </div>
        <hr className="text-gray-50" />
        {/* Footer */}
        <div className="flex justify-center mt-6">
          <p className="text-xs text-center text-primary-500">
            Merci de choisir L&apos;Heritage 105 pour votre événement
          </p>
        </div>
      </div>
    );
  },
);

QuoteTemplate.displayName = "QuoteTemplate";
export default QuoteTemplate;
