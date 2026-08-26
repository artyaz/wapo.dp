"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function CustomSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      {/* Half-height bottom drawer */}
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Half height</Button>} />
        <DrawerContent className="h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Half height</DrawerTitle>
            <DrawerDescription>
              A bottom drawer capped at half the viewport height.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Scrollable content */}
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Custom-width side drawer */}
      <Drawer direction="right">
        <DrawerTrigger render={<Button variant="outline">Custom width</Button>} />
        <DrawerContent className="w-96 sm:max-w-96">
          <DrawerHeader>
            <DrawerTitle>Custom width</DrawerTitle>
            <DrawerDescription>
              A right-side drawer with a fixed 24rem width.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            {/* Scrollable content */}
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Scrollable content layout: header + scroll area + footer */}
      <Drawer>
        <DrawerTrigger render={<Button variant="outline">Scrollable</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Scrollable content</DrawerTitle>
            <DrawerDescription>
              The middle section scrolls while the header and footer stay put.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 24 }).map((_, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  Item {index + 1} of 24 — scroll me.
                </p>
              ))}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
