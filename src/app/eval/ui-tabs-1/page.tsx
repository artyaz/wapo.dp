"use client"
// EVAL page — tabs p1 — online course platform classroom — 390x844 dark
// Tabs front and center: course classroom sections as a full-width segmented
// tab list with counts (Lessons 12 / Q&A 5 / Files 8 / Grades), active section
// clearly visible, plus a sticky resume bar.
// Co-stars: Card, Badge, Button, Avatar, Progress.

import {
  Award,
  Check,
  ChevronLeft,
  Download,
  FileText,
  MessageCircle,
  Play,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const lessons = [
  { n: "01", title: "Attention budgets", dur: "8:24", state: "done" },
  { n: "02", title: "Hick's law in menus", dur: "6:10", state: "done" },
  { n: "03", title: "F-pattern scanning", dur: "11:02", state: "done" },
  { n: "04", title: "Working memory limits", dur: "9:47", state: "done" },
  { n: "05", title: "Recognition over recall", dur: "7:33", state: "done" },
  { n: "06", title: "Cognitive load triage", dur: "12:15", state: "done" },
  { n: "07", title: "Gestalt grouping", dur: "10:08", state: "current" },
  { n: "08", title: "Interruption cost", dur: "9:21", state: "todo" },
  { n: "09", title: "Passwordless flows (guest)", dur: "14:05", state: "todo" },
  { n: "10", title: "Lab: card-sort audit", dur: "22:40", state: "todo" },
  { n: "11", title: "Spaced-repetition onboarding", dur: "8:56", state: "todo" },
  { n: "12", title: "Module review & quiz", dur: "6:12", state: "todo" },
] as const

const questions = [
  {
    who: "MK",
    name: "Mira Kovač",
    when: "2 h ago",
    q: "Does the 7±2 rule still hold for nav bars with icons only?",
    replies: 4,
  },
  {
    who: "TA",
    name: "Tomas Aalto (TA)",
    when: "5 h ago",
    q: "Lab 2 rubric posted — card-sort audit is graded on coverage, not speed.",
    replies: 1,
  },
  {
    who: "JD",
    name: "Jonah Delacroix",
    when: "yesterday",
    q: "Slides for lesson 09 downloadable before the live session?",
    replies: 2,
  },
]

const files = [
  { name: "HCI-204_syllabus.pdf", size: "412 KB", date: "Jan 14" },
  { name: "module2_slides.key", size: "18.4 MB", date: "Feb 02" },
  { name: "cardsort_template.csv", size: "9 KB", date: "Feb 09" },
  { name: "reading_attention.pdf", size: "2.1 MB", date: "Feb 11" },
]

const grades = [
  { name: "Module 1 quiz", score: "92 / 100", state: "Passed" },
  { name: "Lab 1: heuristic review", score: "88 / 100", state: "Passed" },
  { name: "Module 2 quiz", score: "—", state: "Opens Feb 28" },
]

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col">
        {/* App bar */}
        <header className="flex items-center justify-between px-4 pt-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Back to my courses"
            >
              <ChevronLeft />
            </Button>
            <span className="font-code text-xs text-muted-foreground">
              HCI-204
            </span>
          </div>
          <Badge variant="outline" className="font-code text-[10px]">
            SPRING '26
          </Badge>
        </header>

        {/* Course header */}
        <div className="flex flex-col gap-3 px-4 pt-2">
          <h1 className="font-heading-1 text-heading-1 text-foreground">
            Cognitive UX: Designing for Attention
          </h1>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AO</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                Dr. Amara Osei
              </p>
              <p className="font-caption text-caption text-muted-foreground">
                214 learners · 4 modules
              </p>
            </div>
            <div className="text-end">
              <p className="font-code text-sm text-foreground">50%</p>
              <p className="font-caption text-caption text-muted-foreground">
                6 of 12 lessons
              </p>
            </div>
          </div>
          <Progress value={50} aria-label="Course progress, 6 of 12 lessons" />
        </div>

        {/* Classroom sections — the tabs */}
        <Tabs defaultValue="lessons" className="mt-4 gap-0">
          <div className="px-4">
            <TabsList className="w-full">
              <TabsTrigger
                value="lessons"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                Lessons
                <span className="font-code text-[10px] text-muted-foreground">
                  12
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="qa"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                Q&amp;A
                <span className="font-code text-[10px] text-muted-foreground">
                  5
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="data-[state=active]:[&>span]:text-foreground"
              >
                Files
                <span className="font-code text-[10px] text-muted-foreground">
                  8
                </span>
              </TabsTrigger>
              <TabsTrigger value="grades">Grades</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="lessons" className="mt-3">
            <div className="flex items-center justify-between px-4 pb-2">
              <span className="font-caption text-caption text-muted-foreground">
                Module 2 · Attention &amp; memory
              </span>
              <span className="font-code text-xs text-muted-foreground">
                1 h 44 m left
              </span>
            </div>
            <Card className="divide-y py-0">
              {lessons.map((l) => (
                <div
                  key={l.n}
                  className={
                    l.state === "current"
                      ? "bg-muted/40 flex items-center gap-3 px-4 py-2.5"
                      : "flex items-center gap-3 px-4 py-2.5"
                  }
                >
                  <span className="w-6 shrink-0 font-code text-xs text-muted-foreground">
                    {l.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        l.state === "todo"
                          ? "truncate text-sm text-muted-foreground"
                          : "truncate text-sm text-foreground"
                      }
                    >
                      {l.title}
                    </p>
                    {l.state === "current" && (
                      <p className="font-caption text-caption text-muted-foreground">
                        2:31 watched · {l.dur} total
                      </p>
                    )}
                  </div>
                  {l.state === "current" ? (
                    <Button size="xs" variant="secondary">
                      <Play />
                      Resume
                    </Button>
                  ) : (
                    <span className="flex items-center gap-2">
                      <span className="font-code text-xs text-muted-foreground">
                        {l.dur}
                      </span>
                      {l.state === "done" && (
                        <Check
                          className="size-4 text-muted-foreground"
                          aria-label="Completed"
                        />
                      )}
                    </span>
                  )}
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="qa" className="mt-3 px-4">
            <Card className="divide-y py-0">
              {questions.map((q) => (
                <div key={q.q} className="flex gap-3 px-4 py-3">
                  <Avatar size="sm">
                    <AvatarFallback>{q.who}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium text-foreground">
                        {q.name}
                      </span>
                      <span className="font-code text-xs text-muted-foreground">
                        {q.when}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{q.q}</p>
                    <p className="font-caption text-caption text-muted-foreground">
                      <MessageCircle className="mr-1 inline size-3" />
                      {q.replies} replies
                    </p>
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="files" className="mt-3 px-4">
            <Card className="divide-y py-0">
              {files.map((f) => (
                <div key={f.name} className="flex items-center gap-3 px-4 py-3">
                  <FileText className="size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{f.name}</p>
                    <p className="font-code text-xs text-muted-foreground">
                      {f.size} · added {f.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon-sm" aria-label="Download">
                    <Download className="size-4" />
                  </Button>
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="mt-3 px-4">
            <Card className="divide-y py-0">
              {grades.map((g) => (
                <div key={g.name} className="flex items-center gap-3 px-4 py-3">
                  <Award className="size-4 shrink-0 text-muted-foreground" />
                  <p className="min-w-0 flex-1 truncate text-sm text-foreground">
                    {g.name}
                  </p>
                  <span className="font-code text-xs text-muted-foreground">
                    {g.score}
                  </span>
                  <Badge variant="outline">{g.state}</Badge>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sticky continue bar */}
        <footer className="sticky bottom-0 mt-4 border-t bg-background px-4 py-3">
          <div className="flex items-center gap-3">
            <Button className="flex-1">
              <Play />
              Resume · 07 Gestalt grouping
            </Button>
            <div className="text-end">
              <p className="font-code text-xs text-foreground">10:08</p>
              <p className="font-caption text-caption text-muted-foreground">
                next up
              </p>
            </div>
          </div>
        </footer>
      </div>
    </EvalShell>
  )
}
