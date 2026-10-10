import { BrandMark } from '@/components/brand-logo';

export default function AppLogo() {
    return (
        <div className="flex min-w-0 items-center gap-2.5">
            <BrandMark className="size-8" />
            <div className="grid min-w-0 flex-1 text-left text-sm">
                <span className="truncate leading-tight font-semibold tracking-tight">
                    Collaborative Docs
                </span>
            </div>
        </div>
    );
}
