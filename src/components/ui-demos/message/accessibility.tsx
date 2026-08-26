"use client"

import { Message } from "@/components/ui/message"
import { Spinner } from "@/components/ui/spinner"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function AccessibilityDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Message>
        <Marker role="status">
          <MarkerIcon>
            <Spinner />
          </MarkerIcon>
          <MarkerContent>Checking the logs...</MarkerContent>
        </Marker>
      </Message>
    </div>
  )
}
