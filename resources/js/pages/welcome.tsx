import { Head, Link, usePage } from "@inertiajs/react";
import {
    ArrowRight,
    Clock3,
    FileText,
    LockKeyhole,
    UsersRound,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { dashboard, login, register } from "@/routes";

export default function Welcome() {
    const { auth, currentTeam } = usePage().props;
    const dashboardUrl = currentTeam ? dashboard(currentTeam.slug) : "/";
    const primaryHref = auth.user ? dashboardUrl : register();

    return (
        <>
            <div className="min-h-screen bg-background text-foreground">
                <header className="border-b bg-white/90 dark:bg-card">
                    <nav
                        aria-label="Main navigation"
                        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
                    >
                        <Link
                            href={dashboardUrl}
                            className="rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
                        >
                            <AppLogo />
                        </Link>
                        <div className="flex items-center gap-3">
                            <a
                                href="#features"
                                className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
                            >
                                Features
                            </a>
                            {auth.user ? (
                                <Link
                                    href={dashboardUrl}
                                    className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                >
                                    Open workspace
                                    <ArrowRight className="size-4" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        Get started
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main>
                    <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-28">
                        <div className="max-w-2xl">
                            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl sm:leading-[1.12] dark:text-white">
                                Good ideas deserve a place to take shape.
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                                Create clear, thoughtfully formatted documents
                                and share them with the people who make your
                                work better.
                            </p>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href={primaryHref}
                                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                >
                                    {auth.user
                                        ? "Go to your documents"
                                        : "Create your workspace"}
                                    <ArrowRight className="size-4" />
                                </Link>
                                <a
                                    href="#features"
                                    className="inline-flex h-11 items-center justify-center rounded-md border bg-white px-5 text-sm font-medium transition-colors hover:bg-muted dark:bg-card"
                                >
                                    Explore the features
                                </a>
                            </div>
                            <p className="mt-4 text-sm text-muted-foreground">
                                A focused editor. Sharing that stays simple.
                            </p>
                        </div>

                        <div
                            aria-label="Preview of a shared project document"
                            className="relative mx-auto w-full max-w-lg"
                        >
                            <div className="absolute -inset-5 rounded-[2rem] bg-sky-100/70 blur-2xl dark:bg-sky-950/30" />
                            <div className="relative overflow-hidden rounded-2xl border bg-white shadow-xl shadow-slate-900/5 dark:bg-card">
                                <div className="flex items-center justify-between border-b px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                                            <FileText className="size-5" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-medium">
                                                Project brief
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Edited just now
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className="flex -space-x-2"
                                        aria-hidden="true"
                                    >
                                        <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-sky-200 text-xs font-semibold text-sky-900 dark:border-card">
                                            J
                                        </span>
                                        <span className="flex size-8 items-center justify-center rounded-full border-2 border-white bg-indigo-200 text-xs font-semibold text-indigo-900 dark:border-card">
                                            M
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-5 px-7 py-8 sm:px-10">
                                    <div className="space-y-2">
                                        <div className="h-5 w-2/3 rounded bg-slate-800/90 dark:bg-slate-200/90" />
                                        <div className="h-2.5 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
                                    </div>
                                    <div className="space-y-2.5 pt-2">
                                        <div className="h-2 w-full rounded bg-slate-100 dark:bg-slate-800" />
                                        <div className="h-2 w-[94%] rounded bg-slate-100 dark:bg-slate-800" />
                                        <div className="h-2 w-[88%] rounded bg-slate-100 dark:bg-slate-800" />
                                    </div>
                                    <div className="rounded-lg border-l-2 border-sky-400 bg-sky-50/80 px-4 py-3 text-sm leading-6 text-slate-700 dark:bg-sky-950/40 dark:text-slate-200">
                                        Shared notes, decisions, and next steps
                                        — together in one clear place.
                                    </div>
                                    <div className="space-y-2.5">
                                        <div className="h-2 w-[96%] rounded bg-slate-100 dark:bg-slate-800" />
                                        <div className="h-2 w-[76%] rounded bg-slate-100 dark:bg-slate-800" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between border-t bg-slate-50/70 px-5 py-3 text-xs text-muted-foreground dark:bg-slate-900/40">
                                    <span>Saved to your workspace</span>
                                    <span className="rounded-full border bg-white px-2.5 py-1 dark:bg-card">
                                        Can edit
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section
                        id="features"
                        className="border-y bg-white dark:bg-card"
                    >
                        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
                            <div className="max-w-xl">
                                <p className="text-sm font-semibold tracking-wide text-primary">
                                    MADE FOR THE WORK
                                </p>
                                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Everything you need to move from draft to
                                    done.
                                </h2>
                            </div>
                            <div className="mt-10 grid gap-8 md:grid-cols-3">
                                <article className="space-y-3">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                                        <FileText className="size-5" />
                                    </span>
                                    <h3 className="font-semibold">
                                        Writing without friction
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        A clean editor keeps the attention on
                                        your words, with the formatting you
                                        actually use.
                                    </p>
                                </article>
                                <article className="space-y-3">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                                        <UsersRound className="size-5" />
                                    </span>
                                    <h3 className="font-semibold">
                                        Sharing with clarity
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        Invite a collaborator and choose whether
                                        they can edit or simply read.
                                    </p>
                                </article>
                                <article className="space-y-3">
                                    <span className="flex size-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                                        <LockKeyhole className="size-5" />
                                    </span>
                                    <h3 className="font-semibold">
                                        Your work, yours to manage
                                    </h3>
                                    <p className="text-sm leading-6 text-muted-foreground">
                                        Documents stay private unless you choose
                                        to share them with someone.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-14 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                <Clock3 className="size-4" />
                                Start with a blank page
                            </div>
                            <h2 className="mt-2 text-xl font-semibold tracking-tight">
                                Make room for your next good idea.
                            </h2>
                        </div>
                        <Link
                            href={primaryHref}
                            className="inline-flex h-11 items-center justify-center gap-2 self-start rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none sm:self-auto"
                        >
                            {auth.user ? "Open workspace" : "Get started"}
                            <ArrowRight className="size-4" />
                        </Link>
                    </section>
                </main>

                <footer className="border-t bg-white dark:bg-card">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <Link
                            href={dashboardUrl}
                            className="rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none"
                        >
                            <AppLogo />
                        </Link>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            <a
                                href="#features"
                                className="transition-colors hover:text-foreground"
                            >
                                Features
                            </a>
                            <Link
                                href={auth.user ? dashboardUrl : login()}
                                className="transition-colors hover:text-foreground"
                            >
                                {auth.user ? "Workspace" : "Sign in"}
                            </Link>
                            {!auth.user && (
                                <Link
                                    href={register()}
                                    className="transition-colors hover:text-foreground"
                                >
                                    Create account
                                </Link>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
