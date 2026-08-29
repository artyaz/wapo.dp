"use client"

/**
 * CodeBlock — the Praxis code panel family.
 *
 * A composable set (shadcn/new-york style) for displaying code with optional
 * syntax highlighting, header chrome, line numbers, wrapping and scroll:
 *
 *   <CodeBlock code={src} language="tsx" variant="ink">
 *     <CodeBlockHeader>
 *       <CodeBlockTitle>chart.tsx</CodeBlockTitle>
 *       <CodeBlockBadge />
 *       <CodeBlockActions>
 *         <CodeBlockCopyButton />
 *       </CodeBlockActions>
 *     </CodeBlockHeader>
 *     <CodeBlockCode showLineNumbers />
 *   </CodeBlock>
 *
 * Omit children entirely for the minimal form — the root then renders the
 * code area plus a floating copy button:
 *
 *   <CodeBlock code={src} language="tsx" />
 *
 * Doctrine: flat in-flow panel (rounded-lg + hairline border, no shadow, no
 * glass), IBM Plex Mono via the `font-code` role, and a strictly monochrome
 * syntax theme — tokens are differentiated only by weight and position on the
 * warm-neutral ramp, never by hue. Both themes resolve from CSS variables.
 */

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Check, Copy } from "lucide-react"

import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/prism-light"
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash"
import css from "react-syntax-highlighter/dist/esm/languages/prism/css"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import markdown from "react-syntax-highlighter/dist/esm/languages/prism/markdown"
import python from "react-syntax-highlighter/dist/esm/languages/prism/python"
import sql from "react-syntax-highlighter/dist/esm/languages/prism/sql"
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx"
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript"
import yaml from "react-syntax-highlighter/dist/esm/languages/prism/yaml"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"

/* --------------------------------------------------------------------------
 * Languages — a curated set registered on the Prism light build so the
 * client bundle stays small. Unknown languages fall back to plain text.
 * ------------------------------------------------------------------------ */

const PRISM_LANGUAGES: Record<string, unknown> = {
  bash,
  css,
  json,
  markdown,
  python,
  sql,
  tsx,
  typescript,
  yaml,
}

for (const [name, language] of Object.entries(PRISM_LANGUAGES)) {
  SyntaxHighlighter.registerLanguage(name, language)
}

/* --------------------------------------------------------------------------
 * Syntax theme — monochrome by doctrine.
 *
 * Two tiny theme tables map token roles onto the Praxis neutral ramp; because
 * light and dark assign the SAME steps, the stylesheet below can reference
 * the raw `--ds-color-neutral-*` variables and flip automatically under
 * `.dark` (and inside `variant="ink"` panels) with zero runtime detection.
 *
 *   step | light #  | dark #   | roles
 *   -----|----------|----------|-------------------------------------------
 *   500  | #8A877E  | #8F8C84  | punctuation, operators, line-number gutter
 *   600  | #6E6B62  | #A8A49B  | comments (italic), strings, chars, selectors
 *   700  | #4C4A43  | #C4C0B6  | numbers, booleans, constants, attr names
 *   800  | #2A2926  | #DDD9CF  | base code text, function / class names (w500)
 *   900  | #15150F  | #F1EFE9  | keywords, tags, properties (w600 / plain)
 * ------------------------------------------------------------------------ */

const step = (n: number) => `var(--ds-color-neutral-${n})`

const praxisCodeTheme: Record<string, React.CSSProperties> = {
  // Base elements — geometry is owned by CodeBlockCode; colors only here.
  "code[class*=\"language-\"]": {
    color: step(800),
    fontFamily: "var(--ds-font-code)",
  },
  "pre[class*=\"language-\"]": {
    background: "transparent",
  },

  // Comments & noise — recessive by style (italic), but one step above the
  // gutter so they clear AA contrast on paper panels in light mode (~4.8:1)
  // and stay comfortably readable on ink panels (~7.4:1).
  comment: { color: step(600), fontStyle: "italic" },
  prolog: { color: step(600), fontStyle: "italic" },
  doctype: { color: step(600), fontStyle: "italic" },
  cdata: { color: step(600), fontStyle: "italic" },
  punctuation: { color: step(500) },
  operator: { color: step(500) },
  entity: { color: step(500) },
  url: { color: step(500) },
  // react-syntax-highlighter types its inline line-number spans as
  // `comment linenumber` — keep the gutter plain and one step recessive.
  "comment.linenumber": { color: step(500), fontStyle: "normal" },

  // Strings & literals — same step as comments, told apart by style
  // (upright vs italic) — hierarchy by weight/position, never hue.
  string: { color: step(600) },
  char: { color: step(600) },
  "attr-value": { color: step(600) },
  selector: { color: step(600) },
  builtin: { color: step(600) },
  inserted: { color: step(600) },
  regex: { color: step(600) },

  // Values — numbers, constants, attribute names.
  number: { color: step(700) },
  boolean: { color: step(700) },
  constant: { color: step(700) },
  symbol: { color: step(700) },
  variable: { color: step(700) },
  deleted: { color: step(700) },
  "attr-name": { color: step(700) },
  namespace: { color: step(700), opacity: 0.8 },

  // Names — base text weight 500 keeps functions readable at a glance.
  function: { color: step(800), fontWeight: 500 },
  "class-name": { color: step(800), fontWeight: 500 },
  title: { color: step(800), fontWeight: 500 },

  // Keywords & structure — darkest, hierarchy by weight, never hue.
  keyword: { color: step(900), fontWeight: 600 },
  atrule: { color: step(900), fontWeight: 600 },
  important: { color: step(900), fontWeight: 600 },
  tag: { color: step(900) },
  property: { color: step(900) },

  // Markdown emphasis tokens.
  bold: { fontWeight: 600 },
  italic: { fontStyle: "italic" },
}

/* --------------------------------------------------------------------------
 * Variants
 * ------------------------------------------------------------------------ */

/**
 * `ink` re-declares the Praxis tokens locally with the dark-theme values, so
 * the panel renders as a dark "ink" surface in light mode — and is a no-op in
 * dark mode, where every value already matches.
 */
const INK_TOKEN_OVERRIDES = [
  "[--ds-color-neutral-50:#0B0B0A]",
  "[--ds-color-neutral-100:#151513]",
  "[--ds-color-neutral-200:#2A2926]",
  "[--ds-color-neutral-300:#3A3835]",
  "[--ds-color-neutral-400:#55524C]",
  "[--ds-color-neutral-500:#8F8C84]",
  "[--ds-color-neutral-600:#A8A49B]",
  "[--ds-color-neutral-700:#C4C0B6]",
  "[--ds-color-neutral-800:#DDD9CF]",
  "[--ds-color-neutral-900:#F1EFE9]",
  "[--ds-color-default-border:#2A2926]",
  "[--ds-color-default-font:#F1EFE9]",
  "[--ds-color-panel:#151513]",
  "[--background:#0B0B0A]",
  "[--foreground:#F1EFE9]",
  "[--card:#151513]",
  "[--card-foreground:#F1EFE9]",
  "[--muted:#151513]",
  "[--muted-foreground:#8F8C84]",
  "[--accent:#151513]",
  "[--accent-foreground:#F1EFE9]",
  "[--border:#2A2926]",
  "[--primary:#F1EFE9]",
  "[--primary-foreground:#0B0B0A]",
].join(" ")

const codeBlockVariants = cva(
  "relative overflow-hidden rounded-lg border border-default-border bg-muted font-code",
  {
    variants: {
      variant: {
        /** Paper panel — steps one tone off the page in both themes. */
        default: "",
        /** Ink panel — the dark-theme surface in any theme (docs-style). */
        ink: INK_TOKEN_OVERRIDES,
      },
      size: {
        default: "text-[13px]",
        compact: "text-xs",
        large: "text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type CodeBlockSize = NonNullable<VariantProps<typeof codeBlockVariants>["size"]>

/** Code-area metrics per density — applied to the <pre> so scroll padding sticks. */
const CODE_DENSITY: Record<CodeBlockSize, { fontSize: string; lineHeight: number; padding: string }> = {
  default: { fontSize: "13px", lineHeight: 1.7, padding: "0.875rem 1rem" },
  compact: { fontSize: "12px", lineHeight: 1.65, padding: "0.625rem 0.75rem" },
  large: { fontSize: "14px", lineHeight: 1.75, padding: "1rem 1.125rem" },
}

/* --------------------------------------------------------------------------
 * Context
 * ------------------------------------------------------------------------ */

interface CodeBlockContextValue {
  code: string
  language: string
  size: CodeBlockSize
}

const CodeBlockContext = React.createContext<CodeBlockContextValue>({
  code: "",
  language: "",
  size: "default",
})

/** Set while inside a header, so buttons render inline instead of floating. */
const CodeBlockHeaderContext = React.createContext(false)

function useCodeBlock() {
  return React.useContext(CodeBlockContext)
}

/* --------------------------------------------------------------------------
 * CodeBlock (root)
 * ------------------------------------------------------------------------ */

function CodeBlock({
  className,
  code = "",
  language,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & {
    /** Source text to display (and to copy, by default). */
    code?: string
    /** Language for highlighting + the accessible label. */
    language?: string
  }) {
  const contextValue = React.useMemo<CodeBlockContextValue>(
    () => ({ code, language: language ?? "", size: size ?? "default" }),
    [code, language, size]
  )

  return (
    <CodeBlockContext.Provider value={contextValue}>
      <div
        data-slot="code-block"
        data-variant={variant ?? "default"}
        data-size={size ?? "default"}
        role="region"
        aria-label={`Code block${language ? ` · ${language}` : ""}`}
        className={cn(codeBlockVariants({ variant, size }), className)}
        {...props}
      >
        {children ?? (
          <>
            <CodeBlockCode />
            <CodeBlockCopyButton />
          </>
        )}
      </div>
    </CodeBlockContext.Provider>
  )
}

/* --------------------------------------------------------------------------
 * CodeBlockHeader
 * ------------------------------------------------------------------------ */

function CodeBlockHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = useCodeBlock()

  return (
    <CodeBlockHeaderContext.Provider value={true}>
      <div
        data-slot="code-block-header"
        className={cn(
          "flex min-w-0 items-center gap-2 border-b border-default-border",
          size === "compact" ? "px-3 py-1.5" : "px-4 py-2",
          className
        )}
        {...props}
      />
    </CodeBlockHeaderContext.Provider>
  )
}

/** Filename or title — mono, muted, truncates so badges stay visible. */
function CodeBlockTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="code-block-title"
      className={cn(
        "flex min-w-0 items-center gap-1.5 truncate text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Language badge — a small mono label in muted, hairline chip. */
function CodeBlockBadge({
  className,
  language,
  children,
  ...props
}: React.ComponentProps<"span"> & { language?: string }) {
  const context = useCodeBlock()
  const label = children ?? language ?? context.language

  if (!label) return null

  return (
    <span
      data-slot="code-block-badge"
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm border border-default-border px-1.5 py-px text-[10px] leading-none font-medium tracking-[0.08em] uppercase text-muted-foreground",
        className
      )}
      {...props}
    >
      {label}
    </span>
  )
}

/** Right-aligned action row for the header (copy, download, …). */
function CodeBlockActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="code-block-actions"
      className={cn("ms-auto flex items-center gap-1", className)}
      {...props}
    />
  )
}

/* --------------------------------------------------------------------------
 * CodeBlockCode (the pre/code area)
 * ------------------------------------------------------------------------ */

function CodeBlockCode({
  className,
  code: codeProp,
  language: languageProp,
  showLineNumbers = false,
  wrap = false,
  maxHeight,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  /** Overrides the root's `code`. */
  code?: string
  /** Overrides the root's `language`. */
  language?: string
  /** Print a muted line-number gutter. */
  showLineNumbers?: boolean
  /** Soft-wrap long lines instead of scrolling horizontally. */
  wrap?: boolean
  /** Cap the panel height (px) and scroll inside it. */
  maxHeight?: number | string
}) {
  const context = useCodeBlock()
  const code = codeProp ?? context.code
  const language = languageProp ?? context.language ?? "text"
  const density = CODE_DENSITY[context.size]
  const scrollable = maxHeight !== undefined && maxHeight !== null

  return (
    <div
      data-slot="code-block-code"
      className={cn(
        "relative [scrollbar-width:thin]",
        scrollable &&
          "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30",
        wrap ? "overflow-x-hidden overflow-y-auto" : "overflow-auto",
        className
      )}
      style={{ maxHeight: maxHeight ?? undefined, ...style }}
      {...(scrollable
        ? { tabIndex: 0, role: "region", "aria-label": "Code content, scrollable" }
        : {})}
      {...props}
    >
      <SyntaxHighlighter
        language={language}
        style={praxisCodeTheme}
        showLineNumbers={showLineNumbers}
        wrapLongLines={wrap}
        customStyle={{
          margin: 0,
          padding: density.padding,
          background: "transparent",
          fontFamily: "inherit",
          fontSize: density.fontSize,
          lineHeight: String(density.lineHeight),
          tabSize: 2,
        }}
        codeTagProps={{
          className: `language-${language}`,
          style: {
            fontFamily: "var(--ds-font-code)",
            fontSize: "inherit",
            lineHeight: "inherit",
            color: step(800),
          },
        }}
        lineNumberStyle={{
          color: step(500),
          fontStyle: "normal",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

/** Alias — `CodeBlockContent` reads a little better in prose-heavy layouts. */
const CodeBlockContent = CodeBlockCode

/* --------------------------------------------------------------------------
 * CodeBlockCopyButton
 * ------------------------------------------------------------------------ */

function CodeBlockCopyButton({
  className,
  value,
  timeout = 2000,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button"> & {
  /** Text to copy — defaults to the root's `code`. */
  value?: string
  /** How long the "copied" state holds (ms). */
  timeout?: number
}) {
  const { code } = useCodeBlock()
  const inHeader = React.useContext(CodeBlockHeaderContext)
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout })
  const text = value ?? code

  return (
    <button
      type="button"
      data-slot="code-block-copy-button"
      data-copied={isCopied ? "true" : undefined}
      aria-label={isCopied ? "Copied to clipboard" : "Copy code to clipboard"}
      onClick={(event) => {
        copyToClipboard(text)
        onClick?.(event)
      }}
      className={cn(
        "inline-flex size-7 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-md text-[11px] font-medium outline-none transition-colors duration-150",
        "text-muted-foreground hover:bg-foreground/10 hover:text-foreground",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        isCopied && "text-foreground",
        inHeader
          ? "relative"
          : "absolute end-2 top-2 z-10 border border-default-border bg-inherit",
        className
      )}
      {...props}
    >
      {isCopied ? (
        <Check className="size-3.5" aria-hidden="true" />
      ) : (
        <Copy className="size-3.5" aria-hidden="true" />
      )}
      {children}
    </button>
  )
}

/* --------------------------------------------------------------------------
 * Exports
 * ------------------------------------------------------------------------ */

export {
  CodeBlock,
  codeBlockVariants,
  CodeBlockHeader,
  CodeBlockTitle,
  CodeBlockBadge,
  CodeBlockActions,
  CodeBlockCode,
  CodeBlockContent,
  CodeBlockCopyButton,
}

export type { CodeBlockSize }
