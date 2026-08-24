"use client";

/**
 * TextField demo — the field in its three resting states: bare, labeled, and
 * error, per the source API.
 */

import React from "react";
import { TextField } from "@/components/ds/TextField";

export default function Demo() {
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-6">
      <TextField>
        <TextField.Input placeholder="Search transcripts" />
      </TextField>

      <TextField
        label="Workspace name"
        helpText="Visible to everyone in your organization."
      >
        <TextField.Input placeholder="Acme Research" defaultValue="Acme Research" />
      </TextField>

      <TextField
        label="Retention window"
        error
        helpText="Enter a value between 7 and 365 days."
      >
        <TextField.Input type="number" placeholder="90" defaultValue="5" />
      </TextField>
    </div>
  );
}

export const demoSource = `<TextField>
  <TextField.Input placeholder="Search transcripts" />
</TextField>

<TextField label="Workspace name" helpText="Visible to everyone in your organization.">
  <TextField.Input placeholder="Acme Research" defaultValue="Acme Research" />
</TextField>

<TextField
  label="Retention window"
  error
  helpText="Enter a value between 7 and 365 days."
>
  <TextField.Input type="number" placeholder="90" defaultValue="5" />
</TextField>`;
