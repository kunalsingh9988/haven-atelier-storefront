import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { money } from '../data/catalogue';
import { useCart } from '../store';
import { Stars } from './Stars';

export { Stars } from './Stars';

export default function ProductCard({ product, quickAdd = true, showTag = false, showRating = true }) {
  const { add } = useCart();
  const canSub = product.subPrice != null;
  return (
    <article className="card">
      <Link to={`/products/${product.handle}`} className="card-media" aria-label={product.name}>
        <ProductImage product={product} sizes="(max-width: 720px) 280px, (max-width: 1080px) 33vw, 440px" decorative />
        {canSub && <span className="card-badge">save 15%</span>}
      </Link>
      <div className="card-body">
        {showTag && <span className="card-tag">{product.tag}</span>}
        <Link to={`/products/${product.handle}`} className="card-name">{product.name}</Link>
        {showRating && <Stars rating={product.rating} />}
        <div className="card-price">
          {money(product.price)}
          {canSub && <span style={{ color: 'var(--olive)', fontSize: 14, fontWeight: 500 }}>or {money(product.subPrice)} subscribed</span>}
        </div>
        {quickAdd && (
          <div className="card-foot">
            <button className="card-quick" onClick={() => add(product.handle, 1, 'onetime')}>add to cart</button>
          </div>
        )}
      </div>
    </article>
  );
}
