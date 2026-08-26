"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Base-UI-style `render` prop compat for Radix-based shadcn components.
 *
 * The shadcn docs JSON demos use the new Base UI API:
 *
 *   <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
 *
 * Radix primitives express the same thing with `asChild`:
 *
 *   <DialogTrigger asChild><Button variant="outline">Open</Button></DialogTrigger>
 *
 * `withRender()` wraps a Radix component (or any component that forwards
 * unknown props to an `asChild`-capable primitive) and adds Base UI `render`
 * semantics: the rendered element receives the trigger's children and all
 * props are merged onto it.
 */

type RenderProp = React.ReactElement<Record<string, unknown>>;

export interface WithRenderProps {
  render?: RenderProp;
  children?: React.ReactNode;
}

export function withRender<P extends object>(
  Component: React.ComponentType<P & { asChild?: boolean }>
): React.ComponentType<P & WithRenderProps> {
  function WithRender({ render, children, className, ...props }: WithRenderProps & P & { className?: string }) {
    if (!render) {
      // No render prop — pass through untouched (Radix default behavior).
      return <Component {...(props as P)} className={className}>{children}</Component>;
    }
    // Merge className onto the rendered element. Children are only cloned in
    // when the caller actually passed them: cloneElement's 3rd argument
    // always *replaces* children, so an `undefined` children value would wipe
    // the render element's own children.
    const rendered =
      children !== undefined
        ? React.cloneElement(
            render,
            {
              className: cn(
                (render.props as { className?: string } | undefined)?.className,
                className
              ),
            },
            children
          )
        : React.cloneElement(render, {
            className: cn(
              (render.props as { className?: string } | undefined)?.className,
              className
            ),
          });
    return (
      <Component {...(props as P)} asChild>
        {rendered}
      </Component>
    );
  }
  WithRender.displayName = `withRender(${
    Component.displayName || Component.name || "Component"
  })`;
  return WithRender as React.ComponentType<P & WithRenderProps>;
}

/**
 * Plain-HTML fallback for components that do not map to a Radix primitive
 * but still need `render` support (e.g. Kbd, Marker, BubbleContent, Item).
 * Base UI semantics: when `render` is provided, clone it, merge className,
 * and pass children through.
 */
export function RenderSlot({
  render,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & WithRenderProps) {
  if (render) {
    // Merge className + the remaining props onto the rendered element.
    // Children are only cloned in when the caller actually passed them:
    // cloneElement's 3rd argument always *replaces* children, so passing
    // `undefined` would wipe the render element's own children.
    const mergedProps = {
      className: cn(
        (render.props as { className?: string } | undefined)?.className,
        className
      ),
      ...props,
    };
    return children !== undefined
      ? React.cloneElement(render, mergedProps, children)
      : React.cloneElement(render, mergedProps);
  }
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
}
