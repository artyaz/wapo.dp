"use client"

// CodeBlock — basic: a simple ink-panel code block with a copy button.

import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockCopyButton,
} from "@/components/ui/code-block"

const code = `import { useEffect, useState } from "react"

/** Persist a piece of state to localStorage. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}`

export function CodeBlockBasic() {
  return (
    <div className="flex w-full max-w-[640px] flex-col">
      <CodeBlock code={code} language="tsx" variant="ink">
        <CodeBlockCode />
        <CodeBlockCopyButton />
      </CodeBlock>
    </div>
  )
}
