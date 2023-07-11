import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Spinner } from "../spinner"

const buttonVariants = cva(
  `
  inline-flex
  items-center
  justify-center
  font-sans
  text-[1.4rem]
  font-bold
  transition-colors
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: "bg-primary-100 text-neutral-100 hover:bg-primary-100/80",
        text: "text-primary-100 hover:bg-primary-100 hover:text-neutral-100",
      },
      size: {
        sm: "h-[42px] rounded-1 px-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        {...props}
        className={cn(buttonVariants({ variant, size }))}
        ref={ref}
      >
        {loading ? <Spinner /> : children}
      </Component>
    )
  },
)
Button.displayName = "Button"

export { Button }
