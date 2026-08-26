"use client";

import { RecordHeader } from "@/components/ds/RecordHeader";

export default function Demo() {
  return (
    <div className="w-full max-w-[720px]">
      <RecordHeader
        breadcrumb="Incidents / 2025 / Q3"
        title="Checkout latency spike"
        recordId="INC-2417"
        meta="Opened Aug 24, 2025 · Severity 2 · Owner: Platform"
        secondaryAction="Export"
        primaryAction="Escalate"
      />
    </div>
  );
}

export const demoSource = `<RecordHeader
  breadcrumb="Incidents / 2025 / Q3"
  title="Checkout latency spike"
  recordId="INC-2417"
  meta="Opened Aug 24, 2025 · Severity 2 · Owner: Platform"
  secondaryAction="Export"
  primaryAction="Escalate"
/>`;
