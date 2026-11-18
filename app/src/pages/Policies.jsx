import { Link } from 'react-router-dom';
import { CONTACT_EMAIL, FREE_SHIPPING_THRESHOLD, money } from '../data/catalogue';
import Reveal from '../components/Reveal';

export function ShippingReturns() {
  return (
    <Policy title="shipping & returns">
      <h2>shipping</h2>
      <p>we ship australia-wide. orders of {money(FREE_SHIPPING_THRESHOLD)} or more (after discounts) ship free; below that, a flat $9.95 applies. the same rules apply to every subscription delivery.</p>
      <p>estimated delivery is 2–8 business days from ordering, subject to destination and carrier. you'll receive tracking once your order ships.</p>
      <h2>order changes &amp; enquiries</h2>
      <p>for questions about your order, changes, delivery issues or returns, please email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with your order number and enquiry. we'll respond within 1–2 business days.</p>
      <p>changes depend on whether your order has already been processed or dispatched — the sooner you write, the more we can do.</p>
      <h2>returns</h2>
      <p>if your order arrives damaged or incorrect, email us within 14 days with your order number and photos, and we'll make it right. your australian consumer law rights always apply — nothing in this policy limits them.</p>
      <p>for everything else, our team will talk you through the options honestly.</p>
    </Policy>
  );
}

export function PrivacyPolicy() {
  return (
    <Policy title="privacy policy">
      <h2>what we collect</h2>
      <p>when you browse, buy or subscribe, we collect what we need to run the store: your name, email, shipping address, order and subscription history, and basic analytics about how the site is used. payment details are handled by our payment provider — we never see or store your card number.</p>
      <h2>how we use it</h2>
      <ul>
        <li>to fulfil and deliver your orders and subscriptions</li>
        <li>to send order, shipping and subscription emails you need</li>
        <li>to send the atelier newsletter — only if you join it, and you can leave anytime</li>
        <li>to understand which products people love, in aggregate</li>
      </ul>
      <h2>who we share it with</h2>
      <p>only the services required to run haven atelier: our shopify store, payment and shipping providers, our email platform, and our subscription and review apps. we do not sell your data.</p>
      <h2>your choices</h2>
      <p>unsubscribe from any email with one click, update your details in your account, or ask us to delete your data by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      <h2>cookies</h2>
      <p>we use essential cookies to keep your basket and session working, plus privacy-respecting analytics to see how the store is used.</p>
    </Policy>
  );
}

export function Terms() {
  return (
    <Policy title="terms & conditions">
      <h2>the agreement</h2>
      <p>by shopping at haven atelier you agree to these terms. if something here doesn't sit right, email us before ordering — we'd rather talk than enforce.</p>
      <h2>products &amp; pricing</h2>
      <ul>
        <li>all prices are in australian dollars and include applicable gst where required</li>
        <li>we photograph and describe our products carefully; colour and texture may vary slightly between batches</li>
        <li>matcha is a natural product — colour and flavour can vary a little between tins</li>
      </ul>
      <h2>subscriptions</h2>
      <ul>
        <li>subscribe &amp; save gives 15% off eligible matcha products, delivered every 2 weeks, monthly or every 2 months</li>
        <li>you can skip, pause, change frequency or quantity, update your details, or cancel any time from your account or the manage subscription link in our emails</li>
        <li>cancel before your next billing date to stop the next charge — changes take effect as shown at checkout</li>
        <li>the same free-shipping threshold applies to every subscription delivery</li>
      </ul>
      <h2>orders &amp; payment</h2>
      <p>we confirm your order by email once payment clears. we may decline or cancel orders affected by pricing errors, stock shortages or suspected fraud, with a full refund where payment was taken.</p>
      <h2>intellectual property</h2>
      <p>the haven atelier name, wordmark, photography and copy belong to us. please don't reproduce them without asking.</p>
      <h2>contact</h2>
      <p>questions about these terms: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
    </Policy>
  );
}

export function ManageSubscription() {
  return (
    <main>
      <div className="wrap" style={{ paddingBottom: 60 }}>
        <div className="page-head"><h1>manage subscription</h1></div>
        <Reveal delay={60}>
          <div className="sub-panel">
            <p style={{ color: 'var(--ink-soft)', marginBottom: 8 }}>this is where your recurring orders live.</p>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>in the live store this page is powered by your subscription account — every delivery, billing date and change you make is listed here.</p>
            <div className="sub-row">
              <span className="sr-k">current plan</span>
              <span className="sr-v">blend bundle · every month · $110.50 + shipping</span>
            </div>
            <div className="sub-row">
              <span className="sr-k">next delivery</span>
              <span className="sr-v">18 december 2026</span>
            </div>
            <div className="sub-row">
              <span className="sr-k">saving</span>
              <span className="sr-v">15% off every delivery</span>
            </div>
            <div className="sub-row">
              <span className="sr-k">status</span>
              <span className="sr-v">active</span>
            </div>
            <div className="sub-actions">
              <button className="btn btn-primary btn-sm">skip next delivery</button>
              <button className="btn btn-outline btn-sm">change frequency</button>
              <button className="btn btn-outline btn-sm">pause</button>
              <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>cancel subscription</button>
            </div>
            <p className="form-note">preview only — on launch, manage your subscription from your account or the link in any subscription email.</p>
          </div>
        </Reveal>
      </div>
    </main>
  );
}

function Policy({ title, children }) {
  return (
    <main>
      <div className="wrap">
        <div className="page-head"><h1 style={{ fontSize: 'clamp(32px,4vw,52px)' }}>{title}</h1></div>
        <Reveal delay={60}>
          <div className="policy">{children}</div>
        </Reveal>
      </div>
    </main>
  );
}
