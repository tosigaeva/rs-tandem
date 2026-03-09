'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Routes } from '@/lib/routes';
import { getNavigation } from '@/lib/utils';
import { authService } from '@/services/authorization/auth.service';
import { SchemaData } from '@/types/schemas/schemas';

import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

export default function AuthContent() {
  const [signInMode, toggleMode] = useState(true);

  const router = useRouter();
  const searchParameters = useSearchParams();

  const redirect = () => {
    const redirectParameter = searchParameters.get('redirect');

    const validRoute = getNavigation(redirectParameter ?? '');

    router.push(validRoute ?? Routes.Dashboard);
  };

  const handleSignIn = async (data: SchemaData) => {
    if ('email' in data && 'password' in data) {
      const result = await authService.signIn(data);

      if (result) {
        redirect();
      }
    }
  };

  const handleSignUp = async (data: SchemaData) => {
    if ('email' in data && 'password' in data && 'username' in data) {
      const result = await authService.signUp(data);

      if (result) {
        redirect();
      }
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-lg p-8">
      {signInMode ? <SignInForm handleSubmit={handleSignIn} /> : <SignUpForm handleSubmit={handleSignUp} />}
      <Button variant={'secondary'} type="button" className="w-full" onClick={() => toggleMode(!signInMode)}>
        {signInMode ? 'Create new account' : 'Sign in with existing account'}
      </Button>
    </div>
  );
}
