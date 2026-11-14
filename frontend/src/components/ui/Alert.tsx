import type { ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type AlertVariant = 'error' | 'success' | 'info';

const ICONS = {
  error: AlertCircle,
  success: CheckCircle2,
  info: Info,
} as const;

interface AlertProps {
  variant: AlertVariant;
  title?: string;
  children?: ReactNode;
}

export function Alert({ variant, title, children }: AlertProps) {
  const Icon = ICONS[variant];

  return (
    <div
      className={`alert alert--${variant}`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <Icon size={19} className="alert__icon" aria-hidden="true" />
      <div className="alert__content">
        {title ? <p className="alert__title">{title}</p> : null}
        {children ? <div className="alert__body">{children}</div> : null}
      </div>
    </div>
  );
}
