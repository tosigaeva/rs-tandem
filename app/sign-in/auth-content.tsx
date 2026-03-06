'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { authService } from '@/services/auth.service';
import { SchemaData } from '@/types/schemas/schemas';

import { CustomForm } from './custom-form';

export default function AuthContent() {
  const [signInMode, toggleMode] = useState(true);

  const [isSignInValid, setSignInValid] = useState(false);
  const [isSignUpValid, setSignUpValid] = useState(false);

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

  const handleSignUp = async (data: SchemaData) => {
    if ('email' in data && 'password' in data && 'username' in data) {
      const result = await authService.signUp(data);

      if (result) {
        redirect();
      }
    }
  };

  const handleSignIn = async (data: SchemaData) => {
    if ('email' in data && 'password' in data) {
      const result = await authService.signIn(data);

      if (result) {
        redirect();
      }
    }
  };

  const signUpForm = (
    <CustomForm
      id="sign-up-form"
      schemaKey="SignUp"
      onSubmit={handleSignUp}
      onValidationChange={setSignUpValid}
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

  const signInForm = (
    <CustomForm
      id="sign-in-form"
      schemaKey="SignIn"
      onSubmit={handleSignIn}
      onValidationChange={setSignInValid}
      fields={[
        { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
        { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
      ]}
    />
  );

  return (
    <div className="mx-auto mt-5 max-w-lg p-8">
      <h1 className="mb-6 text-2xl font-bold">{signInMode ? 'Sign In' : ' Create new Account'}</h1>
      {!signInMode && signUpForm}
      {signInMode && signInForm}
      <Button
        variant={'success'}
        form={signInMode ? 'sign-in-form' : 'sign-up-form'}
        type="submit"
        className="my-3 w-full"
        disabled={(signInMode && !isSignInValid) || (!signInMode && !isSignUpValid)}
      >
        {signInMode ? 'Sign In' : 'Sign Up'}
      </Button>
      <Button variant={'secondary'} type="button" className="w-full" onClick={() => toggleMode(!signInMode)}>
        {signInMode ? 'Create new account' : 'Sign in with existing account'}
      </Button>
    </div>
  );
}
