"use client";

// EVAL page — accordion p1 — conference event ticketing — 1280x800 dark
// Showcases: Accordion (hero) + Card, Badge, Button, Table, Progress, Separator

import {
  CheckIcon,
  InfoIcon,
  LockIcon,
  TicketIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tiers = [
  {
    id: "community",
    name: "Community pass",
    wasPrice: "€189",
    price: "€149",
    claimed: 92,
    claimedLabel: "734 / 800 claimed",
    includes: [
      "Both conference days (Sep 9–10)",
      "All keynotes and breakout talks",
      "Lunch, coffee and opening reception",
    ],
  },
  {
    id: "standard",
    name: "Standard pass",
    wasPrice: "€389",
    price: "€329",
    claimed: 68,
    claimedLabel: "1,088 / 1,600 claimed",
    includes: [
      "Everything in the Community pass",
      "Workshop recordings, released Sep 20",
      "Conference party at Bimhuis",
    ],
  },
  {
    id: "workshop",
    name: "Workshop bundle",
    wasPrice: "€559",
    price: "€489",
    claimed: 66,
    claimedLabel: "79 / 120 claimed",
    includes: [
      "Everything in the Standard pass",
      "One full-day workshop (Sep 8)",
      "Workshop materials and lab access",
    ],
  },
  {
    id: "vanguard",
    name: "Vanguard pass",
    wasPrice: null as string | null,
    price: "€899",
    claimed: 22,
    claimedLabel: "9 / 40 claimed",
    includes: [
      "Both full-day workshops (Sep 7–8)",
      "Speaker dinner on Sep 8",
      "Vanguard lounge and concierge desk",
    ],
  },
];

const faqs = [
  {
    id: "refunds",
    q: "Can I get a refund?",
    a: "Tickets are fully refundable until August 1, 2026 — after that, passes transfer for €25.",
  },
  {
    id: "vat",
    q: "Do you issue VAT invoices?",
    a: "Yes. Add your company details and VAT ID at checkout and the invoice is emailed instantly.",
  },
  {
    id: "groups",
    q: "Is there a group discount?",
    a: "Groups of 5 or more get 15% off — email tickets@praxisconf.nl for a single invoice.",
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="bg-background text-foreground flex min-h-screen flex-col">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b px-8">
          <div className="flex items-center gap-3.5">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-md">
              <TicketIcon className="size-4" />
            </div>
            <div>
              <h1 className="text-heading-3 font-heading-3 font-semibold">
                PraxisConf 2026
              </h1>
              <p className="text-muted-foreground font-code text-code">
                SEP 08–10, 2026 · AMSTERDAM RAI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1.5">
              <InfoIcon />
              Early bird ends Mar 17
            </Badge>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">My tickets</Button>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto grid w-full max-w-[1180px] flex-1 grid-cols-[minmax(0,1fr)_330px] gap-8 px-8 py-4">
          {/* Left — pass picker */}
          <section className="flex min-w-0 flex-col">
            <div>
              <h2 className="text-heading-2 font-heading-2">
                Choose your pass
              </h2>
              <p className="text-muted-foreground mt-0.5 text-sm">
                All passes include talks, lunch and the opening reception.
              </p>
            </div>

            <Accordion
              type="single"
              defaultValue="standard"
              className="mt-4 overflow-hidden rounded-lg border"
            >
              {tiers.map((tier) => (
                <AccordionItem key={tier.id} value={tier.id} className="px-5">
                  <AccordionTrigger>
                    <span className="flex flex-1 items-center justify-between gap-4 pr-4">
                      <span className="flex items-center gap-2.5">
                        {tier.name}
                        {tier.id === "standard" ? (
                          <Badge variant="secondary">Most popular</Badge>
                        ) : null}
                      </span>
                      <span className="flex items-baseline gap-2">
                        {tier.wasPrice ? (
                          <span className="text-muted-foreground font-code text-code line-through">
                            {tier.wasPrice}
                          </span>
                        ) : null}
                        <span className="font-code text-code font-medium">
                          {tier.price}
                        </span>
                      </span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 pb-0.5">
                      <ul className="flex flex-col gap-1">
                        {tier.includes.map((line) => (
                          <li
                            key={line}
                            className="flex items-center gap-2 text-sm"
                          >
                            <CheckIcon className="text-muted-foreground size-3.5 shrink-0" />
                            {line}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col gap-1">
                        <div className="text-muted-foreground flex items-center justify-between text-xs">
                          <span>Early bird pricing</span>
                          <span className="font-code text-code">
                            {tier.claimedLabel}
                          </span>
                        </div>
                        <Progress value={tier.claimed} className="h-1.5" />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <p className="text-muted-foreground mt-4 text-xs font-medium tracking-wide uppercase">
              Good to know
            </p>
            <Accordion multiple defaultValue={["refunds"]} className="mt-1.5">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger>{faq.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground max-w-[60ch] text-sm">
                      {faq.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Right — order summary */}
          <aside className="min-w-0">
            <Card className="gap-4 py-5">
              <CardHeader>
                <CardTitle className="text-heading-3 font-heading-3">
                  Order summary
                </CardTitle>
                <CardDescription className="text-sm">
                  Standard pass · Workshop bundle
                </CardDescription>
                <CardAction>
                  <Badge variant="outline">3 items</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-8 text-xs">Item</TableHead>
                      <TableHead className="h-8 text-right text-xs">
                        Qty
                      </TableHead>
                      <TableHead className="h-8 text-right text-xs">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="py-2.5 text-sm">
                        Standard pass
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        2
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        €658.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-2.5 text-sm">
                        Workshop · Designing calm interfaces
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        1
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        €120.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell className="py-2.5 text-sm" colSpan={2}>
                        Subtotal
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        €778.00
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="py-2.5 text-sm" colSpan={2}>
                        VAT 21%
                      </TableCell>
                      <TableCell className="py-2.5 text-right font-code text-code">
                        €163.38
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-code text-code font-semibold">
                    €941.38
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2.5">
                <Button className="w-full">Continue to payment</Button>
                <Button variant="ghost" className="w-full">
                  Save for later
                </Button>
                <p className="text-muted-foreground flex items-center justify-center gap-1.5 pt-0.5 text-xs">
                  <LockIcon className="size-3" />
                  VAT invoice and PO supported at checkout
                </p>
              </CardFooter>
            </Card>
          </aside>
        </main>

        {/* Footer */}
        <footer className="text-muted-foreground flex h-11 shrink-0 items-center justify-between border-t px-8 font-code text-code">
          <span>PRAXISCONF 2026 · 4,000 ATTENDEES</span>
          <span>REFUNDS UNTIL AUG 01 · CODE OF CONDUCT</span>
        </footer>
      </div>
    </EvalShell>
  );
}
