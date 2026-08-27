"use client";

import React from "react";
import { BotIcon, WorkflowIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { CanvasNode } from "@/components/ds/CanvasNode";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
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
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";

const wizardItems = [
  { name: "workspace", required: true },
  { name: "review", required: true },
  { name: "connect", required: true },
] as const;

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none";

const assistantBubble =
  "w-fit max-w-[85%] rounded-lg rounded-tl-sm border border-border bg-card px-3 py-2 text-xs leading-snug text-foreground";
const userBubble =
  "ml-auto w-fit max-w-[85%] rounded-lg rounded-tr-sm bg-primary px-3 py-2 text-xs leading-snug text-primary-foreground";

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <main className="mx-auto flex w-full max-w-[420px] flex-col gap-3 px-4 pb-6 pt-4">
        {/* App header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg border border-border bg-card">
              <WorkflowIcon className="size-4 text-foreground" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold leading-none">
                Praxis setup
              </span>
              <span className="text-xs leading-none text-muted-foreground">
                Workspace onboarding
              </span>
            </div>
          </div>
          <span className="rounded-full border border-border bg-card px-2.5 py-1 font-code text-[10px] tracking-wide text-muted-foreground">
            acme-inc
          </span>
        </header>

        {/* Onboarding assistant transcript */}
        <section className="overflow-hidden rounded-xl border border-solid border-default-border bg-default-background">
          <div className="flex h-9 items-center justify-between border-b border-solid border-default-border px-3">
            <div className="flex items-center gap-1.5">
              <BotIcon className="size-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">
                Setup assistant
              </span>
            </div>
            <span className="font-code text-[10px] text-muted-foreground">
              now
            </span>
          </div>
          <MessageScrollerProvider defaultScrollPosition="end">
            <MessageScroller className="h-auto">
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-2.5 p-3">
                  <MessageScrollerItem messageId="intro" scrollAnchor>
                    <p className={assistantBubble}>
                      Hi Dana — I&apos;m your setup assistant. We&apos;ll wire up
                      your first workflow in about two minutes.
                    </p>
                  </MessageScrollerItem>
                  <MessageScrollerItem messageId="reply" scrollAnchor>
                    <p className={userBubble}>
                      Let&apos;s go — start with code review.
                    </p>
                  </MessageScrollerItem>
                  <MessageScrollerItem messageId="ask" scrollAnchor>
                    <p className={assistantBubble}>
                      Perfect. First question: how strict should the review gate
                      be? Your starter pipeline is waiting on it.
                    </p>
                  </MessageScrollerItem>
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </section>

        {/* Wizard step */}
        <Questionnaire
          items={wizardItems}
          defaultItem="review"
          shortcuts="numbers"
          className="gap-4"
        >
          <QuestionnaireProgress />

          <QuestionnaireItem className={itemClassName} name="workspace" required>
            <QuestionnaireTitle>What does your team build?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Used to pick your starter template.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="web">A web app</QuestionnaireChoice>
              <QuestionnaireChoice value="api" defaultChecked>
                An API service
              </QuestionnaireChoice>
              <QuestionnaireChoice value="platform">
                A platform
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem className={itemClassName} name="review" required>
            <QuestionnaireTitle>
              How strict should the review gate be?
            </QuestionnaireTitle>
            <QuestionnaireDescription>
              Your starter workflow runs this check before every deploy.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="fast">
                Fast · risky diffs only
              </QuestionnaireChoice>
              <QuestionnaireChoice value="balanced" defaultChecked>
                Balanced · standard checks
              </QuestionnaireChoice>
              <QuestionnaireChoice value="strict">
                Strict · full suite + approval
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireItem className={itemClassName} name="connect" required>
            <QuestionnaireTitle>Connect a git provider</QuestionnaireTitle>
            <QuestionnaireDescription>
              We only request read access to repositories.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="github" defaultChecked>
                GitHub
              </QuestionnaireChoice>
              <QuestionnaireChoice value="gitlab">GitLab</QuestionnaireChoice>
              <QuestionnaireChoice value="bitbucket">
                Bitbucket
              </QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>

          <QuestionnaireActions>
            <QuestionnairePrevious className="h-10">
              Back
            </QuestionnairePrevious>
            <QuestionnaireNext className="h-10 flex-1">
              Next step
            </QuestionnaireNext>
          </QuestionnaireActions>
        </Questionnaire>

        {/* Live preview of the workflow being configured */}
        <section className="flex flex-col gap-2">
          <span className="px-0.5 font-code text-[11px] tracking-[0.04em] text-muted-foreground">
            starter workflow · preview
          </span>
          <div className="flex w-full flex-col items-center rounded-xl border border-solid border-default-border bg-default-background px-4 py-5">
            <CanvasNode
              title="build"
              statusTone="success"
              footer={
                <span className="font-code text-[11px] text-neutral-400">
                  ci/build
                </span>
              }
            >
              <span className="text-code font-code text-default-font">
                p99 · 42ms
              </span>
              <span className="text-code font-code text-neutral-500">
                runs · 1,204
              </span>
            </CanvasNode>
            <div className="h-6 w-px bg-neutral-300" />
            <CanvasNode
              title="review"
              statusTone="warning"
              footer={
                <span className="font-code text-[11px] text-neutral-400">
                  gate/review
                </span>
              }
            >
              <span className="text-code font-code text-default-font">
                awaiting setup
              </span>
              <span className="text-code font-code text-neutral-500">
                step 2 of 3
              </span>
            </CanvasNode>
          </div>
        </section>

        <p className="pb-1 text-center text-[11px] text-muted-foreground">
          You can change these choices anytime in Settings → Workflow.
        </p>
      </main>
    </EvalShell>
  );
}
