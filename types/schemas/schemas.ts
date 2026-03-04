import z from 'zod';

import { signInSchema, signUpSchema } from './authorization-schemas';

export type SchemaRegistry = {
  Login: typeof signInSchema;
  Register: typeof signUpSchema;
};

export const CustomSchemas = {
  Login: signInSchema,
  Register: signUpSchema,
} satisfies SchemaRegistry;

export type CustomSchemaKey = keyof typeof CustomSchemas;

export type SchemaData = z.infer<SchemaRegistry[keyof SchemaRegistry]>;

export function getSchema<K extends CustomSchemaKey>(key: K): SchemaRegistry[K] {
  return CustomSchemas[key];
}
