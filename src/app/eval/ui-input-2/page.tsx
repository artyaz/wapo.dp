"use client";

/**
 * EVAL page — input p2 — photography portfolio site — 1024x768 dark
 *
 * Scenario: "Mara Ellison" — editorial & documentary photographer, Lisbon.
 * The portfolio site's booking page: nav with gallery search, a booking
 * inquiry form (invalid email state, budget input-group, file attach,
 * textarea), availability panel with Progress, studio card with newsletter
 * signup. Co-stars: Card, Button, Badge, Avatar, Progress, Textarea,
 * InputGroup.
 */

import { Camera, Mail, Search, Send, Upload } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Textarea } from "@/components/ui/textarea";

const AVAILABILITY = [
  { window: "Jun 3–14", note: "Steel & Salt — book edit", status: "Booked" },
  { window: "Jun 17–24", note: "Open for sessions", status: "Open" },
  { window: "Jun 26–28", note: "Format festival hold", status: "Hold" },
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
  multiple,
}: {
  id: string;
  accept?: string;
  filename: string;
  multiple?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="border-input dark:bg-input/30 hover:border-ring/50 has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-ring/50 has-[input:focus-visible]:ring-[3px] flex h-9 w-full min-w-0 cursor-pointer items-center gap-2 rounded-md border bg-transparent px-3 shadow-xs transition-colors"
    >
      <Upload className="text-muted-foreground size-4 shrink-0" />
      <span className="min-w-0 truncate font-code text-sm">{filename}</span>
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
      />
    </label>
  );
}

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground flex min-h-screen w-full flex-col">
        {/* ── Nav ────────────────────────────────────────────────── */}
        <header className="flex items-center justify-between gap-6 border-b px-6 py-3">
          <div className="flex items-baseline gap-3">
            <p className="font-heading-2 text-heading-2 leading-none">
              Mara Ellison
            </p>
            <p className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.14em]">
              editorial · documentary · Lisbon
            </p>
          </div>
          <nav className="text-muted-foreground flex items-center gap-5 text-sm">
            <span>Work</span>
            <span>Series</span>
            <span className="text-foreground font-medium">Book</span>
            <span>Journal</span>
          </nav>
          <div className="flex items-center gap-2">
            <InputGroup className="w-56">
              <InputGroupAddon align="inline-start">
                <Search className="text-muted-foreground size-4" />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search 214 photographs" />
            </InputGroup>
          </div>
        </header>

        {/* ── Main ───────────────────────────────────────────────── */}
        <main className="mx-auto grid w-full max-w-[960px] flex-1 grid-cols-12 gap-5 px-6 py-4">
          {/* Booking inquiry */}
          <Card className="col-span-7 gap-3 py-4">
            <CardHeader className="px-5">
              <CardTitle className="font-heading-2 text-heading-2">
                Booking inquiry
              </CardTitle>
              <CardDescription>
                Portraits, brand stories and editorial assignments worldwide.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-4 gap-y-3 px-5">
              <Field>
                <FieldLabel htmlFor="bk-first">First name</FieldLabel>
                <Input id="bk-first" placeholder="Jonas" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-last">Last name</FieldLabel>
                <Input id="bk-last" placeholder="Riedel" required />
              </Field>
              <Field invalid>
                {/* Praxis: semantic red stays on border + message — the label
                    text itself remains neutral (weight, not hue). */}
                <FieldLabel
                  htmlFor="bk-email"
                  className="data-[error=true]:text-foreground"
                >
                  Email
                </FieldLabel>
                <Input
                  id="bk-email"
                  type="email"
                  defaultValue="jonas.riedel"
                  aria-invalid
                  required
                />
                <FieldError>Add an @ so Mara can reply.</FieldError>
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-phone">
                  Phone{" "}
                  <span className="text-muted-foreground font-normal">
                    · optional
                  </span>
                </FieldLabel>
                <Input
                  id="bk-phone"
                  type="tel"
                  placeholder="+49 30 555 0148"
                />
                {/* One-line helper mirrors the Email field's one-line error
                    so the grid row keeps equal heights across columns. */}
                <FieldDescription>Include your country code.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-location">Shoot location</FieldLabel>
                <Input id="bk-location" placeholder="Alfama, rooftops" />
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-window">Preferred window</FieldLabel>
                <Input
                  id="bk-window"
                  placeholder="June 2026 · weekends"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-budget">Budget · day rate</FieldLabel>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <InputGroupText className="font-code">€</InputGroupText>
                  </InputGroupAddon>
                  {/* Tightened start padding so the € prefix optically hugs
                      its value (matches the inline price editor on p1). */}
                  <InputGroupInput
                    id="bk-budget"
                    inputMode="numeric"
                    defaultValue="2,400"
                    className="font-code pl-2"
                  />
                </InputGroup>
                {/* Helper line mirrors the Mood board field's description so
                    the grid row keeps equal heights across both columns. */}
                <FieldDescription>
                  Excludes travel and licensing.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="bk-ref">Mood board</FieldLabel>
                <FileFieldTrigger
                  id="bk-ref"
                  accept="image/*,.pdf"
                  multiple
                  filename="moodboard.pdf +2"
                />
                <FieldDescription>Up to 5 files · JPG, PNG or PDF.</FieldDescription>
              </Field>
              <Field className="col-span-2">
                <FieldLabel htmlFor="bk-brief">The project, briefly</FieldLabel>
                <Textarea
                  id="bk-brief"
                  className="min-h-14"
                  defaultValue="Brand story for a small ceramics studio — maker portraits and the kiln room at work."
                />
              </Field>
            </CardContent>
            <CardFooter className="gap-2 px-5">
              <Button size="sm">
                <Send className="size-3.5" />
                Send inquiry
              </Button>
              <Button variant="outline" size="sm">
                Save draft
              </Button>
              <Badge variant="secondary" className="ml-auto">
                Replies within 48 h
              </Badge>
            </CardFooter>
          </Card>

          {/* Right rail */}
          <div className="col-span-5 flex flex-col gap-4">
            <Card className="gap-3 py-4">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Availability · June 2026
                </CardTitle>
                <CardDescription className="font-code text-[10px] uppercase tracking-[0.12em]">
                  78% of the month is committed
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <Progress value={78} className="h-1.5" />
                {AVAILABILITY.map((row) => (
                  <div
                    key={row.window}
                    className="flex items-center justify-between gap-3 border-t pt-3 first:border-t-0 first:pt-0"
                  >
                    <div>
                      <p className="font-code text-code leading-none">
                        {row.window}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {row.note}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        row.status === "Open"
                          ? "border-success-500/40 text-success-500"
                          : undefined
                      }
                    >
                      {row.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-3 py-4">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Studio
                </CardTitle>
                <CardDescription>
                  Campo de Santa Clara 42 · Lisboa
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback className="font-code text-xs">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm leading-none font-medium">
                      Mara Ellison
                    </p>
                    <p className="text-muted-foreground mt-1 flex items-center gap-1.5 font-code text-[11px]">
                      <Mail className="size-3" />
                      studio@marellison.pt
                    </p>
                  </div>
                  <Camera className="text-muted-foreground ml-auto size-4" />
                </div>
                <div className="border-t pt-4">
                  <Field>
                    <FieldLabel htmlFor="nl-email">Field notes</FieldLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        id="nl-email"
                        type="email"
                        placeholder="you@studio.com"
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm" className="h-9">
                        Subscribe
                      </Button>
                    </div>
                    <FieldDescription>
                      One dispatch a month, darkroom experiments included.
                    </FieldDescription>
                  </Field>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="flex items-center justify-between border-t px-6 py-3">
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            © 2026 Mara Ellison · Lisbon, PT
          </span>
          <span className="text-muted-foreground font-code text-[10px] uppercase tracking-[0.12em]">
            Prints · Licensing · Journal
          </span>
        </footer>
      </div>
    </EvalShell>
  );
}
