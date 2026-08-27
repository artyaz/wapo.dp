"use client";

/**
 * UserMessage demo — three turns of user prompts on the dark chat canvas:
 * a regular prompt, a long wrapping prompt, and a compact acknowledgement.
 */

import React from "react";
import { UserMessage } from "@/components/ds/UserMessage";

export default function Demo() {
  return (
    <div className="flex w-full flex-col items-stretch gap-3 rounded-lg bg-neutral-900 p-6 dark:bg-neutral-100">
      <UserMessage>Add a liquid-glass variant to the settings panel.</UserMessage>
      <UserMessage>
        Please also audit the whole component library for contrast issues and
        fix anything that falls below 4.5 to 1 — then push the branch when
        you are done.
      </UserMessage>
      <UserMessage density="compact">Ship it.</UserMessage>
    </div>
  );
}

export const demoSource = `<UserMessage>
  Add a liquid-glass variant to the settings panel.
</UserMessage>

<UserMessage>
  Please also audit the whole component library for contrast issues…
</UserMessage>

<UserMessage density="compact">Ship it.</UserMessage>`;
