import { useRef, useState } from "react";
import { FiPlus, FiSearch, FiChevronUp, FiChevronDown, FiTrash2 } from "react-icons/fi";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { Product } from "@/src/types/product";
import { QuoteItem } from "@/src/types/product";
import { categoriesMock } from "@/src/mocks";
import Input from "@/src/components/ui/Input";
import ModalNouveauProduit from "./ModalNouveauProduit";


export default function Step2products() {
  const { state, dispatch } = useQuoteForm();
  const { products } = state;

  const produitIdSeq = useRef(0);

  const [search, setSearch] = useState("");
  const [openCategories, setOpenCategories] = useState<string[]>(["champagnes"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleCategorie = (id: string) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddProduit = (produit: Product) => {
    const newProduit: QuoteItem = {
      id: `${produit.id}-${produitIdSeq.current++}`,
      name: produit.name,
      quantity: 1,
      unitPrice: produit.price,
      vat: 20,
    };

    dispatch({ type: "ADD_PRODUIT", payload: newProduit });
  };

  const categoriesFiltrees = categoriesMock
    .map((cat) => ({
      ...cat,
      products: cat.products.filter((p: Product) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((cat) => cat.products.length > 0);

  const total = products.reduce(
    (acc: number, p: QuoteItem) => acc + p.unitPrice * p.quantity * (1 + p.vat / 100), 0
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-black-500 mb-4">
            Sélection des products
          </h2>

          {/* Search */}
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

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-sm text-black-400 border border-gray-100 rounded-md px-3 py-2 mb-4 hover:bg-gray-50 transition-colors"
          >
            <FiPlus size={14} />
            Ajouter un produit
          </button>

          <div className="flex flex-col gap-2">
            {categoriesFiltrees.map((cat) => {
              const isOpen = openCategories.includes(cat.id);
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => toggleCategorie(cat.id)}
                    className="w-full flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="bg-primary-500 text-white text-xs font-semibold px-3 py-[2px] rounded-full">
                        {cat.name}
                      </span>
                      <span className="text-xs text-black-200">
                        ({String(cat.products.length).padStart(2, "0")})
                      </span>
                    </div>
                    {isOpen
                      ? <FiChevronUp size={14} className="text-black-300" />
                      : <FiChevronDown size={14} className="text-black-300" />
                    }
                  </button>

                  {isOpen && (
                    <div className="flex flex-col gap-2 mt-1">
                      {cat.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between bg-gray-50 rounded-md px-3 py-3"
                        >
                          <div>
                            <p className="text-sm text-black-400">{product.name}</p>
                            <p className="text-sm font-bold text-black-500">
                              {product.price} €
                            </p>
                          </div>
                          <button
                            onClick={() => handleAddProduit(product)}
                            className="w-6 h-6 rounded-md border border-gray-100 flex items-center justify-center hover:bg-gray-100 transition-colors"
                          >
                            <FiPlus size={14} className="text-black-300" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>


        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h2 className="text-sm font-bold text-black-500 mb-4">
            products sélectionnés
          </h2>

          {products.length === 0 ? (
            <p className="text-sm text-black-200">Aucun produit sélectionné</p>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map((p: QuoteItem) => {
                const totalLigne = p.unitPrice * p.quantity * (1 + p.vat / 100);
                return (
                  <div key={p.id}>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-black-500">{p.name}</p>
                      <button
                        onClick={() => dispatch({ type: "REMOVE_PRODUIT", payload: p.id })}
                      >
                        <FiTrash2 size={15} className="text-red-500" />
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-1">
                      {["Quantité", "Prix unit (€)", "VAT (%)"].map((l) => (
                        <p key={l} className="text-xs text-black-200">{l}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <Input placeholder="" type="number" value={p.quantity}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.id, changes: { quantity: Number(e.target.value) } } })} />
                      <Input placeholder="" type="number" value={p.unitPrice}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.id, changes: { unitPrice: Number(e.target.value) } } })} />
                      <Input placeholder="" type="number" value={p.vat}
                        onChange={(e) => dispatch({ type: "UPDATE_PRODUIT", payload: { id: p.id, changes: { vat: Number(e.target.value) } } })} />
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

              <div className="flex justify-between items-center pt-2">
                <p className="text-sm font-semibold text-black-400">Total (VAT inclu)</p>
                <p className="text-sm font-bold text-black-500">{total.toFixed(0)} €</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <ModalNouveauProduit isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}