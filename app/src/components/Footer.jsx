import { useState } from 'react';
import { Link } from 'react-router-dom';
import { footerLinks, CONTACT_EMAIL } from '../data/catalogue';

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4v10.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 4c.6 2.8 2.4 4.4 5 4.7" />
    </svg>
  );
}

const socials = [
  { label: 'instagram', Icon: InstagramIcon },
  { label: 'tiktok', Icon: TikTokIcon },
];

export default function Footer() {
  const [expanded, setExpanded] = useState({});
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="kanji">静</span>
            <span className="word">HAVEN</span>
            <p>ceremonial grade matcha and thoughtfully crafted teaware, for a quieter everyday.</p>
            <div className="footer-social-wrap">
              <span className="footer-social-heading">Socials</span>
              <div className="footer-social">
              {socials.map(({ label, Icon }) => (
                <span key={label} className="social-btn" role="img" aria-label={label}>
                  <Icon />
                </span>
              ))}
              </div>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {[
              { title: 'shop', links: footerLinks.shop },
              { title: 'explore', links: footerLinks.explore },
              { title: 'support', links: footerLinks.support },
            ].map((col) => (
              <div className="footer-col" key={col.title}>
                <h4 className="footer-col-title">{col.title}</h4>
                <button type="button" className="footer-col-toggle" aria-expanded={Boolean(expanded[col.title])}
                  aria-controls={`footer-${col.title}`}
                  onClick={() => setExpanded((current) => ({ ...current, [col.title]: !current[col.title] }))}>
                  {col.title}<span aria-hidden="true">{expanded[col.title] ? '−' : '+'}</span>
                </button>
                <div id={`footer-${col.title}`} className="footer-col-links">
                  {col.links.map((link) => (
                    <Link key={link.label} to={link.external ? '/pages/the-atelier' : link.path}>{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-legal-row">
          <span>© 2026 haven atelier · australia</span>
          <span style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            <Link to="/pages/privacy-policy">privacy policy</Link>
            <Link to="/pages/manage-subscription">manage subscription</Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </span>
        </div>
        <details className="footer-credits">
          <summary>Image credits</summary>
          <p>Product and lifestyle images are AI-generated concepts. Other pictures via Wikimedia Commons —{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Tea-plantation_Shizuoka-Fukuroi.jpg" target="_blank" rel="noopener noreferrer">tea plantation, shizuoka</a> by MaedaAkihiko,{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>;{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Chasen-top_oblique-fs_PNr%C2%B00500.jpg" target="_blank" rel="noopener noreferrer">chasen</a> by D-Kuru,{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>;{' '}
          <a href="https://commons.wikimedia.org/w/index.php?curid=10252865" target="_blank" rel="noopener noreferrer">tea ceremony</a> by Georges Seguin (Okki),{' '}
          <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a>;{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Tea_Bowl_(Chawan)_with_Leaf_LACMA_58.49.5_(1_of_2).jpg" target="_blank" rel="noopener noreferrer">tea bowl</a>, public domain;{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Matcha_tea_latte_with_rosetta_latte_art.jpg" target="_blank" rel="noopener noreferrer">matcha latte</a> by Irvan Ary Maulana,{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>;{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Tea_Minami-yamashiro,_Kyoto_01.jpg" target="_blank" rel="noopener noreferrer">uji plantation</a> by vera46,{' '}
          <a href="https://creativecommons.org/licenses/by/2.0" target="_blank" rel="noopener noreferrer">CC BY 2.0</a>;{' '}
          <a href="https://commons.wikimedia.org/w/index.php?curid=42939336" target="_blank" rel="noopener noreferrer">wagashi</a> by Douglas Perkins, CC0;{' '}
          <a href="https://commons.wikimedia.org/wiki/File:Uji_tea_box_02.jpg" target="_blank" rel="noopener noreferrer">uji tea</a>, CC0;{' '}
          <a href="https://commons.wikimedia.org/w/index.php?curid=127618604" target="_blank" rel="noopener noreferrer">matcha latte</a> by Marife.altabano,{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.
          </p>
        </details>
      </div>

      <div className="footer-giant" aria-hidden="true">HAVEN</div>
    </footer>
  );
}
