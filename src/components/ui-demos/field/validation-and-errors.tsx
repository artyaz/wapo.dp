"use client"

import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FieldError, FieldLabel } from "@/components/ui/field"
export function ValidationAndErrorsDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Field data-invalid>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input id="email" type="email" aria-invalid />
        <FieldError>Enter a valid email address.</FieldError>
      </Field>
    </div>
  )
}
