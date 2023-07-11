import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label?: string
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, icon, error, children, ...props }, ref) => {
    return (
      <div>
        <div className="w-full">
          <label htmlFor={id} className="sr-only">
            {label}
          </label>
          <div className="relative flex w-full items-center">
            {!!icon && (
              <div className="pointer-events-none absolute pl-[12px]">
                {icon}
              </div>
            )}
            <input
              id={id}
              data-error={!!error}
              className={cn(
                "h-[34px] w-full rounded-[4px] bg-neutral-200 px-[12px] py-1 font-sans text-[1.2rem] font-normal text-neutral-500 ring-offset-primary-100  transition-all placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[error=true]:text-danger-100 data-[error=true]:ring-0 data-[error=true]:ring-offset-2 data-[error=true]:ring-offset-danger-100",
                `${!!icon && "pl-[38px]"}`,
              )}
              ref={ref}
              {...props}
            />
          </div>
        </div>
        {!!error && (
          <span className="block pt-1 font-sans text-[1.2rem] text-danger-100">
            {error}
          </span>
        )}
      </div>
    )
  },
)
Input.displayName = "Input"

export { Input }
