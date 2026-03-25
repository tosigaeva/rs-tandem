import z from 'zod';

const upperCaseCheck = /[A-Z]/;
const usernameCheck = /^[a-zA-Z0-9_-]+$/;
const passwordMinLength = 1;

export const SignInSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(passwordMinLength, `Password must be at least ${passwordMinLength} characters`)
    .refine((value) => upperCaseCheck.test(value), 'Password must contain an uppercase letter'),
});
export type SignIn = z.infer<typeof SignInSchema>;

const signUpFields = SignInSchema.extend({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(12, 'Username must be at most 12 characters')
    .refine((v) => usernameCheck.test(v), 'Invalid username'),
  confirmPassword: z.string(),
});

export const SignUpSchema = signUpFields.superRefine(({ confirmPassword, password }, context) => {
  if (confirmPassword !== password) {
    context.addIssue({
      message: "Passwords don't match",
      path: ['confirmPassword'],
      code: 'custom',
    });
  }
});
export type SignUp = z.infer<typeof SignUpSchema>;

export const userSchema = signUpFields.omit({ password: true, confirmPassword: true });
