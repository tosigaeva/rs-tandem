'use client';
import { Button } from '@/components/ui/button';
import { SignUpSchema, signUpSchema } from '@/types/schemas/authorization-schemas';

import { CustomForm } from './custom-form';

const handleLogin = (data: SignUpSchema) => {
  console.log('Submit successful:', data);
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">Sign Up</h1>
      <CustomForm
        id="login-form"
        schema={signUpSchema}
        onSubmit={handleLogin}
        fields={[
          { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
          { name: 'password', label: 'Password', type: 'password' },
          { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
        ]}
        defaultValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        dependencies={{
          password: ['confirmPassword'],
        }}
      />
      <Button variant={'default'} form="login-form" type="submit" className="w-full">
        Create Account
      </Button>
    </div>
  );
}
