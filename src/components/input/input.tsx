export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label?: string
}

export function Input({ icon, label, id, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="inset-y-0 left-0 pointer-events-none absolute pl-[12px]">
          {icon}
        </div>
        <input
          id={id}
          className="focus-visible:ring-ring h-[34px] w-full rounded-[4px] bg-neutral-200 px-[12px] py-1 pl-[38px] text-[1.2rem] font-normal text-neutral-500 ring-offset-primary-100  transition-all placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          {...props}
        />
      </div>
    </div>
  )
}
