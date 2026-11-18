import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  products, getProducts, collectionProducts, homeReviews, recipes, faqs,
  money, INTERVALS, FREE_SHIPPING_THRESHOLD,
} from '../data/catalogue';
import { useCart } from '../store';
import ProductCard from '../components/ProductCard';
import ProductArt from '../components/ProductArt';
import Accordion from '../components/Accordion';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';

/* ---------------- hero ---------------- */
function Hero() {
  return (
    <section className="hero" aria-label="haven atelier — ceremonial grade matcha">
      <img src="/img/tea-minami-yamashiro-kyoto-01.jpg" alt="a tea plantation in kyoto, rows of green tea bushes" fetchPriority="high" />
      <div className="hero-scrim" />
      <div className="hero-bottom" aria-hidden="true" />
      <div className="hero-top">
        <span className="wordmark-mini">haven atelier</span>
        <nav aria-label="quick">
          <Link to="/collections/matcha">shop</Link>
          <Link to="/pages/our-story">our story</Link>
          <Link to="/pages/the-atelier">the atelier</Link>
          <Link to="/pages/contact">contact</Link>
        </nav>
      </div>
      <div className="hero-lockup">
        <h1 className="hero-name">haven</h1>
        <p className="hero-tagline">ceremonial grade matcha, uji japan</p>
      </div>
      <div className="hero-cta">
        <Link to="/collections/matcha" className="btn btn-light">shop matcha</Link>
      </div>
    </section>
  );
}

/* ---------------- best sellers / kits tabs ---------------- */
function ShopTabs() {
  const [tab, setTab] = useState('best');
  const best = getProducts(['everyday-blend', 'premium-matcha', 'haven-bowl-1']);
  const kits = getProducts(['matcha-kit', 'whisk-holder-combo', 'blend-bundle']);
  const items = tab === 'best' ? best : kits;
  return (
    <section className="section wrap">
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 34 }}>
          <h2 style={{ fontSize: 'clamp(30px,3.4vw,46px)' }}>the ones we reach for</h2>
          <div className="tabs" role="tablist" aria-label="product selection">
            <button className={`tab-btn ${tab === 'best' ? 'active' : ''}`} onClick={() => setTab('best')} role="tab" aria-selected={tab === 'best'}>best sellers</button>
            <button className={`tab-btn ${tab === 'kits' ? 'active' : ''}`} onClick={() => setTab('kits')} role="tab" aria-selected={tab === 'kits'}>kits</button>
          </div>
        </div>
      </Reveal>
      <div className="rail" key={tab}>
        {items.map((p, i) => (
          <Reveal key={p.handle} delay={i * 90} className="rv" style={{ minWidth: 0 }}>
            <div style={{ minWidth: 270 }}>
              <ProductCard product={p} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- philosophy ---------------- */
function Philosophy() {
  return (
    <section className="section philosophy">
      <div className="wrap">
        <Reveal>
          <span className="kanji-big" aria-hidden="true">静</span>
        </Reveal>
        <Reveal delay={100}>
          <div className="philo-grid">
            <blockquote>
              stillness. for Haven Atelier, it represents a state of quiet intention -<br />
              the art of slowing down, being present and giving importance to the everyday.
            </blockquote>
            <figure className="philo-film">
              <video autoPlay muted loop playsInline preload="metadata" poster="/img/matcha-whisking-poster.jpg" aria-label="matcha being whisked">
                <source src="/img/matcha-whisking.webm" type="video/webm" />
              </video>
              <figcaption>the whisk, up close — stone-milled matcha, quiet mornings</figcaption>
            </figure>
          </div>
        </Reveal>
        <Reveal delay={180}>
          <p className="philo-copy">a quieter philosophy, expressed in every detail.</p>
          <Link to="/pages/our-story" className="btn btn-light">discover our story</Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- category tiles ---------------- */
function Tiles() {
  const tiles = [
    {
      title: 'matcha', copy: 'everyday blend, premium matcha and the blend bundle',
      to: '/collections/matcha', link: 'shop matcha',
      bg: '/img/matcha-latte.jpg', alt: 'a glass of matcha latte',
    },
    {
      title: 'teaware', copy: 'bowls, whisks and the quiet tools of the ritual',
      to: '/collections/teaware', link: 'shop teaware',
      art: 'bowl-premium',
    },
    {
      title: 'haven recipes', copy: 'the classic bowl, lattes and slow afternoons',
      to: '/pages/the-atelier', link: 'explore recipes',
      bg: '/img/summer-wagashi-03.jpg', alt: 'japanese wagashi sweets on a quiet table',
    },
  ];
  return (
    <section className="section-tight wrap">
      <div className="tile-grid">
        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={i * 100}>
            <Link to={t.to} className={`tile ${t.art ? 'tile--art' : ''}`} aria-label={t.link}>
              {t.bg ? (
                <img src={t.bg} alt={t.alt} className="tile-ink" style={{ objectFit: 'cover', width: '100%', height: '100%' }} loading="lazy" />
              ) : (
                <span className="tile-art-wrap"><ProductArt art={t.art} /></span>
              )}
              <span className="tile-text">
                <h3>{t.title}</h3>
                <p>{t.copy}</p>
                <span className="tile-link">{t.link}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- ritual / mechanism ---------------- */
const RITUAL = [
  { img: '/img/matcha-tea-latte-with-rosetta-latte-art.jpg', alt: 'whisked matcha', no: '一', title: 'sift', body: 'first, the powder passes through a fine sifter — every clump caught, so the bowl starts silky. this is the step most people skip, and the one that makes the biggest difference.' },
  { img: '/img/chasen-top-oblique-fs-pnr-0500.jpg', alt: 'a bamboo chasen whisk', no: '二', title: 'measure', body: 'two grams — one level chashaku — loosened with a splash of warm water into a smooth paste. ceremony size, everyday patience.' },
  { img: '/img/japanese-tea-ceremony-20100502-japan-matsuri-02.jpg', alt: 'the tea being whisked', no: '三', title: 'whisk', body: 'seventy millilitres of water at eighty degrees, whisked briskly in a "w" motion until the surface breaks into a fine, even foam. about fifteen seconds of quiet work.' },
  { img: '/img/tea-bowl-chawan-with-leaf-image-1.jpg', alt: 'a ceramic chawan bowl', no: '四', title: 'rest', body: 'drink it slowly, in small sips, while it is still warm. the bowl is the point — ten unhurried minutes that belong to you.' },
];

function Ritual() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); }),
      { threshold: 0.45 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return (
    <section className="section wrap">
      <div className="ritual">
        <div className="ritual-visual">
          <div className="frame">
            {RITUAL.map((r, i) => (
              <img key={r.title} src={r.img} alt={r.alt} className={i === active ? 'on' : ''} loading="lazy" />
            ))}
          </div>
        </div>
        <div className="ritual-col">
          <Reveal>
            <h2 style={{ marginBottom: 8 }}>the way in</h2>
            <p className="lede" style={{ marginBottom: 20 }}>matcha is less a drink than a small ceremony. four quiet steps, the same every morning.</p>
          </Reveal>
          {RITUAL.map((r, i) => (
            <div
              className="ritual-step"
              key={r.title}
              data-i={i}
              ref={(el) => (refs.current[i] = el)}
            >
              <Reveal>
                <span className="step-no kanji">{r.no}</span>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </Reveal>
            </div>
          ))}
          <Reveal delay={80}>
            <Link to="/pages/the-atelier" className="link-arrow" style={{ marginTop: 26, display: 'inline-block' }}>read the full recipes</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- benefits ---------------- */
function Benefits() {
  const items = [
    { tag: 'shade-grown', title: 'the last weeks in shade', body: 'before harvest, the tea bushes rest under reed screens. less light means more theanine and a sweeter, calmer leaf — the reason ceremonial matcha tastes nothing like supermarket green tea.', img: '/img/tea-plantation-shizuoka-fukuroi.jpg', alt: 'rows of green tea bushes on a hillside' },
    { tag: 'stone-milled', title: 'ground the slow way', body: 'granite mills turn the dried leaf into powder at a few grams per hour, keeping the leaf cool so its colour and flavour stay intact. never heat-blasted, never hurried.', img: '/img/uji-tea-box-02.jpg', alt: 'a box of uji tea' },
    { tag: 'whole leaf', title: 'you drink the entire leaf', body: 'unlike steeped tea, matcha is the whole shade-grown leaf, whisked into the water. more fibre, more calm, more of the leaf\'s quiet energy in every bowl.', img: '/img/tea-bowl-chawan-with-leaf-image-1.jpg', alt: 'a ceramic tea bowl with a tea leaf' },
    { tag: 'nothing added', title: 'two ingredients, nothing else', body: 'stone-milled leaf and water. no flavourings, no fillers, no shortcuts — just the leaf, the water temperature, and fifteen seconds of your attention.', img: '/img/chasen-top-oblique-fs-pnr-0500.jpg', alt: 'a bamboo tea whisk seen from above' },
  ];
  return (
    <section className="section wrap" style={{ background: 'var(--surface)', borderRadius: 'var(--radius)', padding: 'clamp(56px,7vw,110px) var(--pad-x)' }}>
      <Reveal>
        <div className="sec-split">
          <h2>why ceremonial grade matters</h2>
          <p className="lede">the difference between matcha and green-tea powder is the same as the difference between wine and juice — process, patience, and place.</p>
        </div>
      </Reveal>
      {items.map((b, i) => (
        <Reveal key={b.title} delay={i * 60}>
          <div className="benefit">
            <div className="benefit-panel">
              <img src={b.img} alt={b.alt} loading="lazy" />
            </div>
            <div>
              <span className="benefit-tag">{b.tag}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ---------------- you + haven (customer videos) ---------------- */
const CLIPS = [
  { img: '/img/matcha-latte.jpg', alt: 'a customer\'s morning matcha latte', cap: 'first bowl, slow morning — @ customer film 01' },
  { img: '/img/japanese-tea-ceremony-20100502-japan-matsuri-02.jpg', alt: 'a customer whisking matcha', cap: 'learning the w-motion — @ customer film 02' },
  { img: '/img/summer-wagashi-03.jpg', alt: 'matcha paired with japanese sweets', cap: 'matcha and wagashi — @ customer film 03' },
];

function YouAndHaven() {
  const [clip, setClip] = useState(null);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setClip(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <section className="section-tight wrap">
      <Reveal>
        <h2 className="center" style={{ marginBottom: 8 }}>you + haven</h2>
        <p className="lede center" style={{ margin: '0 auto 8px', textAlign: 'center' }}>quiet clips from the people who start their mornings with a bowl.</p>
      </Reveal>
      <div className="story-cards">
        {CLIPS.map((c, i) => (
          <Reveal key={c.img} delay={i * 90}>
            <button className="story-card" onClick={() => setClip(c)} aria-label={`play ${c.cap}`}>
              <img src={c.img} alt={c.alt} loading="lazy" />
              <span className="sc-veil" />
              <span className="sc-play">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <span className="sc-cap">{c.cap}</span>
            </button>
          </Reveal>
        ))}
      </div>

      <div className={`vmodal-scrim ${clip ? 'open' : ''}`} onClick={() => setClip(null)} role="dialog" aria-modal="true" aria-label="customer clip">
        <div className="vmodal" onClick={(e) => e.stopPropagation()}>
          <div className="vmodal-frame">
            {clip && <img src={clip.img} alt={clip.alt} />}
            <button className="vmodal-close" onClick={() => setClip(null)} aria-label="close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <div className="vmodal-play">
              <button className="play-btn" onClick={() => setClip(null)} aria-label="close clip">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </div>
          </div>
          <div className="vmodal-info">
            <h3>customer film — coming soon</h3>
            <p>{clip?.cap}. approved footage is being prepared and will appear here closer to launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- subscribe & save ---------------- */
function SubscribeSave() {
  const [blend, setBlend] = useState('everyday-blend');
  const [interval, setInterval] = useState('1m');
  const p = products.find((x) => x.handle === blend);
  const sub = p.subPrice;
  const bowls = p.tag === 'bundle' ? 60 : 30;
  const perBowl = sub ? (sub / bowls).toFixed(2) : null;
  const shipFree = sub >= FREE_SHIPPING_THRESHOLD;
  const next = new Date(Date.now() + INTERVALS.find((i) => i.id === interval).days * 864e5);
  const nextStr = next.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <section className="section sub-save">
      <div className="wrap grid-2">
        <Reveal>
          <h2 style={{ marginBottom: 18 }}>your bowl, on repeat</h2>
          <p className="lede" style={{ marginBottom: 26 }}>
            subscribe &amp; save — choose a rhythm and every delivery arrives 15% off. everyday for the daily bowl, premium when you want to slow right down.
            skip, pause or cancel any time.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px', display: 'grid', gap: 12 }}>
            {['15% off every delivery', 'three rhythms — 2 weeks, monthly, 2 months', 'manage or cancel any time'].map((t) => (
              <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'var(--ink-soft)' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--olive)" strokeWidth="2.4" strokeLinecap="round"><path d="m5 13 4 4L19 7" /></svg>
                {t}
              </li>
            ))}
          </ul>
          <Link to="/collections/matcha" className="btn btn-primary">shop matcha</Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="calc" aria-label="subscription calculator">
            <div>
              <label htmlFor="calc-blend">choose your blend</label>
              <select id="calc-blend" value={blend} onChange={(e) => setBlend(e.target.value)}>
                <option value="everyday-blend">everyday blend — 30 g</option>
                <option value="premium-matcha">premium matcha — 30 g</option>
              </select>
            </div>
            <div>
              <label htmlFor="calc-interval">delivery rhythm</label>
              <select id="calc-interval" value={interval} onChange={(e) => setInterval(e.target.value)}>
                {INTERVALS.map((i) => <option key={i.id} value={i.id}>{i.label}</option>)}
              </select>
            </div>
            <div className="calc-out">
              <div>
                <div className="calc-price">{money(sub)}</div>
                <div className="calc-note">{money(sub / bowls)} per bowl · {money(p.price)} one-time</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className={`calc-ship ${shipFree ? 'free' : ''}`}>{shipFree ? 'free shipping' : `+ ${money(9.95)} shipping`}</div>
                <div className="calc-note">next delivery ~ {nextStr}</div>
              </div>
            </div>
            <Link to={`/products/${blend}`} className="btn btn-olive btn-block">start my subscription</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- reviews ---------------- */
function Reviews() {
  return (
    <section className="section reviews-band">
      <div className="wrap">
        <Reveal>
          <h2 className="center" style={{ color: 'var(--cream-on-dark)' }}>quiet words</h2>
          <p className="lede center" style={{ margin: '14px auto 0', textAlign: 'center', color: 'rgba(244,245,236,.75)' }}>
            what the first bowls are saying — real reviews will live on every product page.
          </p>
        </Reveal>
        <div className="review-grid">
          {homeReviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 100}>
              <figure className="review-card">
                <div className="review-stars" aria-label={`${r.rating} stars`} style={{ display: 'inline-flex', gap: 3 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= r.rating ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.9l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z" /></svg>
                ))}
              </div>
                <blockquote>“{r.quote}”</blockquote>
                <figcaption className="review-who">{r.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- atelier teaser ---------------- */
function AtelierTeaser() {
  const picks = recipes.slice(0, 3);
  return (
    <section className="section wrap">
      <Reveal>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap', marginBottom: 40 }}>
          <div>
            <h2>the atelier</h2>
            <p className="lede" style={{ marginTop: 12, maxWidth: '44ch' }}>recipes for the quiet rituals — the classic bowl, slow lattes and iced afternoons.</p>
          </div>
          <Link to="/pages/the-atelier" className="link-arrow">all recipes</Link>
        </div>
      </Reveal>
      <div className="stagger">
        <Reveal><figure className="ph w60 tall"><img src={`/img/${picks[0].image}`} alt={picks[0].alt} loading="lazy" /><figcaption>{picks[0].title}</figcaption></figure></Reveal>
        <Reveal><figure className="ph w33 tall" style={{ marginTop: 60 }}><img src={`/img/${picks[1].image}`} alt={picks[1].alt} loading="lazy" /><figcaption>{picks[1].title}</figcaption></figure></Reveal>
        <Reveal><figure className="ph w48 wide"><img src={`/img/${picks[2].image}`} alt={picks[2].alt} loading="lazy" /><figcaption>{picks[2].title}</figcaption></figure></Reveal>
      </div>
    </section>
  );
}

/* ---------------- faq ---------------- */
function HomeFaq() {
  return (
    <section className="section wrap">
      <Reveal>
        <h2 style={{ marginBottom: 50 }}>questions, answered quietly</h2>
      </Reveal>
      <Reveal delay={80}>
        <Accordion items={faqs.slice(0, 5)} />
      </Reveal>
      <Reveal delay={140}>
        <p style={{ marginTop: 26 }}><Link to="/pages/faqs" className="link-arrow">all faqs</Link></p>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ShopTabs />
      <Philosophy />
      <Tiles />
      <Ritual />
      <Benefits />
      <YouAndHaven />
      <SubscribeSave />
      <Reviews />
      <AtelierTeaser />
      <HomeFaq />
      <Newsletter />
    </main>
  );
}
