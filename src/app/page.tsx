"use client";

import React from "react";
import { AppShell } from "@/components/site/AppShell";
import { useRoute } from "@/components/site/HashRouter";
import { GlassRuntime } from "@/lib/glass";
import { ThemeProvider } from "next-themes";

import { OverviewView } from "@/views/OverviewView";
import { FoundationsView } from "@/views/FoundationsView";
import { MaterialsView } from "@/views/MaterialsView";
import { ComponentsView } from "@/views/ComponentsView";
import { ComponentDetailView } from "@/views/ComponentDetailView";
import { PatternsView } from "@/views/PatternsView";
import { UIView } from "@/views/UIView";
import { UIDetailView } from "@/views/UIDetailView";

function Router() {
  const route = useRoute();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  // SSR always renders the overview; the hash route takes over after mount
  // (avoids hydration mismatch on deep links).
  if (!mounted) return <OverviewView />;
  const [first, second] = route.segments;

  if (!first) return <OverviewView />;
  if (first === "foundations") return <FoundationsView section={second} />;
  if (first === "materials") return <MaterialsView section={second} />;
  if (first === "components") {
    if (second) return <ComponentDetailView slug={second} />;
    return <ComponentsView />;
  }
  if (first === "patterns") return <PatternsView section={second} />;
  if (first === "ui") {
    if (second) return <UIDetailView slug={second} />;
    return <UIView />;
  }
  return <OverviewView />;
}

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <GlassRuntime level="regular">
        <AppShell>
          <Router />
        </AppShell>
      </GlassRuntime>
    </ThemeProvider>
  );
}
