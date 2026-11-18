import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

export default function Checkout() {
  return (
    <main>
      <div className="wrap">
        <div className="checkout-stub">
          <Reveal>
            <span className="kanji">静</span>
            <h1 style={{ fontSize: 'clamp(30px,4vw,46px)', marginBottom: 14 }}>secure checkout</h1>
            <p className="lede" style={{ margin: '0 auto 28px', textAlign: 'center' }}>
              in the live store this is Shopify's checkout — payment, shipping and order review, all handled by shopify.
            </p>
            <Link to="/collections/all" className="btn btn-primary">continue shopping</Link>
            <p className="form-note" style={{ marginTop: 16 }}>demo build — checkout wiring happens on the real store.</p>
          </Reveal>
        </div>
      </div>
    </main>
  );
}
