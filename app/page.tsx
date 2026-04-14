'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/use-translation';
import { Routes } from '@/lib/routes';
import { useAuth } from '@/providers/auth-state.provider';

export default function Page() {
  const { isAuthorized } = useAuth();
  const { t, translate } = useTranslation();

  const FEATURES = [
    {
      value: 'quiz',
      label: {
        en: 'Quiz',
        ru: 'Квиз',
        by: 'Квіз',
      },
      title: {
        en: 'Select correct answer',
        ru: 'Выберите правильный ответ',
        by: 'Выберыце правільны адказ',
      },
      image: '/example-quiz.jpg',
      width: 1046,
      height: 480,
    },
    {
      value: 'flip-card',
      label: { en: 'Flip Card', ru: 'Флип-карта', by: 'Фліп-карта' },
      title: { en: 'Reveal definition', ru: 'Раскрыть определение', by: 'Раскрыць вызначэнне' },
      image: '/example-flip.jpg',
      width: 644,
      height: 490,
    },
    {
      value: 'big-o',
      label: { en: 'Big O', ru: 'Big O', by: 'Big O' },
      title: {
        en: 'Select correct Big O notation',
        ru: 'Выберите правильную нотацию Big O',
        by: 'Выберыце правільную натацыю Big O',
      },
      image: '/example-big-o-cut.jpg',
      width: 697,
      height: 798,
    },
    {
      value: 'code-completion',
      label: { en: 'Code Completion', ru: 'Дополнение кода', by: 'Дапаўненне кода' },
      title: {
        en: 'Fill in the blanks in the code',
        ru: 'Заполните пропуски в коде',
        by: 'Запоўніце пропускі ў кодзе',
      },
      image: '/example-code-completion.jpg',
      width: 1118,
      height: 478,
    },
    {
      value: 'async-sorter',
      label: { en: 'Async Sorter', ru: 'Асинхронная сортировка', by: 'Асінхронная сартаванне' },
      title: {
        en: 'Set correct order of operations execution',
        ru: 'Установите правильный порядок выполнения операций',
        by: 'Усталюйце правільны парадак выканання аперацый',
      },
      image: '/example-async-sorter.jpg',
      width: 1488,
      height: 864,
    },
    {
      value: 'code-ordering',
      label: { en: 'Code Ordering', ru: 'Порядок кода', by: 'Парадак кода' },
      title: {
        en: 'Put lines of code in the correct order',
        ru: 'Расположите строки кода в правильном порядке',
        by: 'Размясціце радкі кода ў правільным парадку',
      },
      image: '/example-order-lines.jpg',
      width: 1091,
      height: 801,
    },
    {
      value: 'true-or-false',
      label: { en: 'True or False', ru: 'Истина или Ложь', by: 'Ісціна ці Хлусня' },
      title: {
        en: 'Determine if the statement is true or false',
        ru: 'Определите, является ли утверждение истинным или ложным',
        by: 'Вызначце, ці з’яўляецца сцвярджэнне ісцінным ці ілжывым',
      },
      image: '/example-true-false.jpg',
      width: 909,
      height: 580,
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-[calc(80dvh)] flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-10 px-6 py-10 text-center">
        <div className="h-full justify-center">
          <h1 className="text-4xl font-bold sm:text-6xl">{t('landing.title')}</h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-2xl">{t('landing.body')}</p>
          <div className="mt-8 flex justify-center gap-4 p-5">
            <PrimaryButton size="lg" asChild>
              <Link href={isAuthorized ? Routes.Dashboard : Routes.SignIn}>
                {t(isAuthorized ? 'landing.go-to-dashboard' : 'landing.get-started')}
              </Link>
            </PrimaryButton>
          </div>
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/landing-logo-mobile.png"
                width={1052}
                height={1052}
                className="block max-h-72 w-auto rounded-3xl md:hidden"
                alt="JS logo"
              />
            </motion.div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/landing-logo-desktop.jpg"
            width={870}
            height={500}
            className="hidden max-h-96 w-auto rounded-3xl md:block"
            alt="JS logo"
          />
        </motion.div>
      </div>
      <div className="mx-auto mb-10 w-full max-w-6xl px-6 text-center">
        <Tabs defaultValue={FEATURES[0].value}>
          <TabsList
            variant="line"
            className="scrollbar-none mx-auto mb-6 flex w-full justify-start overflow-x-auto border-b border-neutral-300 p-1"
          >
            {FEATURES.map((feature) => (
              <TabsTrigger key={feature.value} value={feature.value}>
                {translate(feature.label)}
              </TabsTrigger>
            ))}
          </TabsList>
          {FEATURES.map((feature) => (
            <TabsContent key={feature.value} value={feature.value}>
              <p className="text-muted-foreground text-lg font-medium md:text-2xl">{translate(feature.title)}</p>
              <div className="m-4 mx-auto h-72 w-full max-w-4xl">
                <Image
                  src={feature.image}
                  width={feature.width}
                  height={feature.height}
                  className="mx-auto h-full w-auto rounded-3xl object-contain object-top md:object-center"
                  alt={feature.label.en}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
