'use client';

import {
    NavbarProvider,
    Navbar,
    NavbarSection,
    NavbarSpacer,
    NavbarItem,
    NavbarTrigger,
    NavbarStart,
    NavbarMobile,
    NavbarInset,
} from '@/components/ui/core/navbar';
import { Button } from '@/components/ui/core/button';
import {
    LayoutDashboard,
    Settings,
    Users,
    Package,
    Bell,
    Search,
    Github,
    Sparkles,
} from 'lucide-react';
import { Separator } from '@/components/ui/core/separator';

export default function NavbarShowcase() {
    return (
        <NavbarProvider className="min-h-screen bg-muted/20">
            {/* Standard Dashboard Navbar */}
            <Navbar isSticky placement="top" variant="default">
                <NavbarStart>
                    <div className="flex items-center gap-2 pr-4 pl-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Sparkles className="size-4" />
                        </div>
                        <span className="font-bold">LibravelUI</span>
                    </div>
                </NavbarStart>

                <NavbarSection>
                    <NavbarItem href="#" isCurrent>
                        Dashboard
                    </NavbarItem>
                    <NavbarItem href="#">Projects</NavbarItem>
                    <NavbarItem href="#">Team</NavbarItem>
                    <NavbarItem href="#">Settings</NavbarItem>
                </NavbarSection>

                <NavbarSpacer />

                <NavbarSection>
                    <div className="flex items-center gap-2">
                        <Button tone="ghost" size="sm" iconOnly>
                            <Search className="size-4" />
                        </Button>
                        <Button tone="ghost" size="sm" iconOnly>
                            <Bell className="size-4" />
                        </Button>
                        <Separator
                            orientation="vertical"
                            className="mx-1 h-6"
                        />
                        <Button size="sm">New Project</Button>
                    </div>
                </NavbarSection>
            </Navbar>

            {/* Float Navbar Example */}
            <Navbar isSticky placement="top" variant="float" className="mt-8">
                <NavbarSection>
                    <NavbarItem href="#">Overview</NavbarItem>
                    <NavbarItem href="#">Analytics</NavbarItem>
                    <NavbarItem href="#">Reports</NavbarItem>
                </NavbarSection>
                <NavbarSpacer />
                <NavbarSection>
                    <Button tone="ghost" size="sm">
                        <Github className="mr-2 size-4" />
                        GitHub
                    </Button>
                </NavbarSection>
            </Navbar>

            {/* Main Content Area with Inset Layout */}
            <NavbarInset className="mt-12">
                <div className="space-y-8">
                    <header>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Navbar Showcase
                        </h1>
                        <p className="text-muted-foreground">
                            Specialized components for global and regional
                            application navigation.
                        </p>
                    </header>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                label: 'Total Users',
                                value: '1,234',
                                icon: Users,
                            },
                            {
                                label: 'Storage',
                                value: '85%',
                                icon: Package,
                            },
                            {
                                label: 'Performance',
                                value: '98.2%',
                                icon: LayoutDashboard,
                            },
                            {
                                label: 'Config',
                                value: 'Active',
                                icon: Settings,
                            },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-4 rounded-xl border bg-card p-6 shadow-sm"
                            >
                                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <stat.icon className="size-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-2xl border border-dashed p-24 text-center">
                        <p className="text-muted-foreground">
                            Dashboard content area using NavbarInset
                        </p>
                    </div>
                </div>
            </NavbarInset>

            {/* Mobile View Support */}
            <NavbarMobile>
                <NavbarTrigger />
                <NavbarSpacer />
                <div className="size-8 rounded-full bg-muted" />
            </NavbarMobile>
        </NavbarProvider>
    );
}
