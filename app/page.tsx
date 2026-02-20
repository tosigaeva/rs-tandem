import { Header } from '@/components/header';

export default function Page() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header />
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center justify-center px-6">
        <h1 className="text-4xl font-bold sm:text-5xl">RS Tandem</h1>
      </main>
    </div>
  );
}
