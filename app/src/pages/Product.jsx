import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, products, productReviews, INTERVALS, money, subscribePrice, FREE_SHIPPING_THRESHOLD, shippingFor } from '../data/catalogue';
import { useCart } from '../store';
import ProductArt from '../components/ProductArt';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';
import { Stars } from '../components/ProductCard';
import { lifestyleImages } from '../data/lifestyle';

export default function Product() {
  const { handle } = useParams();
  const product = getProduct(handle);
  const { add } = useCart();
  const [plan, setPlan] = useState('onetime');
  const [interval, setIntervalState] = useState('1m');
  const [qty, setQty] = useState(1);
  const [thumb, setThumb] = useState(0);
  const [openAcc, setOpenAcc] = useState(0);

  useEffect(() => {
    setPlan('onetime'); setIntervalState('1m'); setQty(1); setThumb(0); setOpenAcc(0);
    window.scrollTo(0, 0);
  }, [handle]);

  const reviews = useMemo(() => (product ? productReviews(product) : []), [product]);
  const canSub = product?.subPrice != null;
  const unitPrice = plan === 'subscription' ? subscribePrice(product) : product.price;
  const lineTotal = unitPrice * qty;
  const related = useMemo(() => {
    if (!product) return [];
    return (product.pairs || []).map((h) => products.find((p) => p.handle === h)).filter(Boolean).slice(0, 4);
  }, [product]);
  const gallery = product ? [{ type: 'illustration', alt: `${product.name} concept illustration` }, ...lifestyleImages(product)] : [];

  if (!product) {
    return (
      <main className="wrap">
        <div className="empty-state" style={{ paddingTop: 120 }}>
          <h1>product not found</h1>
          <p><Link to="/collections/all" style={{ color: 'var(--olive)', textDecoration: 'underline' }}>back to all products</Link></p>
        </div>
      </main>
    );
  }

  const accItems = [
    {
      q: 'what\'s in the box',
      a: <><p>{product.contents}. {product.details}.</p></>,
    },
    {
      q: 'how do i prepare it?',
      a: (
        <>
          <p>sift two grams into your chawan, loosen with a splash of 80°C water, add 70 ml and whisk briskly in a "w" motion for about fifteen seconds until the surface is covered in a fine foam. drink slowly while warm.</p>
          <p style={{ marginTop: 10 }}><Link to="/pages/the-atelier" style={{ color: 'var(--olive)' }}>read the full recipes →</Link></p>
        </>
      ),
    },
    {
      q: 'shipping & returns',
      a: <p>orders of {money(FREE_SHIPPING_THRESHOLD)} or more ship free australia-wide; below that a flat $9.95 applies. estimated delivery 2–8 business days. for changes, delivery issues or returns, email <a href="mailto:info@havenateliermatcha.com" style={{ color: 'var(--olive)' }}>info@havenateliermatcha.com</a> — we respond within 1–2 business days. your australian consumer law rights always apply.</p>,
    },
    {
      q: 'subscribe & save',
      a: canSub ? (
        <p>choose subscribe &amp; save for {money(subscribePrice(product))} per delivery — 15% off, arriving every 2 weeks, monthly or every 2 months. skip, pause or cancel any time from your account or the manage subscription link in your emails.</p>
      ) : (
        <p>this piece is a one-time purchase — subscriptions apply to our matcha blends only.</p>
      ),
    },
  ];

  return (
    <main>
      <div className="wrap">
        <nav className="crumbs" style={{ paddingTop: 26 }} aria-label="breadcrumb">
          <Link to="/">home</Link><span>/</span>
          <Link to={`/collections/${product.collections[0]}`}>shop</Link><span>/</span>
          <Link to={`/collections/${product.collections.includes('matcha') ? 'matcha' : product.collections.includes('kits') ? 'kits' : 'teaware'}`}>{product.collections.includes('matcha') ? 'matcha' : product.collections.includes('kits') ? 'kits' : 'teaware'}</Link><span>/</span>
          <span>{product.short.toLowerCase()}</span>
        </nav>

        <div className="pdp">
          {/* gallery */}
          <div>
            <div className="gallery-main">
              {thumb === 0 ? <ProductArt art={product.art} /> : <img src={gallery[thumb]?.src} alt={gallery[thumb]?.alt} />}
            </div>
            <div className="gallery-thumbs" role="tablist" aria-label="product views">
              {gallery.map((view, i) => (
                <button key={i} className={thumb === i ? 'on' : ''} onClick={() => setThumb(i)} aria-label={`view ${i + 1}`} aria-selected={thumb === i} role="tab">
                  {i === 0 ? <ProductArt art={product.art} /> : <img src={view.src} alt="" />}
                </button>
              ))}
            </div>
            {thumb > 0 && <p className="gallery-note">Ritual inspiration. Styled imagery is illustrative; final product photography is pending.</p>}
          </div>

          {/* info */}
          <div className="pdp-info">
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-rating">
              <Stars rating={product.rating} />
              <a href="#reviews">{reviews.length ? `${reviews.length} review${reviews.length === 1 ? '' : 's'}` : 'no reviews yet'}</a>
            </div>
            <div className="pdp-price">
              {money(unitPrice)}
              {plan === 'onetime' && product.compareAt && <s>{money(product.compareAt)}</s>}
              {plan === 'subscription' && <span className="save">save 15%</span>}
            </div>
            <p className="pdp-blurb">{product.blurb}</p>

            <div className="buybox">
              <div className="plan-tabs" role="radiogroup" aria-label="purchase option">
                <button
                  className={`plan-opt ${plan === 'onetime' ? 'on' : ''}`}
                  onClick={() => setPlan('onetime')}
                  role="radio" aria-checked={plan === 'onetime'}
                >
                  <span className="po-name"><span>one-time purchase</span><span className="po-price">{money(product.price)}</span></span>
                  <span className="po-note">single delivery</span>
                </button>
                <button
                  className={`plan-opt ${plan === 'subscription' ? 'on' : ''} ${!canSub ? 'disabled' : ''}`}
                  onClick={() => canSub && setPlan('subscription')}
                  role="radio" aria-checked={plan === 'subscription'} disabled={!canSub}
                  title={canSub ? '' : 'subscriptions apply to matcha blends only'}
                >
                  <span className="po-name"><span>subscribe &amp; save</span><span className="po-price">{canSub ? money(subscribePrice(product)) : '—'}</span></span>
                  <span className="po-note">{canSub ? <span className="po-save">15% off every delivery</span> : 'matcha blends only'}</span>
                </button>
              </div>

              {plan === 'subscription' && canSub && (
                <div>
                  <label htmlFor="interval" style={{ fontSize: 14, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>deliver</label>
                  <div className="interval-row" role="radiogroup" aria-label="delivery frequency">
                    {INTERVALS.map((i) => (
                      <button
                        key={i.id}
                        className={`interval-btn ${interval === i.id ? 'on' : ''}`}
                        onClick={() => setIntervalState(i.id)}
                        role="radio" aria-checked={interval === i.id}
                      >
                        {i.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="qty-row">
                <span style={{ fontSize: 14, color: 'var(--muted)' }}>quantity</span>
                <div className="qty-ctl">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="decrease">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="increase">+</button>
                </div>
              </div>

              <div className="buy-summary">
                <span className="bs-note">{plan === 'subscription' ? 'subscription total' : 'one-time total'}{lineTotal >= FREE_SHIPPING_THRESHOLD ? ' · free shipping' : ''}</span>
                <span className="bs-price">{money(lineTotal)}</span>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => add(product.handle, qty, plan === 'subscription' ? 'subscription' : 'onetime')}
              >
                {plan === 'subscription' ? 'add subscription to cart' : 'add to cart'}
              </button>
            </div>

            <div className="pdp-trust">
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>free shipping over {money(FREE_SHIPPING_THRESHOLD)}</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/></svg>skip or cancel anytime</span>
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>ships australia-wide</span>
            </div>
          </div>
        </div>

        {/* accordions */}
        <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 60 }}>
          {accItems.map((a, i) => {
            const isOpen = openAcc === i;
            return (
              <div className={`acc-item ${isOpen ? 'open' : ''}`} key={a.q}>
                <button className="acc-q" onClick={() => setOpenAcc(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>{a.q}</span>
                  <span className="chev" aria-hidden="true" />
                </button>
                <div className="acc-a" style={{ maxHeight: isOpen ? 400 : 0 }}>
                  <div className="inner">{a.a}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* reviews */}
        <div className="reviews-block" id="reviews" style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 70 }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(26px,2.6vw,36px)', marginBottom: 22 }}>customer reviews</h2>
          </Reveal>
          {reviews.length > 0 && (
            <div className="reviews-summary">
              <span className="rating-big">{product.rating.toFixed(1)}</span>
              <div>
                <Stars rating={product.rating} />
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>{reviews.length} review{reviews.length === 1 ? '' : 's'} for {product.short}</div>
              </div>
            </div>
          )}
          {reviews.length === 0 ? (
            <div className="reviews-empty">
              <span className="kanji" style={{ fontSize: 34, color: 'var(--sage)', display: 'block', marginBottom: 10 }}>静</span>
              <strong style={{ color: 'var(--forest)', display: 'block', marginBottom: 6 }}>no reviews yet</strong>
              <p style={{ fontSize: 14 }}>be the first to share your bowl — reviews open after launch.</p>
            </div>
          ) : (
            reviews.map((r, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="review-item">
                  <div className="r-head">
                    <span className="r-name">{r.name}</span>
                    <span className="r-meta">{r.meta}</span>
                  </div>
                  <Stars rating={r.rating} />
                  <p style={{ marginTop: 8 }}>{r.text}</p>
                </div>
              </Reveal>
            ))
          )}
        </div>

        {/* you may also like */}
        {related.length > 0 && (
          <section style={{ paddingBottom: 80 }}>
            <Reveal>
              <h2 style={{ marginBottom: 30 }}>you may also like</h2>
            </Reveal>
            <div className="grid-4">
              {related.map((p, i) => (
                <Reveal key={p.handle} delay={i * 80}><ProductCard product={p} /></Reveal>
              ))}
            </div>
          </section>
        )}
      </div>
      <Newsletter />
    </main>
  );
}
