export function Spinner() {
  return (
    <svg className="h-3 w-3 animate-rotate" viewBox="0 0 50 50">
      <circle
        className="stroke-neutral-900 opacity-[0.3]"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="6"
      />
      <circle
        className="animate-dash stroke-neutral-100"
        strokeLinecap="round"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="6"
      />
    </svg>
  )
}
