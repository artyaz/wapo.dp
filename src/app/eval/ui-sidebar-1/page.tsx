"use client";

/**
 * EVAL page — sidebar p1 — online course platform classroom — 1024x768 dark
 *
 * "Lumen Academy" student classroom for a single course (CS-204 Data
 * Structures): full Sidebar composition — header course switcher, Classroom
 * group with count badges, open collapsible "Course modules" submenu with an
 * active lesson, Workspace group, student footer, rail + trigger — plus
 * Card / Badge / Button / Avatar / Progress / Separator in the lesson pane.
 */

import React from "react";
import {
  Award,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  MessagesSquare,
  Play,
  Users,
  Video,
} from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const classroomNav = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Lectures", icon: Video, badge: "4" },
  { title: "Assignments", icon: ClipboardList, badge: "12" },
  { title: "Grades", icon: Award },
  { title: "Discussion", icon: MessagesSquare },
];

const moduleLessons = [
  { title: "Balanced trees", active: true },
  { title: "Heaps & priority queues", active: false },
  { title: "B-trees & 2-3 trees", active: false },
];

const workspaceNav = [
  { title: "Messages", icon: MessageCircle, badge: "3" },
  { title: "Study groups", icon: Users },
  { title: "Calendar", icon: CalendarDays },
];

const deadlines = [
  {
    code: "LAB-07",
    title: "AVL rotations worksheet",
    due: "due Thu 05 Mar · 21:00",
    badge: "Due in 2 days",
    tone: "warning" as const,
  },
  {
    code: "QZ-09",
    title: "Graph traversal quiz",
    due: "due Fri 06 Mar · 23:59",
    badge: "Open",
    tone: "outline" as const,
  },
  {
    code: "ES-03",
    title: "Red-black trees essay",
    due: "due Tue 10 Mar · 12:00",
    badge: "Draft",
    tone: "outline" as const,
  },
  {
    code: "LAB-06",
    title: "Hash tables lab",
    due: "graded 9.2 / 10",
    badge: "Graded",
    tone: "success" as const,
  },
];

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="CS-204 · Data Structures">
                  <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <GraduationCap className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Lumen Academy</span>
                    <span className="text-muted-foreground text-xs">
                      CS-204 · Data Structures
                    </span>
                  </div>
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Classroom</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {classroomNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge ? (
                        <SidebarMenuBadge className="border-sidebar-border bg-sidebar-accent border">
                          {item.badge}
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Course modules</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton>
                            <FolderOpen />
                            <span>Module 3 · Trees</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        }
                      />
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {moduleLessons.map((lesson) => (
                            <SidebarMenuSubItem key={lesson.title}>
                              <SidebarMenuSubButton isActive={lesson.active}>
                                <span>{lesson.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Module 4 · Graphs">
                      <FolderOpen />
                      <span>Module 4 · Graphs</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {workspaceNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton tooltip={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge ? (
                        <SidebarMenuBadge className="border-sidebar-border bg-sidebar-accent border">
                          {item.badge}
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8">
                    <AvatarFallback>AO</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Amara Okafor</span>
                    <span className="text-muted-foreground text-xs">
                      Year 2 · Computer Science
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-1 h-4" />
            <div className="flex min-w-0 items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">CS-204</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="text-muted-foreground">Module 3</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="truncate font-medium">Balanced trees</span>
            </div>
            <span className="text-muted-foreground ml-auto hidden font-code text-xs md:inline">
              Tue 03 Mar 2026 · Week 7
            </span>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Balanced trees
                </h1>
                <p className="text-muted-foreground mt-1 font-code text-xs">
                  Lesson 12 of 16 · Prof. Elena Voss · 42 min
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Play />
                Replay lesson
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="gap-2 py-4">
                <CardHeader className="px-4">
                  <CardDescription>Course progress</CardDescription>
                  <CardTitle className="font-code text-xl tabular-nums">
                    68%
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <Progress value={68} aria-label="Course progress" />
                </CardContent>
              </Card>
              <Card className="gap-2 py-4">
                <CardHeader className="px-4">
                  <CardDescription>Current grade</CardDescription>
                  <CardTitle className="font-code text-xl tabular-nums">
                    A− · 92/100
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground px-4 text-xs">
                  Top 15% of the cohort
                </CardContent>
              </Card>
              <Card className="gap-2 py-4">
                <CardHeader className="px-4">
                  <CardDescription>Attendance</CardDescription>
                  <CardTitle className="font-code text-xl tabular-nums">
                    22/23
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground px-4 text-xs">
                  96% live-session attendance
                </CardContent>
              </Card>
            </div>

            <div className="grid flex-1 gap-4 lg:grid-cols-[1fr_260px]">
              <Card className="gap-0 py-0">
                <CardHeader className="px-4 py-4">
                  <CardTitle className="text-sm">Upcoming deadlines</CardTitle>
                  <CardDescription className="text-xs">
                    Module 3 · Trees
                  </CardDescription>
                  <CardAction>
                    <Button variant="ghost" size="sm">
                      View all
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-0">
                  <ul className="divide-y">
                    {deadlines.map((row) => (
                      <li
                        key={row.code}
                        className="flex items-center justify-between gap-3 px-4 py-2.5"
                      >
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate text-sm font-medium">
                            {row.title}
                          </span>
                          <span className="text-muted-foreground font-code text-xs">
                            {row.code} · {row.due}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            row.tone === "warning"
                              ? "border-warning-500/40 text-warning-500"
                              : row.tone === "success"
                                ? "border-success-500/40 text-success-500"
                                : undefined
                          }
                        >
                          {row.badge}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="gap-3 py-4">
                <CardHeader className="px-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-destructive/15 text-destructive inline-flex size-2 rounded-full" />
                    <CardDescription>Live now</CardDescription>
                  </div>
                  <CardTitle className="text-sm">Lesson 13 · B-trees</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 px-4">
                  <p className="text-muted-foreground text-xs">
                    Started 14:00 · 48 min remaining. Prof. Voss is walking
                    through 2-3 tree splits.
                  </p>
                  <Button size="sm" className="w-full">
                    <Video />
                    Join lecture
                  </Button>
                  <p className="text-muted-foreground font-code text-[11px]">
                    214 students watching
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </EvalShell>
  );
}
