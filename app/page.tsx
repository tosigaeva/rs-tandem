'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { PrimaryButton } from '@/components/PrimaryButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Routes } from '@/lib/routes';
import { useAuth } from '@/services/authorization/auth.store';

export default function Page() {
  const { isAuthorized } = useAuth();
  const router = useRouter();

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
      containerClass: 'mx-auto h-[500px] w-full max-w-4xl',
    },
    {
      value: 'big-o',
      label: 'Big O',
      title: 'Select correct Big O notation',
      image: '/example-big-o.jpg',
      width: 704,
      height: 1018,
      containerClass: 'mx-auto h-[500px] w-full max-w-4xl',
    },
  ];

  return (
    <div className="bg-background text-foreground flex min-h-[calc(100dvh-4rem)] flex-col">
      <div className="mx-auto flex flex-1 items-center justify-center px-6 text-center">
        <div className="m-10">
          <h1 className="text-4xl font-bold sm:text-6xl">JS Interview Trainer</h1>
          <p className="text-muted-foreground mt-6 max-w-2xl text-lg md:text-3xl">
            Learn JavaScript with the help of mini-games and prepare for technical interviews! Practice algorithms,
            problem solving, and core JS concepts in a fun way.
          </p>
          <div className="mt-8 flex justify-center gap-4 p-5">
            <PrimaryButton size="lg" onClick={() => router.push(isAuthorized ? Routes.Dashboard : Routes.SignIn)}>
              Get started!
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
                className="block rounded-3xl md:hidden"
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
            className="hidden rounded-3xl md:block"
            alt="JS logo"
          />
        </motion.div>
      </div>
      <div className="mx-auto mb-10 flex w-full items-center justify-center px-6 text-center">
        <Tabs defaultValue={FEATURES[0].value}>
          <TabsList variant="line">
            {FEATURES.map((feature) => (
              <TabsTrigger key={feature.value} value={feature.value}>
                {feature.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {FEATURES.map((feature) => (
            <TabsContent key={feature.value} value={feature.value}>
              <p className="text-muted-foreground text-lg font-medium md:text-2xl">{feature.title}</p>

              <div className={feature.containerClass ?? ''}>
                <Image
                  src={feature.image}
                  width={feature.width}
                  height={feature.height}
                  className="mx-auto h-full w-auto rounded-3xl object-contain"
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
