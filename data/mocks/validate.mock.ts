'use server';

export async function validateAnswer(): Promise<boolean> {
  return Math.random() < 0.5;
}
