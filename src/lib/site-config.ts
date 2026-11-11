/**
 * Editable café details. Leave a field empty ("") until the real information is confirmed —
 * the site shows a neutral "a confirmar" note instead of inventing data.
 */
export const siteConfig = {
  name: "Pati Café Boutique",
  tagline: "Seu momento especial começa aqui.",
  /** Ex.: "Rua Exemplo, 123 – Bairro, Cidade – UF" */
  address: "",
  /** Ex.: [{ days: "Terça a sábado", hours: "9h às 19h" }] */
  hours: [] as { days: string; hours: string }[],
  /** Somente números com DDI e DDD. Ex.: "5585999999999" */
  whatsapp: "",
  /** URL completa. Ex.: "https://instagram.com/paticafeboutique" */
  instagram: "",
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
