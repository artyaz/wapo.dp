"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { UserMessage } from "@/components/ds/UserMessage";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { BotIcon, CheckIcon, ClockIcon, ShieldCheckIcon } from "lucide-react";

export default function Page() {
  const [releaseCode, setReleaseCode] = React.useState("A7K2");

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden bg-neutral-50 text-neutral-900">
        {/* ── Chat column ───────────────────────────────────────────── */}
        <main className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200">
                <BotIcon className="size-4 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Praxis Copilot</p>
                <p className="text-xs text-neutral-500">
                  Deploy workspace · Release 2.4 · Build 2f9c1e
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500">Release team</span>
              <AvatarGroup className="grayscale">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <AvatarGroupCount>+3</AvatarGroupCount>
              </AvatarGroup>
            </div>
          </header>

          {/* Transcript — near-black chat canvas */}
          <div className="flex flex-1 flex-col justify-end gap-4 overflow-hidden bg-neutral-100 px-6 py-6">
            <UserMessage>
              Prepare release 2.4: bump the glass tokens, run the full contrast
              audit, then queue a staging deploy.
            </UserMessage>

            {/* agent reply — supporting chrome */}
            <div className="flex w-full justify-start">
              <div className="w-fit max-w-[78%] rounded-[18px] rounded-bl-[8px] border border-neutral-300 bg-neutral-200 px-4 py-2 text-[14px] leading-[22px] text-neutral-700">
                Audit complete — 214 components scanned, 3 contrast fixes pushed
                to <span className="text-neutral-900">release/2.4-audit</span>.
                Staging build <span className="text-neutral-900">2f9c1e</span> is
                queued and waiting for release approval.
                <span className="mt-1.5 flex items-center gap-1.5 text-xs text-neutral-500">
                  <ShieldCheckIcon className="size-3.5" />
                  Release gate: 2 of 3 approvers signed off
                </span>
              </div>
            </div>

            <UserMessage>
              Ship it to staging once Maya and the design leads have signed off
              on the token changes.
            </UserMessage>
            <UserMessage density="compact">Holding for my code.</UserMessage>
          </div>

          {/* Composer — supporting chrome */}
          <div className="flex items-center gap-3 border-t border-neutral-200 px-6 py-4">
            <Avatar size="lg">
              <AvatarFallback>KD</AvatarFallback>
              <AvatarBadge>
                <span className="size-1.5 rounded-full bg-success-500" />
              </AvatarBadge>
            </Avatar>
            <div className="flex-1 rounded-full border border-neutral-300 bg-neutral-200 px-4 py-2.5 text-sm text-neutral-500">
              Message the copilot…
            </div>
          </div>
        </main>

        {/* ── Approval rail ─────────────────────────────────────────── */}
        <aside className="flex w-[380px] shrink-0 flex-col gap-6 overflow-hidden border-l border-neutral-200 bg-neutral-50 px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg border border-neutral-300 bg-neutral-200">
              <ShieldCheckIcon className="size-4 text-neutral-600" />
            </div>
            <div>
              <h2 className="text-sm font-medium">Approve staging deploy</h2>
              <p className="text-xs text-neutral-500">
                Release 2.4 · Build 2f9c1e
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Release code</p>
              <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                <ClockIcon className="size-3.5" />
                expires 4:12
              </span>
            </div>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={releaseCode}
              onChange={setReleaseCode}
            >
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator className="mx-1" />
              <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <p className="text-xs text-neutral-500">
              6-character code from your authenticator app ·{" "}
              {releaseCode.length === 6
                ? "code complete"
                : `${6 - releaseCode.length} characters left`}
            </p>
          </div>

          <div className="h-px bg-neutral-200" />

          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Approvers</p>
            <div className="flex items-center gap-3 px-1 py-2">
              <Avatar>
                <AvatarFallback>MZ</AvatarFallback>
                <AvatarBadge>
                  <CheckIcon className="size-2" />
                </AvatarBadge>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">Maya Zhou</p>
                <p className="text-xs text-neutral-500">Design lead</p>
              </div>
              <span className="text-xs text-neutral-500">Approved · 2m</span>
            </div>
            <div className="flex items-center gap-3 px-1 py-2">
              <Avatar>
                <AvatarFallback>DR</AvatarFallback>
                <AvatarBadge>
                  <CheckIcon className="size-2" />
                </AvatarBadge>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">Dev Rao</p>
                <p className="text-xs text-neutral-500">Accessibility</p>
              </div>
              <span className="text-xs text-neutral-500">Approved · 14m</span>
            </div>
            <div className="flex items-center gap-3 px-1 py-2">
              <Avatar>
                <AvatarFallback>JT</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">Jonas Tiedt</p>
                <p className="text-xs text-neutral-500">Release manager</p>
              </div>
              <span className="text-xs text-neutral-600">Pending</span>
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <div className="rounded-full bg-neutral-900 py-2.5 text-center text-sm font-medium text-neutral-100">
              Approve &amp; deploy to staging
            </div>
            <p className="text-center text-xs text-neutral-500">
              Deploy window closes at 18:00 UTC
            </p>
          </div>
        </aside>
      </div>
    </EvalShell>
  );
}
