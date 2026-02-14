import { Link, usePage } from '@inertiajs/react';

import { AppearanceButton } from '@/components/appearance-button';
import { AppLogoIcon, AppName } from '@/components/logo';
import { Button } from '@/components/ui/core/button';
import { login, register } from '@/routes';
import type { SharedData } from '@/types';
import { NavUser } from '@/components/nav-user';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <div className="flex min-h-screen flex-col items-center p-6 lg:justify-center lg:p-8">
            <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-full">
                <nav className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <NavUser variant="avatar" />
                    ) : (
                        <>
                            <Link href={login()}>
                                <Button tone="ghost">Log in</Button>
                            </Link>
                            {canRegister && (
                                <Link href={register()}>
                                    <Button tone="outline">Register</Button>
                                </Link>
                            )}
                        </>
                    )}
                </nav>
            </header>
            <div className="relative flex min-h-[85vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2.5rem] border border-border bg-card transition-all duration-700 md:flex-row">
                <div className="relative z-10 flex flex-[1.2] flex-col justify-between p-10 lg:p-20">
                    <div className="space-y-16">
                        <div className="flex items-center gap-4">
                            <AppName className="w-24" />
                            <div className="h-4 w-px bg-border" />
                            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                                Starter Kit
                            </span>
                        </div>

                        <div className="space-y-6">
                            <h1 className="text-4xl leading-[1.05] font-medium tracking-tight text-foreground lg:text-6xl">
                                Engineering
                                <br />
                                <span className="font-mono text-[0.8em] tracking-normal text-muted-foreground opacity-60">
                                    stable_core_lib
                                </span>
                            </h1>

                            <p className="max-w-[440px] text-base leading-relaxed text-muted-foreground lg:text-lg">
                                Professional UI primitives for technical-grade
                                applications. Built for performance,
                                scalability, and developer experience.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link
                                href="https://ui.libravelabs.com/getting-started"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" radius="full">
                                    <AppLogoIcon />
                                    Get Started
                                </Button>
                            </Link>

                            <Link
                                href="https://ui.libravelabs.com/docs/installation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button size="lg" tone="outline" radius="full">
                                    Documentation
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <AppearanceButton />
                        <div className="flex flex-col gap-0.5">
                            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                                Production Ready
                            </span>
                            <span className="font-mono text-[10px] font-semibold text-primary">
                                v1.0.0-stable
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative hidden flex-1 overflow-hidden border-l border-border bg-muted/25 md:flex">
                    <div className="pointer-events-none absolute inset-0 opacity-50">
                        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
                            {Array.from({ length: 36 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="border border-border/40"
                                />
                            ))}
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-[520px] p-20">
                            <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-primary/20" />
                            <div className="absolute inset-12 animate-[spin_30s_linear_infinite_reverse] rounded-full border border-border" />
                            <div className="absolute inset-24 animate-[spin_20s_linear_infinite] rounded-full border border-primary/10" />

                            <div className="absolute inset-1/2 flex h-44 w-72 -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-3xl border border-primary/30 bg-card p-6 shadow-2xl shadow-primary/20 transition-colors hover:border-primary/70">
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <div className="h-2 w-2 rounded-full bg-primary/80" />
                                        <div className="h-2 w-2 rounded-full bg-primary/40" />
                                        <div className="h-2 w-2 rounded-full bg-primary/20" />
                                    </div>
                                    <div className="h-6 w-12 rounded-md border border-primary/20 bg-primary/10" />
                                </div>

                                <div className="space-y-3">
                                    <div className="h-2 w-full rounded-full bg-muted" />
                                    <div className="h-2 w-4/5 rounded-full bg-muted opacity-60" />
                                    <div className="h-2 w-3/5 rounded-full bg-muted opacity-30" />
                                </div>

                                <div className="mt-auto flex gap-3">
                                    <div className="h-10 flex-1 rounded-xl border border-border bg-muted/40" />
                                    <div className="h-10 w-24 rounded-xl bg-primary shadow-md shadow-primary/30" />
                                </div>
                            </div>

                            <div className="absolute top-10 right-12 flex h-24 w-36 flex-col gap-2 rounded-2xl border border-border bg-card/80 p-4 shadow-xl">
                                <div className="h-1 w-12 rounded-full bg-primary/60" />
                                <div className="flex flex-1 items-end gap-1">
                                    <div className="h-1/2 flex-1 rounded-sm bg-chart-1" />
                                    <div className="h-3/4 flex-1 rounded-sm bg-chart-2" />
                                    <div className="h-full flex-1 rounded-sm bg-chart-3" />
                                    <div className="h-2/3 flex-1 rounded-sm bg-chart-4" />
                                </div>
                            </div>

                            <div className="absolute bottom-12 left-8 flex h-28 w-28 rotate-12 items-center justify-center rounded-2xl border border-primary/20">
                                <div className="h-12 w-12 animate-pulse rounded-full border border-primary/40" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-card to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />
                </div>
            </div>
        </div>
    );
}
