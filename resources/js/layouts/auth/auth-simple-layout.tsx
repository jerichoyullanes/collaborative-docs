import { Link } from '@inertiajs/react';
import BrandLogo from '@/components/brand-logo';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh items-center justify-center bg-slate-50 px-5 py-10 dark:bg-background">
            <main className="w-full max-w-md">
                <div className="mb-7 flex justify-center">
                    <Link
                        href={home()}
                        className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
                    >
                        <BrandLogo className="w-32 sm:w-36" />
                    </Link>
                </div>
                <section className="rounded-2xl border bg-white p-6 shadow-sm shadow-slate-900/5 sm:p-8 dark:bg-card">
                    <div className="mb-7 space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {title}
                        </h1>
                        <p className="text-sm leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </section>
                <p className="mt-6 text-center text-xs text-muted-foreground">
                    A clear space for the work you do together.
                </p>
            </main>
        </div>
    );
}
