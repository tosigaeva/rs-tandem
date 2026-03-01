'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { $ZodTypeInternals } from 'zod/v4/core';

import { CustomInput, InputProperties } from './custom-input';

export type FormProperties<T extends FieldValues> = {
  id: string;
  schema: z.ZodType<T, unknown, $ZodTypeInternals<T, FieldValues>>;
  fields: InputProperties[];
  onSubmit: (data: T) => void;
  defaultValues?: Record<string, string | number>;
};

export const CustomForm = <T extends FieldValues>({
  id,
  schema,
  fields,
  onSubmit,
  defaultValues,
}: FormProperties<T>) => {
  const properties = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  return (
    <FormProvider {...properties}>
      <form onSubmit={properties.handleSubmit(onSubmit)} id={id} className="w-full">
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
          {fields.map((field) => (
            <CustomInput key={field.name} {...field} />
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
