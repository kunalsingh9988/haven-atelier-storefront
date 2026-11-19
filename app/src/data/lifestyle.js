// Editorial ritual imagery. These scenes illustrate product use; they are not product photographs.
const matcha = [
  { src: '/img/lifestyle/matcha-preparation.webp', alt: 'Hands whisking matcha in a ceramic bowl' },
  { src: '/img/lifestyle/hero-matcha-ritual.webp', alt: 'Iced matcha beside a bamboo whisk' },
];
const teaware = [
  { src: '/img/lifestyle/ceramic-bowl.webp', alt: 'Ceramic bowl of matcha with bamboo tools' },
  { src: '/img/lifestyle/ritual-set.webp', alt: 'Matcha ritual tools arranged on a table' },
];
const kit = [
  { src: '/img/lifestyle/ritual-set.webp', alt: 'Matcha ritual tools arranged on a table' },
  { src: '/img/lifestyle/matcha-preparation.webp', alt: 'Hands whisking matcha in a ceramic bowl' },
];

export function lifestyleImages(product) {
  if (product.type === 'matcha' || product.type === 'bundle') return matcha;
  if (product.type === 'kit') return kit;
  if (product.tag === 'bowl') return teaware;
  return [];
}
