'use client';
import { div } from 'framer-motion/client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { SignUpSchema, signUpSchema } from '@/types/schemas/authorization-schemas';

import { CustomForm } from './custom-form';

const handleLogin = (data: SignUpSchema) => {
  console.log('Submit successful:', data);
};

export default function LoginPage() {
  const [loginMode, toggleMode] = useState(true);

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">{loginMode ? 'Login' : ' Register'}</h1>
      {!loginMode && registerForm}
      {loginMode && loginForm}
      <Button variant={'default'} form="login-form" type="submit" className="mb-3 w-full">
        {loginMode ? 'Login' : 'Create Account'}
      </Button>
      <Button
        variant={'secondary'}
        form="login-form"
        type="button"
        className="w-full"
        onClick={() => toggleMode(!loginMode)}
      >
        {loginMode ? 'Register instead' : 'Login instead'}
      </Button>
    </div>
  );
}

const registerForm = (
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
);

const loginForm = (
  <CustomForm
    id="login-form"
    schema={signUpSchema}
    onSubmit={handleLogin}
    fields={[
      { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
      { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
    ]}
    defaultValues={{
      email: '',
      password: '',
      confirmPassword: '',
    }}
  />
);
