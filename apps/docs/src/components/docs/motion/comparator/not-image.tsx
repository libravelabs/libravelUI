"use client";

import {
  Comparator,
  ComparatorPane,
  ComparatorSlider,
} from "@/components/ui/motion/comparator";

export default function CodeDiffComparator() {
  return (
    <Comparator className="relative h-[300px] w-full font-mono text-sm border rounded-lg bg-background max-w-sm">
      <ComparatorPane
        position="left"
        className="bg-[#282A36] text-[#F8F8F2] p-4"
      >
        <pre>
          {`function fetchData() {
  fetch('/api/data')
    .then(res => res.json())
    .then(setData)
    .catch(console.error);
}`}
        </pre>
      </ComparatorPane>

      <ComparatorPane
        position="right"
        className="bg-[#FFFBEB] text-[#1F1F1F] p-4"
      >
        <pre>
          {`async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    setData(data);
  } catch (err) {
    console.error(err);
  }
}`}
        </pre>
      </ComparatorPane>

      <ComparatorSlider className="bg-border">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-foreground/80 px-1.5 py-0.5 text-xs text-background shadow">
          diff
        </div>
      </ComparatorSlider>
    </Comparator>
  );
}
