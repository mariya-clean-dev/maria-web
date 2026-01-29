"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer bg-[#FAFAF9] border-2 border-[#D6D3D1] focus-visible:border-ring focus-visible:ring-ring/50  inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 mt-1",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background data-[state=unchecked]:bg-transparent data-[state=checked]:bg-primary pointer-events-none block h-[15px] w-[15px] rounded-full ring-0 transition-transform"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
