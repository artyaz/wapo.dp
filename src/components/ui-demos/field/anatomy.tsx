"use client"

import { Field } from "@/components/ui/field"
import { FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
export function AnatomyDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Field>
        <FieldLabel htmlFor="input-id">Label</FieldLabel>
        {/* Input, Select, Switch, etc. */}
        <FieldDescription>Optional helper text.</FieldDescription>
        <FieldError>Validation message.</FieldError>
      </Field>
    </div>
  )
}
