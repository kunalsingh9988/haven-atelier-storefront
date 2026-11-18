import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function NotFound() {
  return (
    <main>
      <div className="wrap">
        <div className="checkout-stub">
          <Reveal>
            <span className="kanji">静</span>
            <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', marginBottom: 14 }}>this page has wandered off</h1>
            <p className="lede" style={{ margin: '0 auto 28px', textAlign: 'center' }}>
              the link may be old, or the page may have moved. let's get you back to the stillness.
            </p>
            <Link to="/" className="btn btn-primary">back home</Link>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
