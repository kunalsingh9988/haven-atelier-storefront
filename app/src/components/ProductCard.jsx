import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { lifestyleImages } from '../data/lifestyle';
import { money } from '../data/catalogue';
import { useCart } from '../store';
export default function ProductCard({ product, quickAdd = true, showTag = false, showAlternate = false }) {
  const { add } = useCart();
  const canSub = product.subPrice != null;
  const alternate = showAlternate ? lifestyleImages(product)[0] : null;
  return (
    <article className="card">
      <Link to={`/products/${product.handle}`} className="card-media" aria-label={product.name}>
        <ProductImage product={product} sizes="(max-width: 720px) 280px, (max-width: 1080px) 33vw, 440px" decorative />
        {alternate && <img className="card-alternate" src={alternate.src} alt="" loading="lazy" />}
        {canSub && <span className="card-badge">save 15%</span>}
      </Link>
      <div className="card-body">
        {showTag && <span className="card-tag">{product.tag.toUpperCase()}</span>}
        <Link to={`/products/${product.handle}`} className="card-name">{product.name}</Link>
        <div className="card-price">
          {money(product.price)}
          {canSub && <span>or {money(product.subPrice)} subscribed</span>}
        </div>
        {quickAdd && (
          <div className="card-foot">
            {canSub
              ? <Link className="card-quick" to={`/products/${product.handle}`}>Choose options</Link>
              : <button className="card-quick" onClick={() => add(product.handle, 1, 'onetime')}>Add to cart</button>}
          </div>
        )}
      </div>
    </article>
  );
}
