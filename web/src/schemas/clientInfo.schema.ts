import { z } from "zod";

const baseSchema = z.object({
  clientType: z.enum(["particulier", "entreprise"]),
  lastName: z.string().min(1, "Le nom est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  phone: z.string().min(1, "Le numéro de téléphone est requis"),
  email: z.string().min(1, "L'email est requis").email("Email invalide"),
  address: z.string().min(1, "L'adresse est requise"),
  eventName: z.string().min(1, "Le nom de l'événement est requis"),
  companyName: z.string().optional(),
  vatNumber: z.string().optional(),
  siretNumber: z.string().optional(),
});

// Si entreprise — companyName, vatNumber, siretNumber obligatoires
export const clientInfoSchema = baseSchema.superRefine((data, ctx) => {
  if (data.clientType === "entreprise") {
    if (!data.companyName || data.companyName.trim() === "") {
      ctx.addIssue({
        path: ["companyName"],
        code: z.ZodIssueCode.custom,
        message: "Le nom de l'entreprise est requis",
      });
    }
    if (!data.vatNumber || data.vatNumber.trim() === "") {
      ctx.addIssue({
        path: ["vatNumber"],
        code: z.ZodIssueCode.custom,
        message: "Le N° TVA est requis",
      });
    }
    if (!data.siretNumber || data.siretNumber.trim() === "") {
      ctx.addIssue({
        path: ["siretNumber"],
        code: z.ZodIssueCode.custom,
        message: "Le numéro SIRET est requis",
      });
    }
  }
});

export type ClientInfoFormValues = z.infer<typeof clientInfoSchema>;