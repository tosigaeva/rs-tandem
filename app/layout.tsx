import './globals.css';

import { Toaster } from 'sonner';

import { HeaderContent } from '@/components/header/HeaderContent';
import { Providers } from '@/providers/providers';
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

  return (
    <html lang={languageCode}>
      <body>
        <Providers locale={locale}>
          <HeaderContent />
          {children}
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
