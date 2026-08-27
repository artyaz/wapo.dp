"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { FileTreeRow } from "@/components/ds/FileTreeRow";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  KeyRoundIcon,
  LockKeyholeIcon,
  ShieldCheckIcon,
} from "lucide-react";

/**
 * Scenario: mobile "CodeVault" screen — an encrypted repository is locked.
 * An alert asks for the one-time code, the user is mid-way through typing it
 * into the OTP field, and a read-only file-tree preview of the encrypted
 * repo contents sits below.
 */
export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex w-full max-w-[360px] flex-col gap-4 px-4 py-5">
        {/* App header */}
        <header className="flex items-center gap-2.5">
          <div className="flex size-8 flex-none items-center justify-center rounded-md border border-solid border-default-border bg-panel">
            <LockKeyholeIcon className="size-4 text-muted-foreground" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[15px] font-medium leading-5">
              CodeVault
            </span>
            <span className="truncate text-[11px] leading-4 text-muted-foreground">
              kepler-org / core-api
            </span>
          </div>
          <span className="ml-auto rounded-full border border-solid border-default-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">
            encrypted
          </span>
        </header>

        {/* Lock notice */}
        <Alert>
          <KeyRoundIcon />
          <AlertTitle>Repository locked</AlertTitle>
          <AlertDescription>
            Enter the 6-character code from your authenticator app to decrypt
            this repository on this device.
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" size="xs">
              Help
            </Button>
          </AlertAction>
        </Alert>

        {/* OTP entry */}
        <section className="flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium">Authenticator code</span>
            <span className="text-[11px] text-muted-foreground">
              expires in 24 s
            </span>
          </div>
          <InputOTP
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            defaultValue="K7A"
            containerClassName="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-center text-xs text-muted-foreground">
            Alphanumeric · rotates every 30 seconds
          </p>
        </section>

        {/* Encrypted contents preview */}
        <section className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-medium">Encrypted contents</h2>
            <span className="text-[11px] text-muted-foreground">
              read-only preview
            </span>
          </div>
          <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-default-border bg-panel">
            <FileTreeRow
              name="vault"
              nodeType="folder"
              depth="0"
              expanded
              selected
            />
            <FileTreeRow name="src" nodeType="folder" depth="1" expanded />
            <FileTreeRow
              name="cipher.ts"
              nodeType="ts"
              depth="2"
              gitStatus="modified"
            />
            <FileTreeRow name="keys.json" nodeType="json" depth="2" dirty />
            <FileTreeRow name="NOTES.md" nodeType="md" depth="1" />
            <FileTreeRow
              name="deploy.yml"
              nodeType="yml"
              depth="1"
              gitStatus="added"
            />
            <FileTreeRow
              name="cache.ts"
              nodeType="ts"
              depth="1"
              gitStatus="deleted"
            />
            <FileTreeRow name="package.json" nodeType="json" depth="0" dirty />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheckIcon className="size-3.5 flex-none" />
          Files stay encrypted on device · AES-256-GCM
        </footer>
      </div>
    </EvalShell>
  );
}
