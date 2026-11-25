export type TechnicianStatus = "pending" | "published" | "hidden";

export type Technician = {
  id: string;
  name: string;
  trade: string;
  city?: string | null;
  neighborhood: string;
  phone: string;
  experience: number;
  emergency: boolean;
  description: string;
  profile_photo?: string | null;
  verified: boolean;
  recommended: boolean;
  status: TechnicianStatus;
  created_at: string;
};

export const TRADE_CATEGORIES = [
  {
    category: "Électricité & Énergie",
    trades: [
      "Électricien bâtiment",
      "Électricien industriel",
      "Installateur solaire / Photovoltaïque",
      "Bobineur moteur",
      "Technicien groupe électrogène",
    ],
  },
  {
    category: "Plomberie & Froid",
    trades: [
      "Plombier sanitaire",
      "Technicien froid et climatisation",
      "Frigoriste",
      "Foreur / Maintenance pompe à eau",
    ],
  },
  {
    category: "Bâtiment & Construction",
    trades: [
      "Maçon",
      "Carreleur",
      "Peintre en bâtiment",
      "Staffeur / Plâtrier",
      "Charpentier / Couvreur",
      "Étanchéiste",
      "Vitrier / Aluminium",
    ],
  },
  {
    category: "Métallurgie & Bois",
    trades: [
      "Soudeur métallique",
      "Ferronnier",
      "Menuisier bois",
      "Ébéniste",
      "Tapissier",
    ],
  },
  {
    category: "Mécanique & Auto/Moto",
    trades: [
      "Mécanicien auto",
      "Mécanicien moto",
      "Électricien auto",
      "Tôlier / Peintre auto",
      "Vulcanisateur / Pneumatique",
      "Technicien engins lourds",
    ],
  },
  {
    category: "Électronique, Informatique & Sécurité",
    trades: [
      "Réparateur téléphone / ordinateur",
      "Technicien réseaux / Wi-Fi",
      "Installateur caméras de surveillance (CCTV)",
      "Antenniste / Parabole (Canal+)",
      "Réparateur électroménager (TV, frigo, machine à laver)",
    ],
  },
  {
    category: "Autres services",
    trades: [
      "Serrurier",
      "Jardinier / Paysagiste",
      "Vidangeur / Assainissement",
      "Autre métier technique",
    ],
  },
] as const;

export const TRADES = TRADE_CATEGORIES.flatMap(({ trades }) => [...trades]);

export const OUAGADOUGOU_NEIGHBORHOODS = [
  "Goughin",
  "Pissy",
  "Ouaga 2000",
  "Tampouy",
  "Karpala",
  "Patte d'Oie",
  "Zogona",
  "Cissin",
  "Dapoya",
  "Dassasgho",
  "Somgandé",
  "Tanghin",
  "Nonsin",
  "Kilwin",
  "Samandin",
  "Kalgondin",
  "Zone du Bois",
  "Wayalghin",
  "Bogodogo",
  "Boulmiougou",
  "Sig-Noghin",
  "Saaba",
  "Komsilga",
  "Pabré",
] as const;

export const BOBO_DIOULASSO_NEIGHBORHOODS = [
  "Accart-Ville",
  "Sarfalao",
  "Lafiabougou",
  "Koko",
  "Colsama",
  "Belleville",
  "Secteur 22",
  "Ouezzin-Ville",
] as const;

export const OTHER_CITIES = [
  "Banfora",
  "Batié",
  "Bittou",
  "Bogandé",
  "Boromo",
  "Boulsa",
  "Boussé",
  "Dano",
  "Dédougou",
  "Diapaga",
  "Diébougou",
  "Djibo",
  "Dori",
  "Fada N'Gourma",
  "Gaoua",
  "Garango",
  "Gorom-Gorom",
  "Gourcy",
  "Houndé",
  "Kaya",
  "Kombissiri",
  "Kongoussi",
  "Koudougou",
  "Koupéla",
  "Léo",
  "Manga",
  "Niangoloko",
  "Nouna",
  "Orodara",
  "Ouahigouya",
  "Ouargaye",
  "Pama",
  "Pô",
  "Pouytenga",
  "Réo",
  "Sapouy",
  "Sebba",
  "Sindou",
  "Solenzo",
  "Tenkodogo",
  "Titao",
  "Toma",
  "Tougan",
  "Yako",
  "Ziniaré",
  "Zorgho",
] as const;

export const CITIES = [
  "Ouagadougou",
  "Bobo-Dioulasso",
  ...OTHER_CITIES,
] as const;

export const OTHER_LOCALITY = "Autre localité";

// Liste compatible avec les profils déjà enregistrés qui ne possèdent qu'un quartier/une ville.
export const NEIGHBORHOODS = [
  ...OUAGADOUGOU_NEIGHBORHOODS,
  ...BOBO_DIOULASSO_NEIGHBORHOODS,
  ...OTHER_CITIES,
  OTHER_LOCALITY,
] as const;
