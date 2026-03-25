'use client';

import { useState } from 'react';

import { CustomForm } from '@/components/CustomForm';
import { CustomInput } from '@/components/CustomInput';
import { Button } from '@/components/ui/button';
import { SchemaData } from '@/types/schemas/schemas';

export default function SignUpForm({ handleSubmit }: { handleSubmit: (data: SchemaData) => void }) {
  const [formValid, setFormValid] = useState(false);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Create Account</h1>

      <CustomForm id="sign-up-form" schemaKey="SignUpSchema" onSubmit={handleSubmit} onValidationChange={setFormValid}>
        <CustomInput name="username" label="Username" type="text" classes="md:col-span-2" />
        <CustomInput name="email" label="Email Address" type="email" classes="md:col-span-2" />
        <CustomInput name="password" label="Password" type="password" dependencies={['confirmPassword']} />
        <CustomInput name="confirmPassword" label="Confirm Password" type="password" />
      </CustomForm>

      <Button variant={'success'} form={'sign-up-form'} type="submit" className="my-3 w-full" disabled={!formValid}>
        Sign Up
      </Button>
    </>
  );
}
