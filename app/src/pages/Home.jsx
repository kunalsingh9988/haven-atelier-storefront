import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/catalogue';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

function Hero() {
  return (
    <section className="hero" aria-label="Haven Atelier Japanese matcha and teaware">
      <picture className="hero-media">
        <source media="(max-width: 700px)" srcSet="/img/lifestyle/ritual-set-mobile.webp" type="image/webp" />
        <img src="/img/lifestyle/ritual-set.webp" alt="Matcha being prepared with a bamboo whisk, bowl and tea tin" fetchPriority="high" />
      </picture>
      <div className="hero-lockup">
        <h1 className="hero-name">Japanese matcha &amp; teaware</h1>
        <Link to="/collections/matcha" className="btn btn-primary">Shop matcha</Link>
      </div>
    </section>
  );
}

const featuredGroups = [
  { id: 'best-sellers', title: 'BEST SELLERS', handles: ['everyday-blend', 'haven-bowl-1'] },
  { id: 'kits', title: 'KITS', handles: ['matcha-kit'] },
];

function FeaturedShop() {
  const [selected, setSelected] = useState(0);
  const group = featuredGroups[selected];

  function moveTab(event) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? featuredGroups.length - 1 : 1 - selected;
    setSelected(next);
    event.currentTarget.querySelectorAll('button')[next].focus();
  }

  return (
    <section className="section wrap home-shop" aria-label="Featured products">
      <div className="tabs shop-heading" role="tablist" aria-label="Featured products" onKeyDown={moveTab}>
        {featuredGroups.map(({ id, title }, index) => (
          <button key={id} type="button" id={`featured-${id}`} role="tab" aria-controls="featured-products"
            aria-selected={selected === index} tabIndex={selected === index ? 0 : -1}
            className={`tab-btn${selected === index ? ' active' : ''}`} onClick={() => setSelected(index)}>
            {title}
          </button>
        ))}
      </div>
      <div id="featured-products" className="rail" role="tabpanel" aria-labelledby={`featured-${group.id}`}>
        {getProducts(group.handles).map((product) => <ProductCard key={product.handle} product={product} showAlternate />)}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="section philosophy">
      <div className="wrap philo-grid">
        <Reveal>
          <div>
            <span className="kanji-big" aria-hidden="true">静</span>
            <blockquote>静 - means stillness. For Haven Atelier, it represents a state of quiet intention - the art of slowing down, being present and giving importance to the everyday.</blockquote>
            <p className="philo-copy">A quieter philosophy, expressed in every detail.</p>
            <Link to="/pages/our-story" className="btn btn-outline">Discover Our Story</Link>
          </div>
        </Reveal>
        <figure className="philo-film">
          <img src="/img/tea-plantation-shizuoka-fukuroi.jpg" alt="Tea fields in Shizuoka, Japan" loading="lazy" />
        </figure>
      </div>
    </section>
  );
}

const tiles = [
  { title: 'MATCHA', to: '/collections/matcha', link: 'Shop matcha', image: '/img/lifestyle/ritual-set.webp', alt: 'Matcha bowl and tea tools' },
  { title: 'TEAWARE', to: '/collections/teaware', link: 'Shop teaware', image: '/img/lifestyle/ceramic-bowl.webp', alt: 'Ceramic matcha bowl' },
  { title: 'HAVEN RECIPES', to: '/pages/the-atelier', link: 'Explore recipes', image: '/img/lifestyle/matcha-preparation.webp', alt: 'Matcha being whisked' },
];

function Tiles() {
  return (
    <section className="section-tight wrap" aria-label="Explore Haven Atelier">
      <div className="tile-grid">
        {tiles.map((tile) => (
          <Link to={tile.to} className="tile" key={tile.title}>
            <span className="tile-frame"><img src={tile.image} alt={tile.alt} loading="lazy" /></span>
            <span className="tile-text"><span className="tile-title">{tile.title}</span><span className="tile-link">{tile.link}</span></span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// The approved customer-video section belongs here when Anna supplies footage.
function YouAndHaven() { return null; }

function SubscribeSave() {
  return (
    <section className="section subscribe-simple">
      <div className="wrap subscribe-simple-grid">
        <div className="subscribe-simple-copy">
          <h2>Subscribe &amp; save 15%</h2>
          <p>Choose Everyday Blend or Premium Matcha and receive 15% off each delivery.</p>
          <p>Choose delivery every two weeks, every month or every two months.</p>
          <Link to="/collections/subscriptions" className="btn btn-primary">Shop subscriptions</Link>
        </div>
        <img src="/img/lifestyle/matcha-preparation.webp" alt="Matcha being whisked in a ceramic bowl" loading="lazy" />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedShop />
      <Philosophy />
      <Tiles />
      <YouAndHaven />
      <SubscribeSave />
    </main>
  );
}
