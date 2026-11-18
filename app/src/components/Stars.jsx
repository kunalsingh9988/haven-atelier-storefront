export function StarIcon({ filled = true, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.9l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z" />
    </svg>
  );
}

export function Stars({ rating, count }) {
  const full = Math.round(rating || 0);
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`} style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ color: i <= full ? 'var(--olive)' : 'var(--line)' }}>
          <StarIcon filled={i <= full} />
        </span>
      ))}
      {count != null && count > 0 && <span style={{ color: 'var(--muted)', fontSize: 14, marginLeft: 6 }}>{count} review{count === 1 ? '' : 's'}</span>}
    </span>
  );
}
