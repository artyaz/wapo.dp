"use client"

import * as React from "react"
import {
  DndContext,
  KeyboardSensor,
  MeasuringStrategy,
  PointerSensor,
  closestCorners,
  useDndContext,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type DragCancelEvent,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type Over,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cva, type VariantProps } from "class-variance-authority"
import { GripVerticalIcon, InboxIcon, PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

/* ----------------------------------------------------------------------------
 * Data types
 * ------------------------------------------------------------------------- */

export type KanbanPriority = "low" | "medium" | "high" | "urgent"

export type KanbanDensity = "comfortable" | "default" | "compact"

export interface KanbanAssignee {
  name: string
  /** Optional image source; falls back to the assignee's initials. */
  src?: string
}

export interface KanbanCardData {
  id: string
  title: string
  description?: string
  /** Mono reference shown above the title, e.g. "ENG-142". */
  label?: string
  priority?: KanbanPriority
  assignee?: KanbanAssignee
  /** Outline chips rendered in the card footer. */
  tags?: string[]
  /** Mono text, e.g. "Sep 12". */
  dueDate?: string
  /** 0–100 completion rendered as a thin progress bar. */
  progress?: number
}

export interface KanbanColumnData {
  id: string
  title: string
  cards?: KanbanCardData[]
  /** Work-in-progress limit; the count badge turns warning when exceeded. */
  wipLimit?: number
}

export interface KanbanCardMoveEvent {
  cardId: string
  cardTitle: string
  fromColumnId: string
  toColumnId: string
  toIndex: number
}

/* ----------------------------------------------------------------------------
 * Internal dnd payload helpers
 * ------------------------------------------------------------------------- */

const KANBAN_CARD_TYPE = "kanban-card"
const KANBAN_COLUMN_TYPE = "kanban-column"

interface KanbanCardDndData extends Record<string, unknown> {
  type: typeof KANBAN_CARD_TYPE
  columnId: string | undefined
  title: string
}

interface KanbanColumnDndData extends Record<string, unknown> {
  type: typeof KANBAN_COLUMN_TYPE
  title: string
}

type KanbanDndNode =
  | {
      id: UniqueIdentifier | null
      data?: { current?: Record<string, unknown> }
    }
  | null
  | undefined

function nodeTitle(node: KanbanDndNode): string {
  const title = node?.data?.current?.title
  if (typeof title === "string" && title.length > 0) return title
  return node?.id != null ? String(node.id) : "card"
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

/** Pure column-array helpers shared by the board's drag handlers. */

function findCardLocation(
  columns: KanbanColumnData[],
  cardId: string
): { columnId: string; index: number } | null {
  for (const column of columns) {
    const index = (column.cards ?? []).findIndex((card) => card.id === cardId)
    if (index !== -1) return { columnId: column.id, index }
  }
  return null
}

function removeCardFromColumn(
  columns: KanbanColumnData[],
  columnId: string,
  cardId: string
): KanbanColumnData[] {
  return columns.map((column) =>
    column.id === columnId
      ? { ...column, cards: (column.cards ?? []).filter((card) => card.id !== cardId) }
      : column
  )
}

function insertCardIntoColumn(
  columns: KanbanColumnData[],
  columnId: string,
  card: KanbanCardData,
  index?: number
): KanbanColumnData[] {
  return columns.map((column) => {
    if (column.id !== columnId) return column
    const cards = [...(column.cards ?? [])]
    const at = index === undefined ? cards.length : Math.max(0, Math.min(index, cards.length))
    cards.splice(at, 0, card)
    return { ...column, cards }
  })
}

interface KanbanDropResult {
  columns: KanbanColumnData[]
  changed: boolean
  to: { columnId: string; index: number } | null
}

/** Applies a completed drop to a columns snapshot (pure). */
function applyDrop(
  columns: KanbanColumnData[],
  activeId: string,
  overId: string
): KanbanDropResult {
  const from = findCardLocation(columns, activeId)
  if (!from) return { columns, changed: false, to: null }
  const sourceColumn = columns.find((column) => column.id === from.columnId)
  const card = sourceColumn?.cards?.[from.index]
  if (!card) return { columns, changed: false, to: null }

  const overLocation = findCardLocation(columns, overId)
  if (overLocation) {
    if (overLocation.columnId === from.columnId) {
      if (overLocation.index === from.index) {
        return { columns, changed: false, to: from }
      }
      return {
        columns: columns.map((column) =>
          column.id === from.columnId
            ? { ...column, cards: arrayMove(column.cards ?? [], from.index, overLocation.index) }
            : column
        ),
        changed: true,
        to: { columnId: from.columnId, index: overLocation.index },
      }
    }
    let next = removeCardFromColumn(columns, from.columnId, activeId)
    next = insertCardIntoColumn(next, overLocation.columnId, card, overLocation.index)
    return {
      columns: next,
      changed: true,
      to: { columnId: overLocation.columnId, index: overLocation.index },
    }
  }

  // Dropped over a column itself (empty column, or the padding below a list).
  const targetExists = columns.some((column) => column.id === overId)
  if (!targetExists || overId === from.columnId) {
    return { columns, changed: false, to: from }
  }
  let next = removeCardFromColumn(columns, from.columnId, activeId)
  next = insertCardIntoColumn(next, overId, card)
  const toIndex = Math.max(
    0,
    (next.find((column) => column.id === overId)?.cards?.length ?? 1) - 1
  )
  return { columns: next, changed: true, to: { columnId: overId, index: toIndex } }
}

/* ----------------------------------------------------------------------------
 * Contexts — both optional so every part degrades gracefully standalone.
 * ------------------------------------------------------------------------- */

interface KanbanBoardContextValue {
  density: KanbanDensity
  dragging: boolean
  registerColumn: (id: string, title: string) => void
}

const KanbanBoardContext = React.createContext<KanbanBoardContextValue | null>(null)

function useKanbanBoard(): KanbanBoardContextValue | null {
  return React.useContext(KanbanBoardContext)
}

interface KanbanColumnContextValue {
  columnId: string
}

const KanbanColumnContext = React.createContext<KanbanColumnContextValue | null>(null)

/* ----------------------------------------------------------------------------
 * Variants
 * ------------------------------------------------------------------------- */

const kanbanColumnVariants = cva(
  // Panel + hairline border; never casts a shadow (in-flow surface).
  "bg-muted/50 text-foreground flex w-72 shrink-0 flex-col rounded-lg border",
  {
    variants: {
      density: {
        comfortable: "text-sm",
        default: "text-sm",
        compact: "text-[13px]",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

const kanbanColumnHeaderVariants = cva(
  "flex items-center gap-2 border-b px-3 py-2.5",
  {
    variants: {
      density: {
        comfortable: "py-3",
        default: "py-2.5",
        compact: "py-2",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

const kanbanColumnBodyVariants = cva(
  "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain transition-colors duration-150",
  {
    variants: {
      density: {
        comfortable: "gap-2.5 p-3",
        default: "gap-2 p-2.5",
        compact: "gap-1.5 p-2",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

const kanbanCardVariants = cva(
  // Flat card: panel + hairline border, ring instead of shadow while dragging.
  "bg-card text-card-foreground relative flex cursor-grab select-none flex-col rounded-lg border outline-none transition-colors duration-150 hover:border-foreground/25 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:cursor-grabbing",
  {
    variants: {
      density: {
        comfortable: "gap-2 p-3.5",
        default: "gap-1.5 p-3",
        compact: "gap-1.5 p-2.5",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

const kanbanPriorityStyles: Record<
  KanbanPriority,
  { label: string; className: string }
> = {
  // Semantic color budget: only urgent (risk) and high (attention) get hues.
  // Dark scales are inverted (high step = light), so dark mode pairs a faint
  // light tint (…-900/15) with a vivid mid-step text color for contrast.
  urgent: {
    label: "Urgent",
    className:
      "border-destructive-300 bg-destructive-50 text-destructive-700 dark:border-destructive-700 dark:bg-destructive-900/15 dark:text-destructive-500",
  },
  high: {
    label: "High",
    className:
      "border-warning-300 bg-warning-50 text-warning-700 dark:border-warning-700 dark:bg-warning-900/15 dark:text-warning-500",
  },
  medium: {
    label: "Medium",
    className: "border-border bg-muted/70 text-foreground/80",
  },
  low: {
    label: "Low",
    className: "border-border text-muted-foreground",
  },
}

/* ----------------------------------------------------------------------------
 * KanbanEmpty
 * ------------------------------------------------------------------------- */

function KanbanEmpty({
  icon: Icon = InboxIcon,
  title = "No cards",
  description = "Drag a card here or add a new one.",
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  icon?: React.ComponentType<{ className?: string }>
  title?: string
  description?: string
}) {
  return (
    <div
      data-slot="kanban-empty"
      className={cn(
        "text-muted-foreground flex min-h-24 flex-1 flex-col items-center justify-center gap-1.5 rounded-md border border-dashed px-3 py-6 text-center",
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="size-4 opacity-70" aria-hidden="true" /> : null}
      <span className="text-xs font-medium">{title}</span>
      {description ? <span className="text-xs">{description}</span> : null}
    </div>
  )
}

/* ----------------------------------------------------------------------------
 * KanbanCard
 * ------------------------------------------------------------------------- */

interface KanbanCardProps extends Omit<React.ComponentProps<"div">, "id" | "title"> {
  id: string
  title: string
  description?: string
  /** Mono reference shown above the title, e.g. "ENG-142". */
  label?: string
  priority?: KanbanPriority
  assignee?: KanbanAssignee
  /** Outline chips rendered in the card footer. */
  tags?: string[]
  /** Mono text, e.g. "Sep 12". */
  dueDate?: string
  /** 0–100 completion rendered as a thin progress bar. */
  progress?: number
  /** Replaces the composed footer entirely. */
  footer?: React.ReactNode
  /** Hide the drag handle affordance (whole card stays draggable). */
  hideHandle?: boolean
  density?: KanbanDensity
}

function KanbanCard({
  id,
  title,
  description,
  label,
  priority,
  assignee,
  tags,
  dueDate,
  progress,
  footer,
  hideHandle = false,
  density,
  className,
  style,
  ...props
}: KanbanCardProps) {
  const board = useKanbanBoard()
  const column = React.useContext(KanbanColumnContext)
  const resolvedDensity = density ?? board?.density ?? "default"

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: KANBAN_CARD_TYPE,
      columnId: column?.columnId,
      title,
    } satisfies KanbanCardDndData,
  })

  const priorityMeta = priority ? kanbanPriorityStyles[priority] : null
  const showFooter =
    footer !== undefined || Boolean(assignee || priority || dueDate || (tags && tags.length > 0))

  return (
    <div
      ref={setNodeRef}
      data-slot="kanban-card"
      data-dragging={isDragging || undefined}
      data-priority={priority}
      data-density={resolvedDensity}
      className={cn(
        kanbanCardVariants({ density: resolvedDensity }),
        isDragging && "z-10 border-primary/40 ring-2 ring-ring/30",
        className
      )}
      style={{
        ...style,
        transform: CSS.Translate.toString(transform),
        transition,
        touchAction: "none",
      }}
      {...props}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-1.5">
        <div className="flex min-w-0 flex-col gap-0.5">
          {label ? (
            <span className="font-code text-[11px] leading-none text-muted-foreground">
              {label}
            </span>
          ) : null}
          <div className="text-sm leading-snug font-medium break-words">{title}</div>
        </div>
        {hideHandle ? null : (
          <span
            aria-hidden="true"
            className="text-muted-foreground/50 hover:text-muted-foreground -me-1 mt-0.5 flex size-5 shrink-0 cursor-grab items-center justify-center rounded-sm active:cursor-grabbing"
          >
            <GripVerticalIcon className="size-3.5" />
          </span>
        )}
      </div>

      {description ? (
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}

      {typeof progress === "number" ? (
        <div className="flex items-center gap-2">
          <Progress
            value={progress}
            className="h-1.5"
            aria-label={`${title}: ${progress}% complete`}
          />
          <span className="font-code text-[11px] tabular-nums text-muted-foreground">
            {progress}%
          </span>
        </div>
      ) : null}

      {showFooter ? (
        <div
          data-slot="kanban-card-footer"
          className="mt-0.5 flex items-start gap-x-2 gap-y-1 border-t pt-2"
        >
          {footer !== undefined ? (
            footer
          ) : (
            <>
              {/* Left cluster wraps internally (tags may fold to a second
                  row) while the meta cluster below stays pinned to the first
                  row's baseline — so due dates and priorities line up across
                  every card in a column. */}
              <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                {assignee ? (
                  <Avatar size="sm" title={assignee.name}>
                    {assignee.src ? (
                      <AvatarImage src={assignee.src} alt={assignee.name} />
                    ) : null}
                    <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                  </Avatar>
                ) : null}
                {tags && tags.length > 0 ? (
                  <span className="flex min-w-0 flex-wrap items-center gap-1">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-1.5 text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </span>
                ) : null}
              </span>
              <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap">
                {dueDate ? (
                  <span className="font-code text-[11px] whitespace-nowrap text-muted-foreground">
                    {dueDate}
                  </span>
                ) : null}
                {priorityMeta ? (
                  <Badge
                    variant="outline"
                    className={cn("px-1.5 text-[10px]", priorityMeta.className)}
                  >
                    {priorityMeta.label}
                  </Badge>
                ) : null}
              </span>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}

/* ----------------------------------------------------------------------------
 * KanbanColumn
 * ------------------------------------------------------------------------- */

interface KanbanColumnProps extends Omit<React.ComponentProps<"section">, "id" | "title"> {
  id: string
  title: string
  /** Card count shown in the mono badge; defaults to the KanbanCard children. */
  count?: number
  /** Work-in-progress limit; the count badge turns warning when exceeded. */
  wipLimit?: number
  /** Shows the header "+" button when provided. */
  onAdd?: () => void
  /** Explicit sortable ids; defaults to the ids of KanbanCard children. */
  cardIds?: Array<string | number>
  /** Hide the built-in empty state. */
  hideEmptyState?: boolean
  /** Replace the built-in empty state. */
  emptyState?: React.ReactNode
  bodyClassName?: string
  density?: KanbanDensity
}

function getCardIdsFromChildren(children: React.ReactNode): string[] {
  const ids: string[] = []
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === KanbanCard) {
      const id = (child.props as KanbanCardProps).id
      if (typeof id === "string") ids.push(id)
    }
  })
  return ids
}

function KanbanColumn({
  id,
  title,
  count,
  wipLimit,
  onAdd,
  cardIds,
  hideEmptyState = false,
  emptyState,
  bodyClassName,
  density,
  className,
  children,
  ...props
}: KanbanColumnProps) {
  const board = useKanbanBoard()
  const resolvedDensity = density ?? board?.density ?? "default"
  const registerColumn = board?.registerColumn

  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { type: KANBAN_COLUMN_TYPE, title } satisfies KanbanColumnDndData,
  })

  React.useEffect(() => {
    registerColumn?.(id, title)
  }, [registerColumn, id, title])

  // Highlight the column while it is the active drop target — either the
  // column itself is hovered, or a card that belongs to it.
  const { active, over } = useDndContext()
  const dragging = Boolean(active)
  const overData = over?.data.current
  const isDropTarget = Boolean(
    dragging &&
      over &&
      (over.id === id ||
        (overData?.type === KANBAN_CARD_TYPE && overData.columnId === id) ||
        isOver)
  )

  const resolvedCardIds = React.useMemo(
    () => cardIds ?? getCardIdsFromChildren(children),
    [cardIds, children]
  )
  const resolvedCount = count ?? resolvedCardIds.length
  const overLimit = wipLimit !== undefined && resolvedCount > wipLimit
  const isEmpty = React.Children.count(children) === 0

  return (
    <section
      data-slot="kanban-column"
      data-state={isDropTarget ? "over" : undefined}
      data-density={resolvedDensity}
      aria-label={title}
      className={cn(kanbanColumnVariants({ density: resolvedDensity }), className)}
      {...props}
    >
      <header
        data-slot="kanban-column-header"
        className={cn(kanbanColumnHeaderVariants({ density: resolvedDensity }))}
      >
        <h3 className="min-w-0 flex-1 truncate text-sm font-medium">{title}</h3>
        <span
          className={cn(
            "font-code inline-flex h-5 min-w-5 items-center justify-center rounded-sm border px-1.5 text-[11px] tabular-nums",
            // The border is always reserved (transparent when in limits) so
            // the over-limit state changes color only — no metric shift.
            overLimit
              ? "border-warning-300 bg-warning-50 text-warning-700 dark:border-warning-700 dark:bg-warning-900/15 dark:text-warning-500"
              : "border-transparent bg-muted text-muted-foreground"
          )}
        >
          {wipLimit !== undefined ? `${resolvedCount} / ${wipLimit}` : resolvedCount}
        </span>
        {onAdd ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label={`Add a card to ${title}`}
            onClick={onAdd}
            className="-me-1"
          >
            <PlusIcon />
          </Button>
        ) : null}
      </header>
      <SortableContext items={resolvedCardIds} strategy={verticalListSortingStrategy}>
        <div
          ref={setNodeRef}
          data-slot="kanban-column-body"
          className={cn(
            kanbanColumnBodyVariants({ density: resolvedDensity }),
            // Reserve the hairline while dragging so the active tint causes no
            // layout shift; color/opacity only (calm transitions).
            dragging && "border border-dashed border-transparent",
            dragging && isDropTarget && "border-primary/40 bg-primary/5",
            bodyClassName
          )}
        >
          {isEmpty && !hideEmptyState
            ? (emptyState ?? <KanbanEmpty />)
            : children}
        </div>
      </SortableContext>
    </section>
  )
}

/* ----------------------------------------------------------------------------
 * KanbanBoard
 * ------------------------------------------------------------------------- */

interface KanbanBoardProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof kanbanColumnVariants> {
  /** Controlled column data. */
  columns?: KanbanColumnData[]
  /** Initial column data for uncontrolled boards. */
  defaultColumns?: KanbanColumnData[]
  /** Fires once when a drag ends with the card in a new position. */
  onCardMove?: (event: KanbanCardMoveEvent) => void
  /** Fires whenever the board's column data changes (controlled or not). */
  onChange?: (columns: KanbanColumnData[]) => void
  /** Shows each column header's "+" button when provided. */
  onAddCard?: (columnId: string) => void
  columnClassName?: string
  cardClassName?: string
}

function KanbanBoard({
  columns: controlledColumns,
  defaultColumns,
  onCardMove,
  onChange,
  onAddCard,
  density,
  columnClassName,
  cardClassName,
  className,
  children,
  ...props
}: KanbanBoardProps) {
  const isControlled = controlledColumns !== undefined
  const [uncontrolledColumns, setUncontrolledColumns] = React.useState<
    KanbanColumnData[] | undefined
  >(defaultColumns)
  const dataColumns = controlledColumns ?? uncontrolledColumns

  const [dragging, setDragging] = React.useState(false)
  const [statusMessage, setStatusMessage] = React.useState("")

  const columnTitles = React.useRef(new Map<string, string>())
  const registerColumn = React.useCallback((id: string, title: string) => {
    columnTitles.current.set(id, title)
  }, [])

  const dragOrigin = React.useRef<{ columnId: string; index: number } | null>(null)
  const transientMove = React.useRef(false)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const getColumnTitle = React.useCallback((columnId: string): string => {
    return columnTitles.current.get(columnId) ?? columnId
  }, [])

  const describeTarget = React.useCallback(
    (target: Over): string => {
      const data = target.data.current
      if (data?.type === KANBAN_COLUMN_TYPE) {
        const title = typeof data.title === "string" ? data.title : String(target.id)
        return `column ${title}`
      }
      if (data?.type === KANBAN_CARD_TYPE) {
        const columnId = typeof data.columnId === "string" ? data.columnId : null
        return columnId ? `column ${getColumnTitle(columnId)}` : `card ${nodeTitle(target)}`
      }
      return String(target.id)
    },
    [getColumnTitle]
  )

  // Screen-reader announcements. dnd-kit announces pick-up/hover assertively
  // (immediate feedback mid-drag); the completed move is announced politely
  // via the status region below so it never interrupts.
  const announcements = React.useMemo<Announcements>(
    () => ({
      onDragStart: ({ active }) =>
        `Picked up card ${nodeTitle(active)}. Use the arrow keys to move it, press space or enter to drop it, or escape to cancel.`,
      onDragOver: ({ active, over }) =>
        over
          ? `${nodeTitle(active)} is over ${describeTarget(over)}.`
          : `${nodeTitle(active)} is not over a droppable area.`,
      onDragEnd: () => undefined,
      onDragCancel: ({ active }) =>
        `Dragging of card ${nodeTitle(active)} was cancelled.`,
    }),
    [describeTarget]
  )

  const commitColumns = (next: KanbanColumnData[]) => {
    if (!isControlled) setUncontrolledColumns(next)
    onChange?.(next)
  }

  const handleDragStart = (event: DragStartEvent) => {
    setDragging(true)
    transientMove.current = false
    const activeId = String(event.active.id)
    const columnId = event.active.data.current?.columnId
    const sortableIndex = event.active.data.current?.sortable
    if (dataColumns) {
      const location = findCardLocation(dataColumns, activeId)
      if (location) {
        dragOrigin.current = location
        return
      }
    }
    dragOrigin.current =
      typeof columnId === "string"
        ? {
            columnId,
            index:
              typeof sortableIndex?.index === "number" ? sortableIndex.index : 0,
          }
        : null
  }

  // Live cross-column preview (uncontrolled data mode only): move the card
  // into the hovered column so the board mirrors the drop before release.
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over || isControlled) return
    const activeId = String(active.id)

    setUncontrolledColumns((prev) => {
      if (!prev) return prev
      const from = findCardLocation(prev, activeId)
      if (!from) return prev
      const overId = String(over.id)
      if (overId === activeId) return prev

      const overLocation = findCardLocation(prev, overId)
      let targetColumnId: string | null = null
      let insertIndex: number | undefined

      if (overLocation) {
        if (overLocation.columnId === from.columnId) return prev
        targetColumnId = overLocation.columnId
        insertIndex = overLocation.index
      } else if (overId !== from.columnId && prev.some((column) => column.id === overId)) {
        targetColumnId = overId
      }
      if (!targetColumnId) return prev

      const card = prev.find((column) => column.id === from.columnId)?.cards?.[from.index]
      if (!card) return prev
      transientMove.current = true
      return insertCardIntoColumn(
        removeCardFromColumn(prev, from.columnId, activeId),
        targetColumnId,
        card,
        insertIndex
      )
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setDragging(false)
    const activeId = String(active.id)
    const cardTitle = nodeTitle(active)
    const origin = dragOrigin.current
    dragOrigin.current = null
    const didTransientMove = transientMove.current
    transientMove.current = false

    // Dropped outside every droppable — revert any live preview to the origin.
    if (!over) {
      if (didTransientMove && origin && dataColumns) {
        const current = findCardLocation(dataColumns, activeId)
        if (
          current &&
          (current.columnId !== origin.columnId || current.index !== origin.index)
        ) {
          const card = dataColumns
            .find((column) => column.id === current.columnId)
            ?.cards?.[current.index]
          if (card) {
            commitColumns(
              insertCardIntoColumn(
                removeCardFromColumn(dataColumns, current.columnId, activeId),
                origin.columnId,
                card,
                origin.index
              )
            )
            setStatusMessage(`Move of ${cardTitle} cancelled.`)
          }
        }
      }
      return
    }

    // Finalize the drop against the current snapshot.
    let nextColumns = dataColumns
    if (dataColumns) {
      const result = applyDrop(dataColumns, activeId, String(over.id))
      if (result.changed) nextColumns = result.columns
    }

    if (nextColumns && nextColumns !== dataColumns) {
      commitColumns(nextColumns)
    }

    let toColumnId: string | undefined
    let toIndex: number | undefined
    if (nextColumns) {
      const location = findCardLocation(nextColumns, activeId)
      if (location) {
        toColumnId = location.columnId
        toIndex = location.index
      }
    } else {
      // Compound mode — best effort from the dnd payload.
      const data = over.data.current
      const sortable = data?.sortable
      toColumnId =
        typeof data?.columnId === "string" ? data.columnId : String(over.id)
      toIndex = typeof sortable?.index === "number" ? sortable.index : 0
    }

    const fromColumnId = origin?.columnId
    const moved =
      Boolean(fromColumnId && toColumnId) &&
      (toColumnId !== fromColumnId || (toIndex !== undefined && toIndex !== origin?.index))

    if (moved && fromColumnId && toColumnId) {
      const moveEvent: KanbanCardMoveEvent = {
        cardId: activeId,
        cardTitle,
        fromColumnId,
        toColumnId,
        toIndex: toIndex ?? 0,
      }
      onCardMove?.(moveEvent)
      setStatusMessage(
        toColumnId === fromColumnId
          ? `Moved ${cardTitle} within ${getColumnTitle(toColumnId)}.`
          : `Moved ${cardTitle} to ${getColumnTitle(toColumnId)}.`
      )
    } else if (didTransientMove && dataColumns && !nextColumns) {
      // Defensive: a transient move exists but nothing to commit.
      setStatusMessage(`Move of ${cardTitle} cancelled.`)
    }
  }

  const handleDragCancel = (event: DragCancelEvent) => {
    setDragging(false)
    const activeId = String(event.active.id)
    const origin = dragOrigin.current
    dragOrigin.current = null
    transientMove.current = false

    // Revert any live cross-column preview back to where the drag began.
    if (origin && dataColumns) {
      const current = findCardLocation(dataColumns, activeId)
      if (current && (current.columnId !== origin.columnId || current.index !== origin.index)) {
        const card = dataColumns
          .find((column) => column.id === current.columnId)
          ?.cards?.[current.index]
        if (card) {
          commitColumns(
            insertCardIntoColumn(
              removeCardFromColumn(dataColumns, current.columnId, activeId),
              origin.columnId,
              card,
              origin.index
            )
          )
        }
      }
    }
  }

  const boardContextValue = React.useMemo<KanbanBoardContextValue>(
    () => ({
      density: density ?? "default",
      dragging,
      registerColumn,
    }),
    [density, dragging, registerColumn]
  )

  return (
    <KanbanBoardContext.Provider value={boardContextValue}>
      <div
        data-slot="kanban-board"
        data-density={density ?? "default"}
        className={cn("flex items-stretch gap-3 overflow-x-auto", className)}
        {...props}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
          accessibility={{ announcements }}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {dataColumns
            ? dataColumns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  wipLimit={column.wipLimit}
                  className={columnClassName}
                  onAdd={onAddCard ? () => onAddCard(column.id) : undefined}
                >
                  {(column.cards ?? []).map((card) => (
                    <KanbanCard key={card.id} {...card} className={cardClassName} />
                  ))}
                </KanbanColumn>
              ))
            : children}
        </DndContext>
      </div>
      {/* Polite live region — completed moves are announced after the fact. */}
      <div aria-live="polite" role="status" className="sr-only">
        {statusMessage}
      </div>
    </KanbanBoardContext.Provider>
  )
}

export {
  KanbanBoard,
  KanbanColumn,
  KanbanCard,
  KanbanEmpty,
  kanbanColumnVariants,
  kanbanCardVariants,
}
