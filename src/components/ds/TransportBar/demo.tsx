"use client";

/**
 * TransportBar demo — a representative mid-playback state: 00:42 elapsed of
 * 12:08 at 1.0× speed, record disarmed.
 */

import React from "react";
import { TransportBar } from "@/components/ds/TransportBar";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center py-6">
      <TransportBar currentTime="00:42" totalTime="12:08" speed="1.0×" />
    </div>
  );
}

export const demoSource = `<TransportBar currentTime="00:42" totalTime="12:08" speed="1.0×" />`;
