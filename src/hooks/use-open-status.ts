import { useEffect, useState } from "react";
import { openStatus, type OpenStatus } from "@/lib/hours";

/** Live open/closed status; null until hydrated so SSR and the first client render match. */
export function useOpenStatus() {
  const [status, setStatus] = useState<OpenStatus | null>(null);
  useEffect(() => {
    const tick = () => setStatus(openStatus(new Date()));
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
