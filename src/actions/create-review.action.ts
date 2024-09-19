'use server';

import { delay } from '@/utils/delay';
import { revalidateTag } from 'next/cache';

export const createReviewAction = async (
  _: unknown,
  FormData: FormData
) => {
  const bookId = FormData.get('bookId')?.toString();
  const content = FormData.get('content')?.toString();
  const author = FormData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: '리뷰 내용을 입력해주세요.',
    };
  }

  try {
    await delay(250);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review/1`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // revalidatePath("/(default)", "layout");

    // 4. 모든 데이터 재검증
    // revalidatePath("/");

    // 5. 태그 기준, 데이터 캐시 재검증
    // revalidateType("태그이름");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: '',
    };
  } catch (error) {
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${error}`,
    };
  }
};
