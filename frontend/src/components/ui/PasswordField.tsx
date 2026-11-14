import { useId, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hint?: string;
}

export function PasswordField({
  label,
  error,
  hint,
  id,
  className = '',
  ...rest
}: PasswordFieldProps) {
  const generatedId = useId();
  const [visible, setVisible] = useState(false);
  const fieldId = id ?? `password-${generatedId}`;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = [error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ');

  return (
    <div className={`field ${error ? 'field--invalid' : ''} ${className}`.trim()}>
      <label className="field__label" htmlFor={fieldId}>
        {label}
      </label>
      <div className="field__control">
        <span className="field__icon" aria-hidden="true">
          <Lock size={17} />
        </span>
        <input
          id={fieldId}
          type={visible ? 'text' : 'password'}
          className="field__input field__input--with-icon field__input--with-action"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          autoComplete={rest.autoComplete ?? 'current-password'}
          {...rest}
        />
        <button
          type="button"
          className="field__action"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          aria-pressed={visible}
        >
          {visible ? <EyeOff size={17} aria-hidden="true" /> : <Eye size={17} aria-hidden="true" />}
        </button>
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
