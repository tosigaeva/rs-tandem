import z from 'zod';

import { signInSchema, signUpSchema, userSchema } from './authorization-schemas';

export type SchemaRegistry = {
  SignInSchema: typeof signInSchema;
  SignUpSchema: typeof signUpSchema;
  UserSchema: typeof userSchema;
};

export const CustomSchemas = {
  SignInSchema: signInSchema,
  SignUpSchema: signUpSchema,
  UserSchema: userSchema,
} satisfies SchemaRegistry;

export type CustomSchemaKey = keyof typeof CustomSchemas;

export type SchemaData = z.infer<SchemaRegistry[keyof SchemaRegistry]>;

export function getSchema<K extends CustomSchemaKey>(key: K): SchemaRegistry[K] {
  return CustomSchemas[key];
}
