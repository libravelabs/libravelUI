"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatedSwitch } from "@/components/ui/motion/animated-switch";
import { Button } from "@/components/ui/core/button";
import { Grip, Shuffle, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/core/card";

export default function AnimatedSwitchShowcase() {
  const [controlled, setControlled] = useState<boolean>(false);
  const [log, setLog] = useState<string[]>([]);
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

  const pushLog = (msg: string) => {
    setLog((s) => [msg, ...s].slice(0, 8));
  };

  const handleControlledChange = (v: boolean) => {
    setControlled(v);
    pushLog(`controlled → ${v}`);
  };

  const runStressTest = (fast = true) => {
    if (stressRunning) {
      if (stressRef.current) {
        clearInterval(stressRef.current);
      }
      setStressRunning(false);
      pushLog("Stress test stopped");
      return;
    }

    setStressRunning(true);
    pushLog(`${fast ? "Rapid" : "Moderate"} stress test started`);

    const intervalMs = fast ? 80 : 250;
    stressRef.current = window.setInterval(() => {
      setControlled((s) => {
        const next = !s;
        pushLog(`stress toggle → ${next}`);
        return next;
      });
    }, intervalMs);
  };

  const runSlowMotionClick = () => {
    setSlowMotion(true);
    pushLog("Slow-motion sequence started");
    const sequence = [0, 300, 600, 900];
    sequence.forEach((delay, idx) => {
      window.setTimeout(() => {
        setControlled((s) => {
          const next = !s;
          pushLog(`slow step ${idx + 1} → ${next}`);
          if (idx === sequence.length - 1) setSlowMotion(false);
          return next;
        });
      }, delay + 50);
    });
  };

  const brokenClass = "w-28 h-8 p-2";

  return (
    <section className="grid gap-6">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Card className="rounded-2xl bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle>Pristine — No extra className</CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground mt-1">
                Smooth, precise, and flawless motion.{" "}
                <strong>No extra sizing/padding classes</strong>.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mt-6 flex items-center gap-6">
              <div className="p-6 rounded-lg bg-[linear-gradient(180deg,var(--background)_0%,rgba(0,0,0,0.04)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
                <AnimatedSwitch
                  value={controlled}
                  onValueChange={handleControlledChange}
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Mode</div>
                <div className="flex items-center gap-2">
                  <Button onClick={() => setControlled((s) => !s)}>
                    Toggle controlled
                  </Button>
                  <Button
                    onClick={() =>
                      pushLog(`onValueChange fired → ${controlled}`)
                    }
                  >
                    Inspect callback
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Live state:{" "}
                  <span className="font-medium">{String(controlled)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle>Broken — example of dangerous className</CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground mt-1">
                This demonstrates what happens if you apply sizing/padding
                classes that alter the switch's internal geometry.
                <strong className="ml-1">Do not do this in production.</strong>
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mt-6 flex items-center gap-6">
              <div className="p-6 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.04)_100%)] border border-border/40">
                <AnimatedSwitch
                  defaultValue={false}
                  onValueChange={(v: boolean) =>
                    pushLog(`broken switch → ${v}`)
                  }
                  className={brokenClass}
                />
              </div>

              <div className="space-y-2">
                <div className="text-xs text-muted-foreground">Result</div>
                <div className="text-sm font-medium">
                  Offset handle Clipping Unnatural motion
                </div>
                <div className="text-xs text-muted-foreground">
                  The handle expects exact container geometry (4px → 44px).
                  Changing width/height/padding displaces it.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>

          <CardContent>
            <ul className="mt-4 space-y-3 text-sm">
              <li>Controlled & uncontrolled modes</li>
              <li>
                Real-time{" "}
                <code className="rounded px-1 py-0.5 bg-surface-1">
                  onValueChange
                </code>{" "}
                callbacks
              </li>
              <li>
                Custom{" "}
                <code className="rounded px-1 py-0.5 bg-surface-1">onIcon</code>{" "}
                &{" "}
                <code className="rounded px-1 py-0.5 bg-surface-1">
                  offIcon
                </code>
              </li>
              <li>Motion layout + spring (stiffness: 500, damping: 35)</li>
              <li>
                Smooth precise translation from{" "}
                <code className="rounded px-1 py-0.5 bg-surface-1">
                  left: 4px
                </code>{" "}
                to{" "}
                <code className="rounded px-1 py-0.5 bg-surface-1">
                  left: 44px
                </code>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-card border border-border shadow-lg flex flex-col gap-4">
          <CardHeader>
            <CardTitle>Interaction Cinematic</CardTitle>
          </CardHeader>

          <CardContent>
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

            <div className="grid grid-cols-2 items-center gap-3">
              <Button onClick={() => runSlowMotionClick()}>
                <Grip /> Slow-mo click
              </Button>

              <Button
                onClick={() => runStressTest(true)}
                tone={stressRunning ? "destructive" : "default"}
              >
                <Shuffle /> {stressRunning ? "Stop Stress" : "Rapid test"}
              </Button>

              <Button onClick={() => runStressTest(false)}>
                <Zap /> Moderate stress
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Slow-motion sequences emulate micro-interactions (bounce,
              overshoot, settle). Stress tests exercise spring stability.
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle>Customization — Icons</CardTitle>
          </CardHeader>

          <CardContent className="px-0 py-0">
            <div className="mt-4 flex items-center gap-6">
              <AnimatedSwitch
                defaultValue
                onValueChange={(v: boolean) => pushLog(`custom icon → ${v}`)}
                onIcon={
                  <span className="size-4 inline-flex items-center justify-center">
                    🔆
                  </span>
                }
                offIcon={
                  <span className="size-4 inline-flex items-center justify-center">
                    🌑
                  </span>
                }
              />
              <div className="text-sm">
                <div className="font-medium">Emoji icons</div>
                <div className="text-xs text-muted-foreground">
                  Any React node can be used as icon
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-2xl bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle>Technical breakdown (excerpt)</CardTitle>
        </CardHeader>

        <CardContent>
          <pre className="mt-4 p-4 rounded bg-surface-1 overflow-auto text-sm">
            {`const [internal, setInternal] = useState(defaultValue);
const isControlled = value !== undefined;
const isOn = isControlled ? value : internal;

const switching = useCallback(() => {
  const next = !isOn;
  if (!isControlled) setInternal(next);
  onValueChange?.(next);
}, [isOn, isControlled, onValueChange]);

<motion.div
  layout
  transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.8 }}
  style={{ left: isOn ? "44px" : "4px", top: "4px" }}
/>
`}
          </pre>

          <div className="mt-4 text-sm text-muted-foreground">
            The handle position is calculated with exact pixel offsets (4px /
            44px). Any external class that modifies container{" "}
            <strong>width/height/padding</strong> will alter those offsets and
            break the perceived motion.
          </div>
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="rounded-2xl bg-card border border-border shadow-lg">
          <CardHeader>
            <CardTitle>Real UI — Settings</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Notifications</div>
                  <div className="text-xs text-muted-foreground">
                    Allow push notifications
                  </div>
                </div>
                <AnimatedSwitch
                  defaultValue
                  onValueChange={(v: boolean) =>
                    pushLog(`settings notifications → ${v}`)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Sync</div>
                  <div className="text-xs text-muted-foreground">
                    Auto-sync across devices
                  </div>
                </div>
                <AnimatedSwitch
                  value={controlled}
                  onValueChange={handleControlledChange}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-card border border-border shadow-lg flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Product photography — mobile mock</CardTitle>
            <CardDescription>
              <p className="text-sm text-muted-foreground mt-2">
                Floating switch, premium gloss, dark mode aesthetic.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mt-6 flex items-center justify-center">
              <div className="p-6 rounded-3xl bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent)] shadow-2xl">
                <AnimatedSwitch
                  defaultValue
                  onValueChange={(v: boolean) => pushLog(`mock → ${v}`)}
                />
              </div>
            </div>

            <div className="mt-6 text-right">
              <div className="text-sm font-semibold">
                AnimatedSwitch — perfect as it is.
              </div>
              <div className="text-xs text-muted-foreground">
                No extra className. No compromise.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-2xl bg-card border border-border shadow-lg">
        <CardHeader>
          <CardTitle>Live events</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded p-3 bg-surface-1 min-h-[120px]">
              <div className="text-xs text-muted-foreground mb-2">
                Event log
              </div>
              <ul className="text-sm space-y-2">
                {log.length === 0 ? (
                  <li className="text-xs text-muted-foreground">
                    No events yet
                  </li>
                ) : null}
                {log.map((l, i) => (
                  <li key={i} className="text-sm">
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded p-3 bg-surface-1">
              <div className="text-xs text-muted-foreground mb-2">Controls</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Button onClick={() => setControlled((s) => !s)}>
                    Toggle controlled
                  </Button>
                  <Button onClick={() => setLog([])}>Clear log</Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={() => runStressTest(true)}>
                    Rapid stress
                  </Button>
                  <Button onClick={() => runStressTest(false)}>
                    Moderate stress
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button onClick={() => runSlowMotionClick()}>
                    Slow-motion demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center py-6">
        <div className="text-lg font-semibold">
          “AnimatedSwitch — perfect as it is.”
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          No extra className. No compromise.
        </div>
      </footer>
    </section>
  );
}
