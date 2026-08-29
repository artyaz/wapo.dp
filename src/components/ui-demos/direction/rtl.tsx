"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  DownloadIcon,
  TrainFrontIcon,
} from "lucide-react"

import { DirectionProvider, useDirection } from "@/components/ui/direction"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

/**
 * A direction-aware travel glyph: in an RTL context the route is read
 * right-to-left, so the arrow between the two cities points left —
 * the component asks `useDirection()` instead of hard-coding it.
 */
function RouteArrow({ className }: { className?: string }) {
  const direction = useDirection()
  const Icon = direction === "rtl" ? ArrowLeftIcon : ArrowRightIcon
  return <Icon className={className} aria-hidden="true" />
}

type Leg = {
  city: string
  station: string
  time: string
  label: string
}

const legs: [Leg, Leg] = [
  {
    city: "الرياض",
    station: "محطة قطار الرياض",
    time: "08:30",
    label: "المغادرة",
  },
  {
    city: "جدة",
    station: "محطة قطار جدة",
    time: "12:45",
    label: "الوصول",
  },
]

const steps = [
  { label: "تم الحجز", state: "done" as const },
  { label: "تم الدفع", state: "done" as const },
  { label: "إصدار التذكرة", state: "current" as const },
]

function BookingSteps() {
  // Segments are laid out with flex — under `dir="rtl"` the first step
  // naturally sits on the right, no reversed arrays needed.
  return (
    <ol className="flex items-center gap-1.5" aria-label="حالة الحجز">
      {steps.map((step) => (
        <li key={step.label} className="flex flex-1 flex-col items-center gap-1.5">
          <span
            className={`h-1.5 w-full rounded-full ${
              step.state === "done"
                ? "bg-primary"
                : "bg-primary/20 ring-1 ring-primary/40 ring-inset"
            }`}
          />
          <span
            className={`text-[11px] ${
              step.state === "current"
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            }`}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  )
}

export function DirectionRtlDemo() {
  return (
    <div className="max-w-[640px]">
      <DirectionProvider direction="rtl">
        {/* The provider carries the direction in context; the `dir` attribute
            below mirrors the document flow so the layout and the icon logic
            agree — the same pairing used on `<html dir="rtl">`. */}
        <div dir="rtl" className="flex flex-col gap-4">
          <Card className="gap-4">
            <CardHeader className="border-b">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <TrainFrontIcon className="size-4" />
                </span>
                <div className="flex flex-col">
                  <p className="font-heading-3 text-base leading-tight font-semibold">
                    قطار الحرمين — حجز مؤكد
                  </p>
                  <p className="font-code text-[11px] text-muted-foreground">
                    HHR-88214 · القطار 4721
                  </p>
                </div>
                <Badge variant="default" className="ms-auto font-code">
                  مؤكد
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="flex flex-col gap-4">
              {/* Route — the arrow points toward travel direction (left in RTL). */}
              <div className="flex items-center gap-3">
                <div className="flex flex-col gap-0.5 text-start">
                  <span className="font-heading-3 text-xl leading-none font-semibold">
                    {legs[0].city}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {legs[0].station}
                  </span>
                </div>
                <div className="flex flex-1 flex-col items-center gap-1 px-2">
                  <div className="flex w-full items-center gap-1.5">
                    <span className="h-px flex-1 bg-border" />
                    <RouteArrow className="size-4 text-muted-foreground" />
                  </div>
                  <span className="font-code text-[11px] text-muted-foreground">
                    4 س 15 د
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 text-end">
                  <span className="font-heading-3 text-xl leading-none font-semibold">
                    {legs[1].city}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {legs[1].station}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Details grid — mirrors completely under `dir="rtl"`. */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    التاريخ
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <CalendarIcon className="size-3.5 text-muted-foreground" />
                    الخميس 12 يونيو
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    المغادرة
                  </span>
                  <span className="font-code text-sm font-semibold">08:30</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    الوصول
                  </span>
                  <span className="font-code text-sm font-semibold">12:45</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-muted-foreground">
                    الدرجة / المقعد
                  </span>
                  <span className="text-sm font-medium">الأعمال · 12A</span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  الإجمالي شامل الضريبة
                </span>
                <span className="font-code text-lg font-semibold">
                  345.00 ر.س
                </span>
              </div>

              <BookingSteps />
            </CardContent>

            <CardFooter className="gap-2 border-t [.border-t]:pt-4">
              <Button variant="outline" className="ms-auto">
                تغيير المقعد
              </Button>
              <Button>
                <DownloadIcon /> تحميل التذكرة
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DirectionProvider>
    </div>
  )
}
