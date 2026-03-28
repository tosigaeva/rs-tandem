import { Plus, X } from 'lucide-react';
import { get, useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CustomArrayInputProperties = {
  name: string;
  label: string;
  type: 'text' | 'number';
  classes?: string;
  allowedPattern?: RegExp;
};

export const CustomArrayInput = ({ name, label, classes, type }: CustomArrayInputProperties) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const fieldErrors = get(errors, name);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classes)}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <div className="space-y-2">
        {fields.map((field, index) => {
          const error = fieldErrors?.[index];

          return (
            <div key={field.id} className="flex flex-col gap-1">
              <div key={field.id} className="flex gap-2">
                <input
                  {...register(`${name}.${index}`, { valueAsNumber: type === 'number' })}
                  placeholder={`Enter ${label}...`}
                  className={cn(
                    'w-full rounded-md border bg-slate-50 px-3 py-2 pr-10 text-sm transition-all outline-none',
                    Boolean(error) ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-red-50"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed bg-white"
        onClick={() => append('')}
      >
        <Plus className="mr-2 h-3 w-3" />
        Add Item
      </Button>
    </div>
  );
};
