import { BookItem } from '@/components/book-item';
import { BookData } from '@/types/book';
import { getRemoteImageBase64 } from '@/utils/getBase64';
import type { Metadata } from 'next';
import { BookListSkeleton } from './_component/book-list-skeleton';

export const metadata: Metadata = {
  title: '한입 북스',
  description: '한입 북스에 등록된 도서를 만나보세요.',
  openGraph: {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요.',
    images: ['/thumbnail.png'],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col gap-5">
      <section>
        <h1 className="mb-0 text-lg font-bold">지금 추천하는 도서</h1>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
          <RandomBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h1 className="mb-0 text-lg font-bold">등록된 모든 도서</h1>
        {/* <Suspense fallback={<BookListSkeleton count={10} />}> */}
          <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}

const RandomBooks = async () => {
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
