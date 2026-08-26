"use client"

import { FileTextIcon } from "lucide-react"

import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"

export function AccessibilityDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Marker render={<a href="/files" />}>
        <MarkerIcon>
          <FileTextIcon />
        </MarkerIcon>
        <MarkerContent>Explored 4 files</MarkerContent>
      </Marker>
    </div>
  )
}
