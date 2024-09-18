import { BookItem } from '@/components/book-item';
import { BookData } from '@/types/book';
import { delay } from '@/utils/delay';
import { Suspense } from 'react';
import { BookItemSkeleton } from './_component/book-item-skeleton';
import { BookListSkeleton } from './_component/book-list-skeleton';

const RandomBooks = async () => {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  const randomBooks: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      {randomBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

const AllBooks = async () => {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book`,
    { cache: 'force-cache' }
  );
  const allBooks: BookData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export const dynamic = 'force-dynamic';
// 특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 컴포넌트 스트리밍 예제를 위해 사용됨

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="mb-0 text-lg font-bold">지금 추천하는 도서</h1>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RandomBooks />
        </Suspense>
      </section>
      <section>
        <h1 className="mb-0 text-lg font-bold">등록된 모든 도서</h1>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
