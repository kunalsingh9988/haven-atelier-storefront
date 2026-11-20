import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { getProducts, money, nav } from '../data/catalogue';
import { useCart } from '../store';
import ProductImage from './ProductImage';

const menuProducts = getProducts(['everyday-blend', 'premium-matcha', 'matcha-kit']);

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l-1.2 12.2a1.5 1.5 0 0 1-1.5 1.3H8.7a1.5 1.5 0 0 1-1.5-1.3L6 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [desktopShopMode, setDesktopShopMode] = useState(null);
  const { add, count, setDrawerOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false); setShopOpen(false); setDesktopShopMode(null);
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', menuOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <>
      <div className="announce">Free shipping from $120+</div>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap header-inner">
          <Link to="/" className="brand" aria-label="haven atelier — home">
            <span className="brand-mark kanji">静</span>
            <span className="brand-word">haven atelier</span>
          </Link>

          <nav className="nav-desktop" aria-label="primary">
            {nav.map((item) =>
              item.children ? (
                <div
                  className="nav-item"
                  key={item.label}
                  onMouseEnter={() => setDesktopShopMode((mode) => mode ?? 'hover')}
                  onMouseLeave={() => setDesktopShopMode((mode) => mode === 'hover' ? null : mode)}
                  onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setDesktopShopMode(null); }}
                  onKeyDown={(event) => { if (event.key === 'Escape') { setDesktopShopMode(null); event.currentTarget.querySelector('button')?.focus(); } }}
                >
                  <button
                    type="button"
                    className="nav-link nav-shop-trigger"
                    aria-expanded={desktopShopMode !== null}
                    aria-controls="desktop-shop-menu"
                    onClick={() => setDesktopShopMode((mode) => mode === 'click' ? null : 'click')}
                  >
                    {item.label} <span className="caret" aria-hidden="true">▾</span>
                  </button>
                  <div id="desktop-shop-menu" className={`nav-dropdown ${desktopShopMode ? 'open' : ''}`}>
                    <div className="nav-dropdown-links">
                      <span className="nav-dropdown-label">SHOP BY CATEGORY</span>
                      {item.children.map((c) => <Link key={c.path} to={c.path} onClick={() => setDesktopShopMode(null)}>{c.label}</Link>)}
                    </div>
                    <div className="nav-dropdown-featured">
                      <span className="nav-dropdown-label">FEATURED</span>
                      <div className="nav-dropdown-products">
                        {menuProducts.map((product) => (
                          <Link key={product.handle} to={`/products/${product.handle}`} onClick={() => setDesktopShopMode(null)}>
                            <span className="nav-dropdown-image"><ProductImage product={product} decorative sizes="140px" /></span>
                            <span>{product.short}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={item.label} to={item.path} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
                  {item.label}
                </NavLink>
              )
            )}
          </nav>

          <div className="header-actions">
            <Link to="/search" className="icon-btn" aria-label="search">
              <SearchIcon />
            </Link>
            <button className="icon-btn" onClick={() => setDrawerOpen(true)} aria-label={`cart, ${count} items`}>
              <BagIcon />
              {count > 0 && <span className="cart-count">{count}</span>}
            </button>
            <button className="icon-btn burger" onClick={() => setMenuOpen(true)} aria-label="open menu">
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark kanji">静</span>
            <span className="brand-word">haven atelier</span>
          </Link>
          <button className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="close menu" style={{ width: 42, height: 42 }}>
            <CloseIcon />
          </button>
        </div>
        <nav className="mobile-links" aria-label="mobile">
          {nav.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setShopOpen((v) => !v)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', fontFamily: 'var(--font-display)', fontSize: 'clamp(30px,8vw,44px)', lineHeight: 1.15, padding: '14px 0', color: 'var(--forest)', textAlign: 'left' }}
                  aria-expanded={shopOpen}
                >
                  {item.label} <span className="sub">{shopOpen ? '−' : '+'}</span>
                </button>
                {shopOpen && (
                  <div className="mobile-sub">
                    {item.children.map((c) => (
                      <Link key={c.path} to={c.path} onClick={() => setMenuOpen(false)}>{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.label} to={item.path} onClick={() => setMenuOpen(false)}>{item.label}</Link>
            )
          )}
        </nav>
        <section className="mobile-menu-featured" aria-label="featured products">
          <h2>for your first bowl</h2>
          <div className="mobile-menu-products">
            {menuProducts.slice(0, 2).map((product) => (
              <article className="mobile-menu-product" key={product.handle}>
                <Link to={`/products/${product.handle}`} onClick={() => setMenuOpen(false)} className="mobile-menu-product-image" aria-label={`view ${product.name}`}>
                  <ProductImage product={product} sizes="(max-width: 960px) 160px, 1px" decorative />
                </Link>
                <Link to={`/products/${product.handle}`} onClick={() => setMenuOpen(false)} className="mobile-menu-product-name">{product.short}</Link>
                <span className="mobile-menu-product-price">{money(product.price)}</span>
                <button type="button" onClick={() => { setMenuOpen(false); add(product.handle, 1, 'onetime'); }} aria-label={`add ${product.name} to cart`}>add to cart</button>
              </article>
            ))}
          </div>
        </section>
        <div className="mobile-foot">
          <Link to="/pages/faqs" onClick={() => setMenuOpen(false)} style={{ fontSize: 16, color: 'var(--ink-soft)' }}>faqs</Link>
          <Link to="/pages/contact" onClick={() => setMenuOpen(false)} className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', marginTop: 10 }}>contact us</Link>
        </div>
      </div>
    </>
  );
}
