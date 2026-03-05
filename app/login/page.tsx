'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';
import { SchemaData } from '@/types/schemas/schemas';

import { CustomForm } from './custom-form';

export default function LoginPage() {
  const [loginMode, toggleMode] = useState(true);

  const [isLoginValid, setLoginValid] = useState(false);
  const [isRegisterValid, setRegisterValid] = useState(false);

  const router = useRouter();
  const searchParameters = useSearchParams();

  const redirect = () => {
    let redirectUrl = '/dashboard';

    const redirectParameter = searchParameters.get('redirect');

    if (redirectParameter != undefined) {
      redirectUrl = redirectParameter;
    }

    router.push(redirectUrl);
  };

  const handleRegister = async (data: SchemaData) => {
    if ('email' in data && 'password' in data && 'username' in data) {
      const result = await authService.register(data);

      if (result) {
        redirect();
      }
    }
  };

  const handleLogin = async (data: SchemaData) => {
    if ('email' in data && 'password' in data) {
      const result = await authService.login(data);

      if (result) {
        redirect();
      }
    }
  };

  const registerForm = (
    <CustomForm
      id="register-form"
      schemaKey="Register"
      onSubmit={handleRegister}
      onValidationChange={setRegisterValid}
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
      onValidationChange={setLoginValid}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
      ]}
    />
  );

  return (
    <div className="mx-auto mt-5 max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">{loginMode ? 'Login' : ' Create Account'}</h1>
      {!loginMode && registerForm}
      {loginMode && loginForm}
      <Button
        variant={'success'}
        form={loginMode ? 'login-form' : 'register-form'}
        type="submit"
        className="mb-3 w-full"
        disabled={(loginMode && !isLoginValid) || (!loginMode && !isRegisterValid)}
      >
        {loginMode ? 'Login' : 'Create Account'}
      </Button>
      <Button variant={'secondary'} type="button" className="w-full" onClick={() => toggleMode(!loginMode)}>
        {loginMode ? 'Register instead' : 'Login instead'}
      </Button>
    </div>
  );
}
