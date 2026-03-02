'use client';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { SignInSchema, signInSchema, SignUpSchema, signUpSchema } from '@/types/schemas/authorization-schemas';

import { CustomForm } from './custom-form';

const handleRegister = (data: SignUpSchema) => {
  console.log('register successful:', data);
};

const handleLogin = (data: SignInSchema) => {
  console.log('login successful:', data);
};

export default function LoginPage() {
  const [loginMode, toggleMode] = useState(true);

  const [formValid, setValidState] = useState(false);

  const registerForm = (
    <CustomForm
      id="register-form"
      schema={signUpSchema}
      onSubmit={handleRegister}
      onValidationChange={setValidState}
      fields={[
        { name: 'username', label: 'Username', type: 'text', classes: 'md:col-span-2' },
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        { name: 'password', label: 'Password', type: 'password' },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
      ]}
      defaultValues={{
        username: '',
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
      schema={signInSchema}
      onSubmit={handleLogin}
      onValidationChange={setValidState}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
      ]}
      defaultValues={{
        password: '',
        confirmPassword: '',
      }}
    />
  );

  return (
    <div className="mx-auto max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">{loginMode ? 'Login' : ' Create Account'}</h1>
      {!loginMode && registerForm}
      {loginMode && loginForm}
      <Button
        variant={'success'}
        form={loginMode ? 'login-form' : 'register-form'}
        type="submit"
        className="mb-3 w-full"
        disabled={!formValid}
      >
        {loginMode ? 'Login' : 'Create Account'}
      </Button>
      <Button variant={'secondary'} type="button" className="w-full" onClick={() => toggleMode(!loginMode)}>
        {loginMode ? 'Register instead' : 'Login instead'}
      </Button>
    </div>
  );
}
