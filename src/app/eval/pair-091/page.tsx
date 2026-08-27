"use client";

/**
 * pair-091 — mobile session console for a field video-capture rig.
 * Components: ds:Button (transport controls), ds:StatusBadge (channel states),
 * ui:kbd (external-keyboard shortcut hints + inline key on the mark button).
 * Conditions: 360x640 phone, dark theme, ltr, scroll allowed.
 */

import React from "react";
import { Keyboard, MicOff, Pause, Square } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Button } from "@/components/ds/Button";
import { StatusBadge } from "@/components/ds/StatusBadge";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

const channels = [
  { label: "Uplink", detail: "8.4 Mb/s · us-east", tone: "success" as const, state: "Synced" },
  { label: "Audio in", detail: "USB shotgun mic", tone: "warning" as const, state: "Degraded" },
  { label: "Backup card", detail: "512 GB · 38% left", tone: "idle" as const, state: "Idle" },
];

const shortcuts = [
  { label: "Pause / resume", keys: ["Space"] },
  { label: "Mute microphone", keys: ["M"] },
  { label: "Save take", keys: ["⇧", "⌘", "S"] },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[360px] flex-col px-4 pb-4 pt-4">
        {/* Session header */}
        <header className="flex items-start justify-between">
          <div>
            <p className="text-caption font-caption text-neutral-400">
              Rig 02 · keyboard attached
            </p>
            <h1 className="mt-1 text-heading-3 font-heading-3 text-default-font">
              Field capture
            </h1>
          </div>
          <StatusBadge tone="live" className="mt-2">
            Live
          </StatusBadge>
        </header>

        {/* Elapsed timer + in-session mark action */}
        <section className="mt-4 flex items-center justify-between rounded-lg border border-default-border bg-panel px-4 py-3">
          <div>
            <p className="text-caption font-caption text-neutral-400">
              Take 03 · 1080p / 24 fps
            </p>
            <p className="mt-1 font-code text-heading-1 font-heading-1 tabular-nums text-default-font">
              00:42:17
            </p>
          </div>
          <Button variant="secondary" size="small">
            Mark highlight{" "}
            <Kbd data-icon="inline-end" className="translate-x-0.5">
              H
            </Kbd>
          </Button>
        </section>

        {/* Channel telemetry */}
        <section className="mt-3 divide-y divide-default-border rounded-lg border border-default-border bg-panel">
          {channels.map((channel) => (
            <div
              key={channel.label}
              className="flex items-center justify-between px-4 py-2.5"
            >
              <div className="flex flex-col">
                <span className="font-body text-body-medium text-default-font">
                  {channel.label}
                </span>
                <span className="text-caption font-caption text-neutral-500">
                  {channel.detail}
                </span>
              </div>
              <StatusBadge tone={channel.tone}>{channel.state}</StatusBadge>
            </div>
          ))}
        </section>

        {/* Transport controls */}
        <section className="mt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              icon={<MicOff size={16} />}
              iconOnly
              aria-label="Mute microphone"
            />
            <Button variant="secondary" icon={<Pause size={16} />} className="flex-1">
              Pause
            </Button>
          </div>
          <Button
            variant="danger"
            icon={<Square size={15} />}
            className="w-full"
          >
            Stop capture
          </Button>
        </section>

        {/* External keyboard shortcuts */}
        <section className="mt-3 rounded-lg border border-default-border bg-panel px-4 py-3">
          <div className="flex items-center gap-2">
            <Keyboard size={14} className="text-neutral-500" />
            <span className="text-caption font-caption text-neutral-400">
              Keyboard shortcuts
            </span>
          </div>
          <div className="mt-2.5 flex flex-col gap-2">
            {shortcuts.map((shortcut) => (
              <div
                key={shortcut.label}
                className="flex items-center justify-between"
              >
                <span className="font-body text-body-medium text-neutral-300">
                  {shortcut.label}
                </span>
                {shortcut.keys.length > 1 ? (
                  <KbdGroup>
                    {shortcut.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </KbdGroup>
                ) : (
                  <Kbd>{shortcut.keys[0]}</Kbd>
                )}
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-auto pt-3">
          <p className="text-caption font-caption text-neutral-500">
            Auto-saving to cloud · highlights marked 4
          </p>
        </footer>
      </div>
    </EvalShell>
  );
}
