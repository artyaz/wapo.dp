"use client";

/**
 * PayloadInspector demo — an integration payload inspected inline in the
 * chat thread, with a filename variant below.
 */

import React from "react";
import { PayloadInspector } from "@/components/ds/PayloadInspector";

const PAYLOAD = `{
  "integration": "superblocks",
  "version": "2.4.1",
  "scopes": ["read:assets", "write:assets"],
  "rateLimit": {
    "limit": 600,
    "remaining": 587,
    "resetAt": "2026-08-26T12:00:00Z"
  },
  "connected": true,
  "fallback": null
}`;

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-neutral-900 p-6">
      <PayloadInspector language="json" code={PAYLOAD} />
      <PayloadInspector
        language="json"
        filename="sync.json"
        code={`{ "lastSync": "3m ago", "items": 148, "ok": true }`}
      />
    </div>
  );
}

export const demoSource = `<PayloadInspector
  language="json"
  code={JSON.stringify(payload, null, 2)}
/>

<PayloadInspector
  language="json"
  filename="sync.json"
  code={'{ "lastSync": "3m ago", "items": 148, "ok": true }'}
/>`;
