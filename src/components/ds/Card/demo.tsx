"use client";

/**
 * Card demo — header / body / footer composition with quiet build metadata.
 */

import { Card } from "@/components/ds/Card";

export default function Demo() {
  return (
    <Card
      className="mx-auto w-full max-w-[420px]"
      header={
        <div className="flex w-full flex-col items-start gap-0.5">
          <span className="text-body-medium text-default-font">
            Deploy preview · build #482
          </span>
          {/* dir="ltr": relative-time strings that lead with a digit bidi-split
              under RTL ("4 minutes ago" would scatter); isolate LTR metadata. */}
          <span
            dir="ltr"
            className="text-caption font-caption text-neutral-500"
          >
            api-gateway · queued from main · 4 minutes ago
          </span>
        </div>
      }
      footer={
        <>
          <span
            dir="ltr"
            className="text-caption font-caption text-neutral-400"
          >
            main @ a1b2c3d
          </span>
          <span
            dir="ltr"
            className="text-caption font-caption text-neutral-400"
          >
            96s build · 214 checks passed
          </span>
        </>
      }
    >
      <p className="w-full text-body text-default-font">
        Compilation finished with no warnings and the preview URL is warm. Two
        checks are still pending review before promotion to staging.
      </p>
    </Card>
  );
}

export const demoSource = `<Card
  className="w-full max-w-[420px]"
  header={
    <div className="flex w-full flex-col items-start gap-0.5">
      <span className="text-body-medium text-default-font">
        Deploy preview · build #482
      </span>
      <span dir="ltr" className="text-caption font-caption text-neutral-500">
        api-gateway · queued from main · 4 minutes ago
      </span>
    </div>
  }
  footer={
    <>
      <span dir="ltr" className="text-caption font-caption text-neutral-400">
        main @ a1b2c3d
      </span>
      <span dir="ltr" className="text-caption font-caption text-neutral-400">
        96s build · 214 checks passed
      </span>
    </>
  }
>
  <p className="w-full text-body text-default-font">
    Compilation finished with no warnings and the preview URL is warm. Two
    checks are still pending review before promotion to staging.
  </p>
</Card>`;
