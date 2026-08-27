"use client"

import * as React from "react"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({ render, children, ...props }: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger> &
  { render?: React.ReactElement<Record<string, unknown>> }) {
  if (render) {
    return (
      <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" asChild {...props}>
        {children !== undefined ? React.cloneElement(render, undefined, children) : React.cloneElement(render)}
      </CollapsiblePrimitive.CollapsibleTrigger>
    )
  }
  return (
    <CollapsiblePrimitive.CollapsibleTrigger data-slot="collapsible-trigger" {...props}>
      {children}
    </CollapsiblePrimitive.CollapsibleTrigger>
  )
}

function CollapsibleContent({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    />
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
