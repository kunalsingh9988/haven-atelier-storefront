import { recipes } from '../data/catalogue';
import RecipeGrid from '../components/RecipeGrid';
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
        <RecipeGrid recipes={recipes} />
      </div>
      <Newsletter heading="letters from the atelier" copy="new recipes and small-batch news, occasionally. no noise." />
    </main>
  );
}
