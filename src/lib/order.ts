import { siteConfig } from "./site-config";

export type CartLine = {
  key: string;
  name: string;
  option?: string;
  /** Unit price in reais. */
  price: number;
  qty: number;
  note?: string;
};

export type Fulfillment = "retirada" | "entrega";
export type Payment = "Pix" | "Cartão" | "Dinheiro";

export type OrderDetails = {
  name: string;
  fulfillment: Fulfillment;
  address?: string;
  payment: Payment;
  /** Only for cash: amount the customer will pay with. */
  changeFor?: string;
  notes?: string;
};

export const lineKey = (name: string, option?: string) => (option ? `${name}__${option}` : name);

export const lineLabel = (l: Pick<CartLine, "name" | "option">) =>
  l.option ? `${l.name} (${l.option})` : l.name;

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);
export const cartTotal = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty * l.price, 0);

/** 28 → "R$ 28,00" */
export function formatBRL(value: number) {
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function orderProblems(lines: CartLine[], d: OrderDetails): string[] {
  const problems: string[] = [];
  if (lines.length === 0) problems.push("Adicione ao menos um item à sacola.");
  if (!d.name.trim()) problems.push("Informe seu nome.");
  if (d.fulfillment === "entrega" && !d.address?.trim()) problems.push("Informe o endereço de entrega.");
  return problems;
}

/** The WhatsApp message sent to the café, in the format agreed with the owner. */
export function buildOrderMessage(lines: CartLine[], d: OrderDetails) {
  const out: string[] = [`Olá, ${siteConfig.name}! Gostaria de fazer o seguinte pedido:`, "", "*ITENS DO PEDIDO:*"];
  for (const l of lines) {
    out.push(`• ${l.qty}x ${lineLabel(l)} — ${formatBRL(l.qty * l.price)}`);
    if (l.note?.trim()) out.push(`  _Obs: ${l.note.trim()}_`);
  }
  out.push("", `*TOTAL:* ${formatBRL(cartTotal(lines))}`, "-----------------------------------");
  out.push(`*CLIENTE:* ${d.name.trim()}`);
  if (d.fulfillment === "entrega") {
    out.push("*TIPO:* Entrega (taxa a combinar)");
    out.push(`*ENDEREÇO:* ${d.address?.trim() ?? ""}`);
  } else {
    out.push("*TIPO:* Retirada no local");
  }
  out.push(`*PAGAMENTO:* ${d.payment}`);
  if (d.payment === "Dinheiro" && d.changeFor?.trim()) out.push(`*TROCO PARA:* ${d.changeFor.trim()}`);
  if (d.notes?.trim()) out.push(`*OBSERVAÇÕES:* ${d.notes.trim()}`);
  return out.join("\n");
}

export function orderWhatsappUrl(lines: CartLine[], d: OrderDetails) {
  if (!siteConfig.whatsapp) return null;
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(buildOrderMessage(lines, d))}`;
}
