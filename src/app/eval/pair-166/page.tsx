"use client";

import React from "react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  useField,
} from "@/components/ui/field";
import { Dialog } from "@/components/ds/Dialog";
import { Button } from "@/components/ds/Button";
import * as SubframeCore from "@/lib/subframe/core";
import { cn } from "@/lib/utils";
import {
  ChevronLeftIcon,
  DownloadIcon,
  FileTextIcon,
  FileUpIcon,
  FileWarningIcon,
  PaperclipIcon,
  RefreshCwIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Plain input wired into the enclosing <Field> — label, description   */
/* and error are linked through the field context (aria-describedby /  */
/* aria-invalid), the way ui:field is meant to be used.                */
/* ------------------------------------------------------------------ */

function FieldInput({ className, ...props }: React.ComponentProps<"input">) {
  const field = useField();

  return (
    <input
      {...props}
      aria-describedby={field?.ariaDescribedBy}
      aria-invalid={field?.invalid || undefined}
      className={cn(
        "flex h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow]",
        "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive",
        className
      )}
    />
  );
}

export default function Page() {
  // Delete-account confirmation is open by default so the dialog state is
  // captured in the screenshot. Non-modal + framed like the component demo,
  // so the scrim never traps the page around it.
  const [deleteOpen, setDeleteOpen] = React.useState(true);
  const dangerRef = React.useRef<HTMLDivElement>(null);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col font-body">
        {/* ── App bar ──────────────────────────────────────────── */}
        <header className="flex h-14 flex-none items-center gap-3 border-b px-4">
          <button
            type="button"
            aria-label="Back to workspace"
            className="-ml-1.5 flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <h1 className="text-base font-semibold text-foreground">Settings</h1>
          <button
            type="button"
            className="ml-auto rounded-md px-2 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Done
          </button>
        </header>

        <main className="flex flex-col gap-4 px-4 pb-10 pt-4">
          {/* ── Profile — ui:field ─────────────────────────────── */}
          <section className="flex flex-col gap-4 rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 flex-none items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                MO
              </div>
              <div className="flex min-w-0 flex-col">
                <p className="truncate text-sm font-medium text-foreground">
                  Maya Okafor
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  @maya.okafor · Pro plan
                </p>
              </div>
            </div>

            <FieldGroup className="gap-5">
              <Field>
                <FieldLabel htmlFor="settings-display-name">
                  Display name
                </FieldLabel>
                <FieldInput
                  id="settings-display-name"
                  defaultValue="Maya Okafor"
                  autoComplete="off"
                />
                <FieldDescription>
                  Shown on your profile and in shared documents.
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="settings-email">
                  Notification email
                </FieldLabel>
                <FieldInput
                  id="settings-email"
                  type="email"
                  placeholder="you@studio.com"
                  autoComplete="off"
                />
                <FieldError>
                  Enter a valid email — export links are sent here.
                </FieldError>
              </Field>
            </FieldGroup>
          </section>

          {/* ── Documents — ui:attachment ──────────────────────── */}
          <section className="flex flex-col gap-3 rounded-xl border bg-card p-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Documents
              </h2>
              <span className="text-xs text-muted-foreground">3 files</span>
            </div>

            <AttachmentGroup>
              <Attachment state="done">
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>identity-check.pdf</AttachmentTitle>
                  <AttachmentDescription>
                    Verified · 1.2 MB
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Download identity-check.pdf">
                    <DownloadIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>

              <Attachment state="uploading">
                <AttachmentMedia>
                  <FileUpIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>bank-statement-q3.pdf</AttachmentTitle>
                  <AttachmentDescription>
                    Uploading · 64%
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction
                    variant="destructive"
                    aria-label="Cancel upload"
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>

              <Attachment state="error">
                <AttachmentMedia>
                  <FileWarningIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>utility-bill.png</AttachmentTitle>
                  <AttachmentDescription>
                    Too large — 10 MB max
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions className="opacity-100">
                  <AttachmentAction aria-label="Retry upload">
                    <RefreshCwIcon />
                  </AttachmentAction>
                  <AttachmentAction
                    variant="destructive"
                    aria-label="Remove utility-bill.png"
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            </AttachmentGroup>

            <AttachmentTrigger>
              <PaperclipIcon className="size-4" />
              Upload document
            </AttachmentTrigger>
          </section>

          {/* ── Danger zone — ds:Dialog ────────────────────────── */}
          <section className="flex flex-col gap-3 rounded-xl border bg-card p-3.5">
            <div className="flex items-baseline justify-between px-0.5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                Danger zone
              </h2>
              <span className="text-xs text-muted-foreground">
                Irreversible actions
              </span>
            </div>

            <div
              ref={dangerRef}
              className="relative h-64 w-full overflow-hidden rounded-lg border bg-background"
            >
              {/* account rows sitting under the scrim */}
              <div className="absolute inset-0 flex flex-col divide-y">
                <div className="flex flex-1 items-center justify-between gap-3 px-4">
                  <div className="flex min-w-0 flex-col">
                    <p className="text-sm font-medium text-foreground">
                      Export workspace data
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Everything, including documents
                    </p>
                  </div>
                  <Button variant="secondary" size="small">
                    Request
                  </Button>
                </div>

                <div className="flex flex-1 items-center justify-between gap-3 px-4">
                  <div className="flex min-w-0 flex-col">
                    <p className="text-sm font-medium text-foreground">
                      Sign out everywhere
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Revoke sessions on 4 devices
                    </p>
                  </div>
                  <Button variant="secondary" size="small">
                    Sign out
                  </Button>
                </div>

                <div className="flex flex-1 items-center justify-between gap-3 px-4">
                  <div className="flex min-w-0 flex-col">
                    <p className="text-sm font-medium text-foreground">
                      Delete account
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Removes 12 documents permanently
                    </p>
                  </div>
                  <Button variant="danger" size="small">
                    Delete…
                  </Button>
                </div>
              </div>

              <Dialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                modal={false}
                className="absolute inset-0"
              >
                <Dialog.Content
                  aria-describedby={undefined}
                  onOpenAutoFocus={(event: Event) => event.preventDefault()}
                  onPointerDownOutside={(event) => {
                    // non-modal: only dismiss for interactions inside the
                    // danger-zone frame, never for stray page clicks
                    if (!dangerRef.current?.contains(event.target as Node)) {
                      event.preventDefault();
                    }
                  }}
                >
                  <div className="flex w-full flex-col items-start gap-4 p-5">
                    <div className="flex flex-col items-start gap-1.5">
                      <SubframeCore.Dialog.Title className="font-heading-2 text-heading-2 text-default-font">
                        Delete account?
                      </SubframeCore.Dialog.Title>
                      <SubframeCore.Dialog.Description className="font-body text-body text-neutral-500">
                        This permanently removes your profile, 12 documents
                        and billing history. This action cannot be undone.
                      </SubframeCore.Dialog.Description>
                    </div>
                    <div className="flex w-full items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        onClick={() => setDeleteOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="danger"
                        icon={<Trash2Icon size={14} />}
                        onClick={() => setDeleteOpen(false)}
                      >
                        Delete account
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog>
            </div>

            <p className="px-0.5 text-xs text-muted-foreground">
              Deleting requires an email confirmation before it runs.
            </p>
          </section>

          <p className="pt-1 text-center text-xs text-muted-foreground">
            Version 4.2.0 (build 2841)
          </p>
        </main>
      </div>
    </EvalShell>
  );
}
