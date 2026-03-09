'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CustomSchemaKey, getSchema, SchemaData, SchemaRegistry } from '@/types/schemas/schemas';

import { CustomInput, InputProperties } from './CustomInput';

export type FormProperties = {
  id: string;
  schemaKey: CustomSchemaKey;
  fields: InputProperties[];
  onSubmit: (data: z.infer<SchemaRegistry[CustomSchemaKey]>) => void;
  onValidationChange?: (isValid: boolean) => void;
  defaultValues?: DefaultValues<z.infer<SchemaRegistry[CustomSchemaKey]>>;
};

export const CustomForm = ({ id, schemaKey, fields, onSubmit, defaultValues, onValidationChange }: FormProperties) => {
  const schema = getSchema(schemaKey);

  const methods = useForm<SchemaData>({
    resolver: zodResolver(schema),
    mode: 'all',
    defaultValues,
  });

  const {
    formState: { isValid },
  } = methods;

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id={id} className="w-full">
        <div className="mb-2 grid w-full grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2">
          {fields.map((field) => (
            <CustomInput key={field.name} {...field} />
          ))}
        </div>
      </form>
    </FormProvider>
  );
};
