"use client"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { HomeIcon } from "lucide-react"
export function LinkDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Item render={<a href="/dashboard" />}>
        <ItemMedia variant="icon">
          <HomeIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Dashboard</ItemTitle>
          <ItemDescription>Overview of your account and activity.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
