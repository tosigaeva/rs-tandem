import z from 'zod';

const usernameCheck = /^[a-zA-Z0-9_-]+$/;
const passwordMinLength = 6;

export const SignInSchema = z.object({
  email: z.email({ message: 'validation.email_invalid' }),
  password: z.string().min(passwordMinLength, 'validation.password_too_short'),
});
export type SignIn = z.infer<typeof SignInSchema>;

const signUpFields = SignInSchema.extend({
  username: z
    .string()
    .min(3, 'validation.username_too_short')
    .max(12, 'validation.username_too_long')
    .refine((v) => usernameCheck.test(v), 'zod.auth.username_invalid'),
  confirmPassword: z.string(),
});

export const SignUpSchema = signUpFields.superRefine(({ confirmPassword, password }, context) => {
  if (confirmPassword !== password) {
    context.addIssue({
      message: 'validation.password_mismatch',
      path: ['confirmPassword'],
      code: 'custom',
    });
  }
});
export type SignUp = z.infer<typeof SignUpSchema>;

export const userSchema = signUpFields.omit({ password: true, confirmPassword: true });
