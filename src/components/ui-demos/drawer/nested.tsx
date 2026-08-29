"use client"


import { useIsMobile } from "@/hooks/use-mobile"
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

export function DrawerNested() {
  const isMobile = useIsMobile()

  // vaul uses `direction` ("bottom"/"top"/"left"/"right"); the swipe handle
  // is always rendered for bottom drawers by `DrawerContent`.
  const direction = isMobile ? "bottom" : "right"

  return (
    <Drawer direction={direction}>
      <DrawerTrigger render={<Button variant="secondary">Open Drawer</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer</DrawerTitle>
          <DrawerDescription>
            Open another drawer from the same direction.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 p-4">
          <div className="size-full rounded-lg bg-muted" />
        </div>
        <DrawerFooter>
          <Drawer direction={direction}>
            <DrawerTrigger render={<Button variant="outline">Open Nested Drawer</Button>} />
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nested Drawer</DrawerTitle>
                <DrawerDescription>
                  The parent drawer stays mounted behind this one.
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex-1 p-4">
                <div className="size-full rounded-lg bg-muted" />
              </div>
              <DrawerFooter>
                <Drawer direction={direction}>
                  <DrawerTrigger render={<Button variant="outline">Open Third Drawer</Button>} />
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Third Drawer</DrawerTitle>
                      <DrawerDescription>
                        Two drawers are stacked behind this one.
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex-1 p-4">
                      <div className="size-full rounded-lg bg-muted" />
                    </div>
                    <DrawerFooter>
                      <Drawer direction={direction}>
                        <DrawerTrigger render={<Button variant="outline">Open Fourth Drawer</Button>} />
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Fourth Drawer</DrawerTitle>
                            <DrawerDescription>
                              This is the frontmost drawer in the stack.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="flex-1 p-4">
                            <div className="size-full rounded-lg bg-muted" />
                          </div>
                          <DrawerFooter>
                            <DrawerClose render={<Button variant="outline">Close</Button>} />
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                      <DrawerClose render={<Button variant="outline">Close</Button>} />
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <DrawerClose render={<Button variant="outline">Close</Button>} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
          <DrawerClose render={<Button variant="outline">Close</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
