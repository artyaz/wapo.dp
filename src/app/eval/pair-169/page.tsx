"use client";

import React from "react";
import { ArrowUpRight, Plus } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

/* Suggested add-ons, swiped through before placing the pickup order. */
const SUGGESTIONS = [
  { name: "Morning Bun", detail: "Cardamom sugar", price: "$3.75" },
  { name: "Sourdough Loaf", detail: "Half · today's bake", price: "$6.00" },
  { name: "Blueberry Muffin", detail: "Sugar crumble", price: "$3.95" },
  { name: "Cardamom Roll", detail: "Flaky · baked 6 AM", price: "$4.25" },
];

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(SUGGESTIONS.length);

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <EvalShell theme="light" dir="ltr">
      {/* Backdrop + bottom-docked pickup sheet (compact half-phone surface) */}
      <div className="flex min-h-screen flex-col justify-end bg-muted/30">
        <section
          aria-label="Pickup order sheet"
          className="rounded-t-2xl border-x border-t border-border bg-card px-4 pb-4 pt-2.5 shadow-[0_-12px_32px_-16px_rgba(0,0,0,0.25)]"
        >
          {/* sheet grab handle */}
          <div className="mx-auto h-1 w-10 rounded-full bg-border" />

          {/* café header + menu link */}
          <div className="mt-2.5 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-base font-semibold leading-tight text-foreground">
                Marlow &amp; Daughters
              </h1>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pickup today · 8:15 AM · 0.4 mi
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <a href="#menu">
                View menu
                <ArrowUpRight />
              </a>
            </Button>
          </div>

          {/* swipable add-on suggestions */}
          <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Add to your order
          </p>
          <Carousel setApi={setApi} className="mt-1.5 w-full">
            <CarouselContent className="-ml-2">
              {SUGGESTIONS.map((item) => (
                <CarouselItem key={item.name} className="basis-2/3 pl-2">
                  <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium leading-tight text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 shrink-0 gap-1 px-2.5 text-xs"
                    >
                      <Plus className="size-3.5" />
                      {item.price}
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* inline slide controls under the track */}
            <div className="mt-2 flex items-center justify-center gap-3">
              <CarouselPrevious className="static top-auto left-auto size-9 translate-x-0 translate-y-0" />
              <span className="text-xs tabular-nums text-muted-foreground">
                {current} / {count}
              </span>
              <CarouselNext className="static top-auto left-auto size-9 translate-x-0 translate-y-0" />
            </div>
          </Carousel>

          {/* totals + primary action */}
          <div className="mt-3 flex items-baseline justify-between border-t border-border pt-2.5">
            <p className="text-sm text-muted-foreground">Total · 2 items</p>
            <p className="text-sm font-semibold text-foreground">
              $9.00
              <span className="ml-1.5 text-xs font-normal text-muted-foreground line-through">
                $10.00
              </span>
            </p>
          </div>
          <Button size="lg" className="mt-2 w-full">
            Place pickup order
          </Button>
        </section>
      </div>

      {/* Persistent promo toast (mobile viewport renders it at the top) */}
      <ToastProvider>
        <Toast duration={Infinity}>
          <div className="grid gap-1">
            <ToastTitle>Promo PICKUP10 applied</ToastTitle>
            <ToastDescription>
              10% off — $1.00 saved on this order
            </ToastDescription>
          </div>
          <ToastAction altText="Remove promo code">Remove</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    </EvalShell>
  );
}
