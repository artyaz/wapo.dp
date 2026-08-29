"use client"

import * as React from "react"
import { CloudUploadIcon } from "lucide-react"

import {
  FileUpload,
  FileUploadDropzone as DropzoneArea,
  FileUploadList,
  type FileUploadApi,
  type FileUploadFile,
} from "@/components/ui/file-upload"

const STARTING_FILES: FileUploadFile[] = [
  {
    id: "artwork-hero",
    name: "headline-act-hero.jpg",
    size: 3_240_115,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/praxis-stage/96/96",
    status: "success",
    progress: 100,
  },
  {
    id: "artwork-secondary",
    name: "headline-act-wide.jpg",
    size: 2_918_402,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/praxis-crew/96/96",
    status: "uploading",
    progress: 38,
  },
]

export function FileUploadDropzone() {
  // Freshly dropped images upload through this stand-in uploader; the two
  // seeded rows show the finished / in-flight states without any interaction.
  const handleFilesAdded = React.useCallback(
    (added: FileUploadFile[], api: FileUploadApi) => {
      added.forEach((entry) => {
        if (entry.status === "error") return
        let progress = 0
        const timer = window.setInterval(() => {
          progress = Math.min(100, progress + 9 + Math.random() * 16)
          if (progress >= 100) {
            window.clearInterval(timer)
            api.updateFile(entry.id, { status: "success", progress: 100 })
          } else {
            api.updateFile(entry.id, {
              status: "uploading",
              progress: Math.round(progress),
            })
          }
        }, 260)
      })
    },
    []
  )

  return (
    <div className="max-w-[640px]">
      <FileUpload
        accept="image/*"
        maxSize={20 * 1024 * 1024}
        maxFiles={6}
        defaultFiles={STARTING_FILES}
        onFilesAdded={handleFilesAdded}
      >
        <DropzoneArea size="lg" aria-label="Upload event artwork">
          <CloudUploadIcon className="size-8 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drag &amp; drop event artwork
          </p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG or WebP · up to 20 MB each · 6 files max
          </p>
          <p className="text-xs text-muted-foreground/80">
            or click anywhere in this area to browse
          </p>
        </DropzoneArea>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
