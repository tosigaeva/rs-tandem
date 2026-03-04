'use client';
import { useState } from 'react';

import { signIn, signUp } from '@/api/auth.api';
import { Button } from '@/components/ui/button';
import { SchemaData } from '@/types/schemas/schemas';

import { CustomForm } from './custom-form';

const handleRegister = async (data: SchemaData) => {
  if ('email' in data && 'password' in data && 'username' in data) {
    const result = await signUp(data);
    console.log('register successful:', result);
  }
};

const handleLogin = async (data: SchemaData) => {
  if ('email' in data && 'password' in data) {
    const result = await signIn(data);
    console.log('login successful:', result);
  }
};

export default function LoginPage() {
  const [loginMode, toggleMode] = useState(true);

  const [formValid, setValidState] = useState(false);

  const registerForm = (
    <CustomForm
      id="register-form"
      schemaKey="Register"
      onSubmit={handleRegister}
      onValidationChange={setValidState}
      fields={[
        { name: 'username', label: 'Username', type: 'text', classes: 'md:col-span-2' },
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          dependencies: ['confirmPassword'],
        },
        { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
      ]}
    />
  );

  const loginForm = (
    <CustomForm
      id="login-form"
      schemaKey="Login"
      onSubmit={handleLogin}
      onValidationChange={setValidState}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
      ]}
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
