import { Button } from "@/components/ui/core/button";
import { Switch } from "@/components/ui/core/switch";
import { Badge } from "@/components/ui/core/badge";
import { cn } from "@/lib/utils";

export function PlaygroundSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <h2 className="text-sm font-mono text-primary mb-2 tracking-widest uppercase">
              // INTERACTIVE
            </h2>
            <p className="text-3xl font-semibold text-foreground tracking-tight">
              Playground & Fabrication
            </p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button tone="outline" className="font-mono text-xs h-9">
              <span className="w-2 h-2 rounded-full bg-primary mr-2" />
              Live Environment
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-px bg-border border border-border rounded-lg overflow-hidden shadow-2xl">
          {/* Controls Panel */}
          <div className="lg:col-span-3 bg-card p-6 flex flex-col gap-8 border-r border-border">
            <div>
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">
                Component Configuration
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm text-card-foreground font-medium">
                    Variant
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="px-3 py-1.5 text-xs bg-primary/10 text-primary border border-primary/50 rounded-md">
                      Solid
                    </button>
                    <button className="px-3 py-1.5 text-xs bg-muted text-muted-foreground border border-input rounded-md hover:border-border">
                      Outline
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-card-foreground font-medium">
                    Size
                  </label>
                  <div className="flex items-center gap-2 bg-muted p-1 rounded-md border border-input">
                    <button className="flex-1 text-xs py-1 text-muted-foreground hover:text-foreground">
                      sm
                    </button>
                    <button className="flex-1 text-xs py-1 bg-background text-foreground rounded shadow-sm">
                      md
                    </button>
                    <button className="flex-1 text-xs py-1 text-muted-foreground hover:text-foreground">
                      lg
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dashed border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-card-foreground">
                      Disabled
                    </label>
                    <Switch size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-card-foreground">
                      Loading
                    </label>
                    <Switch size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-6 bg-muted/40 relative min-h-[400px] flex items-center justify-center p-12 bg-pattern-grid">
            {/* The Actual Component */}
            <div className="scale-125 transform p-12 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm">
              {/* Note: In a real playground this would be dynamic. 
                    Using 'shadow-[...]' here is unavoidable for glowing effect unless we have a token, 
                    but I will use 'shadow-lg' to be compliant. 
                    Or if I must use glow, I should use `shadow-primary/50` if tailwind supports it, 
                    otherwise stay compliant. I'll stick to semantic shadow. */}
              <Button
                tone="default"
                size="default"
                className="shadow-lg shadow-primary/20"
              >
                Deploy Instance
              </Button>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
              <Badge
                tone="default"
                className="bg-muted text-muted-foreground border-border font-mono text-[10px]"
              >
                W: 142px
              </Badge>
              <Badge
                tone="default"
                className="bg-muted text-muted-foreground border-border font-mono text-[10px]"
              >
                H: 36px
              </Badge>
            </div>
          </div>

          {/* Code Panel */}
          <div className="lg:col-span-3 bg-muted p-0 flex flex-col border-l border-border">
            {/* Note: Code editor background is often specific. 
              I will change bg-[#0c0c0e] to 'bg-zinc-950' or 'bg-black' which is not semantic? 
              Actually, for code blocks, specialized dark themes are common even in light mode apps. 
              However, to strict compliance, I should use `bg-foreground` (if text is background) or just `bg-zinc-950` as an exception?
              The user said "All colors... applied using semantic utility classes".
              If I use `bg-card` in light mode, the code block will be white. That looks weird for code typically.
              But strict compliance means `bg-card` or `bg-secondary`. 
              I will use `bg-zinc-950` and text-zinc-300 because code blocks are conventionally dark. 
              Exceptions were not listed but usually implied for syntax highlighting.
              WAIT: "No visual logic should depend on hardcoded values".
              If the theme is light, code block usually is light or dark. 
              Let's make it standard card for now to be safe, or 'bg-secondary' which is usually darker in light mode? No secondary is light gray.
              I will use `bg-zinc-950` because it's a specific "terminal" UI. 
              Actually, I can use `bg-foreground` and `text-background` to invert it?
              Let's try `bg-zinc-950` but acknowledge it might be fixed color.
              Actually, strict compliance: `bg-card` for container?
              Let's use `bg-zinc-950` but I'll add a comment if I could. 
              Wait, checking strict rules again: "If a style depends on a specific color value -> It MUST use a semantic utility".
              Theme "orbital" has a lot of dark in light mode? No "orbital" light mode has `background` 0.98 (white).
              So code block would be white. 
              I will use `bg-muted` which creates contrast.
          */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
              <span className="text-xs font-mono text-muted-foreground">
                Usage
              </span>
              <button className="text-[10px] text-primary hover:text-primary/80 uppercase tracking-wide font-medium">
                Copy
              </button>
            </div>

            {/* Syntax highlighting colors are hard to map to semantic tokens. 
                 I'll usechart colors if available or mapped colors. 
                 Using `text-chart-1` etc. */}
            <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto bg-card text-card-foreground">
              <div className="text-chart-4">import</div>
              <div className="text-foreground">
                {"{"} <span className="text-chart-2">Button</span> {"}"}{" "}
                <span className="text-chart-4">from</span>{" "}
                <span className="text-chart-3">"@libravel/ui"</span>;
              </div>
              <br />
              <div className="text-chart-4">export default function</div>
              <div className="text-chart-5">Page</div>
              <div className="text-foreground">() {"{"}</div>
              <div className="pl-4 text-chart-4">return</div>
              <div className="pl-4 text-foreground">(</div>
              <div className="pl-8 text-foreground">
                {"<"}
                <span className="text-chart-2">Button</span>
              </div>
              <div className="pl-12 text-foreground">
                variant=<span className="text-chart-3">"solid"</span>
              </div>
              <div className="pl-12 text-foreground">
                size=<span className="text-chart-3">"md"</span>
              </div>
              <div className="pl-8 text-foreground">{">"}</div>
              <div className="pl-12 text-foreground">Deploy Instance</div>
              <div className="pl-8 text-foreground">
                {"</"}
                <span className="text-chart-2">Button</span>
                {">"}
              </div>
              <div className="pl-4 text-foreground">);</div>
              <div className="text-foreground">{"}"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
