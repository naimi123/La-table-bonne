import { getPasswordStrength } from '../../utils/validation';

/** Indicateur visuel de robustesse du mot de passe (US01). */
export function PasswordStrengthMeter({ password }: { password: string }) {
  const { score, label } = getPasswordStrength(password);

  return (
    <div className="strength" data-score={score}>
      <div className="strength__bars" aria-hidden="true">
        {[1, 2, 3, 4].map((level) => (
          <span key={level} className={`strength__bar ${score >= level ? 'is-active' : ''}`.trim()} />
        ))}
      </div>
      <p className="strength__label" aria-live="polite">
        Robustesse : <strong>{label}</strong>
      </p>
    </div>
  );
}
