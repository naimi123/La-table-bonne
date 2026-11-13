import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export function TextField({
  label,
  error,
  hint,
  icon,
  id,
  className = '',
  ...rest
}: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? `field-${generatedId}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = [error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ');

  return (
    <div className={`field ${error ? 'field--invalid' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
      </label>
      <div className="field__control">
        {icon ? (
          <span className="field__icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <input
          id={fieldId}
          className={`field__input ${icon ? 'field__input--with-icon' : ''}`.trim()}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          {...rest}
        />
      </div>
      {hint ? (
        <p className="field__hint" id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className="field__error" id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
