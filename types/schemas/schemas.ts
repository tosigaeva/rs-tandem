import z from 'zod';

import { signInSchema, signUpSchema } from './authorization-schemas';

export type SchemaRegistry = {
  SignIn: typeof signInSchema;
  SignUp: typeof signUpSchema;
};

export const CustomSchemas = {
  SignIn: signInSchema,
  SignUp: signUpSchema,
} satisfies SchemaRegistry;

export type CustomSchemaKey = keyof typeof CustomSchemas;

export type SchemaData = z.infer<SchemaRegistry[keyof SchemaRegistry]>;

export function getSchema<K extends CustomSchemaKey>(key: K): SchemaRegistry[K] {
  return CustomSchemas[key];
}
