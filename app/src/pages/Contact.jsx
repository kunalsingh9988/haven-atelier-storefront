import { useState } from 'react';
import { CONTACT_EMAIL } from '../data/catalogue';
import Reveal from '../components/Reveal';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'please tell us your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = 'please enter a valid email';
    if (form.message.trim().length < 10) er.message = 'a little more detail helps (10+ characters)';
    setErrors(er);
    if (Object.keys(er).length) return;
    // mailto fallback — wire to Shopify contact form / email service on launch
    const subject = encodeURIComponent(`haven atelier enquiry — ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main>
      <div className="wrap">
        <div className="page-head">
          <h1>Contact</h1>
        </div>
        <div className="contact-grid">
          <Reveal>
            <div className="contact-info">
              <div className="ci-item">
                <h3>say hello</h3>
                <p>we'd love to hear from you. for questions about your order, our products, wholesale or collaborations, get in touch below.</p>
                <p style={{ marginTop: 8 }}>we'll respond within 1–2 business days.</p>
              </div>
              <div className="ci-item">
                <h3>email</h3>
                <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
              </div>
              <div className="ci-item">
                <h3>based in</h3>
                <p>melbourne, australia — shipping australia-wide</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {sent ? (
              <div className="form-ok">
                <strong style={{ color: 'var(--forest)' }}>thank you for getting in touch.</strong>
                <p style={{ marginTop: 8 }}>we'll respond within 1–2 business days.</p>
                <button className="btn btn-outline btn-sm" style={{ marginTop: 18 }} onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}>send another message</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="field">
                  <label htmlFor="c-name">name</label>
                  <input id="c-name" type="text" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'c-name-err' : undefined} />
                  {errors.name && <div className="err" id="c-name-err">{errors.name}</div>}
                </div>
                <div className="field">
                  <label htmlFor="c-email">email</label>
                  <input id="c-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'c-email-err' : undefined} />
                  {errors.email && <div className="err" id="c-email-err">{errors.email}</div>}
                </div>
                <div className="field">
                  <label htmlFor="c-msg">message</label>
                  <textarea id="c-msg" value={form.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'c-msg-err' : undefined} />
                  {errors.message && <div className="err" id="c-msg-err">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary">send message</button>
                <p className="form-note">this opens your email app addressed to {CONTACT_EMAIL} — on launch this form delivers directly to our inbox.</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </main>
  );
}
