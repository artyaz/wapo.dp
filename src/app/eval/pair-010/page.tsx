"use client";

import React from "react";
import { CalendarDays, GitCompareArrows, Sparkles } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { InlineChips } from "@/components/ds/InlineChips";
import { Calendar } from "@/components/ui/calendar";

const BILLING_MONTH = new Date(2026, 0, 1);
const BILLING_START = new Date(2026, 0, 12);
const EARLIEST_START = new Date(2026, 0, 5);

const planItems = [
  { name: "tier", required: true },
  { name: "cycle", required: true },
  { name: "addons" },
] as const;

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

function choiceSpec(lines: React.ReactNode) {
  return (
    <span className="flex min-w-0 flex-col gap-0.5 text-muted-foreground text-[12px] leading-[16px]">
      {lines}
    </span>
  );
}

export default function Page() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex w-full max-w-md flex-col gap-4 p-4 pb-10">
        {/* Header */}
        <header className="flex items-start gap-3">
          <div className="mt-0.5 flex size-9 flex-none items-center justify-center rounded-lg border border-border bg-muted/40">
            <GitCompareArrows className="size-4 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base font-semibold leading-tight">
              Plan comparison
            </h1>
            <p className="text-muted-foreground text-xs leading-[16px]">
              Praxis Cloud · us-east-1 · pricing synced 4 minutes ago
            </p>
          </div>
          <span className="mt-0.5 inline-flex items-center gap-1 rounded-md border border-border bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Sparkles className="size-3" />
            Estimator
          </span>
        </header>

        {/* Comparison baseline — ds:InlineChips woven into prose */}
        <section className="rounded-lg border border-border bg-muted/20 p-3">
          <h2 className="mb-1.5 text-xs font-semibold tracking-wide uppercase">
            Baseline
          </h2>
          <p className="text-[13px] leading-[22px] text-neutral-300">
            Rates read from{" "}
            <InlineChips.FileRef kind="json" path="config/pricing">
              regional-pricing.json
            </InlineChips.FileRef>
            , promo <InlineChips.CodePill>LAUNCH-2026</InlineChips.CodePill>{" "}
            applied at checkout through{" "}
            <InlineChips.IntegrationAvatar glyph="S" /> Stripe Billing. Deltas
            are measured against your current{" "}
            <InlineChips.CodePill>starter-2x</InlineChips.CodePill> subscription
            on the{" "}
            <InlineChips.FileRef kind="md">COMPARE.md</InlineChips.FileRef>{" "}
            worksheet.
          </p>
        </section>

        {/* Plan wizard — ui:questionnaire */}
        <section className="rounded-lg border border-border p-3">
          <Questionnaire
            defaultItem="tier"
            items={planItems}
            onSubmit={handleSubmit}
          >
            <QuestionnaireProgress />

            <QuestionnaireItem className={itemClassName} name="tier" required>
              <QuestionnaireTitle>
                Which compute tier should we price first?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Hourly rates for us-east-1, including 20 GiB of snapshot backup
                storage and pooled egress.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="starter-2x" defaultChecked>
                  <span className="font-medium">Starter 2× — shared vCPU</span>
                  {choiceSpec(
                    <>
                      <span>2 vCPU · 4 GiB RAM · 80 GiB NVMe disk</span>
                      <span>
                        $0.031/hr ≈ $22.40/mo — fits staging apps and low-traffic
                        side projects that tolerate noisy neighbours.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="pro-4x">
                  <span className="font-medium">Pro 4× — dedicated vCPU</span>
                  {choiceSpec(
                    <>
                      <span>4 vCPU · 16 GiB RAM · 240 GiB NVMe disk</span>
                      <span>
                        $0.118/hr ≈ $85.70/mo — bursts to 8 vCPU for build agents
                        and production APIs with autoscaling enabled.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="scale-8x">
                  <span className="font-medium">
                    Scale 8× — reserved capacity
                  </span>
                  {choiceSpec(
                    <>
                      <span>8 vCPU · 32 GiB RAM · 600 GiB NVMe disk</span>
                      <span>
                        $0.236/hr ≈ $171.40/mo — priority scheduling for
                        latency-sensitive databases and Kubernetes node pools.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            <QuestionnaireItem className={itemClassName} name="cycle" required>
              <QuestionnaireTitle>
                How should the selected plan be billed?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Commitment terms change the effective rate; promo stacking is
                applied to the first invoice only.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="monthly">
                  <span className="font-medium">Monthly invoice — net 15</span>
                  {choiceSpec(
                    <>
                      <span>
                        Prices exactly as listed, cancel any time without an
                        early-termination penalty or proration fee.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="annual">
                  <span className="font-medium">
                    Annual prepay — save 18%
                  </span>
                  {choiceSpec(
                    <>
                      <span>
                        One charge today; LAUNCH-2026 stacks for the first year,
                        then renews at the standard regional rate.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="ondemand">
                  <span className="font-medium">
                    On-demand hourly — metered card
                  </span>
                  {choiceSpec(
                    <>
                      <span>
                        Pay per compute-hour to the metered card; regional
                        egress billed separately at $0.02/GiB after the first
                        500 GiB each month.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            <QuestionnaireItem className={itemClassName} name="addons">
              <QuestionnaireTitle>Any add-ons to include?</QuestionnaireTitle>
              <QuestionnaireDescription>
                Optional — pick as many as you need, or skip to compare the base
                plan alone.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="support" defaultChecked>
                  <span className="font-medium">
                    Priority support SLA — $29/mo
                  </span>
                  {choiceSpec(
                    <>
                      <span>
                        4-hour first response, 24×7 coverage, private Slack
                        channel routed to the on-call engineer.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="replica">
                  <span className="font-medium">
                    Managed Postgres replica — $0.064/hr
                  </span>
                  {choiceSpec(
                    <>
                      <span>
                        Warm standby in us-east-1 with automatic failover and
                        continuous point-in-time recovery.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
                <QuestionnaireChoice value="storage">
                  <span className="font-medium">
                    Extended object storage — $0.015/GiB·mo
                  </span>
                  {choiceSpec(
                    <>
                      <span>
                        Space beyond the bundled 500 GiB, billed per gigabyte
                        with lifecycle policies to cold tiers.
                      </span>
                    </>
                  )}
                </QuestionnaireChoice>
              </QuestionnaireChoices>
              <QuestionnaireError />
            </QuestionnaireItem>

            <QuestionnaireActions>
              <QuestionnairePrevious />
              <QuestionnaireNext>Next</QuestionnaireNext>
              <QuestionnaireSubmit>Lock in pricing</QuestionnaireSubmit>
            </QuestionnaireActions>
          </Questionnaire>
        </section>

        {/* Billing start — ui:calendar */}
        <section className="rounded-lg border border-border p-3">
          <div className="mb-2 flex items-center gap-2">
            <CalendarDays className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold leading-none">
              Billing start date
            </h2>
          </div>
          <p className="text-muted-foreground mb-3 text-[12px] leading-[16px]">
            Your discounted rate activates on the first day of the chosen
            billing window. Starts before Jan 5, 2026 cannot be backdated.
          </p>
          <Calendar
            mode="single"
            defaultMonth={BILLING_MONTH}
            defaultSelected={BILLING_START}
            disabled={{ before: EARLIEST_START }}
            className="rounded-lg border"
          />
          <p className="text-muted-foreground mt-3 border-t border-border pt-2 text-[12px] leading-[16px]">
            Selected: Jan 12, 2026 — Pro 4× annual prepay, first charge ≈
            $702.74/yr after the 18% discount.
          </p>
        </section>
      </div>
    </EvalShell>
  );
}
