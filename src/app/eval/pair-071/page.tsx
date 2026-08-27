"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CodePane } from "@/components/ds/CodePane";
import { Search, Send, Terminal } from "lucide-react";

const recipes = [
  {
    name: "createLedgerEntry",
    kind: "function",
    runtime: "edge",
    description:
      "Validate the payload, append it to the write-ahead log, and return the persisted entry.",
  },
  {
    name: "reconcileBatch",
    kind: "job",
    runtime: "worker",
    description:
      "Replay a batch of entries against the ledger and report every mismatch with line offsets.",
  },
  {
    name: "exportSnapshot",
    kind: "script",
    runtime: "cli",
    description:
      "Stream a point-in-time snapshot of the ledger to NDJSON, gzip-compressed.",
  },
  {
    name: "pruneLedger",
    kind: "job",
    runtime: "cron",
    description:
      "Drop entries past the 90-day retention window and vacuum the segment files.",
  },
];

export default function Page() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <EvalShell theme="dark" dir="ltr">
      <div className="min-h-screen w-full">
        <div className="mx-auto flex w-full max-w-[1120px] flex-col px-8 py-8">
          {/* Header */}
          <header className="flex items-center justify-between gap-6 border-b border-border pb-6">
            <div className="flex items-center gap-3">
              <div className="flex size-9 flex-none items-center justify-center rounded-lg border border-border bg-card text-foreground">
                <Terminal className="size-4" />
              </div>
              <div>
                <h1 className="text-base font-semibold leading-tight text-foreground">
                  Ledger SDK — Snippet Library
                </h1>
                <p className="pt-0.5 text-xs text-muted-foreground">
                  Integration recipes for the write-ahead ledger service
                </p>
              </div>
            </div>
            <div className="relative w-72">
              <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search recipes"
                placeholder="Search recipes, tags, symbols…"
                className="pl-8"
              />
            </div>
          </header>

          {/* Recipe carousel */}
          <section className="pt-6">
            <div className="flex items-baseline justify-between pb-3">
              <h2 className="text-sm font-medium text-foreground">Browse recipes</h2>
              <span className="text-xs text-muted-foreground">
                Recipe {current || 1} of {count || recipes.length}
              </span>
            </div>
            <div className="px-14">
              <Carousel setApi={setApi} className="w-full">
                <CarouselContent>
                  {recipes.map((recipe, index) => (
                    <CarouselItem key={recipe.name}>
                      <Card className="gap-0 py-0">
                        <CardContent className="flex items-center gap-6 py-5">
                          <span className="w-10 flex-none text-right font-code text-2xl font-semibold text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-code text-sm font-semibold text-foreground">
                                {recipe.name}
                              </span>
                              <Badge variant="secondary">{recipe.kind}</Badge>
                            </div>
                            <p className="pt-1.5 text-sm text-muted-foreground">
                              {recipe.description}
                            </p>
                          </div>
                          <Badge variant="outline" className="flex-none">
                            {recipe.runtime}
                          </Badge>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </section>

          {/* Source + test panel */}
          <section className="grid grid-cols-12 gap-6 pt-8">
            <div className="col-span-7 min-w-0">
              <div className="flex items-baseline justify-between pb-3">
                <h2 className="text-sm font-medium text-foreground">
                  Source — services/ledger.ts
                </h2>
                <span className="font-code text-xs text-muted-foreground">
                  TypeScript · 72 lines
                </span>
              </div>
              <CodePane className="w-full">
                <CodePane.CodeLine lineNumber="1">
                  {'import { validateEntry } from "./validate";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="2">
                  {'import type { CreateEntryInput, LedgerEntry } from "./types";'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="3" />
                <CodePane.CodeLine lineNumber="4" currentLine={true}>
                  export async function createLedgerEntry(
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="5">
                  <span className="pl-4">input: CreateEntryInput</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="6">
                  {'): Promise<LedgerEntry> {'}
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="7">
                  <span className="pl-4">validateEntry(input);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="8">
                  <span className="pl-4">
                    const entry = {"{ ...input, id: nextId() }"};
                  </span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="9">
                  <span className="pl-4">await wal.append(entry);</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="10">
                  <span className="pl-4">return entry;</span>
                </CodePane.CodeLine>
                <CodePane.CodeLine lineNumber="11">{'}'}</CodePane.CodeLine>
              </CodePane>
            </div>

            <div className="col-span-5">
              <h2 className="pb-3 text-sm font-medium text-foreground">
                Send a test event
              </h2>
              <div className="flex flex-col gap-5 rounded-lg border border-border bg-card p-5">
                <Field>
                  <FieldLabel htmlFor="webhook-url">
                    Webhook URL
                    <Badge variant="secondary" className="ml-auto">
                      Beta
                    </Badge>
                  </FieldLabel>
                  <Input
                    id="webhook-url"
                    type="url"
                    defaultValue="https://api.praxis.dev/hooks/ledger"
                  />
                  <FieldDescription>
                    Signed POST with the entry as the JSON body.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="api-token">API token</FieldLabel>
                  <Input
                    id="api-token"
                    type="password"
                    placeholder="pk_live_••••••••••••••••"
                  />
                  <FieldDescription>
                    Scoped to the ledger.write permission.
                  </FieldDescription>
                </Field>
                <Button className="w-full">
                  <Send className="size-4" />
                  Send test event
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </EvalShell>
  );
}
