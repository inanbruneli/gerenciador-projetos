type StarIconProps = {
  filled?: boolean
}

export default function StarIcon({ filled = false }: StarIconProps) {
  return <svg width="22" height="21" viewBox="0 0 24 23" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
    <path d="m12 1.5 3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6l-6.4 3.5L7 14l-5.3-5 7.2-.9z" />
  </svg>
}
