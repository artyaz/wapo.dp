"use client"

import * as React from "react"
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Stepper / wizard primitives.
 *
 * `<Stepper>` owns the step state machine and renders the `<nav>` landmark
 * with an ordered list of steps. Two authoring styles are supported:
 *
 * 1. Declarative — pass a `steps` array and the items + connectors are
 *    generated for you:
 *
 *    <Stepper steps={[{ label: "Cart" }, { label: "Pay" }]} activeStep={1} />
 *
 * 2. Compound — interleave `<StepperItem>` and `<StepperSeparator>` children
 *    (indices are auto-assigned to direct children; pass `index` explicitly
 *    when wrapping items in fragments):
 *
 *    <Stepper orientation="vertical">
 *      <StepperItem index={0} label="Draft" />
 *      <StepperSeparator />
 *      <StepperItem index={1} label="Review" />
 *    </Stepper>
 *
 *    In vertical layouts each item draws its own connector tail, so
 *    `<StepperSeparator>` children render nothing (kept for API parity —
 *    simply omit them if you prefer).
 *
 * `<StepperContent>` panels and `<StepperNavigation>` (back/next row) may be
 * given as direct children of `<Stepper>`. In horizontal layouts they render
 * below the track; in vertical layouts each content panel is distributed
 * into its step so the active panel sits directly under the step it belongs
 * to, while the navigation row stays at the bottom of the track. Panels stay
 * mounted and are hidden with the `hidden` attribute while inactive so form
 * state survives navigation. `<StepperItem>` also accepts children, rendered
 * under the step (useful for inline step content in vertical wizards).
 *
 * Set `clickable` to turn completed and current steps into keyboard-operable
 * buttons (upcoming steps render disabled). `errorStep` flags a step with the
 * destructive error state — the only place color beyond the monochrome
 * palette is allowed in this component.
 */

type StepperOrientation = "horizontal" | "vertical"

export type StepperItemState = "complete" | "current" | "upcoming" | "error"

/** One entry of the declarative `steps` config array. */
export interface StepperStep {
  /** Short step name rendered beside the indicator circle. */
  label: string
  /** Optional helper line rendered under the label. */
  description?: string
}

interface StepperContextValue {
  activeStep: number
  stepCount: number
  orientation: StepperOrientation
  clickable: boolean
  monoNumbers: boolean
  errorStep: number | null
  goToStep: (index: number) => void
  nextStep: () => void
  prevStep: () => void
  isFirst: boolean
  isLast: boolean
}

const StepperContext = React.createContext<StepperContextValue | null>(null)

function useStepperContext(consumer: string): StepperContextValue {
  const context = React.useContext(StepperContext)
  if (!context) {
    throw new Error(`<${consumer}> must be rendered inside a <Stepper>.`)
  }
  return context
}

/**
 * useStepper — imperative access to the surrounding stepper's state machine:
 * `activeStep`, `stepCount`, `isFirst`, `isLast`, `goToStep`, `nextStep`,
 * `prevStep`, plus the `orientation` / `clickable` configuration.
 */
function useStepper(): StepperContextValue {
  return useStepperContext("useStepper")
}

/* ------------------------------------------------------------------ */
/* State styles (flat, monochrome; destructive reserved for errors)    */
/* ------------------------------------------------------------------ */

const indicatorStateClasses: Record<StepperItemState, string> = {
  complete: "border-primary bg-primary text-primary-foreground",
  current:
    "border-primary bg-background text-primary ring-[3px] ring-primary/15",
  upcoming: "border-border bg-muted/50 text-muted-foreground",
  error: "border-destructive bg-background text-destructive ring-[3px] ring-destructive/15",
}

const labelStateClasses: Record<StepperItemState, string> = {
  complete: "text-foreground font-medium",
  current: "text-foreground font-semibold",
  upcoming: "text-muted-foreground font-medium",
  error: "text-foreground font-medium",
}

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export interface StepperProps extends React.ComponentProps<"nav"> {
  /** Declarative step list — items and connectors are generated for you. */
  steps?: StepperStep[]
  /** Controlled active step index (0-based). */
  activeStep?: number
  /** Initial step index when uncontrolled (0-based). */
  defaultActiveStep?: number
  /** Fired whenever the active step changes (controlled or uncontrolled). */
  onStepChange?: (step: number) => void
  /** Layout of the step track. Default "horizontal". */
  orientation?: StepperOrientation
  /** Completed and current steps become clickable buttons. */
  clickable?: boolean
  /** Flags a step (usually the active one) with the destructive error state. */
  errorStep?: number | null
  /** Render step numbers in the mono/code font. Default true. */
  monoNumbers?: boolean
  /** Accessible name of the nav landmark. Default "Progress". */
  label?: string
}

/** Splits root children into track nodes and panel nodes (content/navigation). */
function partitionStepperChildren(children: React.ReactNode) {
  const track: React.ReactNode[] = []
  const panels: React.ReactNode[] = []
  let itemCount = 0

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === StepperContent || child.type === StepperNavigation) {
        panels.push(child)
        return
      }
      if (child.type === StepperItem) {
        track.push(
          React.cloneElement(child as React.ReactElement<StepperItemProps>, {
            index:
              (child.props as StepperItemProps).index ?? itemCount,
          })
        )
        itemCount += 1
        return
      }
      if (child.type === StepperSeparator) {
        track.push(
          React.cloneElement(child as React.ReactElement<StepperSeparatorProps>, {
            index:
              (child.props as StepperSeparatorProps).index ?? itemCount - 1,
          })
        )
        return
      }
    }
    track.push(child)
  })

  return { track, panels, itemCount }
}

function Stepper({
  steps,
  activeStep,
  defaultActiveStep = 0,
  onStepChange,
  orientation = "horizontal",
  clickable = false,
  errorStep = null,
  monoNumbers = true,
  label = "Progress",
  className,
  children,
  ...props
}: StepperProps) {
  const [internalStep, setInternalStep] = React.useState(defaultActiveStep)
  const isControlled = activeStep !== undefined
  const currentStep = isControlled ? activeStep : internalStep

  const { track, panels, itemCount } = React.useMemo(
    () => partitionStepperChildren(children),
    [children]
  )

  const stepCount = steps?.length ?? itemCount

  // In vertical layouts content panels are distributed into their step items
  // (the active panel renders directly under its own step, keeping the wizard
  // flow readable); navigation and unmatched panels stay in the bottom area.
  const { contentPanels, bottomPanels } = React.useMemo(() => {
    const contentPanels = new Map<number, React.ReactNode>()
    const bottomPanels: React.ReactNode[] = []
    for (const panel of panels) {
      if (React.isValidElement(panel) && panel.type === StepperContent) {
        const { value } = panel.props as StepperContentProps
        if (orientation === "vertical" && !contentPanels.has(value)) {
          contentPanels.set(value, panel)
          continue
        }
      }
      bottomPanels.push(panel)
    }
    return { contentPanels, bottomPanels }
  }, [panels, orientation])

  const injectContentPanel = React.useCallback(
    (node: React.ReactNode): React.ReactNode => {
      if (
        orientation !== "vertical" ||
        !React.isValidElement(node) ||
        node.type !== StepperItem
      ) {
        return node
      }
      const itemProps = node.props as StepperItemProps
      const panel = contentPanels.get(itemProps.index ?? 0)
      if (!panel) return node
      return React.cloneElement(
        node as React.ReactElement<StepperItemProps>,
        {
          children:
            itemProps.children == null ? panel : [itemProps.children, panel],
        }
      )
    },
    [orientation, contentPanels]
  )

  const goToStep = React.useCallback(
    (index: number) => {
      if (stepCount === 0) return
      const clamped = Math.min(Math.max(index, 0), stepCount - 1)
      if (clamped === currentStep) return
      if (!isControlled) setInternalStep(clamped)
      onStepChange?.(clamped)
    },
    [stepCount, currentStep, isControlled, onStepChange]
  )

  const nextStep = React.useCallback(() => {
    goToStep(currentStep + 1)
  }, [goToStep, currentStep])

  const prevStep = React.useCallback(() => {
    goToStep(currentStep - 1)
  }, [goToStep, currentStep])

  const context = React.useMemo<StepperContextValue>(
    () => ({
      activeStep: currentStep,
      stepCount,
      orientation,
      clickable,
      monoNumbers,
      errorStep,
      goToStep,
      nextStep,
      prevStep,
      isFirst: currentStep <= 0,
      isLast: currentStep >= stepCount - 1,
    }),
    [
      currentStep,
      stepCount,
      orientation,
      clickable,
      monoNumbers,
      errorStep,
      goToStep,
      nextStep,
      prevStep,
    ]
  )

  // Declarative `steps` array: generate items + connectors, then append any
  // extra (non-panel) track children the consumer passed. Connectors are only
  // generated for horizontal layouts — vertical items draw their own tails.
  let trackNodes = track
  if (steps && steps.length > 0) {
    const generated: React.ReactNode[] = []
    steps.forEach((step, index) => {
      generated.push(
        <StepperItem
          key={`stepper-item-${index}`}
          index={index}
          label={step.label}
          description={step.description}
        />
      )
      if (index < steps.length - 1 && orientation !== "vertical") {
        generated.push(
          <StepperSeparator key={`stepper-separator-${index}`} index={index} />
        )
      }
    })
    trackNodes = [...generated, ...track]
  }
  if (contentPanels.size > 0) {
    // toArray normalizes keys before the injection pass clones items.
    trackNodes = React.Children.toArray(trackNodes).map(injectContentPanel)
  }

  return (
    <StepperContext.Provider value={context}>
      <nav
        data-slot="stepper"
        data-orientation={orientation}
        aria-label={label}
        className={cn("w-full", className)}
        {...props}
      >
        <ol
          data-slot="stepper-track"
          className={cn(
            "flex w-full",
            orientation === "vertical" ? "flex-col" : "items-start"
          )}
        >
          {trackNodes}
        </ol>
        {bottomPanels.length > 0 ? (
          <div
            data-slot="stepper-panels"
            className="flex flex-col gap-6 pt-6"
          >
            {bottomPanels}
          </div>
        ) : null}
      </nav>
    </StepperContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/* Item                                                                */
/* ------------------------------------------------------------------ */

export interface StepperItemProps extends React.ComponentProps<"li"> {
  /**
   * Zero-based step position. Auto-assigned when the item is a direct child
   * of `<Stepper>`; pass it explicitly when wrapping items in fragments.
   */
  index?: number
  /** Short step name rendered beside the indicator circle. */
  label?: string
  /** Optional helper line rendered under the label. */
  description?: string
  /** Force a state instead of deriving it from the active step. */
  state?: StepperItemState
}

function StepperItem({
  index = 0,
  label,
  description,
  state: stateProp,
  className,
  children,
  ...props
}: StepperItemProps) {
  const stepper = useStepperContext("StepperItem")

  const derivedState: StepperItemState =
    index < stepper.activeStep
      ? "complete"
      : index === stepper.activeStep
        ? "current"
        : "upcoming"
  const state =
    stateProp ?? (stepper.errorStep === index ? "error" : derivedState)

  const interactive = stepper.clickable
  const disabled = interactive && state === "upcoming"
  const vertical = stepper.orientation === "vertical"
  const isLastStep =
    stepper.stepCount > 0 && index === stepper.stepCount - 1

  const indicator =
    state === "complete" ? (
      <CheckIcon className="size-3.5" aria-hidden="true" />
    ) : state === "error" ? (
      <XIcon className="size-3.5" aria-hidden="true" />
    ) : (
      <span
        className={cn(
          "text-[11px] leading-none tabular-nums",
          stepper.monoNumbers && "font-code"
        )}
      >
        {index + 1}
      </span>
    )

  const indicatorNode = (
    <span
      data-slot="stepper-indicator"
      data-state={state}
      aria-hidden="true"
      className={cn(
        "flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
        indicatorStateClasses[state]
      )}
    >
      {indicator}
    </span>
  )

  const labelNode =
    label || description ? (
      <span className="flex min-w-0 flex-col gap-0.5 pt-1 text-start">
        {label ? (
          <span
            data-slot="stepper-label"
            className={cn(
              "text-sm leading-tight transition-colors duration-200",
              labelStateClasses[state]
            )}
          >
            {label}
          </span>
        ) : null}
        {description ? (
          <span
            data-slot="stepper-description"
            className="text-xs leading-tight text-muted-foreground"
          >
            {description}
          </span>
        ) : null}
      </span>
    ) : null

  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      aria-current={
        !interactive && state === "current" ? "step" : undefined
      }
      className={cn(
        "flex flex-col gap-3",
        // Vertical items own their connector: an unbroken hairline runs from
        // the indicator's bottom edge through label overhang, expanded
        // content and the inter-step rhythm, meeting the next indicator.
        vertical && "relative",
        vertical && !isLastStep && "pb-8",
        className
      )}
      {...props}
    >
      {vertical && !isLastStep ? (
        <span
          aria-hidden="true"
          data-slot="stepper-item-connector"
          className={cn(
            "pointer-events-none absolute bottom-0 start-[13.5px] top-7 w-px transition-colors duration-200",
            index < stepper.activeStep ? "bg-primary" : "bg-border"
          )}
        />
      ) : null}
      {interactive ? (
        <button
          type="button"
          data-slot="stepper-trigger"
          aria-current={state === "current" ? "step" : undefined}
          disabled={disabled}
          onClick={() => stepper.goToStep(index)}
          className={cn(
            "flex w-full items-start gap-3 rounded-sm text-start transition-colors duration-200",
            "outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
            disabled ? "cursor-default" : "cursor-pointer hover:bg-accent/50"
          )}
        >
          {indicatorNode}
          {labelNode}
        </button>
      ) : (
        <div
          data-slot="stepper-trigger"
          className="flex w-full items-start gap-3 text-start"
        >
          {indicatorNode}
          {labelNode}
        </div>
      )}
      {children ? (
        <div
          data-slot="stepper-item-content"
          className={cn(
            // Collapses entirely while every panel inside is inactive, so
            // inactive steps keep the track's vertical rhythm.
            "has-[>div[hidden]]:hidden",
            vertical && "ps-10"
          )}
        >
          {children}
        </div>
      ) : null}
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Separator                                                           */
/* ------------------------------------------------------------------ */

export interface StepperSeparatorProps extends React.ComponentProps<"li"> {
  /**
   * Zero-based index of the step this connector follows. Auto-assigned when
   * the separator is a direct child of `<Stepper>`.
   */
  index?: number
}

function StepperSeparator({
  index = 0,
  className,
  ...props
}: StepperSeparatorProps) {
  const stepper = useStepperContext("StepperSeparator")
  const state = index < stepper.activeStep ? "complete" : "upcoming"
  const vertical = stepper.orientation === "vertical"

  // In vertical layouts the items draw their own connector tails (an
  // unbroken spine from indicator to indicator), so separators render
  // nothing — inter-step rhythm lives on the items themselves.
  if (vertical) {
    return (
      <li
        aria-hidden="true"
        data-slot="stepper-separator"
        data-state={state}
        className="hidden"
        {...props}
      />
    )
  }

  return (
    <li
      aria-hidden="true"
      data-slot="stepper-separator"
      data-state={state}
      className={cn(
        vertical ? "ps-3.5 py-1.5" : "mt-3.5 flex flex-1 px-3",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "block bg-border transition-colors duration-200",
          vertical ? "min-h-5 w-px" : "h-px w-full",
          state === "complete" && "bg-primary"
        )}
      />
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

export interface StepperContentProps extends React.ComponentProps<"div"> {
  /** Zero-based index of the step this panel belongs to. */
  value: number
}

function StepperContent({
  value,
  className,
  children,
  ...props
}: StepperContentProps) {
  const { activeStep } = useStepperContext("StepperContent")
  const active = value === activeStep

  // Inactive panels stay mounted (hidden via the `hidden` attribute) so form
  // state survives back/forward navigation.
  return (
    <div
      data-slot="stepper-content"
      data-state={active ? "active" : "inactive"}
      hidden={!active}
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface StepperNavigationProps extends React.ComponentProps<"div"> {
  /** Label of the back button. Default "Back". */
  backLabel?: string
  /** Label of the next button. Default "Continue". */
  nextLabel?: string
  /** Label shown on the last step instead of next. Default "Finish". */
  finishLabel?: string
  /** Fired when the last step's button is pressed (instead of advancing). */
  onFinish?: () => void
}

function StepperNavigation({
  backLabel = "Back",
  nextLabel = "Continue",
  finishLabel = "Finish",
  onFinish,
  className,
  children,
  ...props
}: StepperNavigationProps) {
  const {
    activeStep,
    stepCount,
    isFirst,
    isLast,
    nextStep,
    prevStep,
  } = useStepperContext("StepperNavigation")

  // Custom controls — compose with `useStepper()` and plain Buttons.
  if (children !== undefined && children !== null) {
    return (
      <div
        data-slot="stepper-navigation"
        className={cn("flex items-center justify-end gap-2", className)}
        {...props}
      >
        {children}
      </div>
    )
  }

  const total = Math.max(stepCount, 1)

  return (
    <div
      data-slot="stepper-navigation"
      className={cn("flex items-center justify-between gap-3", className)}
      {...props}
    >
      <p
        aria-live="polite"
        className="font-code text-xs tabular-nums text-muted-foreground"
      >
        STEP {Math.min(activeStep + 1, total)} / {total}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={prevStep}
          disabled={isFirst}
        >
          <ChevronLeftIcon />
          {backLabel}
        </Button>
        {isLast ? (
          <Button
            type="button"
            size="sm"
            onClick={onFinish}
            disabled={!onFinish}
          >
            {finishLabel}
          </Button>
        ) : (
          <Button type="button" size="sm" onClick={nextStep}>
            {nextLabel}
            <ChevronRightIcon />
          </Button>
        )}
      </div>
    </div>
  )
}

export {
  Stepper,
  StepperItem,
  StepperSeparator,
  StepperContent,
  StepperNavigation,
  useStepper,
}

// Re-exported for consumers that import types in value position lists.
export type { StepperOrientation }

