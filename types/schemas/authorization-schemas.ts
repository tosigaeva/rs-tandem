import z from 'zod';

const lowerCaseCheck = /[a-z]/;
const upperCaseCheck = /[A-Z]/;
const numberCheck = /\d/;
const usernameCheck = /^[a-zA-Z0-9_-]+$/;

export const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .refine((value) => lowerCaseCheck.test(value), 'Password must contain a lowercase letter')
    .refine((value) => upperCaseCheck.test(value), 'Password must contain an uppercase letter')
    .refine((value) => numberCheck.test(value), 'Password must contain a number'),
});

const signUpFields = signInSchema.extend({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(12, 'Username must be at most 12 characters')
    .refine((v) => usernameCheck.test(v), 'Invalid username'),
  confirmPassword: z.string(),
});

export const signUpSchema = signUpFields.superRefine(({ confirmPassword, password }, context) => {
  if (confirmPassword !== password) {
    context.addIssue({
      message: "Passwords don't match",
      path: ['confirmPassword'],
      code: 'custom',
    });
  }
});

export const userSchema = signUpFields.omit({ password: true, confirmPassword: true });
