import { RocketIcon, OrbitIcon, SatelliteIcon, CpuIcon } from "lucide-react";

import { BentoGrid, BentoCard } from "@/components/ui/block/bento";

export default function BentoShowcaseSpace() {
  return (
    <BentoGrid>
      <BentoCard
        name="Interstellar Compute"
        description="Ultra-low latency distributed compute nodes operating beyond planetary scale."
        href="#"
        cta="Explore compute"
        Icon={CpuIcon}
        className="md:col-span-2"
        background={
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-cyan-500/10">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          </div>
        }
      />

      <BentoCard
        name="Orbital Network"
        description="A resilient mesh of satellites forming a self-healing data backbone in orbit."
        href="#"
        cta="View network"
        Icon={OrbitIcon}
        className="md:col-span-1"
        background={
          <div className="absolute inset-0 bg-linear-to-tr from-violet-500/10 to-transparent">
            <div className="absolute top-1/3 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-2xl" />
          </div>
        }
      />

      <BentoCard
        name="Deep Space Launch"
        description="Launch pipelines engineered for zero-downtime deployments at cosmic scale."
        href="#"
        cta="Start launch"
        Icon={RocketIcon}
        className="md:col-span-1"
        background={
          <div className="absolute inset-0 bg-linear-to-b from-sky-500/10 to-transparent">
            <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
          </div>
        }
      />

      <BentoCard
        name="Autonomous Satellites"
        description="AI-driven satellites that adapt, reroute, and optimize themselves in real time."
        href="#"
        cta="Inspect systems"
        Icon={SatelliteIcon}
        className="md:col-span-2"
        background={
          <div className="absolute inset-0 bg-linear-to-br from-emerald-500/10 via-transparent to-teal-500/10">
            <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
          </div>
        }
      />
    </BentoGrid>
  );
}
