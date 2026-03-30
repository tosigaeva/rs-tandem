import '@/app/globals.css';

import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { Header } from '@/components/Header';
import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { Providers } from '@/providers/providers';
import { getUser, hasAuthCookie } from '@/services/authorization/auth.server';
import { getServerLocale } from '@/services/locale/locale.server';
import { LocaleDictionary } from '@/services/locale/locale.service';
import { UserDetails } from '@/types/user';

const DEFAULT_TOASTER_DURATION = 3500;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const languageCode = LocaleDictionary[locale].languageCode;

  let response: { data: UserDetails | undefined; error?: string } = { data: undefined };
  const cookieResult = await hasAuthCookie();

  if (cookieResult) {
    response = await getUser();
  }

  return (
    <html lang={languageCode}>
      <body>
        <Providers locale={locale} userDetails={response.data} error={response.error}>
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
