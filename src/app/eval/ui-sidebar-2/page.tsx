"use client";

/**
 * EVAL page — sidebar p2 — hospital appointment booking — 834x1112 light
 *
 * "Meridian Health" patient portal (portrait tablet): full Sidebar
 * composition — clinic header, Appointments group with an active item + count
 * badge, open collapsible "Care team" submenu, Account group, patient footer
 * with mono MRN, rail + trigger — plus Card / Badge / Button / Avatar /
 * Checkbox in the booking pane.
 */

import React from "react";
import {
  BellRing,
  CalendarCheck2,
  CalendarPlus,
  ChevronRight,
  CircleHelp,
  Clock,
  HeartPulse,
  History,
  MapPin,
  Phone,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  UserRound,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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

const appointmentNav = [
  { title: "Upcoming", icon: CalendarCheck2, badge: "2", active: true },
  { title: "Book a visit", icon: CalendarPlus },
  { title: "Past visits", icon: History },
  { title: "Reminders", icon: BellRing },
];

const careTeam = [
  { title: "Dr. Neha Kulkarni", active: true },
  { title: "Dr. Marcus Webb", active: false },
  { title: "Anaïs Laurent, PT", active: false },
];

const accountNav = [
  { title: "Profile", icon: UserRound },
  { title: "Insurance", icon: ShieldCheck },
  { title: "Billing", icon: ReceiptText, badge: "1" },
  { title: "Help", icon: CircleHelp },
];

const bookingOptions = [
  {
    title: "General practice",
    duration: "20 min",
    next: "Wed 04 Mar · 08:40",
    doctor: "Dr. M. Webb",
  },
  {
    title: "Cardiology follow-up",
    duration: "15 min",
    next: "Fri 06 Mar · 10:20",
    doctor: "Dr. N. Kulkarni",
  },
  {
    title: "Lab results review",
    duration: "10 min",
    next: "Thu 05 Mar · 16:00",
    doctor: "Dr. M. Webb",
  },
];

const prepSteps = [
  {
    id: "prep-meds",
    label: "Bring your current medication list",
    hint: "Include dosages — the nurse reconciles it at check-in.",
    checked: true,
  },
  {
    id: "prep-ecg",
    label: "Upload your latest ECG to the portal",
    hint: "From the January 22 wearable export is fine.",
    checked: true,
  },
  {
    id: "prep-early",
    label: "Arrive 15 minutes early",
    hint: "Cardiology suite 3B, Riverside campus.",
    checked: false,
  },
];

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" tooltip="Meridian Health">
                  <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <HeartPulse className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Meridian Health</span>
                    <span className="text-muted-foreground text-xs">
                      Patient portal
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Appointments</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {appointmentNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.active} tooltip={item.title}>
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
              <SidebarGroupLabel>Care team</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Collapsible defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuButton>
                            <Stethoscope />
                            <span>My specialists</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        }
                      />
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {careTeam.map((member) => (
                            <SidebarMenuSubItem key={member.title}>
                              <SidebarMenuSubButton isActive={member.active}>
                                <span>{member.title}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountNav.map((item) => (
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
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Sofia Marchetti</span>
                    <span className="text-muted-foreground font-code text-[11px]">
                      MRN 4471-2208
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
            <div className="ml-1 flex min-w-0 items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Appointments</span>
              <span className="text-muted-foreground/60">/</span>
              <span className="truncate font-medium">Upcoming</span>
            </div>
            <span className="text-muted-foreground ml-auto hidden font-code text-xs sm:inline">
              Tue 03 Mar 2026 · 09:12
            </span>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-5">
            <div>
              <h1 className="font-heading-2 text-heading-2 text-foreground">
                Good morning, Sofia
              </h1>
              <p className="text-muted-foreground mt-1 font-code text-xs">
                Meridian Clinic · Riverside campus · Next visit in 2 days
              </p>
            </div>

            {/* Next appointment — tomorrow */}
            <Card className="gap-4 py-4">
              <CardHeader className="px-4">
                <div className="flex items-start gap-3">
                  <Avatar className="size-10">
                    <AvatarFallback>NK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-base">Dr. Neha Kulkarni</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline">Cardiology</Badge>
                      <Badge
                        variant="outline"
                        className="border-success-500/40 text-success-700"
                      >
                        Confirmed
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
                <CardAction className="pt-1">
                  <span className="text-muted-foreground font-code text-xs">
                    #APT-20941
                  </span>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 px-4">
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Clock className="size-3.5" />
                    <span className="font-code">Thu 05 Mar · 09:30–10:00</span>
                  </span>
                  <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <MapPin className="size-3.5" />
                    Cardiology suite 3B · Riverside
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button variant="ghost" size="sm">
                    Cancel visit
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preparation checklist */}
            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Prepare for your visit</CardTitle>
                <CardDescription className="text-xs">
                  Required before Thursday&rsquo;s cardiology consult
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-4">
                {prepSteps.map((step) => (
                  <div key={step.id} className="flex items-start gap-3">
                    <Checkbox
                      id={step.id}
                      defaultChecked={step.checked}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor={step.id}
                      className="flex flex-col gap-0.5 text-sm leading-none"
                    >
                      <span className="font-medium">{step.label}</span>
                      <span className="text-muted-foreground mt-1 text-xs leading-snug">
                        {step.hint}
                      </span>
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Second appointment */}
            <Card className="gap-3 py-4">
              <CardHeader className="px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="size-9">
                    <AvatarFallback>AL</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-sm">Anaïs Laurent, PT</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline">Physiotherapy</Badge>
                      <span className="text-muted-foreground font-code text-xs">
                        Mon 09 Mar · 11:15
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <CardAction>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                </CardAction>
              </CardHeader>
            </Card>

            {/* Book a new appointment */}
            <Card className="gap-0 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-sm">Book a new appointment</CardTitle>
                <CardDescription className="text-xs">
                  Next available slots per visit type
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 px-4">
                {bookingOptions.map((option) => (
                  <div
                    key={option.title}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="truncate text-sm font-medium">
                        {option.title}
                      </span>
                      <span className="text-muted-foreground font-code text-xs">
                        {option.next} · {option.duration}
                      </span>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Book
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <footer className="text-muted-foreground mt-auto flex items-center gap-2 pt-2 text-xs">
              <Phone className="size-3.5" />
              <span>
                Urgent? Call the 24/7 nurse line at{" "}
                <span className="font-code">+1 (555) 014-7700</span>.
              </span>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </EvalShell>
  );
}
