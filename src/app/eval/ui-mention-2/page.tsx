"use client"

// EVAL page — mention p2 — restaurant reservation system — 390x844 dark (phone)

import {
  ChevronLeftIcon,
  PaperclipIcon,
  PhoneIcon,
  SendIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MentionChip, MentionInput } from "@/components/ui/mention"

const STAFF = [
  { id: "s-chidi", value: "chidi", label: "Chidi Okafor", description: "Sous chef" },
  { id: "s-chloe", value: "chloe", label: "Chloe Baptiste", description: "Pastry" },
  { id: "s-maya", value: "maya", label: "Maya Chen", description: "Host stand" },
  { id: "s-dana", value: "dana", label: "Dana Whitfield", description: "Chef de cuisine" },
  { id: "s-marcus", value: "marcus", label: "Marcus Webb", description: "Expeditor" },
  { id: "s-priya", value: "priya", label: "Priya Raman", description: "Sommelier" },
]

type MessagePart = string | { mention: string }

const MESSAGES: Array<{
  initials: string
  name: string
  time: string
  parts: MessagePart[]
}> = [
  {
    initials: "PR",
    name: "Priya Raman",
    time: "17:42",
    parts: [
      "VIP at table 9 — anniversary tasting menu. ",
      { mention: "Dana Whitfield" },
      " is plating the celebration course.",
    ],
  },
  {
    initials: "DW",
    name: "Dana Whitfield",
    time: "17:44",
    parts: [
      "Pairing is poured. ",
      { mention: "Marcus Webb" },
      " — clear the pass when the course fires.",
    ],
  },
  {
    initials: "MW",
    name: "Marcus Webb",
    time: "17:51",
    parts: [
      "Walk-in party of 6 at 18:15 → patio. ",
      { mention: "Maya Chen" },
      ", they'll need two high chairs from storage.",
    ],
  },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex h-screen w-full max-w-[390px] flex-col">
        {/* App bar */}
        <header className="flex items-center gap-1.5 border-b px-3 py-2.5">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Back to channels"
            className="-ms-1"
          >
            <ChevronLeftIcon />
          </Button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              Front of house
            </p>
            <p className="text-muted-foreground truncate text-[11px]">
              Firelight Kitchen · reservations &amp; service
            </p>
          </div>
          <Badge variant="secondary" className="text-[10px]">
            6 online
          </Badge>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Call the house phone"
          >
            <PhoneIcon />
          </Button>
        </header>

        {/* Thread */}
        <main className="flex flex-1 flex-col gap-4 px-3 py-4">
          <div className="flex items-center gap-3" aria-hidden="true">
            <div className="h-px flex-1 bg-border" />
            <span className="text-muted-foreground font-code text-[10px] uppercase tracking-wider">
              Today
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {MESSAGES.map((message) => (
            <div key={message.time} className="flex items-start gap-2.5">
              <Avatar size="sm" className="mt-0.5">
                <AvatarFallback>{message.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {message.name}
                  </span>
                  <span className="text-muted-foreground font-code text-[10px]">
                    {message.time}
                  </span>
                </p>
                <p className="mt-1 text-sm leading-5 text-foreground/90">
                  {message.parts.map((part, index) =>
                    typeof part === "string" ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <MentionChip key={index} trigger="@">
                        {part.mention}
                      </MentionChip>
                    )
                  )}
                </p>
              </div>
            </div>
          ))}
        </main>

        {/* Composer — popup opens above the caret (placement="top") */}
        <footer className="border-t px-3 pb-5 pt-3">
          <MentionInput
            aria-label="Message front of house"
            placeholder="Message the floor… use @ to mention staff"
            mentions={[{ trigger: "@", label: "Staff", data: STAFF }]}
            defaultValue={["Patio is set for the walk-ins — "]}
            defaultQuery={{ trigger: "@", query: "ch" }}
            placement="top"
            className="min-h-14"
          />
          <div className="mt-2 flex items-center gap-2">
            <Button variant="outline" size="icon-sm" aria-label="Attach a photo">
              <PaperclipIcon />
            </Button>
            <p className="text-muted-foreground flex-1 text-[11px]">
              Mention staff with <span className="font-code text-foreground">@</span>
            </p>
            <Button size="sm">
              <SendIcon />
              Send
            </Button>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
