"use client";
import { useEffect, useState } from "react";
import { FiPlus, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";
import Input from "@/src/components/ui/Input";
import ModalNouveauProduit from "./ModalNouveauProduit";
import { getCategories } from "@/src/services/categories";

export default function Step2Produits() {
  const { state, dispatch } = useQuoteForm();
  const { products } = state;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setOpenCategories([data[0].documentId]);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCategorie = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  const handleAddProduit = (produit: Product) => {
    dispatch({
      type: "ADD_PRODUIT",
      payload: {
        ...produit,
        quantity: 1,
      },
    });
  };

  // --- Filtrage des catégories selon la recherche ---
  const categoriesFiltrees = categories
    .map((cat) => ({
      ...cat,
      products: cat.products?.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.products && cat.products.length > 0);

  // --- Total du panier TTC ---
  const total = products.reduce(
    (acc, p) => acc + p.unitPrice * (p.quantity || 1) * (1 + p.vat / 100),
    0,
  );

  // --- État de chargement ---
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <p className="text-sm text-black-200">Chargement du menu...</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:gap-0 gap-5 bg-white rounded-xl border border-gray-100 py-5">
        {/* ---- Colonne gauche : menu ---- */}
        <div className="px-5">
          <h2 className="text-xl font-semibold font-playfair mb-4">
            Sélection des produits
          </h2>

          {/* Barre de recherche */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Rechercher un élément du menu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#E6E6E6] w-full px-4 py-3 rounded-xl outline-none"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-base border-2 border-[#E6E6E6] rounded-xl px-3 py-2 mb-4 hover:bg-gray-50 transition-colors"
          >
            <FiPlus size={14} />
            Ajouter un produit
          </button>

          {/* Liste des catégories avec accordion */}
          <div className="flex flex-col gap-2 ">
            {categoriesFiltrees.map((cat) => {
              const isOpen = openCategories.includes(cat.documentId);

              return (
                <div key={cat.documentId}>
                  <button
                    onClick={() => toggleCategorie(cat.documentId)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-primary-400 text-white text-xs px-3 py-[2px] rounded-full">
                        {cat.name}
                      </span>
                      <span className="text-xs text-black-200">
                        ({String(cat.products?.length || 0).padStart(2, "0")})
                      </span>
                    </div>
                    {isOpen ? (
                      <FiChevronUp size={14} className="text-black-300" />
                    ) : (
                      <FiChevronDown size={14} className="text-black-300" />
                    )}
                  </button>

                  {/* Produits de la catégorie */}
                  {isOpen && (
                    <div className="flex flex-col gap-2 mt-1">
                      {cat.products?.map((product: Product) => {
                        const isAlreadyAdded = products.some(
                          (p) => p.documentId === product.documentId,
                        );

                        return (
                          <div
                            key={product.documentId}
                            className="rounded-xl p-3 border border-[#E6E6E6]"
                          >
                            <p className="text-base text-black-400">
                              {product.name}
                            </p>

                            <div className="flex items-center justify-between">
                              <p className="text-xl font-bold font-playfair">
                                {product.unitPrice} €
                              </p>

                              <button
                                onClick={() =>
                                  !isAlreadyAdded && handleAddProduit(product)
                                }
                                disabled={isAlreadyAdded}
                                className={`w-6 h-6 text-[#1C1B1F] bg-primary-50 cursor-pointer rounded-lg flex items-center justify-center transition-colors ${
                                  isAlreadyAdded
                                    ? "cursor-not-allowed opacity-40"
                                    : ""
                                }`}
                              >
                                <FiPlus size={14} className="text-black-300" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-px h-full bg-gray-200"></div>

        {/* ---- Colonne droite : panier ---- */}
        <div className="px-5">
          <h2 className="text-xl font-playfair font-semibold mb-4">
            Produits sélectionnés
          </h2>

          <div className="p-4">
            {products.length === 0 ? (
              <p className="text-base">Aucun produit sélectionné</p>
            ) : (
              <div className="flex flex-col gap-4">
                {products.map((p) => {
                  const totalLigne =
                    p.unitPrice * (p.quantity || 1) * (1 + p.vat / 100);

                  return (
                    <div key={p.documentId} className="">
                      <div className="flex justify-between items-center mb-4">
                        <p className="text-base">{p.name}</p>
                        <button
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_PRODUIT",
                              payload: p.documentId,
                            })
                          }
                        >
                          <FiTrash2
                            size={15}
                            className="cursor-pointer text-red-500"
                          />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-1">
                        {["Quantité", "Prix unit (€)", "VAT (%)"].map((l) => (
                          <p key={l} className="text-base">
                            {l}
                          </p>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <Input
                          placeholder=""
                          type="number"
                          value={p.quantity || 1}
                          onChange={(e) =>
                            dispatch({
                              type: "UPDATE_PRODUIT",
                              payload: {
                                id: p.documentId,
                                changes: { quantity: Number(e.target.value) },
                              },
                            })
                          }
                        />
                        <Input
                          placeholder=""
                          type="number"
                          value={p.unitPrice}
                          onChange={(e) =>
                            dispatch({
                              type: "UPDATE_PRODUIT",
                              payload: {
                                id: p.documentId,
                                changes: { unitPrice: Number(e.target.value) },
                              },
                            })
                          }
                        />
                        <Input
                          placeholder=""
                          type="number"
                          value={p.vat}
                          onChange={(e) =>
                            dispatch({
                              type: "UPDATE_PRODUIT",
                              payload: {
                                id: p.documentId,
                                changes: { vat: Number(e.target.value) },
                              },
                            })
                          }
                        />
                      </div>

                      <div className="flex justify-end">
                        <p className="text-2xl font-bold font-playfair">
                          {totalLigne.toFixed(0)} €
                        </p>
                      </div>
                      <div className="border-b border-gray-100 mt-2" />
                    </div>
                  );
                })}

                {/* Total général TTC */}
                <div className="flex justify-between items-center pt-2 font-playfair">
                  <p className="text-xl font-semibold text-black-400">
                    Total (VAT inclu)
                  </p>
                  <p className="text-2xl font-bold">{total.toFixed(0)} €</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal pour ajouter un produit hors menu Strapi */}
      <ModalNouveauProduit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
