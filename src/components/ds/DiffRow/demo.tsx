"use client";

/**
 * Demo — a one-line change to shouldArchive in its surrounding context: two
 * context rows above, the removed/added pair, and the closing brace. The
 * indented body lines use a padded span, mirroring the DiffRow idiom.
 */

import React from "react";
import { DiffRow } from "@/components/ds/DiffRow";

export default function Demo() {
  return (
    <DiffRow>
      <DiffRow.DiffLine
        lineType="context"
        oldNumber="41"
        newNumber="41"
        code="const RETENTION_DAYS = 90;"
      />
      <DiffRow.DiffLine
        lineType="context"
        oldNumber="42"
        newNumber="42"
        code="export function shouldArchive(record: LedgerRecord) {"
      />
      <DiffRow.DiffLine
        lineType="removed"
        oldNumber="43"
        code={
          <span className="pl-4">return record.age &gt; RETENTION_DAYS;</span>
        }
      />
      <DiffRow.DiffLine
        lineType="added"
        newNumber="43"
        code={
          <span className="pl-4">
            return record.age &gt;= RETENTION_DAYS || record.status ===
            "settled";
          </span>
        }
      />
      <DiffRow.DiffLine lineType="context" oldNumber="44" newNumber="44" code="}" />
    </DiffRow>
  );
}

export const demoSource = `<DiffRow>
  <DiffRow.DiffLine lineType="context" oldNumber="41" newNumber="41" code="const RETENTION_DAYS = 90;" />
  <DiffRow.DiffLine lineType="context" oldNumber="42" newNumber="42" code="export function shouldArchive(record: LedgerRecord) {" />
  <DiffRow.DiffLine lineType="removed" oldNumber="43" code={<span className="pl-4">return record.age &gt; RETENTION_DAYS;</span>} />
  <DiffRow.DiffLine lineType="added" newNumber="43" code={<span className="pl-4">return record.age &gt;= RETENTION_DAYS || record.status === "settled";</span>} />
  <DiffRow.DiffLine lineType="context" oldNumber="44" newNumber="44" code="}" />
</DiffRow>`;
