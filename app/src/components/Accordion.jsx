import { useEffect, useRef, useState } from 'react';

export default function Accordion({ items }) {
  const [open, setOpen] = useState(items.length ? 0 : -1);
  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <AccItem
          key={i}
          q={item.q}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
          id={`faq-a-${i}`}
        >
          <p>{item.a}</p>
        </AccItem>
      ))}
    </div>
  );
}

export function AccItem({ q, children, isOpen, onToggle, id }) {
  const inner = useRef(null);
  const [maxH, setMaxH] = useState(0);
  useEffect(() => {
    setMaxH(isOpen && inner.current ? inner.current.scrollHeight : 0);
  }, [isOpen, children]);
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button className="faq-q" onClick={onToggle} aria-expanded={isOpen} aria-controls={id}>
        <span>{q}</span>
        <span className="chev" aria-hidden="true" />
      </button>
      <div className="faq-a" id={id} role="region" style={{ maxHeight: maxH || undefined }}>
        <div ref={inner}>{children}</div>
      </div>
    </div>
  );
}
