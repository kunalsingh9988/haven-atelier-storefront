import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../store';
import { getProducts, INTERVALS, FREE_SHIPPING_THRESHOLD, money } from '../data/catalogue';
import ProductArt from './ProductArt';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ width: 20, height: 20 }}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export default function CartDrawer() {
  const { lines, totals, drawerOpen, setDrawerOpen, setQty, remove, setIntervalFor, offerTab, setOfferTab, clear, add } = useCart();
  const [code, setCode] = useState('');
  const [codeMsg, setCodeMsg] = useState('');

  // upsells: complementary products not already in cart (launch-scope "Pairs Well With")
  const upsells = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.handle));
    const picks = [];
    for (const l of lines) {
      for (const h of l.product.pairs || []) {
        if (!inCart.has(h) && !picks.includes(h)) picks.push(h);
      }
    }
    return getProducts(picks.slice(0, 4));
  }, [lines]);

  const addUpsell = (handle) => add(handle, 1, 'onetime');

  const shipPct = Math.min(100, (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      <div className={`drawer-scrim ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside className={`cart-drawer ${drawerOpen ? 'open' : ''}`} role="dialog" aria-label="cart" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h3>your basket</h3>
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="close cart"><CloseIcon /></button>
        </div>

        <div className="drawer-tabs">
          <button className={`drawer-tab ${offerTab === 'cart' ? 'on' : ''}`} onClick={() => setOfferTab('cart')}>cart</button>
          <button className={`drawer-tab ${offerTab === 'offers' ? 'on' : ''}`} onClick={() => setOfferTab('offers')}>offers</button>
        </div>

        {offerTab === 'offers' ? (
          <div className="drawer-body">
            <div className="cart-empty">
              <span className="kanji">静</span>
              <p>no active offers right now.</p>
              <p style={{ marginTop: 10, fontSize: 14 }}>subscribe &amp; save 15% on matcha — pick it on any matcha product page.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer-body">
              {lines.length === 0 ? (
                <div className="cart-empty">
                  <span className="kanji">静</span>
                  <p>your basket is empty.</p>
                  <p style={{ marginTop: 8, fontSize: 14 }}>a little stillness starts with the first bowl.</p>
                  <Link to="/collections/matcha" className="btn btn-primary btn-sm" style={{ marginTop: 20 }} onClick={() => setDrawerOpen(false)}>shop matcha</Link>
                </div>
              ) : (
                lines.map((l) => (
                  <div className="cart-line" key={`${l.handle}-${l.plan}`}>
                    <Link to={`/products/${l.handle}`} className="cl-art" onClick={() => setDrawerOpen(false)}>
                      <ProductArt art={l.product.art} />
                    </Link>
                    <div>
                      <div className="cl-name">{l.product.name}</div>
                      {l.plan === 'subscription' ? (
                        <div className="cl-plan">
                          subscribe &amp; save · {money(l.unitPrice)} each
                          <span className="cl-interval">
                            <select
                              value={l.interval || '1m'}
                              onChange={(e) => setIntervalFor(l.handle, e.target.value)}
                              aria-label="delivery frequency"
                            >
                              {INTERVALS.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
                            </select>
                          </span>
                        </div>
                      ) : (
                        <div className="cl-price">one-time · {money(l.unitPrice)} each</div>
                      )}
                      <div className="cl-price" style={{ marginTop: 2 }}>{money(l.lineTotal)}</div>
                      <div className="cl-qty">
                        <button onClick={() => setQty(l.handle, l.plan, l.qty - 1)} aria-label="decrease quantity">−</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setQty(l.handle, l.plan, l.qty + 1)} aria-label="increase quantity">+</button>
                        <button className="cl-remove" onClick={() => remove(l.handle, l.plan)}>remove</button>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right', fontWeight: 600, color: 'var(--forest)' }}>{money(l.lineTotal)}</div>
                  </div>
                ))
              )}
            </div>

            {lines.length > 0 && (
              <>
                {upsells.length > 0 && (
                  <div className="drawer-upsell">
                    <h4>pairs well with</h4>
                    <div className="up-row">
                      {upsells.map((p) => (
                        <div className="up-item" key={p.handle}>
                          <Link to={`/products/${p.handle}`} className="up-art" onClick={() => setDrawerOpen(false)}><ProductArt art={p.art} /></Link>
                          <div>
                            <div className="up-name">{p.short}</div>
                            <div className="up-price">{money(p.price)}</div>
                          </div>
                          <button className="up-add" onClick={() => addUpsell(p.handle)}>add</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="drawer-foot">
                  <div className="ship-progress">
                    <div className="sp-label">
                      <span>{totals.subtotal >= FREE_SHIPPING_THRESHOLD ? 'free shipping unlocked' : `${money(FREE_SHIPPING_THRESHOLD - totals.subtotal)} away from free shipping`}</span>
                      <span>{money(totals.subtotal)} / {money(FREE_SHIPPING_THRESHOLD)}</span>
                    </div>
                    <div className="ship-bar"><i style={{ width: `${shipPct}%` }} /></div>
                  </div>

                  <div className="discount-row">
                    <input
                      placeholder="discount code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      aria-label="discount code"
                    />
                    <button
                      onClick={() => {
                        if (code.trim().toUpperCase() === 'STILLNESS10') { setCodeMsg('10% off applied'); setCode(''); }
                        else setCodeMsg('that code isn\'t valid');
                      }}
                    >apply</button>
                  </div>
                  {codeMsg && <div className="form-note" style={{ marginTop: -6, marginBottom: 10 }}>{codeMsg}</div>}

                  <div className="totals">
                    <div className="t-row"><span>subtotal</span><span>{money(totals.subtotal)}</span></div>
                    <div className="t-row"><span>shipping</span><span>{totals.shipping === 0 ? 'free' : money(totals.shipping)}</span></div>
                    <div className="t-row grand"><span>total</span><span>{money(totals.total)}</span></div>
                  </div>

                  <Link to="/checkout" className="btn btn-primary btn-block" onClick={() => setDrawerOpen(false)}>checkout</Link>
                  <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <button className="cl-remove" onClick={clear} style={{ fontSize: 14 }}>clear basket</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </aside>
    </>
  );
}
