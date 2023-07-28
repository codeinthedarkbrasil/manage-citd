import * as React from "react"
import * as ModalPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Modal = ModalPrimitive.Root

const ModalTrigger = ModalPrimitive.Trigger

const ModalPortal = ({
  className,
  ...props
}: ModalPrimitive.DialogPortalProps) => (
  <ModalPrimitive.Portal className={cn(className)} {...props} />
)
ModalPortal.displayName = ModalPrimitive.Portal.displayName

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <ModalPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-[0] z-above bg-neutral-100/70 backdrop-blur-[1.5px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
))
ModalOverlay.displayName = ModalPrimitive.Overlay.displayName

const ModalContent = React.forwardRef<
  React.ElementRef<typeof ModalPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ModalPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <ModalPortal>
    <ModalOverlay />
    <ModalPrimitive.Content
      ref={ref}
      className={cn(
        "p-6 fixed left-[50%] top-[50%] z-above translate-x-[-50%] translate-y-[-50%] rounded-1 bg-neutral-100 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className,
      )}
      {...props}
    >
      {children}
      <ModalPrimitive.Close className="absolute right-[-42px] top-[-42px] rounded-1 opacity-70 ring-offset-primary-100 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:pointer-events-none data-[state=open]:bg-neutral-100 data-[state=open]:text-neutral-900">
        <X className="h-4 w-4 text-neutral-900" />
        <span className="sr-only">Close</span>
      </ModalPrimitive.Close>
    </ModalPrimitive.Content>
  </ModalPortal>
))

export { Modal, ModalTrigger, ModalContent }
