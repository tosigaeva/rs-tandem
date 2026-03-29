'use client';

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Pagination as ShadPagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';

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

  return (
    <ShadPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <Button
              variant="ghost"
              size="default"
              className="gap-1 px-2.5 sm:pl-2.5"
              aria-label="Go to previous page"
              disabled={isLoading}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeftIcon />
              <span className="hidden sm:block">Previous</span>
            </Button>
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
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
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <Button
              variant="ghost"
              size="default"
              className="gap-1 px-2.5 sm:pr-2.5"
              aria-label="Go to next page"
              disabled={isLoading}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <span className="hidden sm:block">Next</span>
              <ChevronRightIcon />
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadPagination>
  );
}
