import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/catalogue';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function Search() {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return products.filter((p) =>
      [p.name, p.short, p.tag, p.type, p.blurb, p.details].join(' ').toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <main>
      <div className="wrap">
        <div className="page-head">
          <h1>Search</h1>
          <p className="lede">find a blend, a bowl or the perfect whisk.</p>
        </div>
        <form className="search-bar" onSubmit={(e) => e.preventDefault()} role="search">
          <input
            type="search"
            placeholder="matcha, whisk, bowl…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="search products"
            autoFocus
          />
        </form>
        <div style={{ paddingBottom: 60 }}>
          {q.trim() && results.length === 0 && (
            <div className="empty-state">
              <span className="kanji" style={{ fontSize: 40, color: 'var(--sage)', display: 'block', marginBottom: 14 }}>静</span>
              <h2>nothing found for “{q}”</h2>
              <p>try “matcha”, “whisk” or “bowl” — or <Link to="/collections/all" style={{ color: 'var(--olive)' }}>browse everything</Link>.</p>
            </div>
          )}
          {!q.trim() && (
            <p className="muted">start typing to search the collection.</p>
          )}
          <div className="grid-4">
            {results.map((p, i) => (
              <Reveal key={p.handle} delay={(i % 4) * 60}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
