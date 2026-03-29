'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from '@/components/ui/pagination';

type PaginationProperties = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading = false }: PaginationProperties) {
  if (totalPages <= 1) {
    return <></>;
  }

  const pages = getVisiblePages(currentPage, totalPages);

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
            onClick={() => onPageChange(currentPage - 1)}
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
                onClick={() => onPageChange(page)}
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
            onClick={() => onPageChange(currentPage + 1)}
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
