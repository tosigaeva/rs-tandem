'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Routes } from '@/lib/routes';
import { useAuth } from '@/providers/auth-state.provider';

export default function Page() {
  const { isAuthorized } = useAuth();

  const FEATURES = [
    {
      value: 'quiz',
      label: 'Quiz',
      title: 'Select correct answer',
      image: '/example-quiz.jpg',
      width: 1046,
      height: 480,
    },
    {
      value: 'flip-card',
      label: 'Flip Card',
      title: 'Reveal definition',
      image: '/example-flip.jpg',
      width: 644,
      height: 490,
    },
    {
      value: 'big-o',
      label: 'Big O',
      title: 'Select correct Big O notation',
      image: '/example-big-o-cut.jpg',
      width: 697,
      height: 798,
    },
    {
      value: 'code-completion',
      label: 'Code Completion',
      title: 'Fill in the blanks in the code',
      image: '/example-code-completion.jpg',
      width: 1118,
      height: 478,
    },
    {
      value: 'async-sorter',
      label: 'Async Sorter',
      title: 'Set correct order of operations execution',
      image: '/example-async-sorter.jpg',
      width: 1488,
      height: 864,
    },
    {
      value: 'code-ordering',
      label: 'Code Ordering',
      title: 'Put lines of code in the correct order',
      image: '/example-order-lines.jpg',
      width: 1091,
      height: 801,
    },
    {
      value: 'true-or-false',
      label: 'True or False',
      title: 'Determine if the statement is true or false',
      image: '/example-true-false.jpg',
      width: 909,
      height: 580,
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center gap-10 px-6 py-10 text-center">
        <div className="h-full justify-center">
          <h1 className="text-4xl font-bold sm:text-6xl">JS Interview Trainer</h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-2xl">
            Learn JavaScript with the help of mini-games and prepare for technical interviews! Practice algorithms,
            problem solving, and core JS concepts in a fun way.
          </p>
          <div className="mt-8 flex justify-center gap-4 p-5">
            <PrimaryButton size="lg" asChild>
              <Link href={isAuthorized ? Routes.Dashboard : Routes.SignIn}>
                {isAuthorized ? 'Go to Dashboard' : 'Get started!'}
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
          <TabsList variant="line" className="mx-auto mb-6 h-7 w-full justify-start border-b border-neutral-300 p-1">
            {FEATURES.map((feature) => (
              <TabsTrigger key={feature.value} value={feature.value}>
                {feature.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {FEATURES.map((feature) => (
            <TabsContent key={feature.value} value={feature.value}>
              <p className="text-muted-foreground text-lg font-medium md:text-2xl">{feature.title}</p>
              <div className="m-4 mx-auto h-72 w-full max-w-4xl">
                <Image
                  src={feature.image}
                  width={feature.width}
                  height={feature.height}
                  className="mx-auto h-full w-auto rounded-3xl object-contain object-top md:object-center"
                  alt={feature.label}
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
