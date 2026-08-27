"use client";

import React from "react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { KeyRoundIcon, SearchIcon, ShieldCheckIcon } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [code, setCode] = React.useState("K7Q");

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="bg-background text-foreground flex h-screen flex-col">
        {/* App title bar */}
        <header className="border-border/70 flex h-12 shrink-0 items-center justify-between border-b px-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-foreground text-background flex size-6 items-center justify-center rounded-md">
              <KeyRoundIcon className="size-3.5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Praxis Keyvault
            </span>
            <span className="text-muted-foreground text-xs">
              · Design team workspace
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <SearchIcon className="size-3.5" />
            <span>Search vault</span>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </header>

        {/* App menubar */}
        <div className="flex items-center justify-between gap-4 px-6 pt-4">
          <Menubar defaultValue="vault">
            <MenubarMenu value="vault">
              <MenubarTrigger>Vault</MenubarTrigger>
              <MenubarContent className="w-56">
                <MenubarItem inset>
                  New secure note <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  New folder <MenubarShortcut>⇧⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset disabled>
                  Sync now <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Export backup… <MenubarShortcut>⇧⌘E</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarCheckboxItem checked>
                  Lock when idle
                </MenubarCheckboxItem>
                <MenubarCheckboxItem>Launch at login</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem inset variant="destructive">
                  Delete this vault…
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu value="edit">
              <MenubarTrigger>Edit</MenubarTrigger>
              <MenubarContent className="w-48">
                <MenubarItem inset>
                  Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem inset disabled>
                  Cut <MenubarShortcut>⌘X</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset disabled>
                  Copy <MenubarShortcut>⌘C</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>
                  Paste <MenubarShortcut>⌘V</MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu value="view">
              <MenubarTrigger>View</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarLabel>Sort entries by</MenubarLabel>
                <MenubarRadioGroup value="recent">
                  <MenubarRadioItem value="name">Name</MenubarRadioItem>
                  <MenubarRadioItem value="recent">Recently used</MenubarRadioItem>
                </MenubarRadioGroup>
                <MenubarSeparator />
                <MenubarCheckboxItem>Show hidden entries</MenubarCheckboxItem>
                <MenubarCheckboxItem checked>Compact density</MenubarCheckboxItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu value="help">
              <MenubarTrigger>Help</MenubarTrigger>
              <MenubarContent className="w-52">
                <MenubarItem inset>
                  Keyboard shortcuts <MenubarShortcut>⌘/</MenubarShortcut>
                </MenubarItem>
                <MenubarItem inset>Contact support…</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <p className="text-muted-foreground text-xs">
            Vault locked · verify this device to continue
          </p>
        </div>

        {/* Verification panel */}
        <main className="flex flex-1 items-center justify-center px-6">
          <div className="bg-card text-card-foreground border-border/70 w-full max-w-md rounded-xl border p-8 shadow-sm">
            <div className="mb-6 flex items-start gap-4">
              <div className="bg-muted text-muted-foreground border-border/70 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                <ShieldCheckIcon className="size-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  Verify this device
                </h1>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  Praxis Keyvault doesn&apos;t recognize this browser. Enter the
                  6-character code from your authenticator app to unlock the
                  vault.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 pb-6">
              <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={code}
                onChange={setCode}
                autoFocus
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
                {code === "" ? (
                  "Enter the code to continue."
                ) : (
                  <>
                    Code expires in{" "}
                    <span className="text-foreground font-medium tabular-nums">
                      04:52
                    </span>{" "}
                    ·{" "}
                    <span className="decoration-muted-foreground underline underline-offset-2">
                      Request a new code
                    </span>
                  </>
                )}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline"
              >
                Use recovery key instead
              </button>
              <Button variant="outline">
                Verify device{" "}
                <Kbd data-icon="inline-end" className="translate-x-0.5">
                  ⏎
                </Kbd>
              </Button>
            </div>

            <p className="text-muted-foreground border-border/70 mt-6 border-t pt-4 text-xs leading-relaxed">
              Codes are verified locally on this device. Praxis never sees your
              secrets.
            </p>
          </div>
        </main>

        {/* Status / shortcut bar */}
        <footer className="text-muted-foreground border-border/70 flex h-11 shrink-0 items-center justify-between border-t px-6 text-xs">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              Paste code{" "}
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>V</Kbd>
              </KbdGroup>
            </span>
            <span className="flex items-center gap-1.5">
              Lock vault{" "}
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>L</Kbd>
              </KbdGroup>
            </span>
          </div>
          <span>Praxis Keyvault 2.4.1</span>
        </footer>
      </div>
    </EvalShell>
  );
}
