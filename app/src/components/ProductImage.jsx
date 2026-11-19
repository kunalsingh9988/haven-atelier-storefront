export default function ProductImage({ product, sizes, decorative = false, priority = false }) {
  const path = `/img/products/${product.handle}`;

  return (
    <img
      className="product-image"
      src={`${path}.webp`}
      srcSet={`${path}-360.webp 360w, ${path}.webp 960w`}
      sizes={sizes}
      width={960}
      height={960}
      alt={decorative ? '' : product.name}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
