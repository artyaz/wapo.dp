"use client"

import {
  Bubble,
  BubbleContent,
} from "@/components/ui/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Message,
  MessageContent,
} from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"

const transcript = Array.from({ length: 6 }, (_, index) => ({
  id: `a11y-${index + 1}`,
  role: index % 2 === 0 ? "user" : "assistant",
  text:
    index % 2 === 0
      ? `Accessibility checkpoint ${index + 1}.`
      : `The transcript announces itself as a log, so new entries are read out without stealing focus from what the reader is doing.`,
}))

export function AccessibilityDemo() {
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-4">
      <Card className="h-100 w-full gap-0 overflow-hidden">
        <CardHeader className="gap-1 border-b">
          <CardTitle>Live transcript</CardTitle>
          <CardDescription>
            Announced as a log; scrollable with the keyboard.
          </CardDescription>
        </CardHeader>
        <MessageScrollerProvider defaultScrollPosition="start">
          <CardContent className="flex-1 overflow-hidden p-0">
            <MessageScroller>
              <MessageScrollerViewport aria-label="Conversation transcript">
                <MessageScrollerContent className="gap-4 px-6 py-4">
                  {transcript.map((message) => (
                    <MessageScrollerItem
                      key={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === "user"}
                    >
                      <Message
                        align={message.role === "user" ? "end" : "start"}
                      >
                        <MessageContent>
                          <Bubble
                            variant={
                              message.role === "user" ? "muted" : "ghost"
                            }
                          >
                            <BubbleContent>{message.text}</BubbleContent>
                          </Bubble>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
        </MessageScrollerProvider>
      </Card>
      <div className="px-0.5 text-center text-xs text-muted-foreground">
        Focus the transcript and scroll with the arrow keys — the scroll button
        leaves the tab order once you reach the bottom.
      </div>
    </div>
  )
}
