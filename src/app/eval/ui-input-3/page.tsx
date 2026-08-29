"use client";

/**
 * EVAL page — input p3 — conference event ticketing — 1920x1080 light
 *
 * Scenario: "Kernel Conf 2026" attendee registration checkout (step 2 of 3).
 * Top bar with session search, pass selection with quantity + sold-out
 * disabled inputs, promo code with expired-error state, attendee details
 * hero form (invalid email, VAT input-group, badge photo file input, code of
 * conduct checkbox) and an order summary rail. Co-stars: Card, Button,
 * Badge, Separator, Progress, Checkbox.
 */

import {
  Check,
  ChevronRight,
  Lock,
  Search,
  Ticket,
  Upload,
  UserRound,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const PASSES = [
  {
    name: "Early bird",
    price: "€249",
    note: "Ended Mar 14",
    qty: "0",
    soldOut: true,
  },
  {
    name: "Standard",
    price: "€349",
    note: "All talks + workshops · tote",
    qty: "2",
    line: "€698",
  },
  {
    name: "Plus",
    price: "€549",
    note: "Masterclass + speaker dinner",
    qty: "1",
    line: "€549",
    left: "8 left",
  },
];

const STEPS = [
  { n: "1", label: "Passes", state: "done" },
  { n: "2", label: "Attendee details", state: "current" },
  { n: "3", label: "Payment", state: "next" },
];

/**
 * Styled file-input trigger (page-local demo pattern): the real
 * <input type="file"> is visually hidden inside an input-shaped <label> —
 * same border, height, radius, padding and micro-elevation as the Input
 * family — showing the selected filename as a mono data token. Clicking the
 * label opens the picker; keyboard focus lands on the hidden input and the
 * label mirrors the family focus ring.
 */
function FileFieldTrigger({
  id,
  accept,
  filename,
}: {
  id: string;
  accept?: string;
  filename: string;
}) {
  return (
    <label
      htmlFor={id}
      className="border-input dark:bg-input/30 hover:border-ring/50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px] flex h-9 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-colors"
    >
      <Upload className="text-muted-foreground size-4 shrink-0" />
      <span className="min-w-0 truncate font-code text-sm">{filename}</span>
      <input id={id} type="file" accept={accept} className="sr-only" />
    </label>
  );
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
        {/* ── Top bar ────────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-6 border-b px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-lg border">
              <Ticket className="size-5" />
            </div>
            <div>
              <p className="font-heading-2 text-heading-2 leading-none">
                Kernel Conf 2026
              </p>
              <p className="text-muted-foreground mt-1 font-code text-[10px] uppercase tracking-[0.14em]">
                Sept 17–18 · Lisbon · 48 talks
              </p>
            </div>
          </div>
          <nav className="text-muted-foreground flex items-center gap-6 text-sm">
            <span>Program</span>
            <span>Speakers</span>
            <span>Venue</span>
            <span>FAQ</span>
          </nav>
          <div className="flex items-center gap-2">
            <InputGroup className="w-64">
              <InputGroupAddon align="inline-start">
                <Search className="text-muted-foreground size-4" />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search sessions & speakers…" />
            </InputGroup>
            <Button variant="outline" size="sm" className="h-9">
              <UserRound className="size-4" />
              Sign in
            </Button>
          </div>
        </header>

        {/* ── Step strip ─────────────────────────────────────────── */}
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-2 px-8 py-4">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex items-center gap-2">
              <span
                className={`flex size-5 items-center justify-center rounded-full font-code text-[10px] ${
                  step.state === "current"
                    ? "bg-primary text-primary-foreground"
                    : step.state === "done"
                      ? "bg-muted text-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.state === "done" ? (
                  <Check className="size-3" />
                ) : (
                  step.n
                )}
              </span>
              <span
                className={`text-sm ${
                  step.state === "current"
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
              {i < STEPS.length - 1 ? (
                <ChevronRight className="text-muted-foreground mx-1 size-3.5" />
              ) : null}
            </div>
          ))}
          <span className="text-muted-foreground ml-auto font-code text-[10px] uppercase tracking-[0.12em]">
            Order KC26-08812 · closes Sept 10
          </span>
        </div>

        {/* ── Main ───────────────────────────────────────────────── */}
        <main className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-12 items-start gap-6 px-8 pb-6">
          {/* Passes */}
          <Card className="col-span-4 gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                Passes
              </CardTitle>
              <CardDescription>
                Prices include VAT. Names on badges at check-in.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 px-5">
              {PASSES.map((pass) => (
                <div key={pass.name}>
                  <div
                    className={`flex items-center gap-3 py-3 ${
                      pass.soldOut ? "opacity-60" : ""
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm leading-none font-medium">
                          {pass.name}
                        </p>
                        {pass.soldOut ? (
                          <Badge variant="outline">Sold out</Badge>
                        ) : pass.left ? (
                          <Badge variant="secondary">{pass.left}</Badge>
                        ) : null}
                      </div>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {pass.note}
                      </p>
                    </div>
                    <p className="w-14 shrink-0 text-right font-code text-code">
                      {pass.price}
                    </p>
                    <div className="flex w-24 shrink-0 items-center justify-end gap-2">
                      <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
                        qty
                      </span>
                      <Input
                        type="number"
                        min={0}
                        max={9}
                        defaultValue={pass.qty}
                        disabled={pass.soldOut}
                        aria-label={`${pass.name} quantity`}
                        className="h-8 w-14 px-2 text-center font-code text-code"
                      />
                    </div>
                    <p className="w-16 shrink-0 text-right font-code text-code">
                      {pass.line ?? "—"}
                    </p>
                  </div>
                  {pass !== PASSES[PASSES.length - 1] ? <Separator /> : null}
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 px-5">
              <Field invalid className="w-full">
                {/* Praxis: semantic red stays on border + message — the label
                    text itself remains neutral (weight, not hue). */}
                <FieldLabel
                  htmlFor="promo"
                  className="data-[error=true]:text-foreground"
                >
                  Promo code
                </FieldLabel>
                <div className="flex w-full items-center gap-2">
                  <Input
                    id="promo"
                    defaultValue="EARLYBIRD"
                    aria-invalid
                    className="flex-1 font-code text-sm uppercase"
                  />
                  <Button variant="outline" size="sm" className="h-9">
                    Apply
                  </Button>
                </div>
                <FieldError>
                  Expired Mar 31 — SPRING20 is still valid.
                </FieldError>
              </Field>
            </CardFooter>
          </Card>

          {/* Attendee details */}
          <Card className="col-span-5 gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                Attendee details
              </CardTitle>
              <CardDescription>
                Shown on your badge and in the attendee directory.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-4 px-5">
              <Field>
                <FieldLabel htmlFor="att-first">First name</FieldLabel>
                <Input id="att-first" defaultValue="Ana Beatriz" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="att-last">Last name</FieldLabel>
                <Input id="att-last" defaultValue="Costa" required />
              </Field>
              <Field invalid className="col-span-2">
                {/* Praxis: semantic red stays on border + message — the label
                    text itself remains neutral (weight, not hue). */}
                <FieldLabel
                  htmlFor="att-email"
                  className="data-[error=true]:text-foreground"
                >
                  Email
                </FieldLabel>
                <Input
                  id="att-email"
                  type="email"
                  defaultValue="ana.costamail.pt"
                  aria-invalid
                  required
                />
                <FieldError>
                  Missing an @ between name and domain — tickets are emailed.
                </FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="att-company">Company</FieldLabel>
                <Input id="att-company" defaultValue="Tejo Labs" />
              </Field>
              <Field>
                <FieldLabel htmlFor="att-role">Job title</FieldLabel>
                <Input id="att-role" defaultValue="Design systems lead" />
              </Field>
              <Field>
                <FieldLabel htmlFor="att-vat">VAT number</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText className="font-code text-xs">
                      PT
                    </InputGroupText>
                  </InputGroupAddon>
                  <InputGroupInput
                    id="att-vat"
                    defaultValue="509884219"
                    className="font-code"
                  />
                </InputGroup>
                <FieldDescription>
                  Needed for company invoices.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="att-diet">Dietary needs</FieldLabel>
                <Input id="att-diet" placeholder="e.g. vegetarian, nut allergy" />
              </Field>
              <Field className="col-span-2">
                <FieldLabel htmlFor="att-photo">Badge photo</FieldLabel>
                <FileFieldTrigger
                  id="att-photo"
                  accept="image/png,image/jpeg"
                  filename="ana-costa-badge.jpg"
                />
                <FieldDescription>PNG or JPG, square, 600×600.</FieldDescription>
              </Field>
              <div className="col-span-2 flex items-start gap-2.5">
                <Checkbox id="att-coc" defaultChecked className="mt-0.5" />
                <label
                  htmlFor="att-coc"
                  className="text-sm leading-snug font-medium"
                >
                  I agree to the Kernel Conf code of conduct
                  <span className="text-muted-foreground ml-1 font-normal">
                    · required for every attendee
                  </span>
                </label>
              </div>
            </CardContent>
            <CardFooter className="gap-2 px-5">
              <Button size="sm">Continue to payment</Button>
              <Button variant="outline" size="sm">
                Back
              </Button>
            </CardFooter>
          </Card>

          {/* Order summary */}
          <Card className="col-span-3 gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-3 text-heading-3">
                Order summary
              </CardTitle>
              <CardDescription className="font-code text-[10px] uppercase tracking-[0.12em]">
                KC26-08812 · 3 passes
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 px-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm">Standard ×2</span>
                <span className="font-code text-code">€698</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm">Plus ×1</span>
                <span className="font-code text-code">€549</span>
              </div>
              <Separator />
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground text-sm">Subtotal</span>
                <span className="font-code text-code">€1,247</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-muted-foreground text-sm">
                  VAT (23%, incl.)
                </span>
                <span className="text-muted-foreground font-code text-code">
                  €233.22
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t pt-2.5">
                <span className="text-sm font-medium">Total</span>
                <span className="font-code text-heading-3 leading-none">
                  €1,247
                </span>
              </div>
              <div className="mt-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-xs">
                    Checkout progress
                  </span>
                  <span className="text-muted-foreground font-code text-[11px]">
                    2 of 3
                  </span>
                </div>
                <Progress value={66} className="h-1.5" />
              </div>
            </CardContent>
            <CardFooter className="px-5">
              <p className="text-muted-foreground flex items-center gap-1.5 font-code text-[10px] uppercase tracking-[0.12em]">
                <Lock className="size-3" />
                Secure checkout · Stripe
              </p>
            </CardFooter>
          </Card>
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="flex items-center justify-between border-t px-8 py-3">
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            Kernel Conf 2026 · support@kernelconf.dev
          </span>
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            Code of conduct · Refund policy
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
