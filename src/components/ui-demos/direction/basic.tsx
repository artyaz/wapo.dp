"use client"

import * as React from "react"
import { ArrowLeftIcon, ArrowRightIcon, LanguagesIcon } from "lucide-react"

import {
  DirectionProvider,
  useDirection,
  type Direction,
} from "@/components/ui/direction"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type Message = {
  id: string
  from: "agent" | "customer"
  body: string
  time: string
}

const messages: Message[] = [
  {
    id: "m1",
    from: "agent",
    body: "Hi Tomás — I can see the duplicate charge from June 3 on your card. I've refunded $12.90, it should clear in a moment.",
    time: "10:24",
  },
  {
    id: "m2",
    from: "customer",
    body: "That was fast, thank you. Will the refund show on this week's statement?",
    time: "10:26",
  },
  {
    id: "m3",
    from: "agent",
    body: "Yes — refunds post within 3 business days, so it will appear by Friday. Anything else I can help with?",
    time: "10:27",
  },
  {
    id: "m4",
    from: "customer",
    body: "That's everything. Have a good one!",
    time: "10:28",
  },
]

/**
 * Reads the direction from context and mirrors itself — no `rtl:` variants,
 * the icon simply flips because the component asks the provider.
 */
function SendIcon() {
  const direction = useDirection()
  return direction === "rtl" ? <ArrowLeftIcon /> : <ArrowRightIcon />
}

/** Small status pill showing what the context currently reports. */
function DirectionPill() {
  const direction = useDirection()
  return (
    <Badge variant={direction === "rtl" ? "default" : "outline"} className="font-code">
      dir = {direction.toUpperCase()}
    </Badge>
  )
}

/**
 * The chat surface. Everything is aligned with logical properties
 * (`self-start` / `self-end`, `ps-*` / `pe-*`), so switching the provider's
 * direction mirrors the whole thread without touching its markup.
 */
function Conversation() {
  const direction = useDirection()
  return (
    <div dir={direction} className="flex flex-col gap-3">
      {messages.map((message) => {
        const isCustomer = message.from === "customer"
        return (
          <div
            key={message.id}
            className={`flex items-end gap-2.5 ${isCustomer ? "self-end" : "self-start"}`}
          >
            {!isCustomer && (
              <Avatar size="sm" className="mb-1">
                <AvatarFallback>MO</AvatarFallback>
              </Avatar>
            )}
            <div className="flex max-w-[78%] flex-col gap-1">
              <div
                className={`rounded-lg border px-3 py-2 text-sm ${
                  isCustomer
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "bg-muted"
                }`}
              >
                {message.body}
              </div>
              <span
                className={`font-code text-[11px] text-muted-foreground ${
                  isCustomer ? "self-end" : "self-start"
                }`}
              >
                {message.from === "agent" ? "Mara · support" : "You"} · {message.time}
              </span>
            </div>
            {isCustomer && (
              <Avatar size="sm" className="mb-1">
                <AvatarFallback>TA</AvatarFallback>
              </Avatar>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function DirectionProviderDemo() {
  const [direction, setDirection] = React.useState<Direction>("ltr")

  return (
    <div className="flex max-w-[640px] flex-col gap-4">
      {/* Demo controls stay in the page direction so the chrome always reads. */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={direction === "ltr" ? "secondary" : "outline"}
          onClick={() => setDirection("ltr")}
        >
          <LanguagesIcon /> English · LTR
        </Button>
        <Button
          size="sm"
          variant={direction === "rtl" ? "secondary" : "outline"}
          onClick={() => setDirection("rtl")}
        >
          العربية · RTL
        </Button>
        <span className="ms-auto text-xs text-muted-foreground">
          The thread mirrors via logical properties
        </span>
      </div>

      <DirectionProvider direction={direction}>
        <Card className="gap-4">
          <CardHeader className="border-b">
            <CardTitle>Support conversation #48210</CardTitle>
            <DirectionPill />
          </CardHeader>
          <CardContent>
            <Conversation />
          </CardContent>
          <Separator />
          <CardFooter className="gap-2">
            <Input
              placeholder="Write a reply…"
              aria-label="Write a reply"
              className="flex-1"
            />
            <Button aria-label="Send reply">
              <SendIcon /> Send
            </Button>
          </CardFooter>
        </Card>
      </DirectionProvider>
    </div>
  )
}
