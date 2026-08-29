"use client"

import { KanbanBoard } from "@/components/ui/kanban"

/**
 * Basic — three-column sprint board driven purely by column data. The board
 * is uncontrolled: dnd-kit handles pointer + keyboard drags internally and
 * `onCardMove` reports completed moves.
 */
export function KanbanBasic() {
  return (
    <KanbanBoard
      aria-label="Sprint 24 board"
      className="h-[26rem]"
      defaultColumns={[
        {
          id: "todo",
          title: "To do",
          cards: [
            {
              id: "card-1",
              label: "SRP-101",
              title: "Add saved-reply picker to support inbox",
              assignee: { name: "Priya Nair" },
              priority: "medium",
            },
            {
              id: "card-2",
              label: "SRP-107",
              title: "Audit empty states across billing flows",
              assignee: { name: "Marcus Webb" },
              priority: "low",
            },
          ],
        },
        {
          id: "in-progress",
          title: "In progress",
          cards: [
            {
              id: "card-3",
              label: "SRP-098",
              title: "Split invoice PDF renderer into a worker",
              description:
                "Rendering 60-line invoices freezes the main thread for ~400 ms.",
              assignee: { name: "Deniz Kaya" },
              priority: "high",
              progress: 62,
            },
            {
              id: "card-4",
              label: "SRP-099",
              title: "Migrate seat picker to the new price API",
              assignee: { name: "Sofia Álvarez" },
              tags: ["api"],
            },
          ],
        },
        {
          id: "done",
          title: "Done",
          cards: [
            {
              id: "card-5",
              label: "SRP-084",
              title: "Ship usage-based billing beta to 12 pilot teams",
              assignee: { name: "Jonas Berg" },
              dueDate: "Aug 08",
            },
          ],
        },
      ]}
    />
  )
}
