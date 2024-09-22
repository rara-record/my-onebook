'use server';

import { revalidateTag } from 'next/cache';

export const DeleteReviewAction = async (
  _: unknown,
  formData: FormData
) => {
  const reviewId = formData.get('reviewId')?.toString();
  const bookId = formData.get('bookId')?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: '삭제하려는 리뷰를 찾을 수 없습니다.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`,
      {
        method: 'DELETE',
      }
    );

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
      error: `리뷰 삭제에 실패했습니다. ${error}`,
    };
  }
};
