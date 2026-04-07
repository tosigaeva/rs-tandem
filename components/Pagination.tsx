'use client';

import { ChevronLeftIcon, ChevronRightIcon, LoaderIcon } from 'lucide-react';
import { useEffect, useEffectEvent, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';

export type PaginationMode = 'buttons' | 'scroll';

type PaginationProperties = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, mode: PaginationMode) => void;
  isLoading?: boolean;
  mode?: PaginationMode;
  loadingLabel?: string;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  mode = 'buttons',
}: PaginationProperties) {
  const loadMoreReference = useRef<HTMLDivElement | null>(null);
  const requestedScrollPageReference = useRef<number | undefined>(undefined);
  const isScrollMode = mode === 'scroll';
  const pages = getVisiblePages(currentPage, totalPages);
  const handleIntersection = useEffectEvent(() => {
    const nextPage = currentPage + 1;

    if (requestedScrollPageReference.current === nextPage) return;

    requestedScrollPageReference.current = nextPage;
    onPageChange(nextPage, 'scroll');
  });

  useEffect(() => {
    requestedScrollPageReference.current = undefined;
  }, [currentPage]);

  useEffect(() => {
    if (!isScrollMode) return;
    if (currentPage >= totalPages) return;

    const node = loadMoreReference.current;

    if (node == undefined) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || isLoading) return;

        handleIntersection();
      },
      { rootMargin: '160px 0px' }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [currentPage, isLoading, isScrollMode, totalPages]);

  if (totalPages <= 1) {
    return <></>;
  }

  if (isScrollMode) {
    if (currentPage >= totalPages) {
      return <></>;
    }

    return (
      <div ref={loadMoreReference} className="flex min-h-16 items-center justify-center">
        {isLoading && <LoaderIcon className="text-muted-foreground size-6 animate-spin" aria-label="Loading topics" />}
      </div>
    );
  }

  return (
    <ShadPagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            className="min-w-9 gap-1 px-2.5 sm:min-w-24 sm:pl-2.5"
            aria-label="Go to previous page"
            disabled={isLoading || currentPage === 1}
            onClick={() => onPageChange(currentPage - 1, 'buttons')}
          >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </Button>
        </PaginationItem>

        {pages.map((page, index) =>
          page === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Button
                variant={page === currentPage ? 'outline' : 'ghost'}
                size="icon"
                aria-current={page === currentPage ? 'page' : undefined}
                disabled={isLoading && page !== currentPage}
                onClick={() => onPageChange(page, 'buttons')}
              >
                {page}
              </Button>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <Button
            variant="ghost"
            size="default"
            className="min-w-9 gap-1 px-2.5 sm:min-w-24 sm:pr-2.5"
            aria-label="Go to next page"
            disabled={isLoading || currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1, 'buttons')}
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </ShadPagination>
  );
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | 'ellipsis'> {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3, 'ellipsis', totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
}
