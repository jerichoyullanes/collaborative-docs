import { Head, Link, router } from '@inertiajs/react';
import { FileText, LoaderCircle, Plus, Search, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import ImportDocumentDialog from '@/components/documents/import-document-dialog';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    destroy,
    show,
    store,
} from '@/actions/App/Http/Controllers/DocumentController';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

type DocumentCan = {
    update: boolean;
    share: boolean;
    delete: boolean;
};

type OwnedDocument = {
    id: number;
    title: string;
    updatedAt: string | null;
    can: DocumentCan;
};

type SharedDocument = OwnedDocument & {
    ownerName: string;
    permission: 'view' | 'edit';
};

type Props = {
    owned: OwnedDocument[];
    shared: SharedDocument[];
    pendingInvitations?: DashboardInvitation[];
};

type RecentDocument =
    | { document: OwnedDocument; source: 'owned' }
    | { document: SharedDocument; source: 'shared' };

function formatUpdatedAt(value: string | null) {
    if (!value) {
        return 'Date unavailable';
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return 'Date unavailable';
    }

    return `Edited ${new Intl.DateTimeFormat(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(date)}`;
}

function DocumentRow({
    document,
    shared = false,
    deleting = false,
    onDelete,
}: {
    document: OwnedDocument | SharedDocument;
    shared?: boolean;
    deleting?: boolean;
    onDelete?: () => void;
}) {
    return (
        <div className="flex min-w-0 items-center gap-3 px-4 py-3.5 transition-colors hover:bg-slate-50/80 sm:px-5 dark:hover:bg-slate-800/30">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                <FileText className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
                <Link
                    href={show(document.id)}
                    className="block truncate text-sm font-medium hover:text-primary hover:underline hover:underline-offset-4"
                >
                    {document.title}
                </Link>
                <p className="mt-1 truncate text-xs text-muted-foreground">
                    {shared && 'ownerName' in document
                        ? `Shared by ${document.ownerName}${
                              'permission' in document
                                  ? ` · ${document.permission === 'edit' ? 'Can edit' : 'View only'}`
                                  : ''
                          }`
                        : 'Owned by you'}
                    <span aria-hidden="true"> · </span>
                    {formatUpdatedAt(document.updatedAt)}
                </p>
            </div>
            {shared && 'permission' in document ? (
                <Badge
                    variant="secondary"
                    className="hidden shrink-0 sm:inline-flex"
                >
                    {document.permission === 'edit' ? 'Can edit' : 'View only'}
                </Badge>
            ) : null}
            {!shared && document.can.delete ? (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Delete ${document.title}`}
                    disabled={deleting}
                    onClick={() => onDelete?.()}
                    className="size-9 shrink-0 text-muted-foreground hover:text-destructive"
                >
                    {deleting ? (
                        <LoaderCircle className="animate-spin" />
                    ) : (
                        <Trash2 />
                    )}
                </Button>
            ) : null}
        </div>
    );
}

export default function Dashboard({
    owned,
    shared,
    pendingInvitations = [],
}: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );
    const [creatingDocument, setCreatingDocument] = useState(false);
    const [deletingDocumentId, setDeletingDocumentId] = useState<number | null>(
        null,
    );
    const [searchQuery, setSearchQuery] = useState('');

    const searchTerm = searchQuery.trim().toLocaleLowerCase();
    const filteredOwned = useMemo(
        () =>
            owned.filter((document) =>
                document.title.toLocaleLowerCase().includes(searchTerm),
            ),
        [owned, searchTerm],
    );
    const filteredShared = useMemo(
        () =>
            shared.filter(
                (document) =>
                    document.title.toLocaleLowerCase().includes(searchTerm) ||
                    document.ownerName.toLocaleLowerCase().includes(searchTerm),
            ),
        [shared, searchTerm],
    );
    const recentDocuments = useMemo<RecentDocument[]>(
        () =>
            [
                ...filteredOwned.map((document) => ({
                    document,
                    source: 'owned' as const,
                })),
                ...filteredShared.map((document) => ({
                    document,
                    source: 'shared' as const,
                })),
            ]
                .sort((first, second) => {
                    const firstDate = first.document.updatedAt
                        ? new Date(first.document.updatedAt).getTime()
                        : 0;
                    const secondDate = second.document.updatedAt
                        ? new Date(second.document.updatedAt).getTime()
                        : 0;

                    return secondDate - firstDate;
                })
                .slice(0, 3),
        [filteredOwned, filteredShared],
    );

    function deleteDocument(id: number) {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onStart: () => setDeletingDocumentId(id),
            onError: () => toast.error('Unable to delete the document.'),
            onHttpException: () => {
                toast.error('Unable to delete the document.');
            },
            onNetworkError: () => {
                toast.error('Unable to delete the document.');
            },
            onFinish: () => setDeletingDocumentId(null),
        });
    }

    return (
        <>
            <Head title="Your workspace" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-8 sm:px-8 sm:py-10">
                <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-primary">
                            YOUR WORKSPACE
                        </p>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            Good work starts here.
                        </h1>
                        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            Find your documents, pick up where you left off, or
                            start something new.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <ImportDocumentDialog />
                        <Button
                            asChild
                            className="shadow-sm"
                            onClick={() => setCreatingDocument(true)}
                        >
                            <Link
                                href={store()}
                                method="post"
                                as="button"
                                onStart={() => setCreatingDocument(true)}
                                onFinish={() => setCreatingDocument(false)}
                            >
                                {creatingDocument ? (
                                    <>
                                        <LoaderCircle className="animate-spin" />
                                        Creating…
                                    </>
                                ) : (
                                    <>
                                        <Plus />
                                        New document
                                    </>
                                )}
                            </Link>
                        </Button>
                    </div>
                </header>

                <div className="relative w-full max-w-xl">
                    <Search
                        aria-hidden="true"
                        className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        type="search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        aria-label="Search your documents"
                        placeholder="Search documents or collaborators"
                        className="h-11 border-slate-200 bg-white pl-10 shadow-sm focus-visible:bg-white dark:border-border dark:bg-card dark:focus-visible:bg-card"
                    />
                </div>

                <section aria-labelledby="recent-heading" id="recent-documents">
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                            <h2
                                id="recent-heading"
                                className="text-lg font-semibold tracking-tight"
                            >
                                Recent documents
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                The documents you have been working on lately.
                            </p>
                        </div>
                    </div>

                    {recentDocuments.length > 0 ? (
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                            {recentDocuments.map(({ document, source }) => (
                                <Card
                                    key={`${source}-${document.id}`}
                                    className="group gap-0 overflow-hidden border-slate-200 bg-white py-0 shadow-sm transition-all hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-md dark:border-border dark:bg-card dark:hover:border-sky-900"
                                >
                                    <Link
                                        href={show(document.id)}
                                        className="flex min-h-32 flex-col justify-between gap-5 p-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-inset"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <span className="flex size-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                                                <FileText className="size-5" />
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="font-normal"
                                            >
                                                {source === 'owned'
                                                    ? 'My document'
                                                    : 'Shared'}
                                            </Badge>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium group-hover:text-primary">
                                                {document.title}
                                            </p>
                                            <p className="mt-1 truncate text-xs text-muted-foreground">
                                                {formatUpdatedAt(
                                                    document.updatedAt,
                                                )}
                                            </p>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="border-dashed bg-white/70 shadow-none dark:bg-card">
                            <CardContent className="flex flex-col items-center px-5 py-9 text-center">
                                <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300">
                                    <FileText className="size-5" />
                                </span>
                                <p className="text-sm font-medium">
                                    {searchTerm
                                        ? 'No matching documents'
                                        : 'Your workspace is ready'}
                                </p>
                                <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                                    {searchTerm
                                        ? 'Try another title or collaborator name.'
                                        : 'Create a document or import a text file to get started.'}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </section>

                <section
                    aria-labelledby="owned-heading"
                    id="my-documents"
                    className="scroll-mt-6"
                >
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                            <h2
                                id="owned-heading"
                                className="text-lg font-semibold tracking-tight"
                            >
                                My documents
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Documents you own and manage.
                            </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {owned.length}
                        </span>
                    </div>
                    <Card className="overflow-hidden border-slate-200 bg-white py-0 shadow-sm dark:border-border dark:bg-card">
                        {filteredOwned.length > 0 ? (
                            <div className="divide-y">
                                {filteredOwned.map((document) => (
                                    <DocumentRow
                                        key={document.id}
                                        document={document}
                                        deleting={
                                            deletingDocumentId === document.id
                                        }
                                        onDelete={() =>
                                            deleteDocument(document.id)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <CardContent className="px-5 py-6 text-sm text-muted-foreground">
                                {searchTerm
                                    ? 'No owned documents match your search.'
                                    : 'You have not created any documents yet.'}
                            </CardContent>
                        )}
                    </Card>
                </section>

                <section
                    aria-labelledby="shared-heading"
                    id="shared-documents"
                    className="scroll-mt-6"
                >
                    <div className="mb-3 flex items-baseline justify-between gap-4">
                        <div>
                            <h2
                                id="shared-heading"
                                className="text-lg font-semibold tracking-tight"
                            >
                                Shared with me
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Documents others have invited you to work on.
                            </p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                            {shared.length}
                        </span>
                    </div>
                    <Card className="overflow-hidden border-slate-200 bg-white py-0 shadow-sm dark:border-border dark:bg-card">
                        {filteredShared.length > 0 ? (
                            <div className="divide-y">
                                {filteredShared.map((document) => (
                                    <DocumentRow
                                        key={document.id}
                                        document={document}
                                        shared
                                    />
                                ))}
                            </div>
                        ) : (
                            <CardContent className="px-5 py-6 text-sm text-muted-foreground">
                                {searchTerm
                                    ? 'No shared documents match your search.'
                                    : 'When someone shares a document with you, it will appear here.'}
                            </CardContent>
                        )}
                    </Card>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Workspace',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
