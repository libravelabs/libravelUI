import { Fragment } from 'react';
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/core/breadcrumbs';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    return (
        <>
            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem
                                    href={item.href}
                                    emphasis={isLast ? 'normal' : 'current'}
                                    className={cn(
                                        isLast && 'pointer-events-none',
                                    )}
                                >
                                    {item.title}
                                </BreadcrumbItem>
                            </Fragment>
                        );
                    })}
                </Breadcrumb>
            )}
        </>
    );
}
