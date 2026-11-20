import { useState } from 'react';

export default function Newsletter({ heading = 'join the atelier', copy = 'occasional letters on new blends, quiet rituals and small-batch releases. no noise, unsubscribe anytime.' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | ok | err

  const submit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState('err'); return; }
    setState('ok'); setEmail('');
  };

  return (
    <section className="section-tight wrap">
      <div className="newsletter rv">
        <div className="newsletter-content">
          <h2>{heading}</h2>
          <p>{copy}</p>
          {state === 'ok' ? (
            <div className="form-ok" style={{ background: 'rgba(244,245,236,.1)', color: 'var(--cream-on-dark)' }}>
              you're on the list — 静 see you in the next letter.
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <input
                type="email"
                placeholder="your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setState('idle'); }}
                aria-label="email address"
                required
              />
              <button type="submit" className="btn btn-light">join</button>
            </form>
          )}
          {state === 'err' && <p className="form-note" style={{ color: '#f0b9a8' }}>please enter a valid email address.</p>}
        </div>
        <div className="newsletter-image">
          <img
            src="/img/lifestyle/matcha-preparation.webp"
            alt="Hands whisking matcha in a ceramic bowl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
