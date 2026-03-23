"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Step1ClientInfo from "./Step1ClientInfo";
import Step2Produits from "./Step2Produits";
import Step3Preview from "./Step3Preview";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { FiArrowLeft } from "react-icons/fi";
import Stepper from "./Stepper";
import Button from "../ui/Button";
import ModalFermeture from "./ModalFermeture";
import Link from "next/link";

export default function NouveauQuoteContent() {
  const router = useRouter();
  const { state, dispatch } = useQuoteForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
      <Link href="/">
        <button className="flex items-center gap-2 text-base mb-5 transition-colors">
          <FiArrowLeft size={16} />
          Retour au dashboard
        </button>
      </Link>
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
        <h1 className="font-serif text-2xl font-bold mb-4">Nouveau devis</h1>
        <Stepper currentStep={state.step} />
      </div>
      <div>
        {state.step === 1 && <Step1ClientInfo />}
        {state.step === 2 && <Step2Produits />}
        {state.step === 3 && <Step3Preview />}
      </div>

      <div className="flex justify-between mt-4">
        {state.step > 1 && (
          <Button
            onClick={() => dispatch({ type: "SET_STEP", payload: 1 })}
            variant="secondary"
          >
            Précédent
          </Button>
        )}

        {state.step > 1 && state.step < 3 && (
          <Button
            onClick={() =>
              dispatch({ type: "SET_STEP", payload: state.step + 1 })
            }
            disabled={state.products.length === 0}
            className={
              state.products.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
          >
            Suivant
          </Button>
        )}
      </div>
      <ModalFermeture
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
