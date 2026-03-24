'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, Eraser, MessageSquarePlus, PlusCircle, Trash2 } from 'lucide-react';

import { LocaleStringTooltip } from '@/components/LocaleStringTooltip';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { WidgetAdminListItem } from '@/types/schemas/widget-schema';

export const columns: ColumnDef<WidgetAdminListItem>[] = [
  {
    accessorKey: 'id',
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(value === true)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-nowrap">
        <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(value === true)} />
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-nowrap">
        <span>{row.original.type}</span>
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name (EN)',
    cell: ({ row }) => <LocaleStringTooltip data={row.original.name} />,
  },
  {
    accessorKey: 'description',
    header: 'description',
    cell: ({ row }) => <LocaleStringTooltip data={row.original.name} />,
  },
  {
    accessorKey: 'icon',
    header: 'Icon',
    cell: ({}) => (
      <div className="flex items-center gap-2 text-nowrap">
        <span>Icon</span>
      </div>
    ),
  },
  {
    accessorKey: 'sumQuestions',
    header: 'Questions',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-nowrap">
        <span>{row.original.sumQuestions}</span>
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => row.original.createdAt.toLocaleDateString(),
  },
  {
    id: 'actions',
    header: ({ table }) => {
      const rowSelected = table.getSelectedRowModel().rows.length > 0;

      return (
        <div className="flex justify-end gap-2 py-2">
          <Button variant="success" disabled={rowSelected}>
            <PlusCircle className="h-4 w-4" />
            Add Widget
          </Button>
          <Button variant="destructive" size="icon" disabled={!rowSelected}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ table }) => {
      const isDisabled = table.getSelectedRowModel().rows.length > 0;

      return (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="icon" className="text-green-700 hover:text-green-900" disabled={isDisabled}>
            <MessageSquarePlus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-900" disabled={isDisabled}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={isDisabled}>
            <Eraser className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={isDisabled}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
