"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:ring-ring peer h-[18px] w-[18px] shrink-0 rounded-[4px] border-[2px] border-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:animate-fillAnimation data-[state=checked]:border-none data-[state=checked]:bg-primary-100 data-[state=checked]:text-neutral-100",
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("text-current flex items-center justify-center")}
    >
      <Check className="h-[14px] w-[14px]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
