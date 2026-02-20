import { PrimaryButton } from '@/components/primary-button';

export function Header() {
  return (
    <header className="border-border bg-card border-b">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-end px-6">
        <PrimaryButton>Sign in</PrimaryButton>
      </div>
    </header>
  );
}
