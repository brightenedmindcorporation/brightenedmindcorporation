/**
 * Progress bar for multi-step forms: "Étape 2 sur 3", the name of the current step, and a bar that fills up.
 * Screen readers get the same information through the progressbar role.
 */
export default function StepBar({ step, labels }: { step: number; labels: string[] }) {
  const total = labels.length;
  return (
    <div className="mb-6" role="progressbar" aria-valuemin={1} aria-valuemax={total} aria-valuenow={step} aria-label={`Étape ${step} sur ${total} : ${labels[step - 1]}`}>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-bold text-ink">
          Étape {step} sur {total}
        </span>
        <span className="text-ink-soft">{labels[step - 1]}</span>
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {labels.map((label, i) => (
          <span key={label} className={`h-2 flex-1 rounded-full transition-colors ${i < step ? "bg-red-600" : "bg-line"}`} />
        ))}
      </div>
    </div>
  );
}
