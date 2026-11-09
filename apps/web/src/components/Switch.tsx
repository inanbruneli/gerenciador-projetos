type SwitchProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Switch({ label, checked, onChange }: SwitchProps) {
  return <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className="flex items-center gap-3 text-base text-ink"
  >
    <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-favorite' : 'bg-switch-off'}`}>
      <span className={`absolute top-1 left-1 size-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : ''}`} />
    </span>
    {label}
  </button>
}
