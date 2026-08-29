"use client";

// EVAL page — message p1 — scientific lab sample tracker — 1024x768 dark (desktop)

import {
  BeakerIcon,
  ClipboardCheckIcon,
  DownloadIcon,
  FileTextIcon,
  FlaskConicalIcon,
  LayoutDashboardIcon,
  PaperclipIcon,
  ScrollTextIcon,
  SendIcon,
  SearchIcon,
  ThermometerIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Attachment, AttachmentAction, AttachmentActions, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const NAV = [
  { label: "Overview", icon: LayoutDashboardIcon },
  { label: "Samples", icon: BeakerIcon, active: true },
  { label: "Chain of custody", icon: ClipboardCheckIcon },
  { label: "Instruments", icon: FlaskConicalIcon },
  { label: "Reports", icon: ScrollTextIcon },
];

const SAMPLES = [
  { id: "SPX-2417", name: "Liver biopsy", status: "In analysis" },
  { id: "SPX-2409", name: "Plasma panel", status: "On hold", warn: true },
  { id: "SPX-2412", name: "Urine tox screen", status: "Received" },
  { id: "SPX-2416", name: "Nasal swab PCR", status: "In analysis" },
];

const CUSTODY = [
  { time: "08:12", label: "Checked in", who: "Y. Tanaka" },
  { time: "08:47", label: "Extraction", who: "E. Vasquez" },
  { time: "09:31", label: "Assay plate loaded", who: "Pending" },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-[768px] w-full max-w-[1024px] overflow-hidden bg-background text-foreground">
        {/* Rail */}
        <aside className="flex w-56 shrink-0 flex-col border-r">
          <div className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <FlaskConicalIcon className="size-4 text-muted-foreground" />
            <div className="leading-tight">
              <p className="text-sm font-semibold">Helix Diagnostics</p>
              <p className="text-[11px] text-muted-foreground">LIMS · Building C</p>
            </div>
          </div>

          <nav className="flex flex-col gap-0.5 px-2 py-3">
            {NAV.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${
                  item.active
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground"
                }`}
              >
                <item.icon className="size-4" />
                {item.label}
                {item.label === "Samples" ? (
                  <span className="ml-auto font-code text-[11px] text-muted-foreground">24</span>
                ) : null}
              </div>
            ))}
          </nav>

          <Separator />

          <div className="flex min-h-0 flex-1 flex-col px-4 py-3">
            <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              Active samples
            </p>
            <div className="flex flex-col gap-2.5">
              {SAMPLES.map((s) => (
                <div key={s.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-code text-xs">{s.id}</span>
                    {s.warn ? (
                      <Badge variant="outline" className="border-warning-500/40 px-1.5 py-0 text-[10px] text-warning-400">
                        Hold
                      </Badge>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {s.name} · {s.status}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-auto rounded-lg border border-warning-500/30 bg-warning-400/10 p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-warning-400">
                <ThermometerIcon className="size-3.5" />
                1 cold-chain alert
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                SPX-2409 exceeded 4 °C for 22 min overnight.
              </p>
            </div>
          </div>
        </aside>

        {/* Thread */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4">
            <div className="min-w-0 flex-1 leading-tight">
              <p className="truncate text-sm font-semibold"># sample-intake</p>
              <p className="truncate text-xs text-muted-foreground">
                Chain-of-custody coordination · 6 members
              </p>
            </div>
            <Button variant="outline" size="icon-sm" aria-label="Search thread">
              <SearchIcon />
            </Button>
            <Button size="sm">
              <BeakerIcon className="size-4" />
              New sample
            </Button>
          </header>

          <main className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-5 py-3">
            <p className="self-center font-code text-[11px] text-muted-foreground">
              — Today · Mar 12 —
            </p>

            <MessageGroup className="gap-2.5">
              <Message>
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>YT</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent className="gap-1.5">
                  <MessageHeader className="text-xs text-muted-foreground">
                    Yuki Tanaka <span className="font-normal">· QA</span>
                  </MessageHeader>
                  <Bubble variant="muted">
                    <BubbleContent>
                      SPX-2417 checked in at 08:12 — liver biopsy, arrived at
                      4.2 °C. Custody form signed by the courier and scanned.
                    </BubbleContent>
                  </Bubble>
                  <Attachment className="max-w-[260px]">
                    <AttachmentMedia>
                      <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>SPX-2417_custody.pdf</AttachmentTitle>
                      <AttachmentDescription>PDF · 1.1 MB · signed</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction variant="ghost" size="icon-sm" aria-label="Download custody form">
                        <DownloadIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                  <MessageFooter className="text-xs">
                    <span className="font-code">08:14</span>
                  </MessageFooter>
                </MessageContent>
              </Message>

              <Message align="end">
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>EV</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent className="items-end gap-1.5">
                  <Bubble align="end" variant="secondary">
                    <BubbleContent>
                      Got it — extraction bay 2 is free. I&apos;ll load the assay
                      plate by 09:30 and move SPX-2409 to the hold fridge.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter className="text-xs">
                    <span className="font-code">08:37</span>
                    <span>·</span>
                    <span>Delivered</span>
                  </MessageFooter>
                </MessageContent>
              </Message>

              <Message>
                <MessageAvatar>
                  <Avatar>
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent className="gap-1.5">
                  <MessageHeader className="text-xs text-muted-foreground">
                    Marco Ruiz <span className="font-normal">· Night shift</span>
                    <Badge variant="outline" className="border-warning-500/40 text-[10px] text-warning-400">
                      Temp excursion
                    </Badge>
                  </MessageHeader>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Heads up — SPX-2409 drifted to 7.8 °C for 22 min around
                      03:40. Flagged for QA review.
                    </BubbleContent>
                  </Bubble>
                  <MessageFooter className="text-xs">
                    <span className="font-code">08:35</span>
                    <span>·</span>
                    <span>Logger FR-113</span>
                  </MessageFooter>
                </MessageContent>
              </Message>

              <Message>
                <MessageAvatar>
                  <Avatar size="lg">
                    <AvatarFallback>AO</AvatarFallback>
                  </Avatar>
                </MessageAvatar>
                <MessageContent className="gap-1.5">
                  <MessageHeader className="text-xs text-muted-foreground">
                    Dr. Amara Osei <span className="font-normal">· Lab Director</span>
                  </MessageHeader>
                  <Bubble variant="muted">
                    <BubbleContent>
                      Good catch. I&apos;ll sign the deviation after rounds. Elena —
                      check QC batch 0842 before loading the plate.
                    </BubbleContent>
                  </Bubble>
                  <Attachment className="max-w-[260px]">
                    <AttachmentMedia>
                      <FileTextIcon />
                    </AttachmentMedia>
                    <AttachmentContent>
                      <AttachmentTitle>qc-run-0842.csv</AttachmentTitle>
                      <AttachmentDescription>CSV · 84 KB · batch 0842</AttachmentDescription>
                    </AttachmentContent>
                    <AttachmentActions>
                      <AttachmentAction variant="ghost" size="icon-sm" aria-label="Download QC run">
                        <DownloadIcon />
                      </AttachmentAction>
                    </AttachmentActions>
                  </Attachment>
                  <MessageFooter className="text-xs">
                    <span className="font-code">08:44</span>
                  </MessageFooter>
                </MessageContent>
              </Message>
            </MessageGroup>
          </main>

          <footer className="flex shrink-0 items-end gap-2 border-t px-4 py-3">
            <Button variant="ghost" size="icon-sm" aria-label="Attach a file" className="text-muted-foreground">
              <PaperclipIcon />
            </Button>
            <Textarea
              rows={1}
              placeholder="Message #sample-intake…"
              className="min-h-9 resize-none py-2 text-sm"
              aria-label="Message sample-intake channel"
            />
            <Button size="icon-sm" aria-label="Send message">
              <SendIcon />
            </Button>
          </footer>
        </div>

        {/* Sample context */}
        <aside className="hidden w-64 shrink-0 flex-col gap-4 border-l p-4 md:flex">
          <Card className="gap-3 rounded-lg py-4">
            <CardContent className="flex flex-col gap-3 px-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-code text-sm font-semibold">SPX-2417</span>
                <Badge variant="secondary">In analysis</Badge>
              </div>
              <div>
                <h2 className="text-heading-3 font-heading-3">Liver biopsy</h2>
                <p className="text-xs text-muted-foreground">
                  Patient R-88214 · Received 08:12
                </p>
              </div>
              <Separator />
              <dl className="flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Arrival temp</dt>
                  <dd className="font-code text-success-500">4.2 °C</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Volume</dt>
                  <dd className="font-code">12 mL</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Storage</dt>
                  <dd className="font-code">B-2 · 4 °C</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Assay</dt>
                  <dd className="font-code">HPLX-88</dd>
                </div>
              </dl>
              <Separator />
              <div className="flex flex-col gap-2">
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  Chain of custody
                </p>
                {CUSTODY.map((c) => (
                  <div key={c.label} className="flex items-baseline gap-2 text-xs">
                    <span className="font-code text-muted-foreground">{c.time}</span>
                    <span className="font-medium">{c.label}</span>
                    <span className="ml-auto text-muted-foreground">{c.who}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="gap-3 rounded-lg py-4">
            <CardContent className="flex flex-col gap-2 px-4">
              <div className="flex items-center gap-2">
                <ThermometerIcon className="size-3.5 text-muted-foreground" />
                <h3 className="text-sm font-semibold font-heading-3">Hold queue</h3>
                <Badge variant="outline" className="ml-auto border-warning-500/40 text-[10px] text-warning-400">
                  1
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                SPX-2409 · Plasma panel — deviation report open, awaiting Dr.
                Osei&apos;s sign-off.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </EvalShell>
  );
}
