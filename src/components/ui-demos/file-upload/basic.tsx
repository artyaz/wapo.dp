"use client"

import * as React from "react"
import { FileUpIcon } from "lucide-react"

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadApi,
  type FileUploadFile,
  formatFileSize,
} from "@/components/ui/file-upload"

export function FileUploadBasic() {
  const [selected, setSelected] = React.useState<FileUploadFile | null>(null)

  // Stand-in for a real upload (fetch/XHR to your storage endpoint).
  const handleFilesAdded = React.useCallback(
    (added: FileUploadFile[], api: FileUploadApi) => {
      added.forEach((entry) => {
        let progress = 0
        const timer = window.setInterval(() => {
          progress = Math.min(100, progress + 14 + Math.random() * 20)
          if (progress >= 100) {
            window.clearInterval(timer)
            api.updateFile(entry.id, { status: "success", progress: 100 })
          } else {
            api.updateFile(entry.id, {
              status: "uploading",
              progress: Math.round(progress),
            })
          }
        }, 220)
      })
    },
    []
  )

  return (
    <div className="max-w-[640px]">
      <FileUpload
        multiple={false}
        accept="application/pdf"
        maxSize={10 * 1024 * 1024}
        onFilesAdded={handleFilesAdded}
        onChange={(files) => setSelected(files[0] ?? null)}
      >
        <FileUploadDropzone size="sm">
          <FileUpIcon className="size-5 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">
            Drop your signed contract here
          </p>
          <p className="text-xs text-muted-foreground">
            PDF up to 10 MB · replaces the current file
          </p>
        </FileUploadDropzone>
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-xs text-muted-foreground">
            {selected
              ? `Selected: ${selected.name} (${formatFileSize(selected.size)})`
              : "No file selected yet"}
          </p>
          <FileUploadTrigger>Browse files</FileUploadTrigger>
        </div>
        <FileUploadList />
      </FileUpload>
    </div>
  )
}
