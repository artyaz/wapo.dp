"use client";

/**
 * EVAL page — dropdown-menu p1 — construction project management board —
 * 1024x768, light theme, ltr.
 *
 * General contractor's task board for "Riverside Commons — Phase 2".
 * The row-actions dropdown (⋯) on task T-142 "Install ductwork" renders OPEN
 * at initial render (defaultOpen on the Root + defaultOpen on the "Assign to"
 * submenu) so the static capture shows label, icon items, submenu, checkbox
 * item, shortcut and destructive item. Closed trigger affordances: trade
 * filter and the account menu off the header avatar.
 * Other ui/* components: Button, Badge, Avatar, Table, Progress, Separator,
 * Input.
 */

import * as React from "react";
import {
  BellIcon,
  CalendarDaysIcon,
  ClipboardListIcon,
  FilterIcon,
  HardHatIcon,
  ImagesIcon,
  LayoutDashboardIcon,
  ListFilterIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PencilIcon,
  PlusIcon,
  ReceiptTextIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldAlertIcon,
  EyeIcon,
  TrashIcon,
  UserMinusIcon,
  UserPlusIcon,
  UserRoundIcon,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Task = {
  id: string;
  name: string;
  location: string;
  trade: string;
  assignee: string;
  initials: string;
  due: string;
  status: "complete" | "in-progress" | "at-risk" | "overdue" | "scheduled";
};

const TASKS: Task[] = [
  {
    id: "T-118",
    name: "Pour foundation slab",
    location: "Level B2",
    trade: "Concrete",
    assignee: "R. Delgado",
    initials: "RD",
    due: "Jun 14",
    status: "complete",
  },
  {
    id: "T-142",
    name: "Install ductwork",
    location: "Level 3 · east wing",
    trade: "HVAC",
    assignee: "M. Okafor",
    initials: "MO",
    due: "Jun 28",
    status: "in-progress",
  },
  {
    id: "T-149",
    name: "Rough-in plumbing",
    location: "Level 2",
    trade: "Plumbing",
    assignee: "J. Reyes",
    initials: "JR",
    due: "Jul 02",
    status: "at-risk",
  },
  {
    id: "T-151",
    name: "Electrical conduit run",
    location: "Level 1 · core",
    trade: "Electrical",
    assignee: "L. Whitfield",
    initials: "LW",
    due: "Jun 20",
    status: "overdue",
  },
  {
    id: "T-157",
    name: "Framing inspection",
    location: "Stair core B",
    trade: "Structure",
    assignee: "S. Brandt",
    initials: "SB",
    due: "Jul 05",
    status: "scheduled",
  },
];

const STATUS_LABEL: Record<Task["status"], string> = {
  complete: "Complete",
  "in-progress": "In progress",
  "at-risk": "At risk",
  overdue: "Overdue",
  scheduled: "Scheduled",
};

const NAV = [
  { icon: LayoutDashboardIcon, label: "Overview", count: null },
  { icon: ClipboardListIcon, label: "Task board", count: null, active: true },
  { icon: ReceiptTextIcon, label: "RFIs", count: "6" },
  { icon: ListFilterIcon, label: "Submittals", count: "2" },
  { icon: CalendarDaysIcon, label: "Schedule", count: null },
  { icon: ShieldAlertIcon, label: "Safety", count: null },
  { icon: ImagesIcon, label: "Photos", count: null },
];

export default function Page() {
  const [watch, setWatch] = React.useState(true);
  // Radix Menu CheckboxItem is controlled-only (`checked = false` default;
  // `defaultChecked` is a silent no-op), so the trade-filter checkboxes are
  // driven by explicit state to actually render their checkmarks when opened.
  const [tradeHvac, setTradeHvac] = React.useState(true);
  const [tradePlumbing, setTradePlumbing] = React.useState(true);
  // Radix's Menu.Sub closes itself during the portaled mount cycle around
  // hydration (its unmount cleanup fires onOpenChange(false)), so the
  // "Assign to" submenu is controlled and its initial open state re-asserted
  // right after mount to stay open for the static capture.
  const [assignOpen, setAssignOpen] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setAssignOpen(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* top bar — account dropdown stays closed, shows the affordance */}
        <header className="flex h-14 flex-none items-center justify-between gap-3 border-b border-default-border px-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
              <HardHatIcon className="size-4 text-foreground" />
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Fieldnote
            </span>
            <Separator orientation="vertical" className="!h-5" />
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted-foreground">
                Riverside Commons
              </span>
              <Badge variant="secondary">Phase 2</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button variant="outline" size="sm">
              <PencilIcon />
              Daily log
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notifications"
              className="relative"
            >
              <BellIcon />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Account menu"
                    className="rounded-full"
                  >
                    <Avatar className="size-8">
                      <AvatarFallback className="text-xs">DW</AvatarFallback>
                    </Avatar>
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>
                  Dana Whitmore
                  <span className="block font-normal text-muted-foreground">
                    Project manager
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PencilIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ReceiptTextIcon />
                  Timesheets
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  Sign out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex flex-1">
          {/* left rail */}
          <nav className="flex w-52 flex-none flex-col gap-0.5 border-r border-default-border p-3">
            <p className="px-2 pb-1.5 font-code text-[10px] uppercase tracking-wider text-muted-foreground">
              Riverside Commons
            </p>
            {NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-sm bg-accent px-2 py-1.5 text-sm font-medium text-accent-foreground"
                    : "flex items-center gap-2.5 rounded-sm px-2 py-1.5 text-sm text-muted-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
                {item.count && (
                  <Badge
                    variant="outline"
                    className="ms-auto font-code text-[10px]"
                  >
                    {item.count}
                  </Badge>
                )}
              </span>
            ))}
            <div className="mt-auto rounded-lg border border-default-border bg-card p-3">
              <p className="text-xs font-medium">Phase 2 progress</p>
              <p className="mt-1 font-code text-lg tabular-nums">62%</p>
              <Progress value={62} className="mt-2 h-1.5" />
              <p className="mt-2 font-code text-[10px] text-muted-foreground">
                on schedule · wk 24 of 39
              </p>
            </div>
          </nav>

          {/* main column */}
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="font-heading-3 text-heading-3 text-foreground">
                  Task board — Level 1–3 fit-out
                </h1>
                <p className="mt-0.5 font-code text-xs text-muted-foreground">
                  week 24 · updated today 08:42 · 5 of 23 trades on site
                </p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks…"
                    className="h-8 w-48 pl-8 text-sm"
                  />
                </div>
                {/* closed trigger affordance — trade filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="outline" size="sm">
                        <FilterIcon />
                        Trade
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuLabel>Filter by trade</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={tradeHvac}
                      onCheckedChange={setTradeHvac}
                    >
                      HVAC
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={tradePlumbing}
                      onCheckedChange={setTradePlumbing}
                    >
                      Plumbing
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Electrical
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <RotateCcwIcon />
                      Clear filters
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button size="sm">
                  <PlusIcon />
                  New task
                </Button>
              </div>
            </div>

            {/* stats strip — flat panels, border separation */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Open tasks", value: "18", note: "3 due this week" },
                {
                  label: "Overdue",
                  value: "4",
                  note: "oldest 6 days",
                  danger: true,
                },
                {
                  label: "RFIs awaiting",
                  value: "6",
                  note: "3 with architect",
                },
                {
                  label: "Safety observations",
                  value: "2",
                  note: "0 lost-time incidents",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-default-border bg-card px-3 py-2.5"
                >
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p
                    className={`mt-0.5 font-code text-xl tabular-nums ${
                      stat.danger ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="font-code text-[10px] text-muted-foreground">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>

            {/* task table — row actions dropdown open on T-142 */}
            <div className="overflow-hidden rounded-lg border border-default-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-9 text-xs">Task</TableHead>
                    <TableHead className="h-9 text-xs">Trade</TableHead>
                    <TableHead className="h-9 text-xs">Assignee</TableHead>
                    <TableHead className="h-9 text-xs">Due</TableHead>
                    <TableHead className="h-9 text-xs">Status</TableHead>
                    <TableHead className="h-9 w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TASKS.map((task) => (
                    <TableRow
                      key={task.id}
                      // T-142's row stays highlighted while its actions
                      // dropdown is open at initial render.
                      className={
                        task.id === "T-142" ? "bg-accent/50" : undefined
                      }
                    >
                      <TableCell className="py-2.5">
                        <div className="flex items-baseline gap-2">
                          <span className="font-code text-[11px] text-muted-foreground">
                            {task.id}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {task.name}
                            </p>
                            <p className="font-code text-[10px] text-muted-foreground">
                              {task.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5">
                        <Badge variant="outline" className="font-normal">
                          {task.trade}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-2.5">
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6">
                            <AvatarFallback className="text-[10px]">
                              {task.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{task.assignee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2.5 font-code text-xs tabular-nums text-muted-foreground">
                        {task.due}
                      </TableCell>
                      <TableCell className="py-2.5">
                        {task.status === "overdue" ? (
                          <Badge variant="destructive">
                            {STATUS_LABEL[task.status]}
                          </Badge>
                        ) : task.status === "at-risk" ? (
                          <Badge
                            variant="outline"
                            className="border-warning-300 font-normal text-warning-700"
                          >
                            {STATUS_LABEL[task.status]}
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="font-normal">
                            {STATUS_LABEL[task.status]}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-2.5">
                        {task.id === "T-142" ? (
                          <DropdownMenu defaultOpen modal={false}>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label={`Actions for ${task.name}`}
                                >
                                  <MoreHorizontalIcon />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end" className="w-56">
                              <DropdownMenuLabel>
                                Task T-142
                                <span className="block font-normal text-muted-foreground">
                                  Level 3 · east wing · HVAC
                                </span>
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              {/* Submenu leads so the cascading panel opens
                                  beside the top of the parent menu (fully
                                  inside its vertical span) — the classic
                                  nested-menu silhouette. */}
                              <DropdownMenuSub open={assignOpen} onOpenChange={setAssignOpen}>
                                <DropdownMenuSubTrigger>
                                  <UserPlusIcon className="size-4" />
                                  Assign to
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                  <DropdownMenuSubContent className="w-56">
                                    {/* Mirrors the parent menu's icon + label
                                        structure: 16px icon in the leading
                                        gutter, label column at 32px. */}
                                    <DropdownMenuItem>
                                      <UserRoundIcon />
                                      M. Okafor · HVAC
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <UserRoundIcon />
                                      J. Reyes · Mech.
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <UserRoundIcon />
                                      D. Kowalski · Apprentice
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <UserMinusIcon />
                                      Unassign crew
                                    </DropdownMenuItem>
                                  </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                              </DropdownMenuSub>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <PencilIcon />
                                  Edit task
                                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <PaperclipIcon />
                                  Attach photo
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <EyeIcon />
                                  View dependencies
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuCheckboxItem
                                checked={watch}
                                onCheckedChange={setWatch}
                              >
                                Watch for updates
                              </DropdownMenuCheckboxItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive">
                                <TrashIcon />
                                Delete task
                                <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Actions for ${task.name}`}
                          >
                            <MoreHorizontalIcon />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <footer className="mt-auto flex items-center justify-between font-code text-[10px] text-muted-foreground">
              <span>Halloway Construction · GC license OHC-88231</span>
              <span>last sync 08:42 · 5 min ago</span>
            </footer>
          </main>
        </div>
      </div>
    </EvalShell>
  );
}
