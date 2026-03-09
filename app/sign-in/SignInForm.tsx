'use client';

import { useState } from 'react';

import { CustomForm } from '@/components/CustomForm';
import { Button } from '@/components/ui/button';
import { SchemaData } from '@/types/schemas/schemas';

export default function SignInForm({ handleSubmit }: { handleSubmit: (data: SchemaData) => void }) {
  const [formValid, setFormValid] = useState(false);

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
      <CustomForm
        id="sign-in-form"
        schemaKey="SignInSchema"
        onSubmit={handleSubmit}
        onValidationChange={setFormValid}
        fields={[
          { name: 'email', label: 'Email Address', type: 'email', classes: 'md:col-span-2' },
          { name: 'password', label: 'Password', type: 'password', classes: 'md:col-span-2' },
        ]}
      />
      <Button variant={'success'} form={'sign-in-form'} type="submit" className="my-3 w-full" disabled={!formValid}>
        Sign In
      </Button>
    </>
  );
}
