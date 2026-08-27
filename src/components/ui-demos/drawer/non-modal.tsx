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

export function DrawerNonModal() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-4">
      <Drawer modal={false} dismissible={false} direction="right">
        <DrawerTrigger render={<Button variant="outline">Non Modal</Button>} />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non Modal Drawer</DrawerTitle>
            <DrawerDescription>
              No scrim — the page behind stays fully visible and interactive.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="size-full rounded-2xl bg-muted" />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* modal={false} keeps the page interactive; nonModalOverlay adds a
          pointer-events-none scrim because vaul drops the overlay in
          non-modal mode. */}
      <Drawer modal={false} nonModalOverlay direction="bottom">
        <DrawerTrigger
          render={<Button variant="outline">Non Modal + Overlay</Button>}
        />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non Modal Drawer</DrawerTitle>
            <DrawerDescription>
              With a dimmed scrim for visual separation, while the page behind
              remains interactive.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex-1 p-4">
            <div className="size-full rounded-2xl bg-muted" />
          </div>
          <DrawerFooter>
            <DrawerClose render={<Button>Close</Button>} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
