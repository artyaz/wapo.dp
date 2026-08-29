"use client"

import * as React from "react"

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  type FileUploadApi,
  type FileUploadFile,
  formatFileSize,
} from "@/components/ui/file-upload"

// Images already living on the server — remote thumbnails, no object URLs.
const EXISTING_GALLERY: FileUploadFile[] = [
  {
    id: "gallery-terrace",
    name: "terrace-golden-hour.jpg",
    size: 4_128_768,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/praxis-terrace/96/96",
    status: "success",
    progress: 100,
  },
  {
    id: "gallery-lobby",
    name: "lobby-marble.jpg",
    size: 3_540_992,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/praxis-lobby/96/96",
    status: "success",
    progress: 100,
  },
  {
    id: "gallery-suite",
    name: "corner-suite.jpg",
    size: 5_310_272,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/praxis-suite/96/96",
    status: "uploading",
    progress: 72,
  },
]

export function FileUploadImagePreview() {
  const [files, setFiles] = React.useState<FileUploadFile[]>(
    EXISTING_GALLERY
  )
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)

  // New drops get a local object-URL thumbnail (managed by the component)
  // and stream progress through this stand-in uploader.
  const handleFilesAdded = React.useCallback(
    (added: FileUploadFile[], api: FileUploadApi) => {
      added.forEach((entry) => {
        if (entry.status === "error") return
        let progress = 0
        const timer = window.setInterval(() => {
          progress = Math.min(100, progress + 11 + Math.random() * 18)
          if (progress >= 100) {
            window.clearInterval(timer)
            api.updateFile(entry.id, { status: "success", progress: 100 })
          } else {
            api.updateFile(entry.id, {
              status: "uploading",
              progress: Math.round(progress),
            })
          }
        }, 240)
      })
    },
    []
  )

  return (
    <div className="max-w-[640px]">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <p className="text-sm font-medium text-foreground">Listing gallery</p>
        <p className="text-xs text-muted-foreground">
          <span className="font-code">{files.length}</span> images ·{" "}
          <span className="font-code">{formatFileSize(totalSize)}</span>
        </p>
      </div>
      <FileUpload
        accept="image/png,image/jpeg,image/webp"
        multiple
        maxFiles={12}
        maxSize={8 * 1024 * 1024}
        defaultFiles={EXISTING_GALLERY}
        onFilesAdded={handleFilesAdded}
        onChange={setFiles}
      >
        <FileUploadDropzone size="sm" aria-label="Add gallery images">
          <p className="text-sm text-muted-foreground">
            Drop more photos, or click to browse — previews appear instantly
          </p>
        </FileUploadDropzone>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
