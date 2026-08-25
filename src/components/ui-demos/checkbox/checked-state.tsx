"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
 
export function Example() {
  const [checked, setChecked] = React.useState(false)
 
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(nextChecked) => setChecked(nextChecked === true)}
    />
  )
}