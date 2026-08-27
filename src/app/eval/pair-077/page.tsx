"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Checkbox } from "@/components/ui/checkbox";
import { UserMessage } from "@/components/ds/UserMessage";
import { GlassMaterialProvider } from "@/components/ds/GlassMaterialProvider";
import { GlassSurfaceSubtle } from "@/components/ds/GlassDisplacement/GlassSurfaceSubtle";
import { useGlassRuntime, type GlassStrategy } from "@/lib/glass";
import {
  Bell,
  MessageSquareText,
  SendHorizontal,
  Settings2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const STRATEGIES: GlassStrategy[] = [
  "svg-displacement",
  "webgl-refraction",
  "backdrop-filter",
];

type IconType = React.ComponentType<{ className?: string }>;

function SettingsSection({
  icon: Icon,
  caption,
  children,
}: {
  icon: IconType;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-start gap-3.5">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-neutral-500" />
        <span className="text-caption font-caption uppercase tracking-[0.1em] text-neutral-500">
          {caption}
        </span>
      </div>
      {children}
    </section>
  );
}

function SettingRow({
  id,
  label,
  description,
  defaultChecked = false,
}: {
  id: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <div className="flex w-full items-start gap-3">
      <Checkbox id={id} defaultChecked={defaultChecked} className="mt-0.5" />
      <div className="flex min-w-0 flex-col gap-0.5">
        <label
          htmlFor={id}
          className="cursor-pointer select-none text-body-medium font-body-medium text-default-font"
        >
          {label}
        </label>
        {description ? (
          <p className="text-caption font-caption text-neutral-500">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function Page() {
  // the live negotiated tier — exactly one strategy badge is active
  const liveStrategy = useGlassRuntime((s) => s.strategy);

  return (
    <EvalShell theme="dark" dir="rtl">
      <div className="relative min-h-screen w-full overflow-hidden bg-default-background font-body text-default-font">
        {/* ambient backdrop — monochrome blobs + faint grid so the glass
            material has something to blur and refract */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 right-[10%] h-[440px] w-[440px] rounded-full bg-neutral-500/10 blur-[110px]" />
          <div className="absolute bottom-[-160px] left-[6%] h-[480px] w-[480px] rounded-full bg-neutral-400/10 blur-[120px]" />
          <div className="absolute left-[42%] top-[24%] h-[300px] w-[300px] rounded-full bg-neutral-600/10 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col gap-6 px-8 py-8">
          {/* page header */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg border border-default-border bg-neutral-100">
                <Settings2 className="size-4 text-neutral-500" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-heading-2 font-heading-2 text-default-font">
                  Workspace settings
                </h1>
                <p className="text-caption font-caption text-neutral-500">
                  Praxis console · Acme Research
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-default-border bg-neutral-100/70 px-3 py-1.5">
              <span className="size-1.5 rounded-full bg-success-500" />
              <span className="text-caption font-caption text-neutral-500">
                All changes saved
              </span>
            </div>
          </header>

          {/* two columns — in RTL the settings panel sits on the right,
              the assistant transcript on the left */}
          <div className="grid flex-1 grid-cols-[minmax(0,1fr)_360px] items-start gap-6">
            {/* main settings panel — the provider sets the material level
                every glass surface inside inherits */}
            <GlassMaterialProvider level="thick">
              <GlassSurfaceSubtle shape="card" className="w-full">
                <div className="flex w-full flex-col gap-5 p-5">
                  <SettingsSection icon={Bell} caption="Notifications">
                    <div className="flex w-full flex-col gap-3">
                      <SettingRow
                        id="eval77-digest"
                        label="Email digest"
                        description="A summary of workspace activity, sent every morning at 08:00."
                        defaultChecked
                      />
                      <SettingRow
                        id="eval77-mentions"
                        label="Mention notifications"
                        description="Notify me when a teammate mentions me in a thread."
                        defaultChecked
                      />
                      <SettingRow
                        id="eval77-builds"
                        label="Desktop alerts for failed builds"
                        description="Show a system notification whenever a build fails."
                      />
                    </div>
                  </SettingsSection>

                  <div aria-hidden="true" className="h-px w-full shrink-0 bg-default-border" />

                  <SettingsSection icon={Sparkles} caption="Liquid glass material">
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex flex-col gap-2">
                        <span className="text-caption font-caption text-neutral-400">
                          Rendering engine — negotiated per browser
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          {STRATEGIES.map((s) => (
                            <GlassMaterialProvider.StrategyBadge
                              key={s}
                              strategy={s}
                              active={s === liveStrategy}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-caption font-caption text-neutral-400">
                          Material preview
                        </span>
                        <GlassSurfaceSubtle
                          shape="capsule"
                          className="h-12 w-[300px]"
                        >
                          <span className="w-full text-center font-code text-[11px] uppercase tracking-[0.14em] text-default-font/80">
                            Thick · preview
                          </span>
                        </GlassSurfaceSubtle>
                      </div>

                      <SettingRow
                        id="eval77-transparency"
                        label="Prefer reduced transparency"
                        description="Falls back to the plain base material whenever possible."
                      />
                    </div>
                  </SettingsSection>

                  <div aria-hidden="true" className="h-px w-full shrink-0 bg-default-border" />

                  <SettingsSection icon={ShieldCheck} caption="Privacy">
                    <div className="flex w-full flex-col gap-3">
                      <SettingRow
                        id="eval77-telemetry"
                        label="Share anonymized usage telemetry"
                        description="Helps us improve Praxis. Workspace content is never shared."
                      />
                      <SettingRow
                        id="eval77-twofa"
                        label="Require two-factor authentication"
                        description="Every workspace member must enroll a second factor."
                        defaultChecked
                      />
                    </div>
                  </SettingsSection>
                </div>
              </GlassSurfaceSubtle>
            </GlassMaterialProvider>

            {/* assistant transcript — the user's recent requests */}
            <aside className="flex w-full flex-col gap-4 rounded-xl border border-default-border bg-neutral-100/70 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg border border-default-border bg-neutral-100">
                  <MessageSquareText className="size-4 text-neutral-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold leading-[20px] text-default-font">
                    Settings assistant
                  </span>
                  <span className="text-caption font-caption text-neutral-500">
                    Recent requests · applied instantly
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3">
                <UserMessage>
                  Turn on mention notifications and the morning email digest
                  for the QA workspace.
                </UserMessage>
                <UserMessage>
                  Switch the settings panel to the thick liquid-glass material
                  — and keep the palette monochrome, please.
                </UserMessage>
                <UserMessage density="compact">Looks good — apply.</UserMessage>
              </div>

              <div className="flex items-center gap-2.5 rounded-full border border-default-border bg-neutral-100 px-4 py-2.5">
                <span className="min-w-0 flex-1 truncate text-caption font-caption text-neutral-500">
                  Ask the assistant to change a setting…
                </span>
                <SendHorizontal className="size-4 shrink-0 text-neutral-500" />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </EvalShell>
  );
}
