type TrashIconProps = {
  size?: number
}

export default function TrashIcon({ size = 16 }: TrashIconProps) {
  return <svg width={size} height={size * 18 / 16} viewBox="0 0 16 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 4h14" />
    <path d="M5 4V2.5A1.5 1.5 0 0 1 6.5 1h3A1.5 1.5 0 0 1 11 2.5V4" />
    <path d="M2.5 4v11.5A1.5 1.5 0 0 0 4 17h8a1.5 1.5 0 0 0 1.5-1.5V4" />
  </svg>
}
