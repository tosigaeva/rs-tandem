import { Plus, X } from 'lucide-react';
import { ArrayPath, FieldArrayPathValue, FieldValues, get, Path, useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type CustomObjectArrayInputProperties<T extends FieldValues, TName extends ArrayPath<T>> = {
  name: TName;
  label: string;
  fieldsToEdit: {
    key: keyof FieldArrayPathValue<T, TName> & string;
    label: string;
    placeholder?: string;
  }[];
  defaultValues: FieldArrayPathValue<T, TName>;
  classes?: string;
};

export const CustomObjectArrayInput = <T extends FieldValues, TName extends ArrayPath<T>>({
  name,
  label,
  fieldsToEdit,
  defaultValues,
  classes,
}: CustomObjectArrayInputProperties<T, TName>) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<T>();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const arrayErrors = get(errors, name);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', classes)}>
      <label className="text-sm font-medium text-slate-700" htmlFor={name}>
        {label}
      </label>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50/5 p-4 shadow-sm"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-destructive absolute -top-2 -right-2 h-7 w-7 rounded-full border bg-white shadow-sm hover:bg-red-50"
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fieldsToEdit.map((config) => {
                const pathString = `${name}.${index}.${config.key}`;
                const error = arrayErrors?.[index]?.[config.key];
                if (isPath<T>(pathString)) {
                  return (
                    <div key={config.key} className="flex items-center gap-2">
                      <label className="text-sm font-medium">{config.label}:</label>
                      <input
                        {...register(pathString)}
                        className={cn(
                          'w-full rounded-md border bg-slate-50 px-3 py-2 pr-10 text-sm transition-all outline-none',
                          Boolean(error) ? 'border-red-500 bg-red-50' : 'border-slate-300 focus:border-blue-500'
                        )}
                      />
                      {error != undefined && <span>{error.message}</span>}
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full border-dashed bg-white"
        onClick={() => append(defaultValues)}
      >
        <Plus className="mr-2 h-3 w-3" />
        Add Item
      </Button>
    </div>
  );
};

function isPath<T extends FieldValues>(path: string): path is Path<T> {
  return true;
}
