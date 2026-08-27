"use client";

import React from "react";
import Link from "next/link";
import { EvalShell } from "@/eval/EvalShell";
import { FloatingToolbar } from "@/components/ds/FloatingToolbar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  AlignJustify,
  Bell,
  ChevronDown,
  CreditCard,
  Languages,
  LifeBuoy,
  Mail,
  Palette,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Users,
  X,
} from "lucide-react";

/* ---------- small static chrome building blocks ---------- */

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      className={
        "flex h-5 w-9 flex-none items-center rounded-full px-0.5 " +
        (on ? "justify-end bg-foreground" : "justify-start bg-input")
      }
    >
      <span
        className={
          "size-4 rounded-full " + (on ? "bg-background" : "bg-muted-foreground/60")
        }
      />
    </span>
  );
}

function SelectLook({ value }: { value: string }) {
  return (
    <span className="flex h-9 w-40 flex-none items-center gap-1.5 rounded-md border border-input bg-background px-3 text-sm text-foreground">
      {value}
      <ChevronDown className="ms-auto size-3.5 text-muted-foreground" />
    </span>
  );
}

function ChangedChip() {
  return (
    <span className="rounded-full bg-warning-500/10 px-2 py-0.5 text-[10px] font-medium leading-4 text-warning-400">
      השתנה
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pb-1 pt-3.5 text-xs font-medium text-muted-foreground">
      {children}
    </h2>
  );
}

function Row({
  icon: Icon,
  label,
  hint,
  chip,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  hint?: string;
  chip?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex h-11 items-center gap-2.5">
      <Icon className="size-4 flex-none text-muted-foreground" />
      <span className="whitespace-nowrap text-sm">{label}</span>
      {hint ? (
        <span className="hidden whitespace-nowrap text-xs text-muted-foreground sm:inline">
          {hint}
        </span>
      ) : null}
      {chip}
      <span className="ms-auto flex items-center gap-2.5">{children}</span>
    </div>
  );
}

function NavListItem({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <li>
      <NavigationMenuLink render={<Link href={href} />}>
        <span className="flex flex-col gap-1">
          <span className="text-sm font-medium leading-none">{title}</span>
          <span className="line-clamp-2 text-xs leading-4 text-muted-foreground">
            {description}
          </span>
        </span>
      </NavigationMenuLink>
    </li>
  );
}

const SECTIONS = [
  { label: "כללי", icon: Settings, active: true },
  { label: "אבטחה", icon: ShieldCheck, active: false },
  { label: "התראות", icon: Bell, active: false },
  { label: "חיוב ומנוי", icon: CreditCard, active: false },
  { label: "חברי צוות", icon: Users, active: false },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
        {/* ── top bar: product identity + global navigation ── */}
        <header className="flex h-14 flex-none items-center justify-between gap-4 border-b border-border px-5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 flex-none items-center justify-center rounded-lg bg-foreground text-background">
              <SlidersHorizontal className="size-4" />
            </span>
            <span className="text-sm font-semibold leading-none">פרקסיס</span>
            <span className="rounded-full border border-border px-2 py-0.5 text-[11px] leading-4 text-muted-foreground">
              סביבה: סטודיו לב
            </span>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>סביבת עבודה</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-2">
                    <NavListItem
                      href="#"
                      title="כללי"
                      description="פרופיל, שפה, מראה והתראות הסביבה"
                    />
                    <NavListItem
                      href="#"
                      title="חברי צוות"
                      description="הזמנת משתמשים וניהול הרשאות"
                    />
                    <NavListItem
                      href="#"
                      title="חיוב ומנוי"
                      description="תוכניות, אמצעי תשלום וחשבוניות"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>פרויקטים</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-2">
                    <NavListItem
                      href="#"
                      title="סטודיו לב — אתר ראשי"
                      description="עודכן לפני שעתיים"
                    />
                    <NavListItem
                      href="#"
                      title="מסע פרסום אביב"
                      description="עודכן אתמול"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  render={<Link href="#" />}
                  className={navigationMenuTriggerStyle()}
                >
                  עזרה
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        {/* ── breadcrumb ── */}
        <div className="flex-none px-5 pt-3.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">בית</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">הגדרות סביבה</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>כללי</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* ── page title + pending-changes status ── */}
        <div className="flex flex-none items-end justify-between gap-4 px-5 pb-3 pt-2.5">
          <div>
            <h1 className="text-lg font-semibold leading-6">הגדרות</h1>
            <p className="mt-1 text-xs leading-4 text-muted-foreground">
              פרופיל, מראה והתראות עבור סביבת העבודה שלך
            </p>
          </div>
          <span className="mb-0.5 inline-flex flex-none items-center gap-1.5 rounded-full border border-warning-500/25 bg-warning-500/10 px-2.5 py-1 text-[11px] font-medium text-warning-400">
            <span className="size-1.5 rounded-full bg-warning-500" />
            3 שינויים ממתינים לשמירה
          </span>
        </div>

        {/* ── settings body: section rail + panel with floating toolbar ── */}
        <div className="grid min-h-0 flex-1 grid-cols-[212px_minmax(0,1fr)] gap-6 px-5 pb-6">
          <aside className="flex min-h-0 flex-col gap-1">
            <p className="px-2.5 pb-1.5 text-[11px] font-medium tracking-wide text-muted-foreground">
              קטגוריות
            </p>
            {SECTIONS.map((section) => (
              <span
                key={section.label}
                className={
                  "flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm " +
                  (section.active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground")
                }
              >
                <section.icon className="size-4 flex-none" />
                {section.label}
              </span>
            ))}
            <div className="mt-auto rounded-lg border border-border bg-card p-3">
              <div className="flex items-center gap-2 text-xs font-medium">
                <LifeBuoy className="size-3.5 text-muted-foreground" />
                צריכים עזרה?
              </div>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                מרכז התמיכה של פרקסיס זמין בימים א׳–ה׳, 9:00–18:00
              </p>
            </div>
          </aside>

          <main className="relative min-h-0">
            <section className="h-full overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <div className="px-5 pb-24 pt-1">
                <SectionTitle>פרופיל</SectionTitle>
                <Row icon={User} label="שם מלא" chip={<ChangedChip />}>
                  <input
                    readOnly
                    defaultValue="דנה לוי"
                    className="h-9 w-56 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
                  />
                </Row>
                <Row icon={Mail} label="דוא״ל" hint="משמש לכניסה למערכת">
                  <input
                    readOnly
                    defaultValue="dana@praxis.io"
                    className="h-9 w-56 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none"
                  />
                </Row>
                <Row icon={Languages} label="שפת הממשק" chip={<ChangedChip />}>
                  <SelectLook value="עברית" />
                </Row>

                <SectionTitle>מראה</SectionTitle>
                <Row icon={Palette} label="ערכת נושא">
                  <span className="flex items-center gap-0.5 rounded-lg border border-input bg-background p-0.5">
                    {["בהיר", "כהה", "מערכת"].map((option) => (
                      <span
                        key={option}
                        className={
                          "flex h-7 items-center rounded-md px-3 text-xs " +
                          (option === "כהה"
                            ? "bg-foreground font-medium text-background"
                            : "text-muted-foreground")
                        }
                      >
                        {option}
                      </span>
                    ))}
                  </span>
                </Row>
                <Row icon={AlignJustify} label="צפיפות תצוגה">
                  <SelectLook value="נוחה" />
                </Row>

                <SectionTitle>התראות</SectionTitle>
                <Row icon={Mail} label="התראות בדוא״ל">
                  <Toggle on />
                </Row>
                <Row
                  icon={Bell}
                  label="התראות דחיפה בנייד"
                  chip={<ChangedChip />}
                >
                  <Toggle on={false} />
                </Row>
              </div>
            </section>

            {/* floating "unsaved changes" toolbar over the panel */}
            <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
              <FloatingToolbar>
                <FloatingToolbar.Action
                  glyph={<Save className="size-3.5" />}
                  label="שמור שינויים"
                />
                <FloatingToolbar.Action
                  glyph={<RotateCcw className="size-3.5" />}
                  label="אפס"
                />
                <FloatingToolbar.Rule />
                <FloatingToolbar.Action
                  glyph={<X className="size-3.5" />}
                  label="בטל שינויים"
                  tone="destructive"
                />
              </FloatingToolbar>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
