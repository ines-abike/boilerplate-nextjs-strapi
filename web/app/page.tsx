'use client'
import { useState } from "react";
import { FiEye, FiDownload } from "react-icons/fi";
import Link from "next/link";
import { devisMock } from "@/mocks";
import Button from "./components/ui/Button";
import { Devis } from "@/types/devis";


export default function HomePage() {
  const [search, setSearch] = useState("");

  const filtered = devisMock.filter(
    (d) =>
      d.reference.toLowerCase().includes(search.toLowerCase()) ||
      d.client.toLowerCase().includes(search.toLowerCase())
  );

  const formatMontant = (montant: number) =>
    `${montant.toLocaleString("fr-FR")} €`;

  return (
    <div className="max-w-2xl mx-auto py-12">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-4xl font-bold text-black-500 mb-2">
          Générez votre nouveau devis
        </h1>
        <p className="text-base mb-5">
          Générez votre nouveau devis
        </p>
        <Link href="/devis/create-devis">
          <Button>
         Créer un nouveau devis
       </Button>
        </Link>
      </div>

      {/* Compteur */}
      <p className="text-center text-xl font-bold mb-6">
        Vous avez généré{" "}
        <span className="text-secondary-500 font-bold">
          {devisMock.length} devis
        </span>{" "}
        au total
      </p>

      {/* Liste */}
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl text-black-500">
          Récemment générés
        </h2>

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
            filtered.map((devis: Devis) => (
              <div
                key={devis.id}
                className="bg-white border-2 border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1.5">
                  <p className="text-base font-bold text-black-500">
                    {devis.reference}
                  </p>
                  <p className="text-xs">{devis.client}</p>
                  <p className="text-xs">{devis.evenement}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-xl font-bold">
                      {formatMontant(devis.montant)}
                    </p>
                    <p className="text-xs text-black-200">{devis.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiEye size={16} className="text-primary-500 cursor-pointer hover:text-primary-600" />
                    <FiDownload size={16} className="text-primary-500 cursor-pointer hover:text-primary-600" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}