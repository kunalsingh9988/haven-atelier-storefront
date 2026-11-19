import { Link, useParams } from 'react-router-dom';
import { recipes, getProduct, money } from '../data/catalogue';
import ProductImage from '../components/ProductImage';
import Reveal from '../components/Reveal';

export default function Recipe() {
  const { handle } = useParams();
  const recipe = recipes.find((r) => r.handle === handle);
  if (!recipe) {
    return (
      <main className="wrap">
        <div className="empty-state" style={{ paddingTop: 120 }}>
          <h1>recipe not found</h1>
          <p><Link to="/pages/the-atelier" style={{ color: 'var(--olive)', textDecoration: 'underline' }}>back to the atelier</Link></p>
        </div>
      </main>
    );
  }
  const product = getProduct(recipe.product);

  return (
    <main>
      <div className="wrap">
        <nav className="crumbs" style={{ paddingTop: 26 }} aria-label="breadcrumb">
          <Link to="/">home</Link><span>/</span><Link to="/pages/the-atelier">the atelier</Link><span>/</span><span>{recipe.title}</span>
        </nav>

        <div className="recipe-hero">
          <Reveal>
            <div className="ph"><img src={`/img/${recipe.image}`} alt={recipe.alt} /></div>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{ fontSize: 'clamp(32px,4vw,54px)', marginBottom: 18 }}>{recipe.title}</h1>
            <p className="lede">{recipe.description}</p>
          </Reveal>
        </div>

        <div className="recipe-cols">
          <Reveal>
            <div>
              <h3>ingredients</h3>
              <ul>
                {recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
              </ul>
            </div>
            <div style={{ marginTop: 44 }}>
              <h3>shop the matcha</h3>
              <Link to={`/products/${product.handle}`} className="card" style={{ flexDirection: 'row', textDecoration: 'none' }}>
                <div style={{ width: 110, flexShrink: 0 }}><ProductImage product={product} sizes="110px" decorative /></div>
                <div style={{ padding: '14px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--forest)' }}>{product.name}</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>{money(product.price)} · 30 g tin</div>
                  <div style={{ marginTop: 10 }}><span className="btn btn-primary btn-sm">shop now</span></div>
                </div>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="recipe-method">
              <h3>method</h3>
              <ol>
                {recipe.method.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
