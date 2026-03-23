"use client";
import { useEffect, useState } from "react";
import { FiPlus, FiSearch, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { Product } from "@/src/types/product";
import { Category } from "@/src/types/category";
import Input from "@/src/components/ui/Input";
import ModalNouveauProduit from "./ModalNouveauProduit";
import { getCategories } from "@/src/services/categories";

export default function Step2Produits() {
  const { state, dispatch } = useQuoteForm();
  const { products } = state;

  // --- State local ---
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Chargement des catégories depuis Strapi ---
  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
        // Ouvre la première catégorie par défaut
        if (data.length > 0) setOpenCategories([data[0].documentId]);
      })
      .finally(() => setLoading(false));
  }, []);

  // --- Toggle ouverture/fermeture d'une catégorie ---
  const toggleCategorie = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // --- Ajout d'un produit du menu au panier ---
  // documentId Strapi = identifiant unique, pas besoin d'en générer un
  // On snapshot les données (prix, vat) au moment de l'ajout
  const handleAddProduit = (produit: Product) => {
    dispatch({
      type: "ADD_PRODUIT",
      payload: {
        ...produit,  // snapshot : prix et vat figés à cet instant
        quantity: 1, // quantité par défaut
      },
    });
  };

  // --- Filtrage des catégories selon la recherche ---
  const categoriesFiltrees = categories
    .map((cat) => ({
      ...cat,
      products: cat.products?.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    // N'affiche que les catégories ayant des résultats
    .filter((cat) => cat.products && cat.products.length > 0);

  // --- Total du panier TTC ---
  const total = products.reduce(
    (acc, p) => acc + p.unitPrice * (p.quantity || 1) * (1 + p.vat / 100),
    0
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
      <div className="grid grid-cols-2 gap-4">

        {/* ---- Colonne gauche : menu ---- */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-black-500 mb-4">
            Sélection des produits
          </h2>

          {/* Barre de recherche */}
          <div className="relative mb-3">
            <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black-200" />
            <Input
              type="text"
              placeholder="Rechercher un élément du menu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Bouton ajout produit custom (hors menu Strapi) */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm text-black-400 border border-gray-100 rounded-md px-3 py-2 mb-4 hover:bg-gray-50 transition-colors"
          >
            <FiPlus size={14} />
            Ajouter un produit
          </button>

          {/* Liste des catégories avec accordion */}
          <div className="flex flex-col gap-2">
            {categoriesFiltrees.map((cat) => {
              const isOpen = openCategories.includes(cat.documentId);

              return (
                <div key={cat.documentId}>

                  {/* Header catégorie — cliquable pour ouvrir/fermer */}
                  <button
                    onClick={() => toggleCategorie(cat.documentId)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-[2px] rounded-full">
                        {cat.name}
                      </span>
                      <span className="text-xs text-black-200">
                        ({String(cat.products?.length || 0).padStart(2, "0")})
                      </span>
                    </div>
                    {isOpen
                      ? <FiChevronUp size={14} className="text-black-300" />
                      : <FiChevronDown size={14} className="text-black-300" />
                    }
                  </button>

                  {/* Produits de la catégorie */}
                  {isOpen && (
                    <div className="flex flex-col gap-2 mt-1">
                      {cat.products?.map((product: Product) => {
                        // Vérifie si ce produit est déjà dans le panier
                        const isAlreadyAdded = products.some(
                          (p) => p.documentId === product.documentId
                        );

                        return (
                          <div
                            key={product.documentId}
                            className="flex items-center justify-between rounded-md px-3 py-3 bg-gray-50"
                          >
                            <div>
                              <p className="text-sm text-black-400">{product.name}</p>
                              <p className="text-sm font-bold text-black-500">
                                {product.unitPrice} €
                              </p>
                            </div>

                            {/* Bouton désactivé si produit déjà dans le panier */}
                            <button
                              onClick={() => !isAlreadyAdded && handleAddProduit(product)}
                              disabled={isAlreadyAdded}
                              className={`w-6 h-6 rounded-md border border-gray-100 flex items-center justify-center transition-colors ${
                                isAlreadyAdded
                                  ? "cursor-not-allowed opacity-40"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              <FiPlus size={14} className="text-black-300" />
                            </button>
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

        {/* ---- Colonne droite : panier ---- */}
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-black-500 mb-4">
            Produits sélectionnés
          </h2>

          {products.length === 0 ? (
            <p className="text-sm text-black-200">Aucun produit sélectionné</p>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((p) => {
                // Total TTC de la ligne
                const totalLigne = p.unitPrice * (p.quantity || 1) * (1 + p.vat / 100);

                return (
                  <div key={p.documentId}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-black-500">{p.name}</p>
                      {/* Suppression via documentId */}
                      <button
                        onClick={() => dispatch({ type: "REMOVE_PRODUIT", payload: p.documentId })}
                      >
                        <FiTrash2 size={15} className="text-red-500" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-1">
                      {["Quantité", "Prix unit (€)", "VAT (%)"].map((l) => (
                        <p key={l} className="text-xs text-black-200">{l}</p>
                      ))}
                    </div>

                    {/* Inputs de modification — identifiés par documentId */}
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <Input placeholder="" type="number" value={p.quantity || 1}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.documentId, changes: { quantity: Number(e.target.value) } } })} />
                      <Input placeholder="" type="number" value={p.unitPrice}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.documentId, changes: { unitPrice: Number(e.target.value) } } })} />
                      <Input placeholder="" type="number" value={p.vat}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.documentId, changes: { vat: Number(e.target.value) } } })} />
                    </div>

                    <div className="flex justify-end">
                      <p className="text-sm font-bold text-black-500">
                        {totalLigne.toFixed(0)} €
                      </p>
                    </div>
                    <div className="border-b border-gray-100 mt-2" />
                  </div>
                );
              })}

              {/* Total général TTC */}
              <div className="flex justify-between items-center pt-2">
                <p className="text-sm font-semibold text-black-400">Total (VAT inclu)</p>
                <p className="text-sm font-bold text-black-500">{total.toFixed(0)} €</p>
              </div>
            </div>
          )}
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