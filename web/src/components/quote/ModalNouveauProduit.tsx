'use client'
import { useRef, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { Product } from "@/src/types/product";
import Input from "@/src/components/ui/Input";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNouveauProduit({ isOpen, onClose }: Props) {
  const { dispatch } = useQuoteForm();
  const [nomProduit, setNomProduit] = useState("");
  const customProduitIdSeq = useRef(0);

  const handleCreer = () => {
    if (!nomProduit.trim()) return;
    const newProduit: Product = {
      documentId: `custom-${customProduitIdSeq.current++}`,
      name: nomProduit,
      quantity: 1,
      unitPrice: 0,
      vat: 20,
    };

    dispatch({ type: "ADD_PRODUIT", payload: newProduit });
    setNomProduit("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black-500/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

          <div className="flex justify-between items-start mb-1">
            <DialogTitle className="text-sm font-bold text-black-500">
              Ajouter un nouveau produit
            </DialogTitle>
            <button onClick={onClose} className="text-black-200 hover:text-black-400 transition-colors">
              <FiX size={18} />
            </button>
          </div>

          <p className="text-sm text-black-200 mb-5">
            Ajouter un produit n&apos;existant pas dans le menu
          </p>

          <label className="text-sm text-black-400 mb-2 block">
            Nom du produit
          </label>
          <Input
            placeholder="Ajoutez le nom du produit"
            value={nomProduit}
            className="mb-4"
            onChange={(e) => setNomProduit(e.target.value)}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border border-gray-100 text-black-400 text-sm px-5 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleCreer}
              className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-5 py-2 rounded-md transition-colors"
            >
              Créer le produit
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}