"use client";

import { Time } from "@internationalized/date";
import { useState } from "react";
import { Switch } from "@/components/ui/core/switch";
import { TimeField } from "@/components/ui/core/time-field";

export default function HourCycle() {
  const [hc, setHc] = useState<12 | 24>(24);
  const [value, setValue] = useState(new Time(13, 45));
  return (
    <div className="flex flex-col gap-6 w-28">
      <Switch
        label={`${hc} hour`}
        isSelected={hc === 24}
        onChange={() => setHc((prevHc) => (prevHc === 24 ? 12 : 24))}
      />
      <TimeField
        label="Event Time"
        value={value}
        onChange={(newValue) => setValue(newValue!)}
        hourCycle={hc}
      />
    </div>
  );
}
