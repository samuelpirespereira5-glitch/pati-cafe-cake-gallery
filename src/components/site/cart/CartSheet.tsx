import { Link } from "@tanstack/react-router";
import { Bike, Coffee, MessageCircle, Store, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useOpenStatus } from "@/hooks/use-open-status";
import {
  formatBRL,
  orderProblems,
  orderWhatsappUrl,
  type Fulfillment,
  type OrderDetails,
  type Payment,
} from "@/lib/order";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";

const payments: Payment[] = ["Pix", "Cartão", "Dinheiro"];

function Choice({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2.5 text-sm transition-all duration-200",
        active
          ? "border-primary bg-primary text-primary-foreground shadow-soft"
          : "border-border bg-card text-primary hover:border-gold",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function CartSheet() {
  const { lines, count, total, open, setOpen, setQty, setNote, remove, clear } = useCart();
  const status = useOpenStatus();
  const [noteOpen, setNoteOpen] = useState<Record<string, boolean>>({});
  const [details, setDetails] = useState<OrderDetails>({
    name: "",
    fulfillment: "retirada",
    address: "",
    payment: "Pix",
    changeFor: "",
    notes: "",
  });
  const [tried, setTried] = useState(false);
  const set = <K extends keyof OrderDetails>(k: K, v: OrderDetails[K]) => setDetails((d) => ({ ...d, [k]: v }));

  const problems = orderProblems(lines, details);

  const send = () => {
    setTried(true);
    if (problems.length) {
      toast.error(problems[0]);
      return;
    }
    const url = orderWhatsappUrl(lines, details);
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Pedido pronto no WhatsApp", { description: "É só tocar em enviar na conversa." });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border px-6 pb-5 pt-6 text-left">
          <p className="eyebrow">Seu pedido</p>
          <SheetTitle className="font-display text-3xl font-medium text-primary">
            Sacola {count > 0 && <span className="text-gold">· {count}</span>}
          </SheetTitle>
          <SheetDescription className="sr-only">Itens escolhidos e dados para enviar o pedido pelo WhatsApp.</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-gold">
              <Coffee className="h-7 w-7" strokeWidth={1.4} />
            </span>
            <h3 className="mt-5 text-2xl">Sua sacola está vazia</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Escolha seus cafés e quitutes no cardápio e envie o pedido direto pelo WhatsApp.
            </p>
            <Button asChild variant="cafe" size="xl" className="mt-7">
              <Link to="/cardapio" onClick={() => setOpen(false)}>
                Ver o cardápio
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <ul className="divide-y divide-border">
                {lines.map((l) => (
                  <li key={l.key} className="py-4 first:pt-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-display text-lg leading-tight text-primary">{l.name}</p>
                        {l.option && <p className="mt-0.5 text-xs tracking-wide text-gold">{l.option}</p>}
                        <p className="mt-1 text-xs text-muted-foreground">{formatBRL(l.price)} cada</p>
                      </div>
                      <p className="shrink-0 text-sm font-medium text-primary">{formatBRL(l.price * l.qty)}</p>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <QtyStepper qty={l.qty} label={l.name} onChange={(n) => setQty(l.key, n)} />
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setNoteOpen((s) => ({ ...s, [l.key]: !s[l.key] }))}
                          className="rounded-full px-3 py-1.5 text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
                        >
                          {l.note ? "Editar obs." : "Observação"}
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(l.key)}
                          aria-label={`Remover ${l.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    {(noteOpen[l.key] || l.note) && (
                      <Input
                        value={l.note ?? ""}
                        onChange={(e) => setNote(l.key, e.target.value)}
                        placeholder="Ex.: sem açúcar, bem quente…"
                        aria-label={`Observação para ${l.name}`}
                        className="mt-3 h-9 bg-card text-sm"
                      />
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-5 rounded-2xl bg-secondary/60 p-5">
                <div className="space-y-2">
                  <Label htmlFor="pedido-nome">Seu nome</Label>
                  <Input
                    id="pedido-nome"
                    value={details.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Como podemos te chamar?"
                    autoComplete="name"
                    aria-invalid={tried && !details.name.trim()}
                    className="bg-card"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Como prefere receber?</Label>
                  <div role="radiogroup" aria-label="Retirada ou entrega" className="grid grid-cols-2 gap-2">
                    {(
                      [
                        ["retirada", "Retirar no café", Store],
                        ["entrega", "Entrega", Bike],
                      ] as [Fulfillment, string, typeof Store][]
                    ).map(([v, label, Icon]) => (
                      <Choice
                        key={v}
                        active={details.fulfillment === v}
                        onClick={() => set("fulfillment", v)}
                        className="flex items-center justify-center gap-2"
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.6} /> {label}
                      </Choice>
                    ))}
                  </div>
                  {details.fulfillment === "entrega" ? (
                    <div className="space-y-2 pt-1">
                      <Textarea
                        value={details.address}
                        onChange={(e) => set("address", e.target.value)}
                        placeholder="Rua, número, complemento e bairro"
                        aria-label="Endereço de entrega"
                        aria-invalid={tried && !details.address?.trim()}
                        rows={2}
                        className="bg-card"
                      />
                      <p className="text-xs text-muted-foreground">Taxa e prazo de entrega combinados pelo WhatsApp.</p>
                    </div>
                  ) : (
                    <p className="text-xs leading-relaxed text-muted-foreground">{siteConfig.address}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Pagamento</Label>
                  <div role="radiogroup" aria-label="Forma de pagamento" className="grid grid-cols-3 gap-2">
                    {payments.map((p) => (
                      <Choice key={p} active={details.payment === p} onClick={() => set("payment", p)}>
                        {p}
                      </Choice>
                    ))}
                  </div>
                  {details.payment === "Dinheiro" && (
                    <Input
                      value={details.changeFor}
                      onChange={(e) => set("changeFor", e.target.value)}
                      placeholder="Troco para quanto? (opcional)"
                      aria-label="Troco para"
                      className="bg-card"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pedido-obs">Observações do pedido</Label>
                  <Textarea
                    id="pedido-obs"
                    value={details.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Opcional — horário de retirada, alergias…"
                    rows={2}
                    className="bg-card"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={clear}
                className="mt-4 text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
              >
                Esvaziar sacola
              </button>
            </div>

            <div className="border-t border-border bg-card px-6 pb-6 pt-4">
              {status && !status.open && (
                <p className="mb-3 rounded-lg bg-secondary px-3 py-2 text-xs text-secondary-foreground">
                  {status.label}. Você pode enviar agora — respondemos assim que abrirmos.
                </p>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-sm tracking-wide text-muted-foreground">Total</span>
                <span className="font-display text-3xl text-primary">{formatBRL(total)}</span>
              </div>
              <Button variant="cafe" size="xl" className="mt-4 w-full" onClick={send}>
                <MessageCircle /> Enviar pedido pelo WhatsApp
              </Button>
              <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-muted-foreground">
                Seu pedido abre no WhatsApp da {siteConfig.name}. A confirmação é feita pela nossa equipe.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
