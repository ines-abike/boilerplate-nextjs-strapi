import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ModalFermeture({ isOpen, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={isOpen} onClose={onCancel} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black-500/30" aria-hidden="true" />

      {/* Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">

          <DialogTitle className="text-sm font-bold mb-2">
            Êtes-vous sûr de vouloir partir ?
          </DialogTitle>

          <p className="text-sm text-black-300 mb-6">
            Ce devis sera supprimé et cette action sera irréversible. 
            Toute votre progression sera perdue.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="border border-gray-100 text-black-400 text-sm px-5 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-md transition-colors"
            >
              Oui, supprimer le devis
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}