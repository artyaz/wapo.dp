"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="h-auto w-full justify-start gap-2 rounded-none bg-transparent p-0">
        <TabsTrigger
          value="overview"
          className="h-8 rounded-none border-b-2 border-transparent px-4 data-[state=active]:rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className="h-8 rounded-none border-b-2 border-transparent px-4 data-[state=active]:rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="reports"
          className="h-8 rounded-none border-b-2 border-transparent px-4 data-[state=active]:rounded-none data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          Reports
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
