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
      <div className="mx-auto mt-20 mb-10 flex w-full max-w-7xl items-center justify-center px-6 text-center">
        <Tabs defaultValue="quiz">
          <TabsList variant="line">
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="flip-card">Flip Card</TabsTrigger>
            <TabsTrigger value="big-o">Big O</TabsTrigger>
          </TabsList>
          <TabsContent value="quiz">
            Select correct answer
            <Image
              src="/example-quiz.jpg"
              width={1046}
              height={480}
              className="mx-auto mt-10 rounded-3xl"
              alt="Quiz example"
            />
          </TabsContent>
          <TabsContent value="flip-card">
            Reveal definition
            <Image
              src="/example-flip.jpg"
              width={644}
              height={490}
              className="mx-auto mt-10 rounded-3xl"
              alt="Quiz example"
            />
          </TabsContent>
          <TabsContent value="big-o">
            Select correct Big O notation
            <Image
              src="/example-big-o.jpg"
              width={704}
              height={1018}
              className="mx-auto mt-10 rounded-3xl"
              alt="Quiz example"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
