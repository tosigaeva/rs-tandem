'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type DataTableProperties<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  meta?: {
    onSubmit: (data: TData) => void;
  };
};

export function DataTable<TData, TValue>({ columns, data, meta }: DataTableProperties<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta,
    autoResetAll: true,
  });

  useEffect(() => {
    table.resetRowSelection();
  }, [data, table]);

  return (
    <div className="mb-20 overflow-hidden rounded-md border border-slate-200">
      <Table>
        {/* Header: Dark Green background, White text */}
        <TableHeader className="bg-emerald-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-none hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="h-12 cursor-pointer font-bold text-white"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-start gap-2">
                    {header.isPlaceholder ? undefined : flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && (
                      <div className="mr-2 ml-0.5">
                        {{
                          asc: (
                            <div className="flex w-8 justify-center -space-x-1 align-middle">
                              <ArrowUp /> <ArrowDown className="text-slate-200/50" />
                            </div>
                          ),
                          desc: (
                            <div className="flex w-8 justify-center -space-x-1 align-middle">
                              <ArrowUp className="text-slate-200/50" /> <ArrowDown />
                            </div>
                          ),
                        }[header.column.getIsSorted().toString()] ?? (
                          <div className="flex w-8 justify-center -space-x-1 align-middle text-slate-200/50">
                            <ArrowUp /> <ArrowDown />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={cn(
                  'border-none transition-colors',
                  'odd:bg-blue-100 hover:odd:bg-blue-200',
                  'even:bg-emerald-100 hover:even:bg-blue-200'
                )}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
