import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { collections, collectionProducts, products } from '../data/catalogue';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';

export default function Collection() {
  const { handle } = useParams();
  const col = collections[handle];
  const [sort, setSort] = useState('featured');

  const items = useMemo(() => {
    const list = collectionProducts(handle) || products;
    const sorted = [...list];
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [handle, sort]);

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

        <div className="filter-row">
          <span className="filter-count">{items.length} product{items.length === 1 ? '' : 's'}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <label htmlFor="sort" style={{ fontSize: 14, color: 'var(--muted)' }}>sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ padding: '9px 14px', borderRadius: 999, border: '1.5px solid var(--line)', background: 'var(--card)', fontSize: 14 }}
            >
              <option value="featured">featured</option>
              <option value="price-asc">price · low to high</option>
              <option value="price-desc">price · high to low</option>
              <option value="name">name · a to z</option>
            </select>
          </div>
        </div>

        <div className="grid-4" style={{ paddingBottom: 40 }}>
          {items.map((p, i) => (
            <Reveal key={p.handle} delay={(i % 4) * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
