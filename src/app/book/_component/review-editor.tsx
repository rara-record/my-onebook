'use client';

import { createReviewAction } from '@/actions/create-review.action';
import { Spinner } from '@/components/ui/spinner';
import { useActionState, useEffect } from 'react';

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section className="flex flex-col">
      <form action={formAction} className="flex flex-col gap-2">
        <input name="bookId" readOnly defaultValue={bookId} hidden />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
          className="w-full h-[100px] resize-y px-3 py-3 border border-gray-300 rounded-md disabled:opacity-75"
        />
        <div className="flex justify-end gap-2">
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
            className="px-2 py-2 border border-gray-300 rounded-md disabled:opacity-75"
          />
          <button
            disabled={isPending}
            type="submit"
            className="w-20 px-2 py-2 border-none text-white text-sm  cursor-pointer rounded-md bg-[rgb(37,147,255)]
            disabled:opacity-75
            "
          >
            {isPending ? <Spinner /> : <span> 작성 하기</span>}
          </button>
        </div>
      </form>
    </section>
  );
}
