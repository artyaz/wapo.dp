"use client"

import * as React from "react"

import {
  KanbanBoard,
  type KanbanCardData,
  type KanbanCardMoveEvent,
  type KanbanColumnData,
} from "@/components/ui/kanban"

const initialColumns: KanbanColumnData[] = [
  {
    id: "this-week",
    title: "This week",
    cards: [
      {
        id: "cal-01",
        label: "CAL-041",
        title: "Irrigation controller install",
        description: "Zone 3 valve replaced; mount controller in garage and pair sensors.",
        assignee: { name: "Rosa Delgado" },
        tags: ["Backyard", "Plumbing"],
        priority: "high",
        dueDate: "Aug 21",
        progress: 45,
      },
      {
        id: "cal-02",
        label: "CAL-044",
        title: "Order tile samples for guest bath",
        description: "Zellige white + matte sage, 3 samples each from two suppliers.",
        assignee: { name: "Theo Lindqvist" },
        tags: ["Guest bath"],
        priority: "medium",
        dueDate: "Aug 22",
      },
    ],
  },
  {
    id: "next-week",
    title: "Next week",
    cards: [
      {
        id: "cal-03",
        label: "CAL-048",
        title: "Replace porch light fixtures",
        description: "Two wet-rated sconces on a dimmer; electrician quote received.",
        assignee: { name: "Amara Okafor" },
        tags: ["Porch", "Electrical"],
        priority: "low",
        dueDate: "Aug 27",
      },
      {
        id: "cal-04",
        label: "CAL-051",
        title: "Repaint studio trim — second coat",
        assignee: { name: "Rosa Delgado" },
        tags: ["Studio"],
        priority: "urgent",
        dueDate: "Aug 25",
        progress: 20,
      },
    ],
  },
]

function findCard(
  columns: KanbanColumnData[],
  cardId: string
): KanbanCardData | undefined {
  for (const column of columns) {
    const card = (column.cards ?? []).find((item) => item.id === cardId)
    if (card) return card
  }
  return undefined
}

/**
 * Card details — controlled board with rich cards: avatars, priority badges,
 * tags, mono due dates and progress. `onCardMove` reports each completed move
 * into the status line below the board.
 */
export function KanbanCardDetails() {
  const [columns, setColumns] = React.useState<KanbanColumnData[]>(initialColumns)
  const [lastMove, setLastMove] = React.useState<string>("No moves yet")

  const handleCardMove = React.useCallback(
    (event: KanbanCardMoveEvent) => {
      const card = findCard(columns, event.cardId)
      const label = card?.label ?? event.cardId
      const columnTitle =
        columns.find((column) => column.id === event.toColumnId)?.title ??
        event.toColumnId
      setLastMove(
        `${label} “${event.cardTitle}” moved to ${columnTitle} · position ${event.toIndex + 1}`
      )
    },
    [columns]
  )

  return (
    <div className="flex flex-col gap-3">
      <KanbanBoard
        aria-label="Home projects board"
        className="h-[24rem]"
        columns={columns}
        onChange={setColumns}
        onCardMove={handleCardMove}
      />
      <p className="font-code text-xs text-muted-foreground" aria-live="polite">
        {lastMove}
      </p>
    </div>
  )
}
