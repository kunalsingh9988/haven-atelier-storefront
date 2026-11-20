import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collections, collectionProducts, products } from '../data/catalogue';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';

const shopFilters = [
  { id: 'all', label: 'all', matches: () => true },
  { id: 'matcha', label: 'matcha', matches: (p) => p.type === 'matcha' },
  { id: 'sets', label: 'kits & bundles', matches: (p) => ['bundle', 'kit', 'combo'].includes(p.tag) },
  { id: 'bowls', label: 'bowls', matches: (p) => p.tag === 'bowl' },
  { id: 'tools', label: 'tools', matches: (p) => p.tag === 'tool' },
];

export default function Collection() {
  const { handle } = useParams();
  const col = collections[handle];
  const [sort, setSort] = useState('featured');
  const [filter, setFilter] = useState('all');
  const [price, setPrice] = useState('all');
  const isShopAll = handle === 'all';

  const items = useMemo(() => {
    const list = collectionProducts(handle) || products;
    const visible = isShopAll
      ? list.filter((p) => shopFilters.find((option) => option.id === filter).matches(p))
        .filter((p) => price === 'all' || (price === 'under-50' && p.price < 50)
          || (price === '50-150' && p.price >= 50 && p.price < 150)
          || (price === '150-plus' && p.price >= 150))
      : list;
    const sorted = [...visible];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [handle, sort, filter, price, isShopAll]);

  if (!col) {
    return (
      <main className="wrap">
        <div className="empty-state" style={{ paddingTop: 120 }}>
          <h1>nothing here yet</h1>
          <p>that collection doesn't exist — try the <Link to="/collections/all" style={{ color: 'var(--olive)', textDecoration: 'underline' }}>full collection</Link>.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="wrap">
        <div className="page-head">
          <nav className="crumbs" aria-label="breadcrumb">
            <Link to="/">home</Link><span>/</span><span>shop</span><span>/</span><span>{col.title.toLowerCase()}</span>
          </nav>
          <h1>{col.title}</h1>
          <p className="lede">{col.blurb}</p>
        </div>

        {isShopAll && (
          <div className="shop-filter-chips" role="group" aria-label="filter products by type">
            {shopFilters.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`shop-filter-chip${filter === option.id ? ' active' : ''}`}
                aria-pressed={filter === option.id}
                onClick={() => setFilter(option.id)}
              >
                {option.label} <span>{products.filter(option.matches).length}</span>
              </button>
            ))}
          </div>
        )}

        <div className="filter-row">
          <span className="filter-count" aria-live="polite">{items.length} product{items.length === 1 ? '' : 's'}</span>
          <div className="filter-controls">
            {isShopAll && (
              <label className="filter-select">
                <span>price</span>
                <select value={price} onChange={(e) => setPrice(e.target.value)}>
                  <option value="all">any price</option>
                  <option value="under-50">under $50</option>
                  <option value="50-150">$50–$149</option>
                  <option value="150-plus">$150+</option>
                </select>
              </label>
            )}
            <label className="filter-select" htmlFor="sort">
              <span>sort</span>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">featured</option>
                <option value="price-asc">price · low to high</option>
                <option value="price-desc">price · high to low</option>
                <option value="name">name · a to z</option>
              </select>
            </label>
          </div>
        </div>

        {items.length ? (
          <div className="grid-4" style={{ paddingBottom: 40 }}>
            {items.map((p, i) => (
              <Reveal key={p.handle} delay={(i % 4) * 80}>
                <ProductCard product={p} showTag={isShopAll} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="shop-filter-empty">
            <p>no products match these filters.</p>
            <button type="button" className="link-arrow" onClick={() => { setFilter('all'); setPrice('all'); }}>clear filters</button>
          </div>
        )}
      </div>
      <Newsletter />
    </main>
  );
}
