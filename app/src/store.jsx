import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getProduct, cartTotal } from './data/catalogue';

const CartContext = createContext(null);
const KEY = 'haven-cart-v1';

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(load);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [offerTab, setOfferTab] = useState('cart');

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const add = (handle, qty = 1, plan = 'onetime', interval = '1m') => {
    const delivery = plan === 'subscription' ? { interval } : {};
    setLines((prev) => {
      const i = prev.findIndex((l) => l.handle === handle && l.plan === plan);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], ...delivery, qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { handle, qty, plan, ...delivery }];
    });
    setDrawerOpen(true);
    setOfferTab('cart');
  };

  const setQty = (handle, plan, qty) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => !(l.handle === handle && l.plan === plan))
        : prev.map((l) => (l.handle === handle && l.plan === plan ? { ...l, qty } : l))
    );

  const remove = (handle, plan) =>
    setLines((prev) => prev.filter((l) => !(l.handle === handle && l.plan === plan)));

  const clear = () => setLines([]);

  const upgradeToSubscription = (handle) =>
    setLines((prev) =>
      prev.map((l) =>
        l.handle === handle && l.plan === 'onetime'
          ? { ...l, plan: 'subscription', interval: l.interval || '1m' }
          : l
      )
    );

  const setIntervalFor = (handle, interval) =>
    setLines((prev) => prev.map((l) => (l.handle === handle && l.plan === 'subscription' ? { ...l, interval } : l)));

  const enriched = useMemo(
    () =>
      lines.map((l) => {
        const p = getProduct(l.handle);
        if (!p) return null;
        const unitPrice = l.plan === 'subscription' ? (p.subPrice ?? p.price) : p.price;
        return { ...l, product: p, unitPrice, lineTotal: unitPrice * l.qty };
      }).filter(Boolean),
    [lines]
  );

  const totals = useMemo(() => cartTotal(enriched), [enriched]);
  const count = enriched.reduce((s, l) => s + l.qty, 0);

  const offers = useMemo(() => {
    // Out-of-launch-scope per Anna's update: cart subscription upgrades left out.
    return [];
  }, []);

  return (
    <CartContext.Provider
      value={{ lines: enriched, count, totals, add, setQty, remove, clear, upgradeToSubscription, setIntervalFor, drawerOpen, setDrawerOpen, offerTab, setOfferTab, offers }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
