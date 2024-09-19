'use server';

import { revalidatePath } from 'next/cache';

export const createReviewAction = async (FormData: FormData) => {
  const bookId = FormData.get('bookId')?.toString();
  const content = FormData.get('content')?.toString();
  const author = FormData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: 'POST',
      body: JSON.stringify({ bookId, content, author }),
    });

    revalidatePath(`/book/${bookId}`);
  } catch (error) {
    console.error(error);
    return;
  }
};
