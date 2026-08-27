"use client";

import React from "react";
import Link from "next/link";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  ArrowRight,
  Bell,
  Landmark,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const recentTransfers = [
  { id: 1, name: "מיכל לוי", detail: "בנק הפועלים · עו״ש 34-902118", when: "היום, 09:12", amount: "₪320.00" },
  { id: 2, name: "אבי שמש", detail: "בנק דיסקונט · עו״ש 71-548300", when: "אתמול, 18:40", amount: "₪95.50" },
];

export default function Page() {
  const [otp, setOtp] = React.useState("7K4");

  return (
    <EvalShell theme="light" dir="rtl">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col">
        {/* App bar + primary navigation */}
        <header className="border-b px-4 pb-1 pt-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="חזרה"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex size-9 items-center justify-center rounded-md transition-colors"
            >
              <ArrowRight className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="bg-foreground text-background flex size-9 items-center justify-center rounded-lg">
                <Landmark className="size-4" />
              </div>
              <div>
                <p className="text-sm leading-none font-semibold">מזרחי דיגיטל</p>
                <p className="text-muted-foreground mt-1 text-xs leading-none">
                  עו״ש 482-731905
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="התראות"
              className="text-muted-foreground hover:bg-accent hover:text-accent-foreground ms-auto flex size-9 items-center justify-center rounded-md transition-colors"
            >
              <Bell className="size-4" />
            </button>
          </div>

          <NavigationMenu dir="rtl" className="mt-2 flex-1 justify-start">
            <NavigationMenuList className="justify-start gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink
                  active
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="#" />}
                >
                  העברות
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="#" />}
                >
                  כרטיסים
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>עוד</NavigationMenuTrigger>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </header>

        {/* Transfer summary behind the verification dialog */}
        <main className="flex flex-1 flex-col gap-4 px-4 py-5">
          <div>
            <h1 className="text-lg leading-tight font-semibold">
              העברה בנקאית מאובטחת
            </h1>
            <p className="text-muted-foreground text-sm">
              יעד חדש · נדרש אימות לפני הביצוע
            </p>
          </div>

          <section className="rounded-xl border p-4">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-full">
                <Wallet className="size-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm leading-none font-medium">דניאל כהן</p>
                <p className="text-muted-foreground mt-1.5 text-xs leading-none">
                  בנק לאומי · עו״ש 12-857462
                </p>
              </div>
            </div>
            <dl className="divide-y text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">סכום ההעברה</dt>
                <dd className="font-medium">₪1,250.00</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="text-muted-foreground">עמלת העברה</dt>
                <dd className="font-medium">₪4.90</dd>
              </div>
              <div className="flex items-center justify-between py-3">
                <dt className="font-semibold">סה״כ לחיוב</dt>
                <dd className="text-base font-semibold">₪1,254.90</dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-semibold">העברות אחרונות</h2>
            <ul className="divide-y rounded-xl border">
              {recentTransfers.map((t) => (
                <li key={t.id} className="flex items-center gap-3 p-3">
                  <div className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-full text-xs font-medium">
                    {t.name.slice(0, 1)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-none font-medium">{t.name}</p>
                    <p className="text-muted-foreground mt-1.5 text-xs leading-none">
                      {t.detail} · {t.when}
                    </p>
                  </div>
                  <p className="text-sm font-medium">{t.amount}</p>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-muted-foreground mt-auto flex items-center gap-2 pt-2 text-xs">
            <ShieldCheck className="size-4 shrink-0" />
            ההעברה מוגנת באימות דו־שלבי והצפנה מקצה לקצה
          </p>
        </main>

        {/* Open verification dialog with the OTP code entry */}
        <Dialog defaultOpen>
          <DialogContent dir="rtl" className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>אימות העברה</DialogTitle>
              <DialogDescription>
                הזן את הקוד בן 6 התווים שנשלח אל המכשיר המסתיים ב־4521
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center gap-3">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-muted-foreground text-xs">
                הקוד תקף 4:52 דקות ·{" "}
                <span className="text-foreground underline underline-offset-4">
                  שלח קוד חדש
                </span>
              </p>
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">ביטול</Button>} />
              <Button>אישור העברה</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </EvalShell>
  );
}
