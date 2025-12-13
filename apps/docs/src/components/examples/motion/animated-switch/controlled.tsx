"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatedSwitch } from "@/components/ui/motion/animated-switch";
import { Button } from "@/components/ui/core/button";
import { Grip, Shuffle, Zap } from "lucide-react";

export default function ControlledAnimatedSwitch() {
  const [controlled, setControlled] = useState<boolean>(false);
  const [stressRunning, setStressRunning] = useState(false);
  const stressRef = useRef<number | null>(null);
  const [slowMotion, setSlowMotion] = useState(false);

  useEffect(() => {
    return () => {
      if (stressRef.current) {
        clearInterval(stressRef.current);
      }
    };
  }, []);

  const handleControlledChange = (v: boolean) => {
    setControlled(v);
  };

  const runStressTest = (fast = true) => {
    if (stressRunning) {
      if (stressRef.current) {
        clearInterval(stressRef.current);
      }
      setStressRunning(false);
      return;
    }

    setStressRunning(true);

    const intervalMs = fast ? 80 : 250;
    stressRef.current = window.setInterval(() => {
      setControlled((s) => {
        const next = !s;
        return next;
      });
    }, intervalMs);
  };

  const runSlowMotionClick = () => {
    setSlowMotion(true);
    const sequence = [0, 300, 600, 900];
    sequence.forEach((delay, idx) => {
      window.setTimeout(() => {
        setControlled((s) => {
          const next = !s;
          if (idx === sequence.length - 1) setSlowMotion(false);
          return next;
        });
      }, delay + 50);
    });
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-4">
        <AnimatedSwitch
          value={controlled}
          onValueChange={handleControlledChange}
        />
        <div className="flex flex-col">
          <div className="text-sm font-medium">Controlled switch</div>
          <div className="text-xs text-muted-foreground">
            Click buttons to demo sequences
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 items-center gap-2">
        <Button onClick={() => runSlowMotionClick()}>
          <Grip /> Slow-mo click
        </Button>

        <Button
          onClick={() => runStressTest(true)}
          tone={stressRunning ? "destructive" : "default"}
        >
          <Shuffle /> {stressRunning ? "Stop Stress" : "Rapid test"}
        </Button>

        <Button onClick={() => runStressTest(false)} className="col-span-2">
          <Zap /> Moderate stress
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        Slow-motion sequences emulate micro-interactions (bounce, overshoot,
        settle). Stress tests exercise spring stability.
      </div>
    </div>
  );
}
