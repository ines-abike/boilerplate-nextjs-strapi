export interface Devis {
  id: string;
  reference: string;
  client: string;
  evenement: string;
  montant: number;
  date: string;
}

export interface DevisFormState {
  step: number;
  clientInfo: ClientInfo;
  produits: ProduitSelectionne[];
  reference: string;
  date: string;
}

export type TypeClient = "particulier" | "entreprise";

export interface ClientInfo {
  typeClient: TypeClient;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  nomEntreprise: string;
  tvaIntracommunautaire: string;
  numeroSiret: string;
  adresse: string;
  nomEvenement: string;
}

export interface ProduitSelectionne {
  id: string;
  nom: string;
  quantite: number;
  prixUnitaire: number;
  vat: number;
}