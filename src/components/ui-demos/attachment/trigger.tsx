"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Attachment, AttachmentTrigger } from "@/components/ui/attachment"

export function TriggerDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4 p-4">
      <Dialog>
        <Attachment>
          {/* media, content, actions */}
          <DialogTrigger
            render={<AttachmentTrigger aria-label="Preview research-summary.pdf" />}
          />
        </Attachment>
        <DialogContent>{/* ... */}</DialogContent>
      </Dialog>
    </div>
  )
}
