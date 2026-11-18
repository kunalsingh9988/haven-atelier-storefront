import { faqs } from '../data/catalogue';
import Accordion from '../components/Accordion';
import Reveal from '../components/Reveal';
import { Link } from 'react-router-dom';

export default function Faqs() {
  return (
    <main>
      <div className="wrap" style={{ paddingBottom: 40 }}>
        <div className="page-head">
          <h1>FAQs</h1>
          <p className="lede">the questions we hear most — and if yours isn't here, <Link to="/pages/contact" style={{ color: 'var(--olive)' }}>get in touch</Link>.</p>
        </div>
        <Reveal delay={80}>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </main>
  );
}
