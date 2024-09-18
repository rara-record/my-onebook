import { BookItem } from '@/components/book-item';
import { BookData } from '@/types/book';
import { delay } from '@/utils/delay';
import { Suspense } from 'react';
import { BookListSkeleton } from '../_component/book-list-skeleton';

// 비동기 컴포넌트가 아니라면, loading 컴포넌트를 사용할 수 없음

const SearchResult = async ({ q }: { q: string }) => {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,
    { cache: 'force-cache' }
  );
  const data: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다..</div>;
  }

  return (
    <div>
      {data.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

// async 지워주기
export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense
      key={searchParams.q || ''}
      fallback={<BookListSkeleton count={10} />}
    >
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
