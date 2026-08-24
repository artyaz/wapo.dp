"use client";

/**
 * FormSection demo — a workspace settings group composed of TextField rows.
 */

import React from "react";
import { FormSection } from "@/components/ds/FormSection";
import { TextField } from "@/components/ds/TextField";

export default function Demo() {
  return (
    <div className="w-full max-w-[440px]">
      <FormSection
        sectionLabel="Workspace details"
        hint="Visible to everyone in your organization."
      >
        <TextField label="Workspace name">
          <TextField.Input placeholder="Acme Research" defaultValue="Acme Research" />
        </TextField>
        <TextField
          label="Support email"
          helpText="Used for billing and security notices."
        >
          <TextField.Input
            type="email"
            placeholder="billing@acme-research.com"
          />
        </TextField>
      </FormSection>
    </div>
  );
}

export const demoSource = `<FormSection
  sectionLabel="Workspace details"
  hint="Visible to everyone in your organization."
>
  <TextField label="Workspace name">
    <TextField.Input placeholder="Acme Research" defaultValue="Acme Research" />
  </TextField>
  <TextField label="Support email" helpText="Used for billing and security notices.">
    <TextField.Input type="email" placeholder="billing@acme-research.com" />
  </TextField>
</FormSection>`;
