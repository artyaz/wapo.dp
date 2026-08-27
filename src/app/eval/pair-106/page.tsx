"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GlassRefraction } from "@/components/ds/GlassRefraction";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Check,
  CreditCard,
  Droplets,
  RefreshCw,
  Scale,
  ShieldCheck,
} from "lucide-react";

/**
 * Scenario: "Praxis Glass" pricing page (Hebrew, RTL) — the visitor opened the
 * "plan comparison" dialog over the pricing screen. Each plan column compares a
 * liquid-glass material tier via its ds:GlassRefraction specimen; the page
 * chrome carries a ui:breadcrumb trail (home › products › … › pricing ›
 * comparison) and a reassurance strip below the modal.
 */

const PLANS = [
  {
    id: "basic",
    name: "בסיסית",
    material: "thin",
    price: "₪49",
    features: ["3 פרויקטים", "ייצוא קבצי עיצוב"],
    recommended: false,
  },
  {
    id: "pro",
    name: "פרו",
    material: "regular",
    price: "₪129",
    features: ["פרויקטים ללא הגבלה", "תמיכה בעדיפות"],
    recommended: true,
  },
  {
    id: "studio",
    name: "סטודיו",
    material: "thick",
    price: "₪299",
    features: ["עד 10 משתמשים", "מנהל הצלחה אישי"],
    recommended: false,
  },
] as const;

export default function Page() {
  return (
    <EvalShell theme="light" dir="rtl">
      <div className="flex min-h-dvh flex-col bg-background px-10 pb-6 pt-5 text-foreground">
        {/* ── top bar: brand + nav + comparison trigger (ui:dialog) ── */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="size-4" strokeWidth={1.75} />
            <span className="text-sm font-semibold tracking-tight">
              פרקסיס גלאס
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              תיעוד
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              תמיכה
            </a>
            <Dialog defaultOpen>
              <DialogTrigger
                render={
                  <Button variant="outline" size="sm">
                    <Scale className="size-3.5" />
                    השוואה מפורטת
                  </Button>
                }
              />
              <DialogContent dir="rtl" className="sm:max-w-[640px]">
                <DialogHeader>
                  <DialogTitle>השוואת תוכניות</DialogTitle>
                  <DialogDescription>
                    שלוש רמות חומר זכוכית, צד לצד — בחרו את התוכנית
                    המתאימה לסטודיו שלכם.
                  </DialogDescription>
                </DialogHeader>

                {/* plan columns — each compares its glass material specimen */}
                <div className="grid grid-cols-3 gap-3">
                  {PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`flex flex-col items-center rounded-xl border p-2.5 ${
                        plan.recommended
                          ? "border-primary/50"
                          : "border-border"
                      }`}
                    >
                      <GlassRefraction
                        material={plan.material}
                        className="gap-2 py-2.5"
                      >
                        <span className="w-full text-center font-code text-[11px] tracking-[0.1em] text-default-font/80 uppercase">
                          {plan.material}
                        </span>
                      </GlassRefraction>
                      <div className="mt-1 flex items-center gap-1.5">
                        <span className="text-sm font-semibold">
                          {plan.name}
                        </span>
                        {plan.recommended && (
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            מומלצת
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 flex items-baseline gap-1">
                        <span className="text-base font-semibold tabular-nums">
                          {plan.price}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          לחודש
                        </span>
                      </div>
                      <ul className="mt-2 flex flex-col items-start gap-1">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-1.5 text-xs text-muted-foreground"
                          >
                            <Check
                              className="size-3.5 flex-none text-foreground/70"
                              strokeWidth={2}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <DialogFooter>
                  <DialogClose
                    render={<Button variant="outline">סגור</Button>}
                  />
                  <Button>
                    <CreditCard className="size-4" />
                    שדרג לפרו
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* ── trail (ui:breadcrumb) ─────────────────────────────── */}
        <Breadcrumb className="mt-3.5">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">בית</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">מוצרים</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">תמחור</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>השוואת תוכניות</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* ── page heading (behind the open comparison modal) ──── */}
        <div className="mt-3.5 flex items-baseline gap-3">
          <h1 className="text-xl font-semibold tracking-tight">
            בחרו את רמת הזכוכית שלכם
          </h1>
          <p className="text-sm text-muted-foreground">
            ההשוואה המלאה פתוחה מולכם
          </p>
        </div>

        {/* ── reassurance strip below the modal ────────────────── */}
        <footer className="mt-auto border-t border-border pt-4">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="size-3.5" />
              עדכונים שוטפים ללא עלות
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5" />
              אבטחה ברמה ארגונית
            </span>
            <span className="flex items-center gap-1.5">
              <BadgeCheck className="size-3.5" />
              ביטול בכל עת
            </span>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground/70">
            פרקסיס גלאס © 2025 · כל הזכויות שמורות
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
