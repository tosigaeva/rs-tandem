import z from 'zod';

import { SignInSchema, SignUpSchema, userSchema } from './authorization-schemas';
import { TopicSchema } from './topic-schema';
import { WidgetSchema } from './widget-schema';

export type SchemaRegistry = {
  SignInSchema: typeof SignInSchema;
  SignUpSchema: typeof SignUpSchema;
  UserSchema: typeof userSchema;
  TopicSchema: typeof TopicSchema;
  WidgetSchema: typeof WidgetSchema;
};

export const CustomSchemas = {
  SignInSchema: SignInSchema,
  SignUpSchema: SignUpSchema,
  UserSchema: userSchema,
  TopicSchema: TopicSchema,
  WidgetSchema: WidgetSchema,
} satisfies SchemaRegistry;

export type CustomSchemaKey = keyof typeof CustomSchemas;

export type SchemaData = z.infer<SchemaRegistry[keyof SchemaRegistry]>;

export type InferSchemaByKey<K extends CustomSchemaKey> = z.infer<(typeof CustomSchemas)[K]>;

export function getSchema<K extends CustomSchemaKey>(key: K): SchemaRegistry[K] {
  return CustomSchemas[key];
}
