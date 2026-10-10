import { cn } from '@/lib/utils';
import logoPath from '../../img/collaborative-docs-logo.webp';

export function BrandMark({ className }: { className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                'relative block size-9 shrink-0 overflow-hidden rounded-lg bg-[#e2f5fc]',
                className,
            )}
        >
            <img
                src={logoPath}
                alt=""
                className="absolute top-0 left-[-7px] w-[50px] max-w-none"
            />
        </span>
    );
}

export default function BrandLogo({ className }: { className?: string }) {
    return (
        <img
            src={logoPath}
            alt="Collaborative Docs"
            className={cn('h-auto w-36', className)}
        />
    );
}
