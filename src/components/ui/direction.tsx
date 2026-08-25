"use client"

import * as React from "react"

type Direction = "ltr" | "rtl"

const DirectionContext = React.createContext<Direction | undefined>(undefined)

/**
 * DirectionProvider — provides the text direction ("ltr" | "rtl") to all
 * descendants via React context. Mirrors the document direction (e.g. set
 * on `<html dir="rtl">`) so direction-aware components can consume it with
 * the `useDirection` hook. Renders no DOM element of its own.
 *
 * <html dir="rtl">
 *   <body>
 *     <DirectionProvider direction="rtl">{app}</DirectionProvider>
 *   </body>
 * </html>
 */
function DirectionProvider({
  direction,
  children,
}: {
  direction: Direction
  children?: React.ReactNode
}) {
  return (
    <DirectionContext.Provider value={direction}>
      {children}
    </DirectionContext.Provider>
  )
}

/**
 * useDirection — returns the current text direction, defaulting to "ltr"
 * when no DirectionProvider is present above the consumer.
 */
function useDirection(): Direction {
  return React.useContext(DirectionContext) ?? "ltr"
}

export { DirectionProvider, useDirection, type Direction }
