"use client";

/**
 * EVAL page — input-otp p1 — stock research terminal — 430x932 light (phone)
 *
 * Scenario: "Meridian Terminal" mobile 2FA gate. A sell-side analyst signs in
 * from a new device; the terminal holds streaming quotes until the 6-digit
 * code (partially entered) is confirmed. Co-stars: Alert, Badge, Button,
 * Card, Field, Progress, Separator.
 */

import * as React from "react";
import {
  ArrowRightIcon,
  FingerprintIcon,
  LockIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const WATCHLIST = [
  { ticker: "NVDA", name: "Nvidia Corp", price: "182.44", change: "+2.31%", up: true },
  { ticker: "AAPL", name: "Apple Inc", price: "241.06", change: "-0.48%", up: false },
  { ticker: "TSM", name: "Taiwan Semi", price: "208.75", change: "+1.12%", up: true },
];

export default function Page() {
  // Controlled OTP keeps the segmented input mid-entry (3 of 6 digits typed).
  const [code, setCode] = React.useState("418");

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[430px] flex-col gap-3 px-4 pt-4 pb-14">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-md border border-default-border bg-card">
              <span className="font-code text-sm font-semibold text-foreground">
                M
              </span>
            </div>
            <div>
              <p className="font-heading-3 text-sm leading-tight text-foreground">
                Meridian Terminal
              </p>
              <p className="text-caption font-caption text-muted-foreground">
                Research &amp; streaming quotes
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="font-code">
            NYSE · OPEN
          </Badge>
        </header>

        {/* New-device notice */}
        <Alert>
          <SmartphoneIcon />
          <AlertTitle>New device sign-in</AlertTitle>
          <AlertDescription>
            Zurich, CH · Chrome on macOS · today 09:41 CET. Verify the code we
            sent to <span className="font-medium">+1 (415) ••• -••27</span>.
          </AlertDescription>
        </Alert>

        {/* Verification card — the OTP hero */}
        <Card className="gap-3 py-4">
          <CardHeader className="px-4">
            <CardTitle className="font-heading-2 text-heading-2">
              Verify it&rsquo;s you
            </CardTitle>
            <CardDescription>
              Two-factor check before the terminal resumes your Level&nbsp;2
              data feed.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 px-4">
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="terminal-otp">6-digit code</FieldLabel>
                <span className="font-code text-xs text-muted-foreground">
                  expires 04:12
                </span>
              </div>
              <InputOTP
                id="terminal-otp"
                maxLength={6}
                value={code}
                onChange={setCode}
                containerClassName="justify-center"
              >
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator className="mx-1.5" />
                <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-10 *:data-[slot=input-otp-slot]:text-xl">
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription className="flex flex-col items-center gap-0.5 text-center">
                <span>Code sent 12 seconds ago</span>
                <span>
                  Resend available in{" "}
                  <span className="font-code">00:48</span>
                </span>
              </FieldDescription>
            </Field>
            <div className="flex flex-col gap-2">
              <Button className="w-full">
                Verify terminal access
                <ArrowRightIcon />
              </Button>
              <Button variant="ghost" className="w-full">
                <LockIcon />
                Use a backup code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feed status */}
        <Card className="gap-2.5 py-4">
          <CardHeader className="px-4">
            <CardTitle className="text-sm">Feed status</CardTitle>
            <CardDescription>
              Quotes resume streaming once verification completes.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 px-4">
            <div className="flex items-center justify-between">
              <span className="text-caption font-caption text-muted-foreground">
                Meridian Pro · US equities
              </span>
              <span className="font-code text-xs text-foreground">35%</span>
            </div>
            <Progress value={35} />
            <div className="flex items-center justify-between">
              <span className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                session 9f2a-7741
              </span>
              <span className="font-code text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                lat 24 ms
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Locked watchlist teaser */}
        <Card className="gap-2.5 py-4">
          <CardHeader className="px-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Morning watchlist</CardTitle>
              <span className="flex items-center gap-1 text-caption font-caption text-muted-foreground">
                <LockIcon className="size-3.5" />
                locked
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 px-4">
            {WATCHLIST.map((row, i) => (
              <div key={row.ticker}>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-code text-sm font-medium text-foreground">
                      {row.ticker}
                    </span>
                    <span className="text-caption font-caption text-muted-foreground">
                      {row.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-code text-sm tabular-nums text-foreground">
                      {row.price}
                    </span>
                    <span
                      className={`font-code text-xs tabular-nums ${
                        row.up ? "text-success-600" : "text-destructive-500"
                      }`}
                    >
                      {row.change}
                    </span>
                  </div>
                </div>
                {i < WATCHLIST.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Footer */}
        <footer className="mt-auto flex flex-col gap-2 pt-1">
          <Separator />
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-caption font-caption text-muted-foreground">
              <ShieldCheckIcon className="size-3.5" />
              Meridian Securities · FINRA/SIPC
            </span>
            <span className="flex items-center gap-1 font-code text-[10px] text-muted-foreground">
              <FingerprintIcon className="size-3.5" />
              v4.2.1
            </span>
          </div>
        </footer>
      </div>
    </EvalShell>
  );
}
