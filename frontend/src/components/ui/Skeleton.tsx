/** Squelettes de chargement (états `loading` de US04). */
export function RestaurantCardSkeleton() {
  return (
    <article className="restaurant-card restaurant-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--media" />
      <div className="restaurant-card__body">
        <div className="skeleton skeleton--line skeleton--w-60" />
        <div className="skeleton skeleton--line skeleton--w-40" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line skeleton--w-80" />
      </div>
    </article>
  );
}

export function RestaurantGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="restaurant-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <RestaurantCardSkeleton key={index} />
      ))}
    </div>
  );
}
