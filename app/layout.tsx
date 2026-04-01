import '@/app/globals.css';

import { Suspense } from 'react';
import { Toaster } from 'sonner';

import { Header } from '@/components/Header';
import { SpinnerCustom } from '@/components/ui/SpinnerCustom';
import { Providers } from '@/providers/providers';
import { getUserFromCookies, hasAuthCookie } from '@/services/authorization/auth.server';
import { getServerLocale } from '@/services/locale/locale.server';
import { LocaleDictionary } from '@/services/locale/locale.service';

const DEFAULT_TOASTER_DURATION = 3500;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();
  const languageCode = LocaleDictionary[locale].languageCode;

  let user;

  if (await hasAuthCookie()) user = await getUserFromCookies();

  console.log(user);

  return (
    <html lang={languageCode}>
      <body>
        <Providers locale={locale} userDetails={user}>
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
