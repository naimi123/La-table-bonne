export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}

export function formatDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

export function initials(firstName: string, lastName: string): string {
  const first = firstName.trim().charAt(0);
  const last = lastName.trim().charAt(0);
  return `${first}${last}`.toUpperCase() || '?';
}
