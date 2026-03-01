import z from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .superRefine(({ confirmPassword, password }, context) => {
    if (confirmPassword !== password) {
      context.addIssue({
        message: "Passwords don't match",
        path: ['confirmPassword'],
        code: 'custom',
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
