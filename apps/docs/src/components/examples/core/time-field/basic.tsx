"use client";

import { getLocalTimeZone, now, parseTime } from "@internationalized/date";
import { TimeField } from "@/components/ui/core/time-field";

export default function BasicTimeField() {
  const current = now(getLocalTimeZone());
  const defaultTime = parseTime(current.toString().slice(11, 16));

  return <TimeField label="Time" defaultValue={defaultTime} />;
}
