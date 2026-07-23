"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

function formatManilaTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: profile.timezone,
    }).format(date);
  } catch {
    return "";
  }
}

/**
 * Shows the current local time in Zachary's timezone. Renders nothing on the
 * server (and until mounted) to avoid a hydration mismatch, then ticks every
 * 30s like the source design.
 */
export function LiveClock({ suffix }: { suffix?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatManilaTime(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;
  return (
    <span suppressHydrationWarning>
      {time} {suffix ?? "local"}
    </span>
  );
}
