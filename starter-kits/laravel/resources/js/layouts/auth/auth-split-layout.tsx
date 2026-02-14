import { Link, usePage } from '@inertiajs/react';
import { AppLogo } from '@/components/logo';
import { home } from '@/routes';
import type { AuthLayoutProps, SharedData } from '@/types';

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col rounded-t-3xl p-12 text-foreground lg:flex">
                <div className="absolute inset-0 m-2 rounded-3xl bg-[url('/assets/dystopian.png')] bg-cover bg-center opacity-60 dark:opacity-40" />
                <div className="absolute inset-x-0 bottom-0 m-2 h-2/3 rounded-b-3xl bg-linear-to-t from-background/80 to-transparent" />
                <div className="flex w-full items-center">
                    <Link href={home()}>
                        <AppLogo />
                    </Link>
                </div>
                {quote && (
                    <div className="relative mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-4xl">
                                &ldquo;{quote.message}&rdquo;
                            </p>
                            <footer className="text-xl opacity-70">
                                ~ {quote.author}
                            </footer>
                        </blockquote>
                    </div>
                )}
            </div>

            <div className="flex h-full w-full flex-col">
                <Link
                    href={home()}
                    className="relative mt-8 self-center lg:hidden"
                >
                    <AppLogo />
                </Link>

                <div className="mx-auto flex w-full flex-1 flex-col justify-center space-y-6 sm:w-md">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-medium tracking-tighter lg:text-4xl">
                            {title}
                        </h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
