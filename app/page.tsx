import Image from 'next/image';

import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primary-button';

export default function Page() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-screen items-center justify-center px-6 text-center">
        <div className="m-10">
          <h1 className="text-5xl font-bold sm:text-6xl">RS Tandem</h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-3xl">
            Learn JavaScript with the help of mini-games and prepare for technical interviews! Practice algorithms,
            problem solving, and core JS concepts in a fun way.
          </p>
          <div className="mt-8 flex justify-center gap-4 p-5">
            <PrimaryButton>Sign in</PrimaryButton>
            <PrimaryButton variant="secondary">Register</PrimaryButton>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/landing-logo-mobile.png"
              width={1052}
              height={1052}
              className="block rounded-3xl md:hidden"
              alt="JS logo"
            />
          </div>
        </div>
        <Image
          src="/landing-logo-desktop.jpg"
          width={870}
          height={500}
          className="hidden rounded-3xl md:block"
          alt="JS logo"
        />
      </main>
    </div>
  );
}
