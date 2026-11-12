/**
 * Editable café details. Leave a field empty ("") until the real information is confirmed —
 * the site shows a neutral "a confirmar" note instead of inventing data.
 */
export type OpeningHours = {
  /** Label shown on the site. */
  days: string;
  /** Hours shown on the site. */
  hours: string;
  /** 0 = domingo … 6 = sábado */
  weekdays: number[];
  /** 24h "HH:MM" in the café's time zone. */
  open: string;
  close: string;
};

export const siteConfig = {
  name: "Pati Café Boutique",
  tagline: "Seu momento especial começa aqui.",
  address: "R. Dr. Dolzani, 465 – Jardim da Glória, São Paulo – SP, 01546-000",
  hours: [
    { days: "Segunda a sexta", hours: "9h30 às 18h30", weekdays: [1, 2, 3, 4, 5], open: "09:30", close: "18:30" },
    { days: "Sábado", hours: "9h às 15h", weekdays: [6], open: "09:00", close: "15:00" },
  ] as OpeningHours[],
  timeZone: "America/Sao_Paulo",
  /** Somente números com DDI e DDD. */
  whatsapp: "5511940462499",
  whatsappDisplay: "(11) 94046-2499",
  instagram: "https://www.instagram.com/pati_cafeboutique",
  instagramHandle: "@pati_cafeboutique",
  /** Perfil irmão de cestas e presentes. */
  instagramCestas: "https://www.instagram.com/pati_cestasepresentes",
  instagramCestasHandle: "@pati_cestasepresentes",
  facebook: "",
  /** Search text used for the Google Maps embed when no address is set yet. */
  mapQuery: "Pati Café Boutique",
};

export function whatsappLink(message = "Olá! Gostaria de mais informações sobre a Pati Café Boutique.") {
  if (!siteConfig.whatsapp) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function mapEmbedUrl() {
  const q = siteConfig.address || siteConfig.mapQuery;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
}

export function mapLink() {
  const q = siteConfig.address || siteConfig.mapQuery;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}
