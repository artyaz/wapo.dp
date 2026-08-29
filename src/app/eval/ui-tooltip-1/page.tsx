"use client"

// EVAL page — tooltip p1 — flight booking flow — 1024x768 light

import {
  ArrowRight,
  Bell,
  Info,
  Luggage,
  Pencil,
  Plane,
  Wifi,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const OUTBOUND = [
  {
    id: "MA 482",
    dep: "08:45",
    arr: "14:52",
    dur: "4h 07m",
    stops: "Nonstop",
    craft: "A321",
    craftFull: "Airbus A321neo · Wi-Fi + USB-C",
    price: "$214",
    best: true,
    openTip: false,
  },
  {
    id: "MA 1204",
    dep: "10:15",
    arr: "17:38",
    dur: "5h 23m",
    stops: "1 stop · DEN",
    craft: "B738",
    craftFull: "Boeing 737-800 · Wi-Fi",
    price: "$189",
    best: false,
    openTip: false,
  },
  {
    id: "PS 92",
    dep: "13:30",
    arr: "19:45",
    dur: "4h 15m",
    stops: "Nonstop",
    craft: "E75L",
    craftFull: "Embraer E175 · regional jet · no Wi-Fi",
    price: "$348",
    best: false,
    openTip: true,
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center gap-6 border-b bg-card px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-md border bg-background">
              <Plane className="size-4" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Meridian Air
            </span>
          </div>
          <nav className="flex items-center gap-5 text-sm text-muted-foreground">
            <span className="text-foreground">Book</span>
            <span>Manage trips</span>
            <span>Check-in</span>
          </nav>
          <div className="ms-auto flex items-center gap-3">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Notifications"
                  />
                }
              >
                <Bell className="size-4" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>2 trip reminders</p>
              </TooltipContent>
            </Tooltip>
            <Separator orientation="vertical" className="h-6" />
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">JR</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Trip summary strip */}
        <div className="flex h-12 shrink-0 items-center gap-4 border-b bg-background px-6">
          <span className="font-code text-sm font-semibold">SFO → ORD</span>
          <span className="text-sm text-muted-foreground">
            Fri, Mar 6 → Sat, Mar 14
          </span>
          <span className="text-sm text-muted-foreground">·</span>
          <span className="text-sm text-muted-foreground">
            1 traveler · Economy
          </span>
          <Button variant="outline" size="xs" className="ms-auto gap-1.5">
            <Pencil className="size-3" />
            Edit search
          </Button>
        </div>

        {/* Body */}
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-4 px-6 py-5">
          <Tabs defaultValue="outbound">
            <TabsList>
              <TabsTrigger value="outbound">Outbound · Mar 6</TabsTrigger>
              <TabsTrigger value="return">Return · Mar 14</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid flex-1 grid-cols-12 items-start gap-5">
            {/* Flight options */}
            <div className="col-span-7 flex flex-col gap-3">
              {OUTBOUND.map((f) => (
                <Card key={f.id} className="gap-0 py-0">
                  <CardContent className="flex items-center gap-4 px-4 py-3.5">
                    <div className="flex flex-col items-center">
                      <span className="font-code text-lg leading-tight font-semibold">
                        {f.dep}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        SFO
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                      <span className="text-[11px] text-muted-foreground">
                        {f.dur}
                      </span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                      <span className="text-[11px] whitespace-nowrap text-muted-foreground">
                        {f.stops}
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-code text-lg leading-tight font-semibold">
                        {f.arr}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        ORD
                      </span>
                    </div>
                    <Separator orientation="vertical" className="h-12" />
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-code text-lg leading-none font-semibold">
                        {f.price}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Saver
                      </span>
                    </div>
                  </CardContent>
                  <div className="flex items-center gap-3 border-t px-4 py-2">
                    <span className="font-code text-xs text-muted-foreground">
                      {f.id}
                    </span>
                    <Tooltip defaultOpen={f.openTip}>
                      <TooltipTrigger
                        render={
                          <button
                            type="button"
                            aria-label={`Aircraft details for flight ${f.id}`}
                            className="inline-flex cursor-help items-center gap-1 rounded-sm border bg-background px-1.5 py-0.5 font-code text-[11px] text-muted-foreground hover:text-foreground"
                          />
                        }
                      >
                        {f.craft}
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="start" sideOffset={6}>
                        <p>{f.craftFull}</p>
                      </TooltipContent>
                    </Tooltip>
                    {f.best ? (
                      <Badge variant="default">Best value</Badge>
                    ) : null}
                    <span className="ms-auto flex items-center gap-2.5 text-muted-foreground">
                      <Wifi className="size-3.5" />
                      <Luggage className="size-3.5" />
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Fare summary */}
            <Card className="col-span-5">
              <CardHeader className="pb-2">
                <CardTitle className="font-heading-3 text-sm">
                  Price summary
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  MA 482 · SFO → ORD · Saver
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Base fare · Adult
                    </span>
                    <span className="font-code">$171.40</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      Taxes &amp; fees
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <button
                              type="button"
                              aria-label="Tax and fee breakdown"
                              className="text-muted-foreground hover:text-foreground"
                            />
                          }
                        >
                          <Info className="size-3.5" />
                        </TooltipTrigger>
                        <TooltipContent side="left" className="w-56">
                          <p>
                            US transportation tax $38.20 · segment fees $4.40 ·
                            Sept. 11 security fee $5.60
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </span>
                    <span className="font-code">$48.20</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span className="font-code">$219.60</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Seats left at this price</span>
                    <span className="font-code">5 of 24</span>
                  </div>
                  <Progress value={21} />
                </div>
                <Button className="w-full">Continue to seat map</Button>
                <Tooltip defaultOpen>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        aria-label="Hold policy"
                        className="mx-auto flex cursor-help items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      />
                    }
                  >
                    <Info className="size-3" />
                    24-hour free hold available
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>
                      Price locked until <span className="font-code">09:12</span>{" "}
                      tomorrow — pay nothing now
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="flex h-10 shrink-0 items-center justify-between border-t bg-card px-6 text-xs text-muted-foreground">
          <span>Meridian Air · fares shown for 1 traveler, USD</span>
          <span className="font-code">Step 2 of 4 · Seats</span>
        </footer>
      </div>
    </EvalShell>
  )
}
