import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { cartCount, cartTotal, lineKey, lineLabel, type CartLine } from "@/lib/order";

const STORAGE_KEY = "pati-sacola";

type AddInput = { name: string; price: number; option?: string };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: AddInput) => void;
  setQty: (key: string, qty: number) => void;
  setNote: (key: string, note: string) => void;
  remove: (key: string) => void;
  clear: () => void;
  qtyOf: (name: string) => number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Restore the bag after hydration so server and client render the same markup.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) setLines(JSON.parse(saved) as CartLine[]);
    } catch {
      /* ignore corrupt storage */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const add = useCallback((item: AddInput) => {
    const key = lineKey(item.name, item.option);
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { key, name: item.name, option: item.option, price: item.price, qty: 1 }];
    });
    toast.success(`${lineLabel(item)} na sacola`, {
      action: { label: "Ver sacola", onClick: () => setOpen(true) },
    });
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const setNote = useCallback((key: string, note: string) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, note } : l)));
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: cartCount(lines),
      total: cartTotal(lines),
      open,
      setOpen,
      add,
      setQty,
      setNote,
      remove,
      clear,
      qtyOf: (name) => lines.filter((l) => l.name === name).reduce((n, l) => n + l.qty, 0),
    }),
    [lines, open, add, setQty, setNote, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
