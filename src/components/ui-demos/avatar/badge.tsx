"use client"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
export function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
        {/* Praxis: online-presence dot uses the theme-aware success scale */}
        <AvatarBadge className="bg-success-500" />
      </Avatar>
    </div>
  )
}
