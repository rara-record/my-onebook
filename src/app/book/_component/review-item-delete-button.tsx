'use client';

import { DeleteReviewAction } from '@/actions/delete-review.action';
import { Spinner } from '@/components/ui/spinner';
import { useActionState, useEffect, useRef } from 'react';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  // 버튼 타입이 submit이 아니거나, 기타 다른 태그일때
  // 리액트에서는 submit() 메서드 대신 requestSubmit() 메서드를 권장합니다.
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    DeleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input
        name="reviewId"
        defaultValue={reviewId}
        hidden
        readOnly
      />
      <input name="bookId" defaultValue={bookId} hidden readOnly />
      <div
        onClick={() => formRef.current?.requestSubmit()}
        className="cursor-pointer"
      >
        {isPending ? <Spinner /> : <span>삭제하기</span>}
      </div>
    </form>
  );
}
