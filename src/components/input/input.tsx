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
        <div className="absolute inset-y-0 left-0 pl-[12px] pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          className="w-full pl-[38px] h-[34px] text-neutral-500 rounded-[4px] bg-neutral-200 py-1 px-[12px] placeholder-neutral-500 font-normal text-[1.2rem] ring-offset-primary-100  focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
          {...props}
        />
      </div>
    </div>
  )
}
