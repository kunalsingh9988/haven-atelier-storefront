// Haven Atelier — launch catalogue (15 Nov 2026 brief) + site content.
// Prices AUD. Subscription discount 15% applies to Everyday and Premium only.

export const FREE_SHIPPING_THRESHOLD = 120;
export const FLAT_SHIPPING = 9.95;
export const SUB_DISCOUNT = 0.15;
export const CONTACT_EMAIL = 'info@havenateliermatcha.com';
export const SHIPPING_COPY = 'Australia only. Free shipping on goods totals of $120 or more after discounts. Flat $9.95 below $120. These rules apply to each subscription delivery. Estimated delivery is 2–8 business days from ordering, subject to confirmation.';

export const INTERVALS = [
  { id: '2w', label: 'every 2 weeks', days: 14 },
  { id: '1m', label: 'every month', days: 30 },
  { id: '2m', label: 'every 2 months', days: 61 },
];

export const products = [
  {
    handle: 'everyday-blend',
    name: 'Haven Everyday Blend',
    short: 'Everyday Blend',
    tag: 'everyday',
    type: 'matcha',
    price: 60,
    compareAt: null,
    subPrice: 51,
    hue: '#abc183',
    rating: 4.9,
    reviewCount: 0,
    blurb: 'our everyday matcha — smooth, gently sweet and easy to drink. shade-grown, stone-milled ceremonial grade for quiet mornings and slow afternoons.',
    details: '30 g tin · roughly 30 servings · ceremonial grade',
    contents: '30 g ceremonial grade matcha',
    collections: ['matcha', 'best-sellers', 'all', 'subscriptions'],
    pairs: ['whisk-holder-combo', 'japanese-sifter', 'haven-spoon'],
  },
  {
    handle: 'premium-matcha',
    name: 'Haven Premium Matcha',
    short: 'Premium Matcha',
    tag: 'premium',
    type: 'matcha',
    price: 82,
    compareAt: null,
    subPrice: 69.7,
    hue: '#536c06',
    rating: 5.0,
    reviewCount: 0,
    blurb: 'our deepest, most layered matcha. first-harvest leaves, shade-grown and stone-milled for a umami-rich bowl with a long, clean finish.',
    details: '30 g tin · roughly 30 servings · ceremonial grade, first harvest',
    contents: '30 g premium ceremonial matcha',
    collections: ['matcha', 'all', 'subscriptions'],
    pairs: ['blend-bundle', 'haven-bowl-1', 'japanese-sifter'],
  },
  {
    handle: 'blend-bundle',
    name: 'Haven Blend Bundle',
    short: 'Blend Bundle',
    tag: 'bundle',
    type: 'bundle',
    price: 130,
    compareAt: null,
    subPrice: null,
    hue: '#273c03',
    rating: 4.9,
    reviewCount: 0,
    blurb: 'both blends in one delivery — everyday for the daily bowl, premium for when you want to slow right down. available as a one-time purchase.',
    details: 'Everyday Blend 30 g + Premium Matcha 30 g',
    contents: 'two 30 g tins — Everyday + Premium',
    collections: ['matcha', 'all'],
    pairs: ['haven-matcha-kit', 'whisk-holder-combo', 'haven-bowl-1'],
  },
  {
    handle: 'matcha-kit',
    name: 'Haven Matcha Kit',
    short: 'Matcha Kit',
    tag: 'kit',
    type: 'kit',
    price: 165,
    compareAt: null,
    subPrice: null,
    hue: '#a9bc85',
    rating: 4.8,
    reviewCount: 0,
    blurb: 'everything you need for a proper bowl — Everyday Blend, bamboo whisk, whisk holder, japanese sifter and haven spoon. fixed contents, ready to begin.',
    details: 'Everyday Blend 30 g · whisk · holder · sifter · spoon',
    contents: 'fixed kit — no variants',
    collections: ['matcha', 'kits', 'all'],
    pairs: ['haven-bowl-1', 'blend-bundle', 'everyday-blend'],
  },
  {
    handle: 'haven-bowl-1',
    name: 'Haven Bowl 1',
    short: 'Bowl 1',
    tag: 'bowl',
    type: 'teaware',
    price: 165,
    compareAt: null,
    subPrice: null,
    hue: '#42413d',
    rating: 4.9,
    reviewCount: 0,
    blurb: 'our everyday chawan — wide enough to whisk freely, calm enough to keep on the table. hand-finished ceramic in a quiet sage glaze.',
    details: 'hand-finished ceramic · sage glaze',
    contents: 'one chawan bowl',
    collections: ['teaware', 'best-sellers', 'all'],
    pairs: ['matcha-kit', 'haven-whisk', 'blend-bundle'],
  },
  {
    handle: 'haven-bowl-2-premium',
    name: 'Haven Bowl 2 Premium',
    short: 'Bowl 2 Premium',
    tag: 'bowl',
    type: 'teaware',
    price: 285,
    compareAt: null,
    subPrice: null,
    hue: '#273c03',
    rating: 5.0,
    reviewCount: 0,
    blurb: 'our most considered piece — a deeper, hand-thrown chawan with a foot ring and an unglazed rim that drinks in the first warm bowl.',
    details: 'hand-thrown stoneware · deep glaze · foot ring',
    contents: 'one premium chawan bowl',
    collections: ['teaware', 'all'],
    pairs: ['haven-bowl-1', 'haven-whisk', 'premium-matcha'],
  },
  {
    handle: 'haven-whisk',
    name: 'Haven Whisk',
    short: 'Whisk',
    tag: 'tool',
    type: 'teaware',
    price: 47,
    compareAt: null,
    subPrice: null,
    hue: '#c4d2a8',
    rating: 4.7,
    reviewCount: 0,
    blurb: 'a chasen woven from a single piece of bamboo — eighty fine tines that lift the tea into a fine, lasting foam.',
    details: 'bamboo · ~80 tines · stands upright in water',
    contents: 'one chasen whisk',
    collections: ['teaware', 'all'],
    pairs: ['whisk-holder-combo', 'haven-spoon', 'japanese-sifter'],
  },
  {
    handle: 'japanese-sifter',
    name: 'Japanese Sifter',
    short: 'Sifter',
    tag: 'tool',
    type: 'teaware',
    price: 35,
    compareAt: null,
    subPrice: null,
    hue: '#e6ead9',
    rating: 4.8,
    reviewCount: 0,
    blurb: 'removes every clump before the water goes in — the quiet step that decides whether your bowl is silky or gritty.',
    details: 'fine-mesh sifter · fits a 30 g tin measure',
    contents: 'one sifter',
    collections: ['teaware', 'all'],
    pairs: ['haven-whisk', 'haven-spoon', 'everyday-blend'],
  },
  {
    handle: 'haven-spoon',
    name: 'Haven Spoon',
    short: 'Spoon',
    tag: 'tool',
    type: 'teaware',
    price: 18,
    compareAt: null,
    subPrice: null,
    hue: '#9aa87e',
    rating: 4.9,
    reviewCount: 0,
    blurb: 'a chashaku-style scoop, shaped for a level two-gram measure and a wrist that stays still.',
    details: 'bamboo scoop · exact 2 g measure',
    contents: 'one bamboo scoop',
    collections: ['teaware', 'all'],
    pairs: ['japanese-sifter', 'haven-whisk', 'premium-matcha'],
  },
  {
    handle: 'whisk-holder',
    name: 'Whisk Holder',
    short: 'Whisk Holder',
    tag: 'tool',
    type: 'teaware',
    price: 28,
    compareAt: null,
    subPrice: null,
    hue: '#5a6b35',
    rating: 4.7,
    reviewCount: 0,
    blurb: 'lets the chasen dry upright between bowls, tines down in a little water — the way it was meant to rest.',
    details: 'glazed ceramic · keeps whisk upright',
    contents: 'one ceramic holder',
    collections: ['teaware', 'all'],
    pairs: ['haven-whisk', 'whisk-holder-combo', 'haven-spoon'],
  },
  {
    handle: 'whisk-holder-combo',
    name: 'Whisk + Holder Combo',
    short: 'Whisk + Holder',
    tag: 'combo',
    type: 'teaware',
    price: 70,
    compareAt: null,
    subPrice: null,
    hue: '#536c06',
    rating: 4.8,
    reviewCount: 0,
    blurb: 'the whisk and its holder together — the pair that keeps your chasen in shape bowl after bowl.',
    details: 'chasen + ceramic holder · bundled saving',
    contents: 'whisk + whisk holder',
    collections: ['teaware', 'all'],
    pairs: ['japanese-sifter', 'everyday-blend', 'haven-bowl-1'],
  },
];

export const collections = {
  'matcha': { title: 'Matcha', path: '/collections/matcha', blurb: 'shade-grown, stone-milled ceremonial matcha — for the daily bowl and the deep one.' },
  'kits': { title: 'Kits', path: '/collections/kits', blurb: 'everything you need to begin, gathered in one box.' },
  'teaware': { title: 'Teaware', path: '/collections/teaware', blurb: 'bowls, whisks and the quiet tools of the ritual.' },
  'best-sellers': { title: 'Best Sellers', path: '/collections/best-sellers', blurb: 'the pieces our customers reach for most.' },
  'all': { title: 'All Products', path: '/collections/all', blurb: 'the full haven atelier launch collection.' },
  'subscriptions': { title: 'Subscriptions', path: '/collections/subscriptions', blurb: 'save 15% on Everyday Blend or Premium Matcha with a rhythm that suits you.' },
};

export const getProduct = (handle) => products.find((p) => p.handle === handle);
export const getProducts = (handles) => handles.map(getProduct).filter(Boolean);
export const collectionProducts = (key) => products.filter((p) => p.collections.includes(key));

// Curated demo content — PLACEHOLDER until genuine reviews load in Shopify.
export const sampleReviews = {
  'everyday-blend': [
    { name: 'Maya', meta: 'Everyday Blend · 30 g', rating: 5, text: 'so smooth — i whisk it every morning before the house wakes up. no bitterness at all, even with regular tap water.' },
    { name: 'Tom', meta: 'Everyday Blend · subscription', rating: 5, text: 'the monthly delivery means i never run out. the 30 g tin lasts me about a month at two bowls a day.' },
    { name: 'Priya', meta: 'Everyday Blend', rating: 4, text: 'genuinely grassy-sweet. i was nervous buying ceremonial grade for lattes but it holds up beautifully with oat milk.' },
  ],
  'premium-matcha': [
    { name: 'Sofia', meta: 'Premium Matcha · 30 g', rating: 5, text: 'this is the real thing — deep umami, almost sweet on its own. you can taste the difference immediately.' },
    { name: 'James', meta: 'Premium Matcha', rating: 5, text: 'worth every cent. the foam is thick and glossy and the bowl tastes like a proper tea house.' },
  ],
  'blend-bundle': [
    { name: 'Elena', meta: 'Blend Bundle · subscription', rating: 5, text: 'both blends arriving together is perfect — everyday for mornings, premium when i want to slow down properly.' },
  ],
  'matcha-kit': [
    { name: 'Hannah', meta: 'Matcha Kit', rating: 5, text: 'everything arrived together and the whisk is genuinely lovely to use. felt like a gift to myself.' },
    { name: 'Luke', meta: 'Matcha Kit', rating: 4, text: 'great starter kit — the sifter makes a real difference. would love a bowl option too.' },
  ],
  'haven-bowl-1': [
    { name: 'Aisha', meta: 'Bowl 1', rating: 5, text: 'the glaze is the most beautiful soft sage. it sits on my shelf like a little piece of the outdoors.' },
  ],
  'haven-bowl-2-premium': [
    { name: 'Daniel', meta: 'Bowl 2 Premium', rating: 5, text: 'you can feel the handwork in it — the weight, the unglazed rim. this is the bowl i reach for.' },
  ],
  'haven-whisk': [
    { name: 'Mei', meta: 'Whisk', rating: 5, text: 'the tines are so fine and the foam it makes is unreal. first proper chasen i have owned.' },
  ],
  'japanese-sifter': [
    { name: 'Chris', meta: 'Sifter', rating: 5, text: 'tiny thing, huge difference. my matcha went from gritty to silky with this alone.' },
  ],
  'haven-spoon': [
    { name: 'Nina', meta: 'Spoon', rating: 5, text: 'perfect measure every time. simple, well made, does exactly what it should.' },
  ],
  'whisk-holder': [
    { name: 'Omar', meta: 'Whisk Holder', rating: 4, text: 'my whisk finally stands upright and dries properly. keeps the tines in shape nicely.' },
  ],
  'whisk-holder-combo': [
    { name: 'Grace', meta: 'Whisk + Holder', rating: 5, text: 'the pair together for less than buying separately — and the holder is prettier than i expected.' },
  ],
};

export const productReviews = (p) => sampleReviews[p.handle] || [];

export const homeReviews = [
  { quote: 'the bowl i make every morning has become the calmest ten minutes of my day. the matcha is smooth, the ritual is simple, and the packaging feels like it was made with intention.', name: 'Maya · Everyday Blend subscriber', rating: 5 },
  { quote: 'i came for the tea and stayed for the whole feeling of it. everything from the tin to the whisk holder is considered. this is what premium should feel like.', name: 'Sofia · Premium Matcha', rating: 5 },
  { quote: 'the kit arrived and i whisked my first proper bowl that evening. thick foam, clean flavour, and it genuinely slowed me down. exactly what i needed.', name: 'Hannah · Matcha Kit', rating: 5 },
];

export const recipes = [
  {
    handle: 'the-classic-bowl',
    title: 'the classic bowl',
    image: 'matcha-latte.jpg',
    alt: 'a whisked bowl of matcha',
    description: 'the simplest way to drink ceremonial grade — two grams, seventy millilitres of warm water, and a chasen doing its quiet work.',
    product: 'everyday-blend',
    ingredients: ['2 g haven everyday blend', '70 ml water at 80°C', 'optional: a little warm water to loosen the powder'],
    method: [
      'sift the matcha into your chawan to break up any clumps.',
      'add a splash of warm water and stir into a smooth paste with your chashaku.',
      'pour in the remaining 70 ml of water at 80°C.',
      'whisk briskly in a "w" motion until the surface is covered in a fine, even foam — about fifteen seconds.',
      'drink slowly, in small sips, while it is still warm.',
    ],
  },
  {
    handle: 'slow-morning-latte',
    title: 'the slow morning latte',
    image: 'matcha-tea-latte-with-rosetta-latte-art.jpg',
    alt: 'a matcha latte with latte art',
    description: 'for days when the ritual needs milk — whisk your matcha as usual, then pour it over warm oat milk for a gentler bowl.',
    product: 'premium-matcha',
    ingredients: ['2 g haven premium matcha', '60 ml water at 80°C', '150 ml oat milk, warmed', 'optional: a few drops of honey'],
    method: [
      'sift the premium matcha and loosen it with a little warm water.',
      'add the rest of the water and whisk to a fine foam.',
      'warm the oat milk until just steaming — never boiling.',
      'pour the milk gently over the whisked matcha.',
      'finish with a little honey if you like it softer.',
    ],
  },
  {
    handle: 'midday-iced-bowl',
    title: 'the midday iced bowl',
    image: 'summer-wagashi-03.jpg',
    alt: 'japanese sweets and a quiet afternoon',
    description: 'for warm afternoons — the same whisked matcha, poured over ice and finished with a light layer of cold milk.',
    product: 'everyday-blend',
    ingredients: ['2 g haven everyday blend', '70 ml water at 80°C', 'ice, to fill your glass', '50 ml cold milk or water'],
    method: [
      'sift the matcha into a chawan and add a splash of warm water.',
      'whisk with the full 70 ml of warm water until foamy.',
      'fill a glass generously with ice.',
      'pour the whisked matcha over the ice.',
      'top with cold milk or water and stir once before drinking.',
    ],
  },
];

export const faqs = [
  {
    q: 'how does subscribe & save work?',
    a: 'choose subscribe & save on any eligible matcha product page and pick a delivery rhythm — every 2 weeks, every month or every 2 months. your order arrives automatically at 15% off, and you can skip, pause, change frequency or cancel any time from your account or the manage subscription link in your emails.',
  },
  {
    q: 'everyday blend vs premium matcha — what is different?',
    a: 'everyday blend is our smooth, gently sweet daily bowl. premium matcha is first-harvest, shade-grown ceremonial grade — deeper, more umami-rich and best enjoyed slowly, straight or as a latte. both are stone-milled in small batches.',
  },
  {
    q: 'how long does a 30 g tin last?',
    a: 'at the traditional two-gram measure, a 30 g tin makes roughly 30 bowls — about a month at one bowl a day, or two weeks at two. the blend bundle gives you both blends at once.',
  },
  {
    q: 'how should i store my matcha?',
    a: 'keep the tin tightly sealed in a cool, dark place and use it within about eight weeks of opening for the freshest flavour. an airtight container in the fridge works well; bring it back to room temperature before whisking.',
  },
  {
    q: 'what are your shipping rates and delivery times?',
    a: SHIPPING_COPY,
  },
  {
    q: 'can i change or cancel my subscription?',
    a: 'absolutely — use the manage subscription link in your account, footer or any subscription email to skip a delivery, pause, change frequency or quantity, update your details, or cancel. changes take effect as shown before your next billing date.',
  },
  {
    q: 'is the matcha caffeinated?',
    a: 'yes — matcha is whole green tea leaf, so it naturally contains caffeine along with l-theanine, which is why many people find it calmer and more focused than coffee. it contains roughly the caffeine of a strong cup of tea per bowl.',
  },
  {
    q: 'what is your returns policy?',
    a: 'if something arrives damaged or incorrect, email us within 14 days with your order number and we will make it right. for everything else — order changes, delivery issues or returns — email info@havenateliermatcha.com and we will respond within 1–2 business days. your australian consumer law rights always apply.',
  },
];

export const nav = [
  { label: 'shop', path: '/collections/all', children: [
    { label: 'matcha', path: '/collections/matcha' },
    { label: 'kits', path: '/collections/kits' },
    { label: 'teaware', path: '/collections/teaware' },
    { label: 'best sellers', path: '/collections/best-sellers' },
    { label: 'all products', path: '/collections/all' },
  ]},
  { label: 'our story', path: '/pages/our-story' },
  { label: 'the atelier', path: '/pages/the-atelier' },
  { label: 'contact', path: '/pages/contact' },
];

export const footerLinks = {
  shop: [
    { label: 'matcha', path: '/collections/matcha' },
    { label: 'kits', path: '/collections/kits' },
    { label: 'teaware', path: '/collections/teaware' },
    { label: 'all products', path: '/collections/all' },
  ],
  explore: [
    { label: 'our story', path: '/pages/our-story' },
    { label: 'the atelier', path: '/collections/all', external: true },
  ],
  support: [
    { label: 'contact', path: '/pages/contact' },
    { label: 'shipping & returns', path: '/pages/shipping-returns' },
    { label: 'faqs', path: '/pages/faqs' },
    { label: 'terms & conditions', path: '/pages/terms' },
  ],
};

export const money = (n) =>
  n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`;

export const subscribePrice = (p) => p.subPrice ?? Math.round(p.price * (1 - SUB_DISCOUNT) * 100) / 100;

// Shipping math shared by cart + calculator.
export function shippingFor(subtotal) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}
export function cartTotal(lines) {
  const sub = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  return { subtotal: sub, shipping: shippingFor(sub), total: sub + shippingFor(sub) };
}
