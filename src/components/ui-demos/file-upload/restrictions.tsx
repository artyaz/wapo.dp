"use client"

import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  type FileUploadFile,
} from "@/components/ui/file-upload"

// Constraint set for the press-kit panel: PDF/PNG/JPG only, 8 MB per file,
// 6 files max. The seeded queue captures each violation exactly as the
// component reports it.
const PRESS_KIT_FILES: FileUploadFile[] = [
  {
    id: "press-ok",
    name: "brand-guidelines.pdf",
    size: 2_285_379,
    type: "application/pdf",
    status: "success",
    progress: 100,
  },
  {
    id: "press-too-large",
    name: "campaign-board.png",
    size: 19_841_836,
    type: "image/png",
    status: "error",
    error: "Exceeds the 8 MB limit",
  },
  {
    id: "press-bad-type",
    name: "press-kit-layout.sketch",
    size: 831_488,
    status: "error",
    error: "Unsupported file type — accepts PDF, PNG, JPG",
  },
]

// Single-file mode: dropping two photos keeps the first and flags the rest.
const AVATAR_FILES: FileUploadFile[] = [
  {
    id: "avatar-ok",
    name: "venue-avatar.png",
    size: 421_888,
    type: "image/png",
    previewUrl: "https://picsum.photos/seed/praxis-avatar/96/96",
    status: "success",
    progress: 100,
  },
  {
    id: "avatar-extra",
    name: "team-photo-outtake.jpg",
    size: 1_904_640,
    type: "image/jpeg",
    status: "error",
    error: "Only one file can be attached",
  },
]

export function FileUploadRestrictions() {
  return (
    <div className="flex max-w-[640px] flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-foreground">Press kit assets</p>
        <p className="mb-2 text-xs text-muted-foreground">
          PDF, PNG or JPG · up to 8 MB each · 6 files max
        </p>
        <FileUpload
          accept="application/pdf,image/png,image/jpeg"
          maxSize={8 * 1024 * 1024}
          maxFiles={6}
          defaultFiles={PRESS_KIT_FILES}
        >
          <FileUploadDropzone size="sm" aria-label="Upload press kit assets">
            <p className="text-sm text-muted-foreground">
              Drop press kit files — type, size and count are validated as you
              drop
            </p>
          </FileUploadDropzone>
          <FileUploadList />
        </FileUpload>
      </div>

      <div>
        <p className="text-sm font-medium text-foreground">Venue avatar</p>
        <p className="mb-2 text-xs text-muted-foreground">
          Single file · PNG or JPG · up to 2 MB
        </p>
        <FileUpload
          multiple={false}
          accept="image/png,image/jpeg"
          maxSize={2 * 1024 * 1024}
          defaultFiles={AVATAR_FILES}
        >
          <FileUploadDropzone size="sm" aria-label="Upload venue avatar">
            <p className="text-sm text-muted-foreground">
              Drop one photo — a second file is rejected, not silently dropped
            </p>
          </FileUploadDropzone>
          <FileUploadList />
        </FileUpload>
      </div>
    </div>
  )
}
