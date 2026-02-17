import {
  CpuIcon,
  RocketIcon,
  SatelliteIcon,
  OrbitIcon,
  RadarIcon,
  SparklesIcon,
} from "lucide-react";

import { BentoGrid, BentoCard } from "@/components/ui/block/bento";

const FEATURES = [
  {
    name: "Quantum Core",
    description:
      "Next-gen computation powered by probabilistic execution and temporal optimization.",
    href: "#",
    cta: "Open core",
    Icon: CpuIcon,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-fuchsia-500/10 via-transparent to-indigo-500/10">
        <div className="absolute -top-32 left-1/3 size-112 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>
    ),
  },
  {
    name: "Orbital AI Mesh",
    description:
      "Autonomous intelligence nodes synchronizing across low-orbit infrastructure.",
    href: "#",
    cta: "View mesh",
    Icon: OrbitIcon,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 to-transparent">
        <div className="absolute top-1/4 left-1/2 size-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
      </div>
    ),
  },
  {
    name: "Deep Space Radar",
    description:
      "Real-time anomaly detection scanning millions of celestial vectors per second.",
    href: "#",
    cta: "Scan space",
    Icon: RadarIcon,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-b from-emerald-500/10 to-transparent">
        <div className="absolute bottom-0 left-1/3 size-80 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>
    ),
  },
  {
    name: "Launch Fabric",
    description:
      "Zero-gravity deployment fabric designed for continuous interstellar delivery.",
    href: "#",
    cta: "Initiate launch",
    Icon: RocketIcon,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-sky-500/10 via-transparent to-blue-500/10">
        <div className="absolute right-0 top-1/4 size-104 rounded-full bg-sky-500/20 blur-3xl" />
      </div>
    ),
  },
  {
    name: "Sentient Satellites",
    description:
      "Self-aware orbital units capable of autonomous decision-making and rerouting.",
    href: "#",
    cta: "Inspect units",
    Icon: SatelliteIcon,
    className: "md:col-span-1",
    background: (
      <div className="absolute inset-0 bg-linear-to-tr from-violet-500/10 to-transparent">
        <div className="absolute top-1/3 right-1/4 size-72 rounded-full bg-violet-500/20 blur-3xl" />
      </div>
    ),
  },
  {
    name: "Cosmic Signals",
    description:
      "Ultra-rare signal patterns decoded using stellar-scale pattern synthesis.",
    href: "#",
    cta: "Decode signals",
    Icon: SparklesIcon,
    className: "md:col-span-2",
    background: (
      <div className="absolute inset-0 bg-linear-to-br from-amber-500/10 via-transparent to-rose-500/10">
        <div className="absolute -bottom-32 left-1/4 size-120 rounded-full bg-amber-500/20 blur-3xl" />
      </div>
    ),
  },
];

export default function BentoShowcaseSpaceFuturistic() {
  return (
    <BentoGrid>
      {FEATURES.map((feature) => (
        <BentoCard
          key={feature.name}
          name={feature.name}
          description={feature.description}
          href={feature.href}
          cta={feature.cta}
          Icon={feature.Icon}
          className={feature.className}
          background={feature.background}
        />
      ))}
    </BentoGrid>
  );
}
