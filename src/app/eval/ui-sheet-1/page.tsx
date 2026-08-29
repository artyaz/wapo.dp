"use client";

/**
 * EVAL page — sheet p1 — esports tournament bracket — 1180x820 dark
 *
 * Tournament-ops screen for "Axiom Masters 2026" (fictional esports league):
 * a single-elimination playoff bracket (4 quarterfinals, 2 semifinals, grand
 * final) for the featured match. The Sheet is open at initial render
 * (defaultOpen) sliding from the right with the live Semifinal 2 dossier:
 * series score, map-by-map results table, top performer, MVP voting, actions.
 * Other ui/* components: Badge, Button, Avatar, Progress, Table, Separator.
 */

import { Bell, Download, Info, Play, Trophy } from "lucide-react";

import { EvalShell } from "@/eval/EvalShell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Side = {
  tag: string;
  name: string;
  score: number | null;
  won: boolean;
};

type Match = {
  label: string;
  meta: string;
  status: "final" | "live" | "upcoming";
  a: Side;
  b: Side;
};

const QUARTERFINALS: Match[] = [
  {
    label: "QF1",
    meta: "DEC 10",
    status: "final",
    a: { tag: "OVG", name: "Onyx Vanguard", score: 3, won: true },
    b: { tag: "PLC", name: "Pale Comet", score: 1, won: false },
  },
  {
    label: "QF2",
    meta: "DEC 10",
    status: "final",
    a: { tag: "VDO", name: "Verdant Oath", score: 2, won: false },
    b: { tag: "NDN", name: "Neon Dynasty", score: 3, won: true },
  },
  {
    label: "QF3",
    meta: "DEC 11",
    status: "final",
    a: { tag: "CDP", name: "Cinder Pact", score: 3, won: true },
    b: { tag: "STH", name: "Static Halo", score: 0, won: false },
  },
  {
    label: "QF4",
    meta: "DEC 11",
    status: "final",
    a: { tag: "IRM", name: "Iron Meridian", score: 1, won: false },
    b: { tag: "SLR", name: "Solar Remnant", score: 3, won: true },
  },
];

const SEMIFINAL_1: Match = {
  label: "SF1",
  meta: "DEC 13",
  status: "final",
  a: { tag: "SLR", name: "Solar Remnant", score: 2, won: false },
  b: { tag: "CDP", name: "Cinder Pact", score: 3, won: true },
};

const SEMIFINAL_2: Match = {
  label: "SF2",
  meta: "LIVE",
  status: "live",
  a: { tag: "OVG", name: "Onyx Vanguard", score: 2, won: true },
  b: { tag: "NDN", name: "Neon Dynasty", score: 1, won: false },
};

const GRAND_FINAL: Match = {
  label: "FINAL",
  meta: "DEC 15 · 20:00 CET",
  status: "upcoming",
  a: { tag: "CDP", name: "Cinder Pact", score: null, won: false },
  b: { tag: "SF2", name: "Winner Semifinal 2", score: null, won: false },
};

const MAP_RESULTS = [
  { map: "Fracture", score: "13–9", winner: "OVG", time: "38:12", live: false },
  { map: "Ascent", score: "10–13", winner: "NDN", time: "41:47", live: false },
  { map: "Bind", score: "13–7", winner: "OVG", time: "35:20", live: false },
  { map: "Lotus", score: "8–6", winner: "—", time: "16:44", live: true },
];

/* ------------------------------------------------------------------ */
/* Bracket primitives                                                  */
/* ------------------------------------------------------------------ */

function SideRow({ side }: { side: Side }) {
  const emph = side.won && side.score !== null;
  return (
    <div className="flex flex-1 items-center justify-between gap-3 px-3">
      <div className="flex min-w-0 items-center gap-2">
        {/* team tag — full foreground: 10px mono must survive the 50%
            scrim (rendered ceiling ≈ 4.5:1); size keeps it subordinate to
            the 14px team names beside it */}
        <span className="font-code text-[10px] text-foreground">
          {side.tag}
        </span>
        <span
          className={
            emph
              ? "truncate text-sm font-medium text-foreground"
              : "truncate text-sm text-foreground/75"
          }
        >
          {side.name}
        </span>
      </div>
      <span
        className={
          emph
            ? "font-code text-sm tabular-nums text-foreground"
            : "font-code text-sm tabular-nums text-foreground/75"
        }
      >
        {side.score ?? "–"}
      </span>
    </div>
  );
}

function MatchPanel({
  match,
  featured = false,
  children,
}: {
  match: Match;
  featured?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={
        featured
          ? "flex h-[100px] flex-col overflow-hidden rounded-lg border border-foreground/25 bg-card"
          : "flex h-[100px] flex-col overflow-hidden rounded-lg border border-default-border bg-card/60"
      }
    >
      <div className="flex flex-none items-center justify-between gap-2 border-b border-default-border px-3 py-1.5">
        <div className="flex items-center gap-2">
          {/* card index — full foreground: 10px mono meta needs the
              brightest token to stay legible under the black/50 scrim
              (alpha-muted variants render < 3.5:1 behind the overlay). */}
          <span className="font-code text-[10px] font-medium text-foreground">
            {match.label}
          </span>
          {match.status === "live" && (
            <Badge variant="destructive" className="px-1.5 py-0 text-[10px]">
              LIVE
            </Badge>
          )}
        </div>
        {match.status === "live" ? (
          children
        ) : (
          <span className="font-code text-[10px] text-foreground">
            {match.meta}
          </span>
        )}
      </div>
      <SideRow side={match.a} />
      <div className="flex-none border-t border-default-border" />
      <SideRow side={match.b} />
    </div>
  );
}

/* Bracket hairline connectors — stubs cross the 16px column gap and
   overlap, so the tree stays connected; verticals join match centers. */

function StubIn() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute top-1/2 left-0 h-px w-4 -translate-x-full border-t border-default-border"
    />
  );
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-code text-[10px] font-medium tracking-widest text-foreground/80 uppercase">
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <EvalShell theme="dark" dir="ltr">
      <Sheet defaultOpen>
        <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
          {/* app bar */}
          <header className="flex h-14 flex-none items-center justify-between border-b border-default-border px-4">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-sm border border-default-border bg-card">
                <Trophy className="size-4" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-semibold tracking-tight">
                  Axiom Masters 2026
                </p>
                <p className="font-code text-[10px] text-muted-foreground">
                  Playoffs · Main Stage · Riyadh
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="destructive" className="gap-1.5">
                <span className="size-1.5 rounded-full bg-white/80" />
                Live
              </Badge>
              <span className="font-code text-xs text-muted-foreground tabular-nums">
                482,913 watching
              </span>
              <Button variant="outline" size="sm">
                <Download />
                Export bracket
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Match notifications"
              >
                <Bell />
              </Button>
            </div>
          </header>

          {/* page heading — serif reading role */}
          <div className="flex flex-none items-baseline justify-between px-4 pt-4">
            <h1 className="font-heading-2 text-heading-2 text-foreground">
              Playoff bracket
            </h1>
            <p className="font-code text-[10px] text-muted-foreground">
              8 teams · single elimination · 5 played · 1 live · 1 to go
            </p>
          </div>

          {/* bracket — hairline tree connectors between columns.
              pr-[452px] reserves the open sheet's 420px + a 32px quiet
              moat, so no card runs into the sheet's left hairline. On
              near-black dark surfaces a black scrim can't create optical
              separation (bg #0b0b0a vs scrimmed bg rgb(5,5,5)), so the
              bracket canvas keeps clear of the overlay edge instead. */}
          <main className="grid min-h-0 flex-1 grid-cols-[1.05fr_1fr_0.9fr] gap-4 py-4 pl-4 pr-[452px]">
            <section className="flex min-h-0 flex-col">
              <ColumnLabel>Quarterfinals · Bo3</ColumnLabel>
              {[QUARTERFINALS.slice(0, 2), QUARTERFINALS.slice(2, 4)].map(
                (pair, index) => (
                  <div
                    key={index}
                    className="relative mt-2 flex flex-1 flex-col justify-center gap-3"
                  >
                    {pair.map((match) => (
                      <MatchPanel key={match.label} match={match} />
                    ))}
                    {/* vertical joins the two match centers; stubs reach the
                        next column (100px panel + 12px gap = 112px spread) */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 right-0 h-[112px] w-px -translate-y-1/2 bg-default-border"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-[calc(50%-56px)] right-0 h-px w-4 translate-x-full border-t border-default-border"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-[calc(50%+56px)] right-0 h-px w-4 translate-x-full border-t border-default-border"
                    />
                  </div>
                )
              )}
            </section>

            <section className="flex min-h-0 flex-col">
              <ColumnLabel>Semifinals · Bo5</ColumnLabel>
              <div className="relative mt-2 flex flex-1 flex-col justify-around">
                <MatchPanel match={SEMIFINAL_1} />
                <MatchPanel match={SEMIFINAL_2} featured>
                  <SheetTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Open match details"
                      >
                        <Info />
                      </Button>
                    }
                  />
                </MatchPanel>
                {/* in-stubs from the quarterfinal pairs, out-stubs into the
                    join line, join line midpoint exits to the grand final */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/4 left-0 h-px w-4 -translate-x-full border-t border-default-border"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/4 right-0 h-px w-4 translate-x-full border-t border-default-border"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-3/4 left-0 h-px w-4 -translate-x-full border-t border-default-border"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-3/4 right-0 h-px w-4 translate-x-full border-t border-default-border"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/4 right-0 bottom-1/4 w-px bg-default-border"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 right-0 h-px w-4 translate-x-full border-t border-default-border"
                />
              </div>
            </section>

            <section className="flex min-h-0 flex-col">
              <ColumnLabel>Grand Final · Bo5</ColumnLabel>
              <div className="relative mt-2 flex flex-1 flex-col justify-center">
                <MatchPanel match={GRAND_FINAL} />
                <StubIn />
              </div>
            </section>
          </main>

          {/* footer */}
          <footer className="flex h-9 flex-none items-center justify-between border-t border-default-border px-4">
            <span className="font-code text-[10px] text-muted-foreground">
              Patch 9.4b · Prize pool $1,250,000 · Referee desk on-site
            </span>
            <span className="font-code text-[10px] text-muted-foreground">
              Bracket synced 12 s ago
            </span>
          </footer>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Match details sheet — open at initial render (defaultOpen)      */}
        {/* -------------------------------------------------------------- */}
        <SheetContent
          side="right"
          className="gap-0 overflow-y-auto sm:max-w-[420px]"
        >
          <SheetHeader className="border-b border-default-border">
            <p className="font-code text-[10px] tracking-widest text-muted-foreground uppercase">
              Semifinal 2 · Rift Arena
            </p>
            <SheetTitle className="font-heading-3 text-heading-3">
              Onyx Vanguard vs Neon Dynasty
            </SheetTitle>
            <SheetDescription className="text-xs">
              Best of 5 · Sun 14 Dec 20:30 CET · Winner advances to the Grand
              Final.
            </SheetDescription>
          </SheetHeader>

          {/* series score */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-default-border px-4 py-4">
            <div>
              <p className="text-sm font-medium">Onyx Vanguard</p>
              <Badge
                variant="outline"
                className="mt-1.5 px-1.5 font-code text-[10px]"
              >
                EU · Seed 1
              </Badge>
            </div>
            <div className="text-center">
              <p className="font-code text-3xl leading-none tabular-nums">
                2<span className="mx-1.5 text-muted-foreground">–</span>1
              </p>
              <p className="mt-1.5 font-code text-[10px] text-muted-foreground">
                MAP 4 · LOTUS · 16:44
              </p>
            </div>
            <div className="text-end">
              <p className="text-sm font-medium">Neon Dynasty</p>
              <Badge
                variant="outline"
                className="mt-1.5 px-1.5 font-code text-[10px]"
              >
                KR · Seed 3
              </Badge>
            </div>
          </div>

          {/* map results */}
          <div className="border-b border-default-border pb-4">
            <div className="flex items-baseline justify-between px-4 pt-4 pb-2">
              <h3 className="font-heading-3 text-heading-3 text-foreground">
                Map results
              </h3>
              <span className="font-code text-[10px] text-muted-foreground">
                4 of 5 maps
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 px-4 py-0 font-code text-[10px] tracking-wider uppercase">
                    Map
                  </TableHead>
                  <TableHead className="h-8 py-0 font-code text-[10px] tracking-wider uppercase">
                    Score
                  </TableHead>
                  <TableHead className="h-8 py-0 font-code text-[10px] tracking-wider uppercase">
                    Win
                  </TableHead>
                  <TableHead className="h-8 px-4 py-0 text-end font-code text-[10px] tracking-wider uppercase">
                    Time
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MAP_RESULTS.map((row) => (
                  <TableRow key={row.map} className="hover:bg-transparent">
                    <TableCell className="px-4 py-2.5 text-sm">{row.map}</TableCell>
                    <TableCell className="py-2.5 font-code text-xs tabular-nums text-muted-foreground">
                      {row.score}
                    </TableCell>
                    {/* live status lives in the Win column in semantic red
                        (matches the bracket's LIVE badges) — map names keep a
                        strict left-aligned text edge with no inline marker */}
                    <TableCell
                      className={
                        row.live
                          ? "py-2.5 font-code text-xs font-medium text-destructive"
                          : "py-2.5 font-code text-xs text-muted-foreground"
                      }
                    >
                      {row.live ? "LIVE" : row.winner}
                    </TableCell>
                    <TableCell className="px-4 py-2.5 text-end font-code text-xs tabular-nums text-muted-foreground">
                      {row.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* top performer */}
          <div className="border-b border-default-border px-4 py-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading-3 text-heading-3 text-foreground">
                Top performer
              </h3>
              <span className="font-code text-xs tabular-nums text-foreground">
                Rating 1.42
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <Avatar className="size-9 border border-default-border">
                <AvatarFallback className="font-code text-xs">
                  YJ
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">Yu-jin Park</p>
                <p className="font-code text-[10px] text-muted-foreground">
                  “Kestrel” · Duelist · Neon Dynasty
                </p>
              </div>
              <div className="text-end">
                <p className="font-code text-xs tabular-nums">24 / 11 / 38</p>
                <p className="font-code text-[10px] text-muted-foreground">
                  K / D / A
                </p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between font-code text-[10px] text-muted-foreground">
              <span>HS 41% · ACS 268</span>
              <span>First bloods 7 · Clutches 2</span>
            </div>
          </div>

          {/* MVP voting */}
          <div className="px-4 py-4">
            <div className="flex items-baseline justify-between">
              <h3 className="font-heading-3 text-heading-3 text-foreground">
                MVP of the match
              </h3>
              <span className="font-code text-[10px] text-muted-foreground">
                38,412 votes
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-sm">Yu-jin Park · NDN</p>
              <p className="font-code text-xs tabular-nums">64%</p>
            </div>
            <Progress
              value={64}
              className="mt-1.5 h-1.5"
              aria-label="MVP votes for Yu-jin Park"
            />
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-sm text-muted-foreground">
                Aleksi Virtanen · OVG
              </p>
              <p className="font-code text-xs tabular-nums text-muted-foreground">
                28%
              </p>
            </div>
            <Progress
              value={28}
              className="mt-1.5 h-1.5"
              aria-label="MVP votes for Aleksi Virtanen"
            />
            <p className="mt-2 font-code text-[10px] text-muted-foreground">
              Voting closes at the end of map 5 · 8% split across 9 players
            </p>
          </div>

          <SheetFooter className="mt-auto flex-row gap-2 border-t border-default-border">
            <Button className="flex-1">
              <Play />
              Watch live
            </Button>
            <Button variant="outline" className="flex-1">
              Match log
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </EvalShell>
  );
}
