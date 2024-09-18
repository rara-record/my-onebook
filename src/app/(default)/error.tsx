'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h1 className="font-bold text-lg">오류가 발생했습니다.</h1>
      <button
        className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            reset(); // 에러 상태 초기화, 컴포넌트 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
