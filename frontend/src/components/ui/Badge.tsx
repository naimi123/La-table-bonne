import type { ReactNode } from 'react';

type BadgeTone = 'accent' | 'muted' | 'outline';

export function Badge({ children, tone = 'muted' }: { children: ReactNode; tone?: BadgeTone }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
