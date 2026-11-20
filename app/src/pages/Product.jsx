import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProduct, products, INTERVALS, money, subscribePrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COPY } from '../data/catalogue';
import { useCart } from '../store';
import ProductImage from '../components/ProductImage';
import ProductCard from '../components/ProductCard';
import Accordion from '../components/Accordion';
import Reveal from '../components/Reveal';
import { lifestyleImages } from '../data/lifestyle';

export default function Product() {
  const { handle } = useParams();
  const product = getProduct(handle);
  const { add } = useCart();
  const [plan, setPlan] = useState('onetime');
  const [interval, setIntervalState] = useState('1m');
  const [qty, setQty] = useState(1);
  const [thumb, setThumb] = useState(0);

  useEffect(() => {
    setPlan('onetime'); setIntervalState('1m'); setQty(1); setThumb(0);
    window.scrollTo(0, 0);
  }, [handle]);

  const canSub = product?.subPrice != null;
  const related = useMemo(() => {
    if (!product) return [];
    return (product.pairs || []).map((h) => products.find((p) => p.handle === h)).filter(Boolean).slice(0, 3);
  }, [product]);
  const gallery = product ? [{ alt: 'Product image' }, ...lifestyleImages(product)] : [];
  const selectedView = gallery[thumb];

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

  const unitPrice = canSub && plan === 'subscription' ? subscribePrice(product) : product.price;
  const lineTotal = unitPrice * qty;

  const faqItems = [
    {
      q: 'what\'s included?',
      a: product.details,
    },
    product.type === 'teaware'
      ? { q: 'how does it fit into the ritual?', a: product.blurb }
      : { q: 'how do i prepare the matcha?', a: 'sift two grams into a bowl, loosen with a little water at 80°C, add 70 ml more and whisk briskly in a "w" motion until a fine foam forms.' },
    {
      q: 'when will it arrive?',
      a: SHIPPING_COPY,
    },
    ...(canSub ? [{
      q: 'can i change my subscription?',
      a: 'yes. choose a delivery every 2 weeks, every month or every 2 months. you can skip, pause, change frequency or cancel any time from your account or the manage subscription link in your emails.',
    }] : []),
  ];
  const nextCollection = product.type === 'teaware' ? 'matcha' : 'teaware';

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
            <div className={`gallery-main ${selectedView?.src ? 'gallery-lifestyle' : 'gallery-product'} ${['blend-bundle', 'matcha-kit', 'whisk-holder-combo'].includes(product.handle) ? 'media-wide' : ''}`}>
              {selectedView?.src ? (
                <img src={selectedView.src} alt={selectedView.alt} />
              ) : (
                <ProductImage product={product} sizes="(max-width: 960px) 92vw, 660px" priority />
              )}
            </div>
            {gallery.length > 1 && (
              <div className="gallery-thumbs" role="group" aria-label="product views">
                {gallery.map((view, i) => (
                  <button key={view.alt} className={thumb === i ? 'on' : ''} onClick={() => setThumb(i)} aria-label={view.alt} aria-pressed={thumb === i}>
                    {view.src ? (
                      <img src={view.src} alt="" loading="lazy" />
                    ) : (
                      <ProductImage product={product} sizes="84px" decorative />
                    )}
                  </button>
                ))}
              </div>
            )}
            <p className="gallery-note">AI-generated imagery. Product appearance is illustrative.</p>
          </div>

          {/* info */}
          <div className="pdp-info">
            <h1 className="pdp-title">{product.name}</h1>
            <div className="pdp-rating">
              <a href="#reviews">customer reviews coming soon</a>
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
                {canSub && <button
                  className={`plan-opt ${plan === 'subscription' ? 'on' : ''}`}
                  onClick={() => setPlan('subscription')}
                  role="radio" aria-checked={plan === 'subscription'}
                >
                  <span className="po-name"><span>subscribe &amp; save</span><span className="po-price">{money(subscribePrice(product))}</span></span>
                  <span className="po-note"><span className="po-save">15% off every delivery</span></span>
                </button>}
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
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>free shipping from {money(FREE_SHIPPING_THRESHOLD)}+</span>
              {canSub && <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/></svg>skip or cancel anytime</span>}
              <span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>ships australia-wide</span>
            </div>
          </div>
        </div>
      </div>

      <section className="section pdp-reviews" id="reviews" aria-labelledby="pdp-reviews-title">
        <div className="wrap pdp-reviews-grid">
          <Reveal>
            <div>
              <span className="pdp-eyebrow">customer reviews</span>
              <h2 id="pdp-reviews-title">quiet words, soon.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p>verified reviews for {product.short} will appear here after launch. for now, the ritual is yours to discover.</p>
          </Reveal>
        </div>
      </section>

      <section className="section wrap pdp-faq" aria-labelledby="pdp-faq-title">
        <div className="home-faq-grid">
          <Reveal>
            <div className="home-faq-intro">
              <h2 id="pdp-faq-title">a few good questions</h2>
              <figure className="home-faq-image">
                <img src="/img/lifestyle/ritual-set.webp" alt="Matcha and teaware arranged for a morning ritual" loading="lazy" />
              </figure>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="home-faq-answers">
              <Accordion key={product.handle} items={faqItems} />
            </div>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section wrap pdp-related" aria-labelledby="pdp-related-title">
          <Reveal>
            <div className="pdp-related-heading">
              <span className="pdp-eyebrow">the next piece</span>
              <h2 id="pdp-related-title">made for your ritual</h2>
            </div>
          </Reveal>
          <div className="pdp-related-grid">
            {related.map((p, i) => (
              <Reveal key={p.handle} delay={i * 80}><ProductCard product={p} showRating={false} /></Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="wrap pdp-final-wrap" aria-labelledby="pdp-final-title">
        <div className="pdp-final">
          <div className="pdp-final-copy">
            <span className="pdp-eyebrow">the ritual continues</span>
            <h2 id="pdp-final-title">a little more room to slow down.</h2>
            <Link to={`/collections/${nextCollection}`} className="btn btn-light">shop {nextCollection}</Link>
          </div>
          <img src="/img/lifestyle/matcha-preparation.webp" alt="Hands whisking matcha in a ceramic bowl" loading="lazy" />
        </div>
      </section>
    </main>
  );
}
