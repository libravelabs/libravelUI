'use client';

import {
    NavbarProvider,
    Navbar,
    NavbarSection,
    NavbarSpacer,
} from '@/components/ui/core/navbar';
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuViewport,
} from '@/components/ui/core/navigation-menu';
import { Button } from '@/components/ui/core/button';
import {
    Sparkles,
    BarChart3,
    Users,
    CreditCard,
    LifeBuoy,
    Bell,
    Search,
    Github,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/core/separator';

export default function NavigationMenuShowcase() {
    return (
        <NavbarProvider className="min-h-screen bg-muted/20">
            <Navbar isSticky placement="top" variant="float" className="mt-4">
                <NavbarSection>
                    <div className="flex items-center gap-2 pr-4 pl-2">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                            <Sparkles className="size-4" />
                        </div>
                        <span className="text-base font-bold tracking-tight">
                            LibravelUI
                        </span>
                    </div>

                    {/* The new Radix-like Navigation Menu */}
                    <NavigationMenu
                        className="max-w-max"
                        delayDuration={150}
                        skipDelayDuration={200}
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem value="products">
                                <NavigationMenuTrigger>
                                    Products
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="w-[500px] gap-3 p-4 md:w-[600px] md:grid-cols-[.75fr_1fr]">
                                    <div className="grid h-full grid-cols-1 gap-4">
                                        <div className="flex flex-col justify-end rounded-md bg-linear-to-b from-muted/50 to-muted p-6 no-underline outline-none select-none focus:shadow-md">
                                            <Sparkles className="h-6 w-6" />
                                            <div className="mt-4 mb-2 text-lg font-medium">
                                                Core System
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components
                                                built with Radix UI and Tailwind
                                                CSS.
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="grid grid-cols-1 gap-1">
                                        <ListItem
                                            href="#"
                                            title="Analytics"
                                            icon={
                                                <BarChart3 className="size-4 text-sky-500" />
                                            }
                                        >
                                            Real-time data visualization and
                                            reporting tools.
                                        </ListItem>
                                        <ListItem
                                            href="#"
                                            title="Team Management"
                                            icon={
                                                <Users className="size-4 text-indigo-500" />
                                            }
                                        >
                                            Collaborate with your team securely.
                                        </ListItem>
                                        <ListItem
                                            href="#"
                                            title="Billing"
                                            icon={
                                                <CreditCard className="size-4 text-emerald-500" />
                                            }
                                        >
                                            Manage subscriptions and payments
                                            via Stripe.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem value="resources">
                                <NavigationMenuTrigger>
                                    Resources
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="w-[400px] p-4 md:w-[500px]">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="mb-2 text-sm leading-none font-medium text-muted-foreground">
                                                Getting Started
                                            </h4>
                                            <ul className="space-y-2">
                                                <ListItem
                                                    href="#"
                                                    title="Introduction"
                                                >
                                                    Basic concepts and setup.
                                                </ListItem>
                                                <ListItem
                                                    href="#"
                                                    title="Installation"
                                                >
                                                    Step-by-step guide.
                                                </ListItem>
                                                <ListItem
                                                    href="#"
                                                    title="Theming"
                                                >
                                                    Customizing the look.
                                                </ListItem>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="mb-2 text-sm leading-none font-medium text-muted-foreground">
                                                Community
                                            </h4>
                                            <ul className="space-y-2">
                                                <ListItem
                                                    href="#"
                                                    icon={
                                                        <Github className="size-3.5" />
                                                    }
                                                    title="GitHub"
                                                >
                                                    Report issues & PRs.
                                                </ListItem>
                                                <ListItem
                                                    href="#"
                                                    icon={
                                                        <LifeBuoy className="size-3.5" />
                                                    }
                                                    title="Support"
                                                >
                                                    Get help from the team.
                                                </ListItem>
                                                <ListItem
                                                    href="#"
                                                    title="Discord"
                                                >
                                                    Join the conversation.
                                                </ListItem>
                                            </ul>
                                        </div>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem value="developers">
                                <NavigationMenuTrigger>
                                    Developers
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="w-[350px] p-4">
                                    <ul className="grid gap-2">
                                        <ListItem
                                            href="#"
                                            title="API Reference"
                                        >
                                            Complete REST API documentation.
                                        </ListItem>
                                        <ListItem href="#" title="SDKs">
                                            Official libraries for JS, PHP, and
                                            Python.
                                        </ListItem>
                                        <ListItem
                                            href="#"
                                            title="Authentication"
                                        >
                                            Guide to OAuth2 and API keys.
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>

                        {/* This component handles the sliding animation between items */}
                        <NavigationMenuViewport className="top-[calc(100%+0.5rem)]" />
                    </NavigationMenu>
                </NavbarSection>

                <NavbarSpacer />

                <NavbarSection>
                    <div className="hidden items-center gap-2 md:flex">
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
                        <Button>Get Started</Button>
                    </div>
                </NavbarSection>
            </Navbar>

            <div className="mx-auto max-w-7xl px-6 py-24 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Radix-like Navigation
                    <br />
                    <span className="text-primary">Without Radix UI</span>
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    A fully custom implementation using React, Tailwind, and
                    Framer Motion. Features shared viewports, direction-aware
                    entry/exit animations, and flexible content
                    structure—integrated directly into your existing system.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Button size="lg" className="h-12 px-8 text-base">
                        View Documentation
                    </Button>
                    <Button
                        size="lg"
                        tone="outline"
                        className="h-12 px-8 text-base"
                    >
                        <Github className="mr-2 size-4" />
                        GitHub Repo
                    </Button>
                </div>
            </div>
        </NavbarProvider>
    );
}

const ListItem = ({
    className,
    title,
    children,
    href,
    icon,
    ...props
}: React.ComponentProps<'a'> & { title: string; icon?: React.ReactNode }) => {
    return (
        <li>
            <a
                href={href}
                className={cn(
                    'block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                    className,
                )}
                {...props}
            >
                <div className="flex items-center gap-2 text-sm leading-none font-medium">
                    {icon}
                    {title}
                </div>
                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                    {children}
                </p>
            </a>
        </li>
    );
};
