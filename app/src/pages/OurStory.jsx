import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

// Appendix A — approved copy, preserved verbatim (lowercase, punctuation, breaks).
const STORY = [
  ['p', 'haven atelier was born from a love for the little things. the quiet moments, thoughtful details and simple rituals that make everyday life feel a little more meaningful.'],
  ['p', 'i\'m anna, the founder of haven atelier.'],
  ['p', 'for the past eight years, i\'ve worked in the world of food, specialising in recipe, menu and product development. from working alongside chefs, nutritionists and food scientists to bringing new concepts to life, my career has always revolved around a curiosity for ingredients, flavour and the process of creating something from scratch.'],
  ['p', 'over the years, i\'ve developed a deep appreciation for quality, artistry and the thought that goes into making something truly special. i\'ve always believed that the smallest details make the biggest difference, whether it\'s the ingredients we choose, the way something is prepared or the experience it creates.'],
  ['p', 'i\'ve also always been someone with a million ideas, constantly creating, working on something new and thinking about what\'s next. and somewhere along the way, i\'ve come to appreciate the importance of slowing down and finding beauty in the everyday.'],
  ['p', 'haven atelier grew from that feeling.'],
  ['p', 'a desire to create something of my own that brings together my love for beautiful ingredients, thoughtful design and the art of making everyday moments feel a little more special.'],
  ['p', 'matcha felt like a natural place to begin. beyond the tea itself, i\'ve always loved the ritual of preparing it. the simple act of whisking a bowl of matcha, choosing your favourite cup and taking a few moments for yourself.'],
  ['p', 'inspired by japanese tea culture, haven atelier brings together carefully selected matcha and thoughtfully crafted objects, with a focus on quality, simplicity and intention.'],
  ['p', 'every detail has been considered, from the tea we source to the pieces we choose to accompany it.'],
  ['p', 'because to me, it\'s never just been about what we create, but how it makes someone feel.'],
];

export default function OurStory() {
  return (
    <main>
      <div className="wrap story-wrap">
        <Reveal>
          <p className="story-label">our story</p>
          <h1>a little more intention in the everyday.</h1>
        </Reveal>
        <Reveal delay={80}>
          <div className="story" style={{ marginTop: 30 }}>
            <figure className="portrait">
              <img src="/img/tea-minami-yamashiro-kyoto-01.jpg" alt="rows of tea bushes in kyoto — a temporary stand-in for anna's portrait" />
            </figure>
            {STORY.map(([tag, text], i) => (
              <p key={i} className={i === 2 ? 'soft' : ''}>{text}</p>
            ))}
            <p className="signoff">with love,<br />anna</p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="facts">
            <span>est. 2026 · melbourne, australia</span>
            <span>small-batch ceremonial matcha</span>
            <span>questions? <Link to="/pages/contact" style={{ color: 'var(--olive)' }}>say hello</Link></span>
          </div>
          <div style={{ marginTop: 44 }}>
            <Link to="/collections/matcha" className="btn btn-primary">shop matcha</Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
