import {
  Pagination as ShadPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Routes } from '@/lib/routes';

type PaginationProperties = {
  currentPage: number;
  totalPages: number;
  basePath: Routes;
};

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProperties) {
  console.log(totalPages);
  return (
    <ShadPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`${basePath}?page=${currentPage - 1}`} />
          </PaginationItem>
        )}

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`${basePath}?page=${page}`} isActive={page === currentPage}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={`${basePath}?page=${currentPage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </ShadPagination>
  );
}
