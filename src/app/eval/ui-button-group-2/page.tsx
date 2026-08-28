"use client"

// EVAL page — button-group p2 — shared travel journal — 834x1112 light (tablet)

import {
  BookmarkIcon,
  BoldIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  FileDownIcon,
  HeartIcon,
  ImageIcon,
  ItalicIcon,
  ListIcon,
  MailPlusIcon,
  MapPinIcon,
  MessageCircleIcon,
  ShareIcon,
  UserCogIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

const ENTRIES = [
  {
    author: "Ana Ruiz",
    initials: "AR",
    time: "17:42",
    place: "Miradouro da Graça",
    day: "Day 4",
    text: "We climbed up to Graça just as the light turned honey-coloured. The whole city looked like it had been left out in the sun too long — in the best possible way.",
    saves: 12,
    comments: 4,
  },
  {
    author: "Ben Osei",
    initials: "BO",
    time: "09:15",
    place: "Pastéis de Belém",
    day: "Day 4",
    text: "Queue strategy, field-tested: skip the room, order a box of six at the side window, eat them standing by the tram stop while they are still warm. Zero regrets.",
    saves: 18,
    comments: 7,
  },
  {
    author: "Chloé Marchand",
    initials: "CM",
    time: "14:03",
    place: "Tram 28, Estrela",
    day: "Day 3",
    text: "Packed in like sardines somewhere past Estrela, and then the descent to Baixa opened up all at once. Dev swears the tram driver was taking the corners on two wheels.",
    saves: 9,
    comments: 2,
  },
]

const LOG = [
  { label: "Entries", value: "23" },
  { label: "Photos", value: "118" },
  { label: "Walked", value: "26.8 km" },
  { label: "Spent", value: "€182" },
]

const UP_NEXT = [
  { time: "08:39", label: "Train from Rossio to Sintra" },
  { time: "10:00", label: "Quinta da Regaleira at opening" },
  { time: "20:30", label: "Dinner at Cervejaria Ramiro" },
]

const MEMBERS = [
  { name: "Ana Ruiz", initials: "AR", role: "Editor" },
  { name: "Ben Osei", initials: "BO", role: "Editor" },
  { name: "Chloé Marchand", initials: "CM", role: "Editor" },
  { name: "Dev Patel", initials: "DP", role: "Viewer" },
]

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex min-h-screen flex-col">
        <header className="flex items-center gap-4 border-b px-6 py-4">
          <div className="min-w-0">
            <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Fieldnote · shared journal
            </p>
            <h1 className="font-heading-1 text-heading-1 text-foreground mt-1">
              Lisbon with the roommates
            </h1>
          </div>
          <div className="ms-auto flex items-center gap-4">
            <AvatarGroup className="-space-x-1">
              <Avatar size="sm">
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>BO</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar size="sm">
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
            </AvatarGroup>
            <ButtonGroup aria-label="Share this journal">
              <Button variant="outline" size="sm">
                <ShareIcon /> Share
              </Button>
              <DropdownMenu defaultOpen>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="outline"
                      size="icon-sm"
                      aria-label="More sharing options"
                    >
                      <ChevronDownIcon />
                    </Button>
                  }
                />
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>Journal sharing</DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <CopyIcon /> Copy invite link
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileDownIcon /> Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MailPlusIcon /> Invite by email
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserCogIcon /> Manage members
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ButtonGroup>
          </div>
        </header>

        {/* View + filter toolbar */}
        <div className="flex flex-wrap items-center gap-4 border-b px-6 py-3">
          <ButtonGroup aria-label="Journal view">
            <Button variant="default" size="sm">
              <ListIcon /> Timeline
            </Button>
            <Button variant="outline" size="sm">
              <MapPinIcon /> Map
            </Button>
            <Button variant="outline" size="sm">
              <ImageIcon /> Album
            </Button>
          </ButtonGroup>
          <ButtonGroupSeparator />
          <ButtonGroup aria-label="Filter entries by author">
            <Button variant="outline" size="sm">
              All
            </Button>
            <Button variant="default" size="sm">
              Mine
            </Button>
            <Button variant="outline" size="sm">
              Ana&rsquo;s
            </Button>
            <Button variant="outline" size="sm">
              Ben&rsquo;s
            </Button>
          </ButtonGroup>
          <p className="text-muted-foreground ms-auto text-xs">
            Day 4 of 5 · updated <span className="font-code">18:07</span>
          </p>
        </div>

        <main className="mx-auto grid w-full max-w-[766px] flex-1 grid-cols-[1fr_248px] items-start gap-6 p-6">
          {/* Feed */}
          <div className="flex min-w-0 flex-col gap-6">
            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  New entry
                </CardTitle>
                <CardDescription>
                  Everyone in the journal can post — be generous with details.
                </CardDescription>
                <CardAction>
                  <Badge variant="secondary">Draft</Badge>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                <ButtonGroup aria-label="Format entry">
                  <Button variant="outline" size="icon-xs" aria-label="Bold">
                    <BoldIcon />
                  </Button>
                  <Button variant="outline" size="icon-xs" aria-label="Italic">
                    <ItalicIcon />
                  </Button>
                  <Button variant="outline" size="icon-xs" aria-label="List">
                    <ListIcon />
                  </Button>
                  <Button variant="outline" size="icon-xs" aria-label="Photo">
                    <ImageIcon />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    aria-label="Tag a place"
                  >
                    <MapPinIcon />
                  </Button>
                </ButtonGroup>
                <Textarea
                  className="min-h-20 resize-none"
                  placeholder="What happened today? Places, food, mishaps…"
                >
                  Sunset ferry to Cacilhas — grilled sardines at a plastic
                  table, the city going pink across the water.
                </Textarea>
              </CardContent>
              <CardFooter className="justify-between px-5">
                <p className="text-muted-foreground text-xs">
                  Saved as draft · <span className="font-code">18:04</span>
                </p>
                <Button size="sm">Publish entry</Button>
              </CardFooter>
            </Card>

            {ENTRIES.map((entry) => (
              <Card key={entry.author} className="gap-4 py-5">
                <CardHeader className="px-5">
                  <div className="flex items-center gap-2.5">
                    <Avatar size="sm">
                      <AvatarFallback>{entry.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{entry.author}</p>
                      <p className="text-muted-foreground text-xs">
                        <span className="font-code">{entry.time}</span> ·{" "}
                        {entry.place}
                      </p>
                    </div>
                  </div>
                  <CardAction>
                    <Badge variant="outline">{entry.day}</Badge>
                  </CardAction>
                </CardHeader>
                <CardContent className="px-5">
                  <p className="font-prose text-body text-foreground">
                    {entry.text}
                  </p>
                </CardContent>
                <CardFooter className="gap-4 px-5">
                  <span className="text-muted-foreground flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1">
                      <HeartIcon className="size-3.5" />
                      <span className="font-code">{entry.saves}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircleIcon className="size-3.5" />
                      <span className="font-code">{entry.comments}</span>
                    </span>
                  </span>
                  <span className="ms-auto flex items-center">
                    <ButtonGroup aria-label={`Actions on ${entry.author}'s entry`}>
                      <Button variant="outline" size="icon-xs" aria-label="Save">
                        <BookmarkIcon />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon-xs"
                        aria-label="Comment"
                      >
                        <MessageCircleIcon />
                      </Button>
                    </ButtonGroup>
                  </span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Rail */}
          <div className="flex flex-col gap-6">
            <Card className="gap-3 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Trip log
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col px-5">
                {LOG.map((item, index) => (
                  <div key={item.label}>
                    {index > 0 && <Separator className="my-3" />}
                    <div className="flex items-baseline justify-between">
                      <span className="text-muted-foreground text-sm">
                        {item.label}
                      </span>
                      <span className="font-code text-sm text-foreground">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Up next · Day 5
                </CardTitle>
                <CardDescription>Planned together on Day 2</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {UP_NEXT.map((item) => (
                  <div key={item.label} className="flex items-baseline gap-3">
                    <span className="font-code text-sm text-foreground">
                      {item.time}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      {item.label}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="gap-4 py-5">
              <CardHeader className="px-5">
                <CardTitle className="font-heading-3 text-heading-3">
                  Members
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 px-5">
                {MEMBERS.map((member) => (
                  <div
                    key={member.name}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{member.initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{member.name}</span>
                    </span>
                    <Badge
                      variant={member.role === "Editor" ? "secondary" : "outline"}
                    >
                      {member.role}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>

        <footer className="flex items-center justify-between border-t px-6 py-3">
          <p className="text-muted-foreground text-xs">
            Fieldnote · journal of the Lisbon trip
          </p>
          <ButtonGroup aria-label="Journal pages">
            <Button variant="outline" size="icon-xs" aria-label="Previous page">
              <ChevronLeftIcon />
            </Button>
            <ButtonGroupText>1 / 3</ButtonGroupText>
            <Button variant="outline" size="icon-xs" aria-label="Next page">
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
        </footer>
      </div>
    </EvalShell>
  )
}
