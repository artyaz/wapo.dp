"use client";

import React from "react";
import { EvalShell } from "@/eval/EvalShell";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  PaletteIcon,
  PlusIcon,
  ScissorsIcon,
  SparklesIcon,
} from "lucide-react";

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-dvh flex-col gap-3 overflow-hidden px-4 pb-4 pt-4">
        {/* Step header */}
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="text-sm font-semibold tracking-tight">
              New appointment
            </h1>
            <p className="text-xs text-muted-foreground">
              Step 2 — choose a service
            </p>
          </div>
          <span className="text-[11px] font-medium tabular-nums text-muted-foreground">
            2 / 4
          </span>
        </header>

        {/* Searchable service picker */}
        <Command className="min-h-0 flex-1 rounded-lg border shadow-xs">
          <CommandInput placeholder="Search services…" />
          <CommandList className="min-h-0 flex-1">
            <CommandEmpty>No services found.</CommandEmpty>
            <CommandGroup heading="Popular">
              <CommandItem>
                <ScissorsIcon />
                <span>Signature haircut</span>
                <CommandShortcut>45 min</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SparklesIcon />
                <span>Blow-dry &amp; style</span>
                <CommandShortcut>30 min</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <PaletteIcon />
                <span>Full color</span>
                <CommandShortcut>90 min</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        {/* Current selection */}
        <ItemGroup>
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <ScissorsIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Signature haircut</ItemTitle>
              <ItemDescription>45 min · $60 · with Mia Chen</ItemDescription>
            </ItemContent>
            <ItemActions>
              <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Selected
              </span>
            </ItemActions>
          </Item>
          <ItemSeparator />
          <Item variant="outline" size="sm">
            <ItemMedia variant="icon">
              <SparklesIcon />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Scalp treatment</ItemTitle>
              <ItemDescription>+15 min · $20 add-on</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="xs">
                <PlusIcon />
                Add
              </Button>
            </ItemActions>
          </Item>
        </ItemGroup>

        {/* Step navigation */}
        <Pagination className="mx-0 w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </EvalShell>
  );
}
