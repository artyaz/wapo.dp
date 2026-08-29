"use client"
// EVAL page — file-upload p1 — restaurant reservation system — 1920x1080 light
// Back-office "Menus & media" screen for a reservation platform: three upload
// zones (menu PDFs, venue photos, health certificates) with the FileUpload
// family front and center — queues are seeded with uploading (progress),
// done and error states so every row state is captured in one shot.
// Co-stars: Card, Table, Badge, Button, Avatar, Alert.

import {
  CalendarCheckIcon,
  CalendarClockIcon,
  FileUpIcon,
  Grid2x2Icon,
  HourglassIcon,
  ImagePlusIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
  UsersIcon,
  UtensilsCrossedIcon,
} from "lucide-react"

import { EvalShell } from "@/eval/EvalShell"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  type FileUploadFile,
} from "@/components/ui/file-upload"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const NAV = [
  { label: "Overview", icon: LayoutDashboardIcon },
  { label: "Reservations", icon: CalendarCheckIcon },
  { label: "Waitlist", icon: HourglassIcon },
  { label: "Floor plan", icon: Grid2x2Icon },
  { label: "Menus & media", icon: UtensilsCrossedIcon, active: true },
  { label: "Documents", icon: ShieldCheckIcon },
  { label: "Staff", icon: UsersIcon },
  { label: "Settings", icon: SettingsIcon },
]

// Spring menu still streaming to the CDN; wine list done; the banquet
// booklet was over the 10 MB policy and was rejected on arrival.
const MENU_FILES: FileUploadFile[] = [
  {
    id: "menu-spring",
    name: "menu-spring-2026.pdf",
    size: 1_912_320,
    type: "application/pdf",
    status: "uploading",
    progress: 67,
  },
  {
    id: "menu-wine",
    name: "wine-list-february.pdf",
    size: 657_408,
    type: "application/pdf",
    status: "success",
    progress: 100,
  },
  {
    id: "menu-banquet",
    name: "banquet-catering-booklet.pdf",
    size: 24_117_248,
    type: "application/pdf",
    status: "error",
    error: "Exceeds the 10 MB limit",
  },
]

// Bar counter is mid-upload; the other two photos are already live on the
// reservation landing page.
const PHOTO_FILES: FileUploadFile[] = [
  {
    id: "photo-dining",
    name: "dining-room-spring.jpg",
    size: 2_202_112,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/sable-dining/96/96",
    status: "success",
    progress: 100,
  },
  {
    id: "photo-bar",
    name: "bar-counter.jpg",
    size: 3_358_720,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/sable-bar/96/96",
    status: "uploading",
    progress: 41,
  },
  {
    id: "photo-patio",
    name: "patio-twilight.jpg",
    size: 4_014_080,
    type: "image/jpeg",
    previewUrl: "https://picsum.photos/seed/sable-patio/96/96",
    status: "success",
    progress: 100,
  },
]

// Health department certificate is on file; the fire scan arrived as HEIC
// and was rejected — the inspector has to re-export it as PDF or JPG.
const CERT_FILES: FileUploadFile[] = [
  {
    id: "cert-dohmh",
    name: "dohmh-health-cert-2026.pdf",
    size: 862_208,
    type: "application/pdf",
    status: "success",
    progress: 100,
  },
  {
    id: "cert-fire",
    name: "fire-inspection-scan.heic",
    size: 3_254_272,
    status: "error",
    error: "Unsupported file type — accepts PDF, JPG",
  },
]

const COMPLIANCE = [
  { doc: "Health certificate (DOHMH)", ref: "DOHMH-2026-1148", expires: "2026-04-30", status: "Valid" },
  { doc: "Liquor license", ref: "SLA-2211", expires: "2026-03-11", status: "Renewal due" },
  { doc: "Fire inspection report", ref: "FDNY-B44", expires: "2026-01-15", status: "Expired" },
  { doc: "General liability COI", ref: "COI-88913", expires: "2026-08-01", status: "Valid" },
] as const

function complianceBadge(status: (typeof COMPLIANCE)[number]["status"]) {
  if (status === "Expired") return <Badge variant="destructive">Expired</Badge>
  if (status === "Renewal due") return <Badge variant="secondary">Renewal due</Badge>
  return <Badge variant="outline">Valid</Badge>
}

export default function Page() {
  return (
    <EvalShell theme="light" dir="ltr">
      <div className="flex h-screen w-full overflow-hidden">
        {/* Venue navigation */}
        <aside className="hidden w-60 shrink-0 flex-col border-r bg-card lg:flex">
          <div className="flex items-center gap-2 px-4 py-4">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <CalendarClockIcon className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Alba</p>
              <p className="font-caption text-caption text-muted-foreground">
                Sable &amp; Rye · Nolita
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-0.5 px-2" aria-label="Venue sections">
            {NAV.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2.5 rounded-md bg-secondary px-3 py-2 text-sm font-medium text-foreground"
                    : "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground"
                }
              >
                <item.icon className="size-4" />
                {item.label}
              </span>
            ))}
          </nav>
          <div className="mt-auto space-y-1.5 border-t px-4 py-4">
            <div className="flex items-baseline justify-between">
              <p className="font-caption text-caption text-muted-foreground">
                Seats
              </p>
              <p className="font-code text-xs text-foreground">84 · 12 tables</p>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="font-caption text-caption text-muted-foreground">
                Tonight
              </p>
              <p className="font-code text-xs text-foreground">46 covers</p>
            </div>
            <div className="flex items-baseline justify-between">
              <p className="font-caption text-caption text-muted-foreground">
                Avg. cover
              </p>
              <p className="font-code text-xs text-foreground">$86</p>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-card px-6">
            <p className="font-caption text-caption text-muted-foreground">
              Sable &amp; Rye <span className="text-foreground/40">/</span>{" "}
              Content <span className="text-foreground/40">/</span>{" "}
              <span className="text-foreground">Menus &amp; media</span>
            </p>
            <div className="ml-auto flex items-center gap-3">
              <p className="font-caption text-caption text-muted-foreground">
                Auto-saved <span className="font-code">14:02</span>
              </p>
              <Avatar size="sm">
                <AvatarFallback>MV</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-auto p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="font-heading-2 text-heading-2 text-foreground">
                  Menus &amp; media
                </h1>
                <p className="font-caption text-caption text-muted-foreground">
                  Tuesday, Feb 10 · 2 uploads in progress · last published Feb
                  6 at <span className="font-code">18:40</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Discard</Button>
                <Button>Publish changes</Button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-12 gap-5">
              {/* Menu PDFs */}
              <section className="col-span-5 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Menu PDFs
                    </h2>
                    <p className="font-caption text-caption text-muted-foreground">
                      Attached to every booking confirmation email
                    </p>
                  </div>
                  <Badge variant="outline" className="font-code">
                    3 of 8
                  </Badge>
                </div>
                <FileUpload
                  accept="application/pdf"
                  maxSize={10 * 1024 * 1024}
                  maxFiles={8}
                  defaultFiles={MENU_FILES}
                >
                  <FileUploadDropzone size="sm" aria-label="Upload menu PDFs">
                    <FileUpIcon className="size-5 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Drop menu PDFs here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF · up to 10 MB each · 8 files max
                    </p>
                  </FileUploadDropzone>
                  <FileUploadList />
                </FileUpload>
              </section>

              {/* Venue photos */}
              <section className="col-span-4 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground">
                      Venue photos
                    </h2>
                    <p className="font-caption text-caption text-muted-foreground">
                      Shown on the reservation landing page
                    </p>
                  </div>
                  <Badge variant="outline" className="font-code">
                    2 live · 1 uploading
                  </Badge>
                </div>
                <FileUpload
                  accept="image/jpeg,image/png,image/webp"
                  maxSize={12 * 1024 * 1024}
                  defaultFiles={PHOTO_FILES}
                >
                  <FileUploadDropzone aria-label="Upload venue photos">
                    <ImagePlusIcon className="size-6 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      Drop venue photos
                    </p>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or WebP · up to 12 MB each
                    </p>
                  </FileUploadDropzone>
                  <FileUploadList />
                </FileUpload>
              </section>

              {/* Certificates + compliance register */}
              <section className="col-span-3 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-semibold text-foreground">
                        Certificates
                      </h2>
                      <p className="font-caption text-caption text-muted-foreground">
                        Health &amp; safety records
                      </p>
                    </div>
                  </div>
                  <FileUpload
                    density="compact"
                    accept="application/pdf,image/jpeg"
                    maxSize={5 * 1024 * 1024}
                    defaultFiles={CERT_FILES}
                  >
                    <FileUploadDropzone size="sm" aria-label="Upload certificates">
                      <ShieldCheckIcon className="size-5 text-muted-foreground" />
                      <p className="text-sm font-medium text-foreground">
                        Drop certificates
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF or JPG · up to 5 MB
                      </p>
                    </FileUploadDropzone>
                    <FileUploadList />
                  </FileUpload>
                </div>

                <Card className="gap-0 rounded-lg py-0">
                  <CardHeader className="border-b pb-3 pt-4">
                    <CardTitle className="text-sm">
                      Compliance register
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Expiry checked nightly against city registries
                    </CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {COMPLIANCE.map((row) => (
                        <TableRow key={row.ref}>
                          <TableCell>
                            <p className="text-sm text-foreground">
                              {row.doc}
                            </p>
                            <p className="font-code text-xs text-muted-foreground">
                              {row.ref}
                            </p>
                          </TableCell>
                          <TableCell className="font-code text-xs text-muted-foreground">
                            {row.expires}
                          </TableCell>
                          <TableCell>{complianceBadge(row.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>

                <Alert>
                  <TriangleAlertIcon className="text-warning-500" />
                  <AlertTitle>Liquor license expires in 29 days</AlertTitle>
                  <AlertDescription>
                    Upload the renewed <span className="font-code text-xs">SLA-2211</span>{" "}
                    certificate before <span className="font-code text-xs">2026-03-11</span>{" "}
                    to keep online booking active.
                  </AlertDescription>
                </Alert>
              </section>
            </div>
          </main>
        </div>
      </div>
    </EvalShell>
  )
}
