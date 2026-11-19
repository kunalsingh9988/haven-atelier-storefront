import { Link } from 'react-router-dom';

export default function RecipeGrid({ recipes }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <Link key={recipe.handle} to={`/recipes/${recipe.handle}`} className="recipe-card">
          <img src={`/img/${recipe.image}`} alt={recipe.alt} loading="lazy" />
          <h3>{recipe.title}</h3>
        </Link>
      ))}
    </div>
  );
}
