"use client"

import { KanbanBoard } from "@/components/ui/kanban"

/**
 * Columns — a wider delivery board: five columns, work-in-progress limits on
 * the active stages (Review is over its limit, so the mono count badge turns
 * warning), and both horizontal overflow (board is width-constrained) and
 * vertical scroll inside Backlog.
 */
export function KanbanColumns() {
  return (
    <KanbanBoard
      aria-label="Design system delivery board"
      className="h-[30rem] max-w-full"
      density="compact"
      defaultColumns={[
        {
          id: "backlog",
          title: "Backlog",
          cards: [
            {
              id: "ds-01",
              label: "DS-241",
              title: "Chart tokens: re-check contrast on mixed series",
              assignee: { name: "Ana Petrova" },
            },
            {
              id: "ds-02",
              label: "DS-244",
              title: "Document focus order for nested menus",
              assignee: { name: "Liam Osei" },
            },
            {
              id: "ds-03",
              label: "DS-247",
              title: "Deprecate legacy toast slot in docs",
              assignee: { name: "Ana Petrova" },
            },
            {
              id: "ds-04",
              label: "DS-249",
              title: "Add Hebrew RTL screenshots to gallery",
              assignee: { name: "Mira Haddad" },
            },
            {
              id: "ds-05",
              label: "DS-252",
              title: "Define motion budget for drag interactions",
              assignee: { name: "Liam Osei" },
            },
          ],
        },
        {
          id: "design",
          title: "Design",
          wipLimit: 3,
          cards: [
            {
              id: "ds-11",
              label: "DS-238",
              title: "Empty-state illustration set, first pass",
              assignee: { name: "Mira Haddad" },
              priority: "medium",
            },
            {
              id: "ds-12",
              label: "DS-239",
              title: "Density audit: compact tables at 13px",
              assignee: { name: "Ana Petrova" },
            },
          ],
        },
        {
          id: "build",
          title: "Build",
          wipLimit: 4,
          cards: [
            {
              id: "ds-21",
              label: "DS-231",
              title: "Kanban card: keyboard sensor + live region",
              assignee: { name: "Deniz Kaya" },
              priority: "high",
              progress: 80,
            },
            {
              id: "ds-22",
              label: "DS-233",
              title: "Stepper: wire compact variant tokens",
              assignee: { name: "Jonas Berg" },
              progress: 35,
            },
            {
              id: "ds-23",
              label: "DS-236",
              title: "Filter bar: chip overflow at 2 breakpoints",
              assignee: { name: "Sofia Álvarez" },
            },
          ],
        },
        {
          id: "review",
          title: "Review",
          wipLimit: 2,
          cards: [
            {
              id: "ds-31",
              label: "DS-228",
              title: "Timeline separator color in dark theme",
              assignee: { name: "Priya Nair" },
              priority: "medium",
            },
            {
              id: "ds-32",
              label: "DS-229",
              title: "File upload: retry row state machine",
              assignee: { name: "Marcus Webb" },
              priority: "urgent",
            },
            {
              id: "ds-33",
              label: "DS-230",
              title: "Code block copy-button focus ring",
              assignee: { name: "Priya Nair" },
              priority: "low",
            },
          ],
        },
        {
          id: "shipped",
          title: "Shipped",
          cards: [
            {
              id: "ds-41",
              label: "DS-214",
              title: "Direction component + RTL checklist",
              assignee: { name: "Mira Haddad" },
              dueDate: "Aug 02",
            },
          ],
        },
      ]}
    />
  )
}
