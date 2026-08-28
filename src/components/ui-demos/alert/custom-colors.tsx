"use client"

import { AlertTriangleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertColors() {
  return (
    // Praxis: semantic warning tint via the design-system warning scale
    // (theme-aware tokens — the ds scale inverts automatically in dark mode,
    // so no dark: overrides are needed).
    <Alert className="max-w-md border-warning-200 bg-warning-50 text-warning-900">
      <AlertTriangleIcon />
      <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
      <AlertDescription>
        Renew now to avoid service interruption or upgrade to a paid plan to
        continue using the service.
      </AlertDescription>
    </Alert>
  )
}
