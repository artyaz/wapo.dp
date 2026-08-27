"use client";

import React from "react";
import {
  ClipboardListIcon,
  ListChecksIcon,
  WorkflowIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";

const intakeItems = [
  { name: "rollout", required: true },
  { name: "monitoring" },
  { name: "comms", required: true },
] as const;

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

const gates = [
  { name: "Unit & integration", status: "passing" },
  { name: "E2E smoke suite", status: "passing" },
  { name: "Performance budget", status: "at risk" },
  { name: "Security scan", status: "2 findings" },
  { name: "Docs refresh", status: "pending" },
] as const;

function GateStatusBadge({ status }: { status: string }) {
  if (status === "passing") {
    return (
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        passing
      </Badge>
    );
  }
  if (status === "at risk") {
    return (
      <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
        at risk
      </Badge>
    );
  }
  if (status === "pending") {
    return <Badge variant="secondary">pending</Badge>;
  }
  return <Badge variant="destructive">{status}</Badge>;
}

export default function Page() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <EvalShell theme="dark" dir="ltr">
      <main className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-8 py-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Release ops
            </p>
            <h1 className="mt-1.5 text-2xl font-semibold tracking-tight">
              Launch readiness — v2.7.0
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Complete the rollout intake before promoting the build to
              production.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              Staging · passed
            </Badge>
            <Badge variant="destructive">Production · blocked</Badge>
            <Badge variant="outline">Owner · M. Okafor</Badge>
          </div>
        </header>

        <div className="mt-6 border-b border-border" />

        <Tabs defaultValue="intake" className="mt-6">
          <TabsList>
            <TabsTrigger value="intake">
              <ClipboardListIcon />
              Intake
            </TabsTrigger>
            <TabsTrigger value="checks">
              <ListChecksIcon />
              Checks
              <Badge
                variant="secondary"
                className="px-1.5 py-0 text-[10px] leading-4"
              >
                3
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="automation" disabled>
              <WorkflowIcon />
              Automation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="intake" className="mt-6">
            <div className="grid items-start gap-6 lg:grid-cols-[1.45fr_1fr]">
              <Questionnaire
                className="rounded-2xl border border-border bg-card/50 p-6"
                defaultItem="rollout"
                items={intakeItems}
                shortcuts="numbers"
                onSubmit={handleSubmit}
              >
                <QuestionnaireProgress />

                <QuestionnaireItem
                  className={itemClassName}
                  name="rollout"
                  required
                >
                  <QuestionnaireTitle>
                    How should v2.7.0 roll out?
                  </QuestionnaireTitle>
                  <QuestionnaireDescription>
                    Pick the promotion strategy for this release.
                  </QuestionnaireDescription>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="canary" defaultChecked>
                      <span className="font-medium">Canary at 5%</span>
                      <span className="text-muted-foreground text-xs">
                        Route 5% of traffic, hold for two hours.
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="staged">
                      <span className="font-medium">Staged over 24h</span>
                      <span className="text-muted-foreground text-xs">
                        Ramp 5% → 50% → 100% with automatic rollback.
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="full">
                      <span className="font-medium">Full push</span>
                      <span className="text-muted-foreground text-xs">
                        Ship to everyone immediately. Requires sign-off.
                      </span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>

                <QuestionnaireItem className={itemClassName} name="monitoring">
                  <QuestionnaireTitle>
                    Extra monitoring for the first 48 hours?
                  </QuestionnaireTitle>
                  <QuestionnaireDescription>
                    Optional — add a second pair of eyes on the rollout.
                  </QuestionnaireDescription>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="standard">
                      <span className="font-medium">Standard alerts</span>
                      <span className="text-muted-foreground text-xs">
                        Existing dashboards and paging rules.
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="shadow">
                      <span className="font-medium">On-call shadow</span>
                      <span className="text-muted-foreground text-xs">
                        A second engineer watches the release window.
                      </span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>

                <QuestionnaireItem
                  className={itemClassName}
                  name="comms"
                  required
                >
                  <QuestionnaireTitle>
                    Who receives the release note?
                  </QuestionnaireTitle>
                  <QuestionnaireDescription>
                    Choose how the changelog is distributed.
                  </QuestionnaireDescription>
                  <QuestionnaireChoices>
                    <QuestionnaireChoice value="internal">
                      <span className="font-medium">Internal only</span>
                      <span className="text-muted-foreground text-xs">
                        Post to #release-notes for the team.
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="customers">
                      <span className="font-medium">All customers</span>
                      <span className="text-muted-foreground text-xs">
                        Publish the changelog entry in-app.
                      </span>
                    </QuestionnaireChoice>
                    <QuestionnaireChoice value="email">
                      <span className="font-medium">Changelog + email</span>
                      <span className="text-muted-foreground text-xs">
                        Also send the digest to opted-in accounts.
                      </span>
                    </QuestionnaireChoice>
                  </QuestionnaireChoices>
                  <QuestionnaireError />
                </QuestionnaireItem>

                <QuestionnaireActions className="mt-1 border-t border-border pt-4">
                  <QuestionnaireSkip />
                  <QuestionnairePrevious />
                  <QuestionnaireNext>Next</QuestionnaireNext>
                  <QuestionnaireSubmit variant="outline">
                    Save plan
                  </QuestionnaireSubmit>
                </QuestionnaireActions>
              </Questionnaire>

              <aside className="rounded-2xl border border-border bg-card/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Release gates</h2>
                  <Badge variant="outline" className="text-[10px]">
                    staging
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Blocking checks for promotion to production.
                </p>
                <ul className="mt-4 divide-y divide-border">
                  {gates.map((gate) => (
                    <li
                      key={gate.name}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <span className="text-sm">{gate.name}</span>
                      <GateStatusBadge status={gate.status} />
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  Promotion unlocks when every gate is green.
                </p>
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="checks" className="mt-6">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <h2 className="text-sm font-semibold">Full check report</h2>
              <ul className="mt-4 divide-y divide-border">
                {gates.map((gate) => (
                  <li
                    key={gate.name}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span className="text-sm">{gate.name}</span>
                    <GateStatusBadge status={gate.status} />
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </EvalShell>
  );
}
