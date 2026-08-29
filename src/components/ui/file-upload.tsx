"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  FileArchiveIcon,
  FileIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  ImageIcon,
  XIcon,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type FileUploadStatus = "pending" | "uploading" | "success" | "error"

/**
 * A single entry in the upload queue. `defaultFiles` lets callers seed the
 * queue (e.g. previously uploaded assets with remote `previewUrl`s); files
 * picked at runtime carry the native `File` so previews can be generated.
 */
interface FileUploadFile {
  id: string
  name: string
  /** Size in bytes. */
  size: number
  /** MIME type, when known. */
  type?: string
  /**
   * Image preview source. For runtime files the root creates an object URL
   * (and revokes it on removal/unmount); seeded files may point anywhere.
   */
  previewUrl?: string
  status: FileUploadStatus
  /** 0–100, meaningful while `status` is "uploading". */
  progress?: number
  /** Validation / upload failure message, shown in destructive text. */
  error?: string
  /** The underlying native file, when the entry came from the picker/drop. */
  file?: File
}

/** Imperative surface exposed via `onFilesAdded` and `useFileUpload()`. */
interface FileUploadApi {
  /** Validate + queue files coming from the picker or a drop. */
  addFiles: (files: FileList | File[]) => void
  /** Remove a queued file (revokes its object URL when we own it). */
  removeFile: (id: string) => void
  /** Empty the queue. */
  clear: () => void
  /** Patch a queued file — drive `status`/`progress` from your uploader. */
  updateFile: (id: string, patch: Partial<Omit<FileUploadFile, "id">>) => void
  /** Open the native file picker. */
  openFilePicker: () => void
}

type FileUploadDensity = NonNullable<
  VariantProps<typeof fileUploadVariants>["density"]
>

interface FileUploadContextValue {
  files: FileUploadFile[]
  api: FileUploadApi
  accept?: string
  multiple: boolean
  disabled: boolean
  density: FileUploadDensity
}

interface FileUploadItemContextValue {
  file: FileUploadFile
}

const FileUploadContext = React.createContext<FileUploadContextValue | null>(
  null
)
const FileUploadItemContext =
  React.createContext<FileUploadItemContextValue | null>(null)

function useFileUploadContext(componentName: string) {
  const context = React.useContext(FileUploadContext)
  if (!context) {
    throw new Error(
      `\`${componentName}\` must be rendered inside a <FileUpload> root.`
    )
  }
  return context
}

function useFileUploadItemContext(componentName: string) {
  const context = React.useContext(FileUploadItemContext)
  if (!context) {
    throw new Error(
      `\`${componentName}\` must be rendered inside a <FileUploadItem>.`
    )
  }
  return context
}

/**
 * useFileUpload — read the queue and drive it from anywhere below the
 * <FileUpload> root (`files`, `api`, `accept`, `multiple`, …).
 */
function useFileUpload() {
  return useFileUploadContext("useFileUpload")
}

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

/** Format bytes for display — data text, render it in `font-code`. */
function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—"
  if (bytes < 1024) return `${Math.round(bytes)} B`
  const units = ["KB", "MB", "GB", "TB"]
  let size = bytes
  let unit = -1
  do {
    size /= 1024
    unit += 1
  } while (size >= 1024 && unit < units.length - 1)
  const text = size >= 10 ? size.toFixed(0) : size.toFixed(1)
  return `${text} ${units[unit]}`
}

/** Does the file satisfy the `accept` pattern list (MIME, wildcards, ext)? */
function isAcceptedFile(
  file: { name: string; type?: string },
  accept?: string
): boolean {
  if (!accept) return true
  const tokens = accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
  if (tokens.length === 0) return true
  const name = file.name.toLowerCase()
  const mime = (file.type ?? "").toLowerCase()
  return tokens.some((token) => {
    if (token.startsWith(".")) return name.endsWith(token)
    if (token.endsWith("/*")) return mime.startsWith(token.slice(0, -1))
    return mime === token
  })
}

const ACCEPT_LABELS: Record<string, string> = {
  "application/pdf": "PDF",
  ".pdf": "PDF",
  "image/png": "PNG",
  ".png": "PNG",
  "image/jpeg": "JPG",
  ".jpg": "JPG",
  ".jpeg": "JPG",
  "image/webp": "WebP",
  ".webp": "WebP",
  "image/gif": "GIF",
  ".gif": "GIF",
  "image/svg+xml": "SVG",
  ".svg": "SVG",
  "image/*": "images",
  "video/*": "videos",
  "audio/*": "audio",
  "text/csv": "CSV",
  ".csv": "CSV",
  ".doc": "DOC",
  ".docx": "DOCX",
  ".xls": "XLS",
  ".xlsx": "XLSX",
  ".zip": "ZIP",
  "application/zip": "ZIP",
}

/** Human phrasing of an `accept` list for validation messages. */
function describeAccept(accept: string): string {
  const labels = accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean)
    .map((token) => ACCEPT_LABELS[token] ?? token.replace(/^\./, "").toUpperCase())
  return Array.from(new Set(labels)).join(", ")
}

function getFileIcon(file: FileUploadFile) {
  const type = file.type ?? ""
  const name = file.name.toLowerCase()
  if (type === "application/pdf" || name.endsWith(".pdf")) return FileTextIcon
  if (
    /(csv|excel|spreadsheet)/i.test(type) ||
    /\.(csv|xlsx?|numbers)$/.test(name)
  ) {
    return FileSpreadsheetIcon
  }
  if (
    /(zip|archive|compressed)/i.test(type) ||
    /\.(zip|gz|rar|7z|tar)$/.test(name)
  ) {
    return FileArchiveIcon
  }
  if (
    type.startsWith("image/") ||
    /\.(png|jpe?g|webp|gif|svg|avif|heic)$/.test(name)
  ) {
    return ImageIcon
  }
  return FileIcon
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

// Root panel — flat in-flow surface: hairline border + rounded-lg, no shadow.
const fileUploadVariants = cva(
  "flex w-full flex-col gap-3 rounded-lg border bg-card p-4 text-card-foreground",
  {
    variants: {
      density: {
        default: "gap-3 p-4",
        compact: "gap-2 p-3",
      },
    },
    defaultVariants: {
      density: "default",
    },
  }
)

// Drag target — dashed hairline; hover/dragover swap border + bg only.
const fileUploadDropzoneVariants = cva(
  "relative flex w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-background text-center outline-none transition-colors hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[dragover=true]:border-foreground/50 data-[dragover=true]:bg-accent",
  {
    variants: {
      size: {
        sm: "min-h-20 gap-1 px-4 py-4",
        default: "min-h-28 gap-1.5 px-4 py-7",
        lg: "min-h-44 gap-2 px-6 py-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

interface FileUploadProps
  extends Omit<React.ComponentProps<"div">, "onChange">,
    VariantProps<typeof fileUploadVariants> {
  /** Comma-separated `accept` patterns (MIME, `image/*`, `.pdf`, …). */
  accept?: string
  /** Per-file size ceiling in bytes. */
  maxSize?: number
  /** Allow more than one file. When false, a new pick replaces the queue. */
  multiple?: boolean
  /** Total queue cap (non-error entries) in multi-file mode. */
  maxFiles?: number
  /** Seed the queue — previously uploaded files, remote previews, … */
  defaultFiles?: FileUploadFile[]
  /** Fires whenever the queue membership changes (add/remove/clear). */
  onChange?: (files: FileUploadFile[]) => void
  /** Fires with freshly queued entries — drive your uploader from here. */
  onFilesAdded?: (files: FileUploadFile[], api: FileUploadApi) => void
  /** Fires when a file is removed from the queue. */
  onFileRemoved?: (file: FileUploadFile) => void
  disabled?: boolean
}

function FileUpload({
  accept,
  maxSize,
  multiple = true,
  maxFiles,
  defaultFiles,
  onChange,
  onFilesAdded,
  onFileRemoved,
  disabled = false,
  density,
  className,
  children,
  ...props
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FileUploadFile[]>(
    () => defaultFiles ?? []
  )

  // Latest-value refs so the memoized `api` never closes over stale props.
  // Synced after every commit (never during render) — event handlers always
  // fire post-commit, so they see fresh values.
  const filesRef = React.useRef(files)
  const constraintsRef = React.useRef({ accept, maxSize, multiple, maxFiles, disabled })
  const callbacksRef = React.useRef({ onChange, onFilesAdded, onFileRemoved })
  React.useEffect(() => {
    filesRef.current = files
    constraintsRef.current = { accept, maxSize, multiple, maxFiles, disabled }
    callbacksRef.current = { onChange, onFilesAdded, onFileRemoved }
  })

  const inputRef = React.useRef<HTMLInputElement>(null)
  // Object URLs we created — revoked on removal and on unmount.
  const objectUrlsRef = React.useRef<Set<string>>(new Set())
  const idSeed = React.useId()
  const idCounterRef = React.useRef(0)
  // Set to the memoized api after commit — lets `addFiles` hand consumers the
  // same stable object without a self-reference inside the useMemo.
  const apiRef = React.useRef<FileUploadApi | undefined>(undefined)

  React.useEffect(() => {
    const urls = objectUrlsRef.current
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
      urls.clear()
    }
  }, [])

  const api = React.useMemo<FileUploadApi>(() => {
    const nextId = () => `${idSeed}-${(idCounterRef.current += 1)}`

    const revokeOwnedUrl = (url?: string) => {
      if (url && objectUrlsRef.current.has(url)) {
        URL.revokeObjectURL(url)
        objectUrlsRef.current.delete(url)
      }
    }

    return {
      addFiles: (incoming) => {
        const { accept, maxSize, multiple, maxFiles, disabled } =
          constraintsRef.current
        if (disabled) return
        const incomingList = Array.from(incoming ?? [])
        if (incomingList.length === 0) return

        // Single-file mode: the first file replaces the queue; the rest are
        // surfaced as error rows so nothing disappears silently.
        const batch = multiple ? incomingList : incomingList.slice(0, 1)
        const extras = multiple ? [] : incomingList.slice(1)
        const singleMessage = "Only one file can be attached"

        const next: FileUploadFile[] = multiple ? [...filesRef.current] : []
        let activeCount = next.filter((f) => f.status !== "error").length
        const added: FileUploadFile[] = []

        const queue = (file: File, forcedError?: string) => {
          const item: FileUploadFile = {
            id: nextId(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: "pending",
            progress: 0,
            file,
          }
          if (file.type.startsWith("image/")) {
            const url = URL.createObjectURL(file)
            objectUrlsRef.current.add(url)
            item.previewUrl = url
          }
          if (forcedError) {
            item.status = "error"
            item.error = forcedError
          } else if (!isAcceptedFile(file, accept)) {
            item.status = "error"
            item.error = accept
              ? `Unsupported file type — accepts ${describeAccept(accept)}`
              : "Unsupported file type"
          } else if (maxSize !== undefined && file.size > maxSize) {
            item.status = "error"
            item.error = `Exceeds the ${formatFileSize(maxSize)} limit`
          } else if (multiple && maxFiles !== undefined && activeCount >= maxFiles) {
            item.status = "error"
            item.error =
              maxFiles === 1
                ? singleMessage
                : `Upload limit reached — ${maxFiles} files max`
          }
          if (item.status !== "error") activeCount += 1
          next.push(item)
          added.push(item)
        }

        batch.forEach((file) => queue(file))
        extras.forEach((file) => queue(file, singleMessage))

        setFiles(next)
        if (added.length > 0 && apiRef.current) {
          callbacksRef.current.onFilesAdded?.(added, apiRef.current)
        }
      },

      removeFile: (id) => {
        const target = filesRef.current.find((f) => f.id === id)
        if (!target) return
        setFiles((prev) => prev.filter((f) => f.id !== id))
        revokeOwnedUrl(target.previewUrl)
        callbacksRef.current.onFileRemoved?.(target)
      },

      clear: () => {
        filesRef.current.forEach((f) => revokeOwnedUrl(f.previewUrl))
        setFiles([])
      },

      updateFile: (id, patch) => {
        setFiles((prev) =>
          prev.map((f) => (f.id === id ? { ...f, ...patch } : f))
        )
      },

      openFilePicker: () => {
        if (!constraintsRef.current.disabled) inputRef.current?.click()
      },
    }
  }, [idSeed])

  React.useEffect(() => {
    apiRef.current = api
  })

  // Notify `onChange` only when the queue membership changes — progress
  // patches produce new arrays but the id signature stays the same.
  const signature = files.map((f) => f.id).join("\u0000")
  const prevSignatureRef = React.useRef(signature)
  React.useEffect(() => {
    if (prevSignatureRef.current !== signature) {
      prevSignatureRef.current = signature
      callbacksRef.current.onChange?.(files)
    }
  }, [signature, files])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const list = event.target.files
    if (list && list.length > 0) api.addFiles(list)
    event.target.value = ""
  }

  const liveStatus = React.useMemo(() => {
    if (files.length === 0) return "No files queued"
    const uploading = files.filter((f) => f.status === "uploading").length
    const done = files.filter((f) => f.status === "success").length
    const failed = files.filter((f) => f.status === "error").length
    const parts = [`${files.length} ${files.length === 1 ? "file" : "files"} queued`]
    if (uploading > 0) parts.push(`${uploading} uploading`)
    if (done > 0) parts.push(`${done} uploaded`)
    if (failed > 0) parts.push(`${failed} failed`)
    return parts.join(", ")
  }, [files])

  const context = React.useMemo<FileUploadContextValue>(
    () => ({ files, api, accept, multiple, disabled, density: density ?? "default" }),
    [files, api, accept, multiple, disabled, density]
  )

  return (
    <FileUploadContext.Provider value={context}>
      <div
        data-slot="file-upload"
        data-density={density}
        data-disabled={disabled ? "true" : undefined}
        className={cn(
          fileUploadVariants({ density }),
          disabled && "opacity-60",
          className
        )}
        {...props}
      >
        {children}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={handleInputChange}
        />
        <div role="status" aria-live="polite" className="sr-only">
          {liveStatus}
        </div>
      </div>
    </FileUploadContext.Provider>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Dropzone                                  */
/* -------------------------------------------------------------------------- */

function FileUploadDropzone({
  className,
  size,
  children,
  onClick,
  onKeyDown,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof fileUploadDropzoneVariants>) {
  const { api, disabled } = useFileUploadContext("FileUploadDropzone")
  const [dragOver, setDragOver] = React.useState(false)
  const dragDepth = React.useRef(0)

  // Consumer handlers run first so `{...props}` stays authoritative for
  // analytics/focus bookkeeping; the internal wiring layers on top.
  const openPicker = () => {
    if (!disabled) api.openFilePicker()
  }

  return (
    <div
      data-slot="file-upload-dropzone"
      data-dragover={dragOver ? "true" : undefined}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
      className={cn(
        fileUploadDropzoneVariants({ size }),
        // The root panel already dims when disabled — keep the dropzone
        // merely inert so the two opacities don't compound.
        disabled && "pointer-events-none",
        className
      )}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) openPicker()
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          openPicker()
        }
      }}
      onDragEnter={(event) => {
        onDragEnter?.(event)
        event.preventDefault()
        dragDepth.current += 1
        setDragOver(true)
      }}
      onDragOver={(event) => {
        onDragOver?.(event)
        event.preventDefault()
        if (event.dataTransfer) event.dataTransfer.dropEffect = "copy"
      }}
      onDragLeave={(event) => {
        onDragLeave?.(event)
        event.preventDefault()
        dragDepth.current = Math.max(0, dragDepth.current - 1)
        if (dragDepth.current === 0) setDragOver(false)
      }}
      onDrop={(event) => {
        onDrop?.(event)
        if (event.defaultPrevented) return
        event.preventDefault()
        dragDepth.current = 0
        setDragOver(false)
        if (!disabled) api.addFiles(event.dataTransfer.files)
      }}
    >
      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                  */
/* -------------------------------------------------------------------------- */

function FileUploadTrigger({
  className,
  variant = "outline",
  size = "sm",
  disabled: disabledProp,
  onClick,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>) {
  const { api, disabled } = useFileUploadContext("FileUploadTrigger")
  const isDisabled = disabled || disabledProp

  return (
    <button
      type="button"
      data-slot="file-upload-trigger"
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) api.openFilePicker()
      }}
      {...props}
    >
      {children}
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/*                               List and items                               */
/* -------------------------------------------------------------------------- */

function FileUploadList({ className, ...props }: React.ComponentProps<"ul">) {
  const { files } = useFileUploadContext("FileUploadList")
  if (files.length === 0) return null

  return (
    <ul
      data-slot="file-upload-list"
      role="list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {files.map((file) => (
        <FileUploadItem key={file.id} file={file} />
      ))}
    </ul>
  )
}

function FileUploadItem({
  className,
  file,
  children,
  ...props
}: React.ComponentProps<"li"> & { file: FileUploadFile }) {
  const { density } = useFileUploadContext("FileUploadItem")

  return (
    <FileUploadItemContext.Provider value={{ file }}>
      <li
        data-slot="file-upload-item"
        data-status={file.status}
        className={cn(
          "flex w-full items-center gap-3 rounded-md border border-input bg-background px-2.5 py-2 transition-colors",
          density === "compact" && "gap-2.5 px-2 py-1.5",
          file.status === "error" && "border-destructive/40",
          className
        )}
        {...props}
      >
        {children ?? (
          <>
            <FileUploadItemPreview />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <FileUploadItemName />
              <FileUploadItemMeta />
              <FileUploadItemError />
              <FileUploadProgress />
            </div>
            <FileUploadItemRemove />
          </>
        )}
      </li>
    </FileUploadItemContext.Provider>
  )
}

function FileUploadItemPreview({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { file } = useFileUploadItemContext("FileUploadItemPreview")
  const { density } = useFileUploadContext("FileUploadItemPreview")
  const compact = density === "compact"

  return (
    <div
      data-slot="file-upload-item-preview"
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-sm bg-muted text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        compact ? "size-8" : "size-9",
        file.status === "error" &&
          !file.previewUrl &&
          "bg-destructive/10 text-destructive",
        className
      )}
      {...props}
    >
      {file.previewUrl ? (
        // Decorative preview — the file name is announced by the adjacent
        // item text, so the image itself stays silent for assistive tech.
        <img src={file.previewUrl} alt="" className="size-full object-cover" />
      ) : (
        // Element from a module-scope icon table (kept off JSX so the icon
        // component is never mistaken for one created during render).
        React.createElement(getFileIcon(file))
      )}
    </div>
  )
}

function FileUploadItemName({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { file } = useFileUploadItemContext("FileUploadItemName")

  return (
    <span
      data-slot="file-upload-item-name"
      title={file.name}
      className={cn(
        "truncate text-sm font-medium leading-none text-foreground",
        className
      )}
      {...props}
    >
      {children ?? file.name}
    </span>
  )
}

function FileUploadItemMeta({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { file } = useFileUploadItemContext("FileUploadItemMeta")
  const percent = Math.round(file.progress ?? 0)

  return (
    <div
      data-slot="file-upload-item-meta"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-muted-foreground",
        className
      )}
      {...props}
    >
      <span className="font-code">{formatFileSize(file.size)}</span>
      {file.status === "pending" ? (
        <>
          <span aria-hidden="true">·</span>
          <span>Queued</span>
        </>
      ) : null}
      {file.status === "uploading" ? (
        <>
          <span aria-hidden="true">·</span>
          <span>Uploading</span>
          <span className="font-code">{percent}%</span>
        </>
      ) : null}
      {file.status === "success" ? (
        <>
          <span aria-hidden="true">·</span>
          <CircleCheckIcon className="size-3.5 text-success-500" />
          <span>Uploaded</span>
        </>
      ) : null}
    </div>
  )
}

function FileUploadItemRemove({
  className,
  disabled: disabledProp,
  ...props
}: React.ComponentProps<"button">) {
  const { file } = useFileUploadItemContext("FileUploadItemRemove")
  const { api, disabled } = useFileUploadContext("FileUploadItemRemove")

  return (
    <button
      type="button"
      data-slot="file-upload-item-remove"
      aria-label={`Remove ${file.name}`}
      disabled={disabled || disabledProp}
      onClick={() => api.removeFile(file.id)}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <XIcon />
    </button>
  )
}

function FileUploadItemError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  const { file } = useFileUploadItemContext("FileUploadItemError")
  if (file.status !== "error" || !file.error) return null

  return (
    <p
      data-slot="file-upload-item-error"
      className={cn(
        "flex min-w-0 items-start gap-1.5 text-xs text-destructive",
        className
      )}
      {...props}
    >
      <CircleAlertIcon className="mt-px size-3.5 shrink-0" />
      <span className="min-w-0 break-words">{children ?? file.error}</span>
    </p>
  )
}

function FileUploadProgress({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { file } = useFileUploadItemContext("FileUploadProgress")
  const value = Math.min(100, Math.max(0, Math.round(file.progress ?? 0)))
  const isError = file.status === "error"
  const visible = file.status === "uploading" || (isError && value > 0)
  if (!visible) return null

  return (
    <div
      data-slot="file-upload-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={`Upload progress for ${file.name}`}
      className={cn(
        "h-1 w-full overflow-hidden rounded-full bg-primary/15",
        isError && "bg-destructive/20",
        className
      )}
      {...props}
    >
      <div
        data-slot="file-upload-progress-indicator"
        className={cn(
          "h-full rounded-full bg-primary transition-[width] duration-200 ease-out",
          isError && "bg-destructive"
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                  Exports                                   */
/* -------------------------------------------------------------------------- */

export {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemName,
  FileUploadItemMeta,
  FileUploadItemRemove,
  FileUploadProgress,
  FileUploadItemError,
  fileUploadVariants,
  fileUploadDropzoneVariants,
  useFileUpload,
  formatFileSize,
}

export type {
  FileUploadApi,
  FileUploadFile,
  FileUploadStatus,
}
