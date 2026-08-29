"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PackageIcon,
} from "lucide-react"

import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

/**
 * Custom component #1 — a "continue" affordance. It never lists RTL variants
 * itself; it simply asks the provider which way to point.
 */
function ContinueButton({ label }: { label: string }) {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ArrowLeftIcon : ArrowRightIcon
  return (
    <Button>
      {label} <Icon />
    </Button>
  )
}

/** Custom component #2 — a disclosure chevron that mirrors itself. */
function DisclosureChevron() {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ChevronLeftIcon : ChevronRightIcon
  return <Icon className="size-4 text-muted-foreground" aria-hidden="true" />
}

/**
 * Custom component #3 — a progress-ish step meter. The filled segments are
 * the *leading* steps, so the fill grows from the inline-start edge: left in
 * LTR, right in RTL, purely by reading the direction from context.
 */
function StepMeter({ current, total }: { current: number; total: number }) {
  const direction = useDirection()
  return (
    <div
      className="flex items-center gap-1"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total} · ${direction.toUpperCase()}`}
    >
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-1.5 flex-1 rounded-full ${
            index < current ? "bg-primary" : "bg-primary/20"
          }`}
        />
      ))}
    </div>
  )
}

/** Custom component #4 — a live readout of the hook value. */
function DirectionReadout() {
  const direction = useDirection()
  return (
    <Badge variant="outline" className="font-code">
      useDirection() = &quot;{direction}&quot;
    </Badge>
  )
}

type Variant = {
  step: string
  title: string
  address: string
  eta: string
  back: string
  continue: string
}

const variants: Record<"ltr" | "rtl", Variant> = {
  ltr: {
    step: "Checkout · step 2 of 3",
    title: "Delivery",
    address: "412 Larch Street, Apt 6 · Riverbend, OR 97404",
    eta: "Arrives Thursday, Jun 12 · Free shipping",
    back: "Back",
    continue: "Continue",
  },
  rtl: {
    step: "الدفع · الخطوة 2 من 3",
    title: "التوصيل",
    address: "شارع الأمير سلطان، حي الروضة · جدة 23425",
    eta: "الوصول الخميس 12 يونيو · شحن مجاني",
    back: "رجوع",
    continue: "متابعة",
  },
}

/** One checkout card — identical markup for both locales. */
function DeliveryCard({ direction }: { direction: "ltr" | "rtl" }) {
  const v = variants[direction]
  return (
    <div dir={direction} className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-code text-[11px] text-muted-foreground">
          {v.step}
        </span>
        <DirectionReadout />
      </div>
      <StepMeter current={2} total={3} />
      <Card className="gap-3 py-4">
        <CardContent className="flex items-start gap-3 px-4">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border">
            <PackageIcon className="size-4 text-muted-foreground" />
          </span>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="font-heading-3 text-sm font-semibold">{v.title}</p>
            <p className="text-xs text-muted-foreground">{v.address}</p>
            <p className="mt-1 text-xs font-medium">{v.eta}</p>
          </div>
          <DisclosureChevron />
        </CardContent>
      </Card>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm">
          {v.back}
        </Button>
        <ContinueButton label={v.continue} />
      </div>
    </div>
  )
}

export function DirectionHookDemo() {
  return (
    <div className="grid max-w-[640px] gap-6 sm:grid-cols-2">
      {/* Two identical cards — the only difference is the provider value,
          yet every custom component inside adapts. */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Provider direction=&quot;ltr&quot;
        </p>
        <DirectionProvider direction="ltr">
          <DeliveryCard direction="ltr" />
        </DirectionProvider>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Provider direction=&quot;rtl&quot;
        </p>
        <DirectionProvider direction="rtl">
          <DeliveryCard direction="rtl" />
        </DirectionProvider>
      </div>
    </div>
  )
}
