import { useRef } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { FiX, FiDownload } from "react-icons/fi";
import { generatePdf } from "@/src/utils/generatePDF";
import { Quote } from "@/src/types/quote";
import Button from "../ui/Button";
import QuoteTemplate from "./QuoteTemplate";


interface Props {
  quote: Quote | null;
  onClose: () => void;
}

export default function ModalQuoteDetail({ quote, onClose }: Props) {
  const templateRef = useRef<HTMLDivElement>(null);

 const handleTelecharger = async () => {
  if (!templateRef.current || !quote) return;
  await generatePdf(templateRef.current, `${quote.reference}.pdf`);
};
  return (
    <Dialog open={!!quote} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black-500/40" aria-hidden="true" />

      {/* Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-6 overflow-y-auto">
        <DialogPanel className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl">

          {/* Header modal */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <p className="text-sm font-bold text-black-500">
              {quote?.reference} — {quote?.clientInfo.eventName}
            </p>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleTelecharger}
              >
                <FiDownload size={14} />
                Télécharger le quote
              </Button>
              <button
                onClick={onClose}
                className="text-black-200 hover:text-black-400 transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Template */}
          <div className="overflow-y-auto max-h-[80vh]">
            {quote && (
              <QuoteTemplate
                ref={templateRef}
                id={quote.id}
                clientInfo={quote.clientInfo}
                products={quote.products}
                reference={quote.reference}
                createdAt={quote.createdAt}
              />
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}