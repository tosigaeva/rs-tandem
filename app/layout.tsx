import '@/app/globals.css';

import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { Header } from '@/components/Header';
import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { Providers } from '@/providers/providers';
import { getServerLanguageCode } from '@/services/locale/locale.server';

const DEFAULT_TOASTER_DURATION = 3500;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLanguageCode();

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <Suspense fallback={<SpinnerCustom />}>
            <Header />
            {children}
          </Suspense>
          <Toaster
            position="bottom-center"
            richColors
            expand={true}
            duration={DEFAULT_TOASTER_DURATION}
            toastOptions={{ className: 'z-25' }}
          />
        </Providers>
      </body>
    </html>
  );
}
