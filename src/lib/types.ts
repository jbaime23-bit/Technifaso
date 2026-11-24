export type TechnicianStatus = "pending" | "published" | "hidden";

export type Technician = {
  id: string;
  name: string;
  trade: string;
  neighborhood: string;
  phone: string;
  experience: number;
  emergency: boolean;
  description: string;
  verified: boolean;
  recommended: boolean;
  status: TechnicianStatus;
  created_at: string;
};

export const TRADES = [
  "Électricien bâtiment",
  "Plombier",
  "Frigoriste / Clim",
  "Mécanicien auto/moto",
  "Technicien solaire",
  "Maçon",
  "Soudeur métallique",
  "Menuisier bois/alu",
  "Peintre bâtiment",
] as const;

export const NEIGHBORHOODS = [
  "Goughin",
  "Pissy",
  "Ouaga 2000",
  "Tampouy",
  "Karpala",
  "Patte d'Oie",
  "Zogona",
  "Cissin",
  "Dapoya",
  "Bobo-Dioulasso",
] as const;
