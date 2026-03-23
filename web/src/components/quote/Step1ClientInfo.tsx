import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuoteForm } from "@/src/context/QuoteFormContext";
import { ClientType } from "@/src/types/quote";
import { QuoteFormState } from "@/src/types/quote";
import Input from "@/src/components/ui/Input";
import { clientInfoSchema, ClientInfoFormValues } from "@/src/schemas/clientInfo.schema";

export default function Step1ClientInfo() {
  const { state, dispatch } = useQuoteForm();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ClientInfoFormValues>({
    resolver: zodResolver(clientInfoSchema),
    defaultValues: {
      clientType: state.clientType ?? "particulier",
      lastName: state.lastName ?? "",
      firstName: state.firstName ?? "",
      phone: state.phone ?? "",
      email: state.email ?? "",
      address: state.address ?? "",
      eventName: state.eventName ?? "",
      companyName: state.companyName ?? "",
      vatNumber: state.vatNumber ?? "",
      siretNumber: state.siretNumber ?? "",
    },
  });

  const clientType = useWatch({ control, name: "clientType" });
  const isEntreprise = clientType === "entreprise";

  const values = useWatch({ control });

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFO",
      payload: values as Partial<QuoteFormState>,
    });
  }, [values, dispatch]);

  const onSubmit = () => {
    dispatch({ type: "SET_STEP", payload: 2 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <h2 className="text-sm font-bold text-black-500 mb-4">
          Informations du client
        </h2>

        {/* Type client */}
        <p className="text-sm text-black-300 mb-2">Type de client</p>
        <div className="flex gap-6 mb-5">
          {(["particulier", "entreprise"] as ClientType[]).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setValue("clientType", type)}
              className="flex items-center gap-2"
            >
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${clientType === type ? "border-primary-500" : "border-black-100"}`}
              >
                {clientType === type && (
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
            error={errors.lastName?.message}
            {...register("lastName")}
          />
          <Input
            type="text"
            placeholder="Prénom du client"
            error={errors.firstName?.message}
            {...register("firstName")}
          />
        </div>

        {/* Téléphone / Email */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
            type="tel"
            placeholder="Numéro de téléphone"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>

        {/* Champs entreprise */}
        {isEntreprise && (
          <>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input
                type="text"
                placeholder="Nom de l'entreprise"
                error={errors.companyName?.message}
                {...register("companyName")}
              />
              <Input
                type="text"
                placeholder="N° TVA Intracommunautaire"
                error={errors.vatNumber?.message}
                {...register("vatNumber")}
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                placeholder="Numéro siret"
                error={errors.siretNumber?.message}
                {...register("siretNumber")}
              />
            </div>
          </>
        )}

        {/* Adresse */}
        <div className="mb-5">
          <textarea
            placeholder="Adresse"
            rows={3}
            {...register("address")}
            className={`
              w-full px-3 py-2 text-sm border rounded-md
              text-black-400 placeholder:text-black-200
              focus:outline-none focus:ring-1 focus:ring-primary-500
              transition-shadow resize-none
              ${errors.address ? "border-red-400" : "border-gray-100"}
            `}
          />
          {errors.address && (
            <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
          )}
        </div>

        {/* Événement */}
        <h2 className="text-sm font-bold text-black-500 mb-3">Événement</h2>
        <Input
          type="text"
          placeholder="Nom de l'événement"
          error={errors.eventName?.message}
          {...register("eventName")}
        />
      </div>

      {/* Bouton Suivant — déclenche la validation */}
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white text-sm px-8 py-2 rounded-md transition-colors"
        >
          Suivant
        </button>
      </div>
    </form>
  );
}