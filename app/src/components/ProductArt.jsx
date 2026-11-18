// Flat SVG product renders — one consistent graphic language in brand colours.
// Replaced by real product photography once Haven's shoot lands (Dec 2026).

const C = {
  cream: '#f1f2ed', card: '#f8f9f3', surface: '#dde1d1', surface2: '#d0d6bd',
  ink: '#42413d', forest: '#273c03', forest2: '#1d2d02', olive: '#536c06',
  oliveDeep: '#425505', sage: '#abc183', sageDeep: '#8aa862', sageLight: '#c9d8ab',
  clay: '#b98d6a', steel: '#9aa3a0', gold: '#c9a35b', white: '#fbfbf7',
};

function Tin({ label, body, band, accent }) {
  return (
    <g>
      {/* body */}
      <rect x="120" y="120" width="160" height="190" rx="14" fill={body} />
      <rect x="120" y="120" width="160" height="26" rx="13" fill={accent || C.sageDeep} />
      <rect x="132" y="252" width="136" height="46" rx="8" fill={C.card} />
      <rect x="146" y="264" width="72" height="9" rx="4.5" fill={C.olive} />
      <rect x="146" y="279" width="50" height="7" rx="3.5" fill={C.ink} opacity=".45" />
      {/* lid rim */}
      <rect x="112" y="104" width="176" height="22" rx="10" fill={band || C.ink} opacity=".9" />
      <rect x="120" y="120" width="160" height="190" rx="14" fill="none" stroke={C.ink} strokeOpacity=".12" />
    </g>
  );
}

function Whisk({ cx = 200, cy = 200, scale = 1 }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      {/* handle */}
      <rect x="-9" y="-150" width="18" height="86" rx="9" fill={C.ink} />
      <rect x="-12" y="-76" width="24" height="14" rx="7" fill={C.olive} />
      {/* tines — fan of tapered strokes */}
      {[-46, -34, -22, -10, 2, 14, 26, 38, 48].map((dx, i) => (
        <path
          key={i}
          d={`M ${dx * 0.32} -64 Q ${dx * 0.75} 30 ${dx} 96`}
          stroke={i % 2 ? C.sageDeep : C.olive}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      ))}
      {/* tine tips */}
      <ellipse cx="0" cy="96" rx="58" ry="10" fill={C.sageLight} opacity=".55" />
    </g>
  );
}

function Bowl({ cx = 200, cy = 210, r = 120, body = C.sage, rim = C.sageDeep, matcha = C.olive }) {
  return (
    <g>
      {/* foot */}
      <ellipse cx={cx} cy={cy + r * 0.62} rx={r * 0.42} ry={r * 0.16} fill={rim} />
      {/* body */}
      <path d={`M ${cx - r} ${cy - r * 0.15} Q ${cx - r * 0.9} ${cy + r * 0.6} ${cx} ${cy + r * 0.62} Q ${cx + r * 0.9} ${cy + r * 0.6} ${cx + r} ${cy - r * 0.15} Z`} fill={body} />
      {/* rim + interior */}
      <ellipse cx={cx} cy={cy - r * 0.15} rx={r} ry={r * 0.34} fill={rim} />
      <ellipse cx={cx} cy={cy - r * 0.15} rx={r * 0.82} ry={r * 0.26} fill={matcha} />
      {/* matcha surface sheen */}
      <ellipse cx={cx - r * 0.18} cy={cy - r * 0.22} rx={r * 0.3} ry={r * 0.1} fill={C.cream} opacity=".25" />
    </g>
  );
}

const ARTS = {
  'pouch-everyday': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#dfe6cd" />
      <rect x="118" y="86" width="164" height="252" rx="18" fill={C.sage} />
      <rect x="118" y="86" width="164" height="40" rx="18" fill={C.sageDeep} />
      <rect x="118" y="112" width="164" height="14" fill={C.sageDeep} />
      <rect x="138" y="150" width="124" height="150" rx="10" fill={C.card} />
      <rect x="152" y="166" width="96" height="10" rx="5" fill={C.olive} />
      <rect x="152" y="184" width="66" height="8" rx="4" fill={C.ink} opacity=".4" />
      <rect x="152" y="200" width="80" height="8" rx="4" fill={C.ink} opacity=".25" />
      <circle cx="200" cy="252" r="17" fill={C.sageDeep} />
      <text x="200" y="258" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fill={C.card}>静</text>
      <path d="M118 306 q82 26 164 0 l0 32 q-82 26 -164 0 z" fill={C.sageDeep} opacity=".55" />
    </g>
  ),
  'pouch-premium': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#d8dfc8" />
      <rect x="118" y="86" width="164" height="252" rx="18" fill={C.forest} />
      <rect x="118" y="86" width="164" height="40" rx="18" fill={C.forest2} />
      <rect x="118" y="112" width="164" height="14" fill={C.forest2} />
      <rect x="138" y="150" width="124" height="150" rx="10" fill={C.card} />
      <rect x="152" y="166" width="96" height="10" rx="5" fill={C.olive} />
      <rect x="152" y="184" width="70" height="8" rx="4" fill={C.ink} opacity=".4" />
      <rect x="152" y="200" width="58" height="8" rx="4" fill={C.ink} opacity=".25" />
      <rect x="152" y="216" width="84" height="8" rx="4" fill={C.ink} opacity=".18" />
      <circle cx="200" cy="258" r="17" fill={C.sage} />
      <text x="200" y="264" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fill={C.forest}>静</text>
      <rect x="168" y="286" width="64" height="3" rx="1.5" fill={C.gold} opacity=".9" />
      <path d="M118 306 q82 26 164 0 l0 32 q-82 26 -164 0 z" fill={C.forest2} opacity=".6" />
    </g>
  ),
  'bundle': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e2e6d4" />
      {/* back tin — premium */}
      <g transform="translate(-18 14) rotate(-4 200 220)">
        <rect x="140" y="100" width="130" height="220" rx="14" fill={C.forest} />
        <rect x="140" y="100" width="130" height="30" rx="13" fill={C.forest2} />
        <rect x="154" y="150" width="102" height="110" rx="8" fill={C.card} opacity=".95" />
      </g>
      {/* front tin — everyday */}
      <g transform="translate(14 -6) rotate(3 200 220)">
        <rect x="130" y="110" width="150" height="212" rx="15" fill={C.sage} />
        <rect x="130" y="110" width="150" height="32" rx="14" fill={C.sageDeep} />
        <rect x="146" y="164" width="118" height="120" rx="9" fill={C.card} />
        <rect x="160" y="178" width="90" height="10" rx="5" fill={C.olive} />
        <rect x="160" y="196" width="62" height="8" rx="4" fill={C.ink} opacity=".4" />
        <rect x="160" y="212" width="76" height="8" rx="4" fill={C.ink} opacity=".25" />
        <circle cx="200" cy="252" r="15" fill={C.sageDeep} />
        <text x="200" y="258" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fill={C.card}>静</text>
      </g>
    </g>
  ),
  'kit': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e6e9d8" />
      {/* open box */}
      <path d="M70 240 L200 190 L330 240 L330 330 Q200 360 70 330 Z" fill={C.sageLight} />
      <path d="M70 240 L200 190 L330 240" fill="none" stroke={C.sageDeep} strokeWidth="4" />
      <path d="M70 240 L70 330 Q200 360 330 330 L330 240" fill="none" stroke={C.sageDeep} strokeWidth="3" opacity=".5" />
      {/* tin inside */}
      <g transform="translate(0 -30)">
        <Tin label="x" body={C.sage} band={C.sageDeep} accent={C.sageDeep} />
        <g transform="translate(0 -40) scale(.8) translate(-50 -60)">
          <rect x="120" y="120" width="160" height="190" rx="14" fill={C.sage} />
          <rect x="120" y="120" width="160" height="26" rx="13" fill={C.sageDeep} />
          <rect x="132" y="252" width="136" height="46" rx="8" fill={C.card} />
          <rect x="146" y="264" width="72" height="9" rx="4.5" fill={C.olive} />
          <rect x="146" y="279" width="50" height="7" rx="3.5" fill={C.ink} opacity=".45" />
          <rect x="112" y="104" width="176" height="22" rx="10" fill={C.sageDeep} opacity=".9" />
        </g>
      </g>
      {/* whisk leaning */}
      <g transform="translate(292 120) rotate(18) scale(.62)">
        <Whisk />
      </g>
      {/* sifter + spoon resting on box edge */}
      <ellipse cx="118" cy="252" rx="30" ry="9" fill={C.olive} opacity=".85" transform="rotate(-8 118 252)" />
      <rect x="96" y="240" width="46" height="7" rx="3.5" fill={C.ink} opacity=".8" transform="rotate(-8 118 252)" />
      <g transform="translate(84 214) rotate(-14)">
        <rect x="-4" y="-30" width="8" height="60" rx="4" fill={C.ink} />
        <ellipse cx="0" cy="34" rx="16" ry="10" fill={C.sageDeep} />
      </g>
    </g>
  ),
  'bowl': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e2e6d2" />
      {/* saucer shade */}
      <ellipse cx="200" cy="292" rx="150" ry="26" fill={C.surface2} />
      <Bowl body={C.sage} rim={C.sageDeep} matcha={C.olive} />
      {/* rim highlight */}
      <path d="M 96 176 Q 200 138 304 176" stroke={C.cream} strokeWidth="5" fill="none" opacity=".5" strokeLinecap="round" />
      <Whisk cx={200} cy={120} scale={0.5} />
    </g>
  ),
  'bowl-premium': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#d9dfc9" />
      <ellipse cx="200" cy="296" rx="152" ry="26" fill={C.surface2} />
      <Bowl body={C.forest} rim={C.forest2} matcha={C.olive} />
      <path d="M 96 176 Q 200 138 304 176" stroke={C.sage} strokeWidth="5" fill="none" opacity=".55" strokeLinecap="round" />
      <Whisk cx={200} cy={112} scale={0.48} />
    </g>
  ),
  'whisk': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e4e8d6" />
      <ellipse cx="200" cy="316" rx="110" ry="18" fill={C.surface2} />
      <Whisk />
      {/* water dish */}
      <ellipse cx="200" cy="330" rx="86" ry="14" fill={C.sageLight} opacity=".8" />
    </g>
  ),
  'sifter': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#eceee0" />
      <ellipse cx="200" cy="300" rx="120" ry="20" fill={C.surface2} />
      {/* cone sifter */}
      <path d="M150 140 L250 140 L286 268 Q200 292 114 268 Z" fill={C.sage} />
      <ellipse cx="200" cy="140" rx="50" ry="16" fill={C.sageDeep} />
      <ellipse cx="200" cy="140" rx="38" ry="11" fill={C.olive} />
      <rect x="150" y="140" width="100" height="10" fill={C.sageDeep} opacity=".6" />
      <path d="M130 250 Q200 276 270 250" stroke={C.sageDeep} strokeWidth="4" fill="none" opacity=".5" />
      {/* dust of matcha */}
      <circle cx="176" cy="120" r="3" fill={C.olive} opacity=".6" />
      <circle cx="224" cy="112" r="2.4" fill={C.olive} opacity=".5" />
      <circle cx="200" cy="126" r="2" fill={C.olive} opacity=".45" />
    </g>
  ),
  'spoon': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e7ead9" />
      <ellipse cx="200" cy="300" rx="130" ry="20" fill={C.surface2} />
      {/* chashaku-style scoop, diagonal */}
      <g transform="translate(200 210) rotate(-24)">
        <rect x="-8" y="-140" width="16" height="180" rx="8" fill={C.ink} />
        <path d="M -8 -140 Q -34 -160 0 -176 Q 34 -160 8 -140 Z" fill={C.sageDeep} />
        <ellipse cx="0" cy="-150" rx="26" ry="10" fill={C.olive} transform="rotate(0)" opacity=".9" />
      </g>
      {/* powder mound */}
      <ellipse cx="200" cy="296" rx="70" ry="14" fill={C.olive} opacity=".28" />
    </g>
  ),
  'holder': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e4e8d6" />
      <ellipse cx="200" cy="310" rx="120" ry="18" fill={C.surface2} />
      {/* ceramic holder cup */}
      <path d="M140 190 L260 190 L246 300 Q200 316 154 300 Z" fill={C.sage} />
      <ellipse cx="200" cy="190" rx="60" ry="16" fill={C.sageDeep} />
      <ellipse cx="200" cy="190" rx="46" ry="11" fill={C.cream} opacity=".5" />
      {/* whisk resting inside */}
      <g transform="translate(200 190) scale(.52)">
        <Whisk cy={-10} />
      </g>
      <Whisk cx={200} cy={150} scale={0.5} />
      <ellipse cx="200" cy="196" rx="34" ry="8" fill={C.sageLight} opacity=".7" />
    </g>
  ),
  'combo': (
    <g>
      <rect x="0" y="0" width="400" height="400" fill="#e2e6d2" />
      {/* holder */}
      <g transform="translate(128 96)">
        <path d="M52 96 L168 96 L154 206 Q110 222 66 206 Z" fill={C.sage} />
        <ellipse cx="110" cy="96" rx="58" ry="15" fill={C.sageDeep} />
        <ellipse cx="110" cy="96" rx="44" ry="10" fill={C.cream} opacity=".45" />
      </g>
      {/* whisk leaning on holder */}
      <g transform="translate(252 108) rotate(16) scale(.6)">
        <Whisk />
      </g>
      <ellipse cx="200" cy="330" rx="130" ry="18" fill={C.surface2} />
    </g>
  ),
};

export default function ProductArt({ art, className = '' }) {
  return (
    <svg className={`art ${className}`} viewBox="0 0 400 400" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {ARTS[art] || ARTS['pouch-everyday']}
    </svg>
  );
}
