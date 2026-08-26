"use client"

import { Marker, MarkerContent } from "@/components/ui/marker"
 
export function MarkerLinkDemo() {
  return (
    <Marker render={<a href="#" />}>
      <MarkerContent>View the pull request</MarkerContent>
    </Marker>
  )
}