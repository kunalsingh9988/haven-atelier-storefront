import { Link } from 'react-router-dom';
import { recipes } from '../data/catalogue';
import Reveal from '../components/Reveal';
import Newsletter from '../components/Newsletter';

export default function Atelier() {
  return (
    <main>
      <div className="wrap">
        <div className="page-head">
          <h1>The Atelier</h1>
          <p className="lede">recipes for the quiet rituals — how we like to drink our matcha, step by step.</p>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="stagger">
          {recipes.map((r, i) => (
            <Reveal key={r.handle} delay={i * 100}>
              <Link to={`/recipes/${r.handle}`} style={{ display: 'block' }}>
                <figure className={`ph ${i === 0 ? 'w60 tall' : i === 1 ? 'w33 tall' : 'w48 wide'}`} style={i === 1 ? { marginTop: 50 } : {}}>
                  <img src={`/img/${r.image}`} alt={r.alt} loading="lazy" />
                  <figcaption style={{ padding: '12px 4px 0' }}>{r.title}</figcaption>
                </figure>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
      <Newsletter heading="letters from the atelier" copy="new recipes and small-batch news, occasionally. no noise." />
    </main>
  );
}
