'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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
  dependencies?: Partial<Record<keyof T, (keyof T)[]>>;
};

export const CustomForm = <T extends FieldValues>({
  id,
  schema,
  fields,
  onSubmit,
  defaultValues,
  dependencies,
}: FormProperties<T>) => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const {
    watch,
    trigger,
    formState: { dirtyFields },
  } = methods;

  useEffect(() => {
    if (!dependencies) return;

    const subscription = watch((_value, { name }) => {
      if (name == undefined) return;

      const relatedFields = dependencies[name];

      if (relatedFields && relatedFields.length > 0) {
        relatedFields.forEach((fieldPath) => {
          if (Boolean(dirtyFields[fieldPath.toString()])) {
            trigger(fieldPath.toString());
          }
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, trigger, dependencies, dirtyFields]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id} className="w-full">
        <div className="grid w-full grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
          {fields.map((field) => (
            <CustomInput key={field.name} {...field} />
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
