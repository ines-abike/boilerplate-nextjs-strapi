
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { ClientType } from "@/src/types/quote";
import Input from "@/src/components/ui/Input";

export default function Step1ClientInfo() {
  const { state, dispatch } = useQuoteForm();
  const { clientInfo } = state;
  const isEntreprise = clientInfo.clientType === "entreprise";

  const setField = (payload: Partial<typeof clientInfo>) => {
    dispatch({ type: "SET_CLIENT_INFO", payload });
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-bold text-black-500 mb-4">
          Informations du client
        </h2>

        {/* Type client */}
        <p className="text-sm text-black-300 mb-2">Type de client</p>
        <div className="flex gap-6 mb-5">
          {(["particulier", "entreprise"] as ClientType[]).map((type) => (
            <button
              key={type}
              onClick={() => setField({ clientType: type })}
              className="flex items-center gap-2"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${clientInfo.clientType === type ? "border-primary-500" : "border-black-100"}`}
              >
                {clientInfo.clientType === type && (
                  <div className="w-2 h-2 rounded-full bg-primary-500" />
                )}
              </div>
              <span className="text-sm text-black-400 capitalize">{type}</span>
            </button>
          ))}
        </div>

        {/* Nom / Prénom */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
          type="text"
            placeholder="Nom du client"
            value={clientInfo.lastName}
            onChange={(e) => setField({ lastName: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Prénom du client"
            value={clientInfo.firstName}
            onChange={(e) => setField({ firstName: e.target.value })}
          />
        </div>

        {/* Téléphone / Email */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
            type="tel"
            placeholder="Numéro de téléphone"
            value={clientInfo.phone}
            onChange={(e) => setField({ phone: e.target.value })}
          />
          <Input
            placeholder="Email"
            type="email"
            value={clientInfo.email}
            onChange={(e) => setField({ email: e.target.value })}
          />
        </div>

        {/* Champs entreprise */}
        {isEntreprise && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input
                type="text"
                placeholder="Nom de l'entreprise"
                value={clientInfo.companyName}
                onChange={(e) => setField({ companyName: e.target.value })}
              />
              <Input
                type="text"
                placeholder="N° TVA Intracommunautaire"
                value={clientInfo.vatNumber}
                onChange={(e) => setField({ vatNumber: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Numéro siret"
                value={clientInfo.siretNumber}
                onChange={(e) => setField({ siretNumber: e.target.value })}
              />
            </div>
          </>
        )}

        {/* Adresse */}
        <div className="mb-5">
          <textarea
            placeholder="Adresse"
            rows={3}
            value={clientInfo.address}
            onChange={(e) => setField({ address: e.target.value })}
            className="w-full px-3 py-2 text-sm border border-gray-100 rounded-md text-black-400 placeholder:text-black-200 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-shadow resize-none"
          />
        </div>

        {/* Événement */}
        <h2 className="text-sm font-bold text-black-500 mb-3">Événement</h2>
        <Input
          type="text"
          placeholder="Nom de l'événement"
          value={clientInfo.eventName}
          onChange={(e) => setField({ eventName: e.target.value })}
        />
      </div>
    </>
  );
}