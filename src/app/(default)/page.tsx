import { BookItem } from '@/components/book-item';
import { BookData } from '@/types/book';
import { getRemoteImageBase64 } from '@/utils/getBase64';
import type { Metadata } from 'next';

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

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const randomBooks: BookData[] = await response.json();

  const blurredImages = await Promise.all(
    randomBooks.map(async (book) => {
      const blurredImage = await getRemoteImageBase64(
        book.coverImgUrl
      );
      return blurredImage || ''; // fallback to empty string if null
    })
  );

  return (
    <div>
      {randomBooks.map((book, index) => (
        <BookItem
          key={book.id}
          {...book}
          blurredImage={blurredImages[index]}
        />
      ))}
    </div>
  );
};

const AllBooks = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book`,
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allBooks: BookData[] = await response.json();

  const blurredImages = await Promise.all(
    allBooks.map(async (book) => {
      const blurredImage = await getRemoteImageBase64(
        book.coverImgUrl
      );
      return blurredImage; // fallback to empty string if null
    })
  );

  return (
    <div>
      {allBooks.map((book, index) => (
        <BookItem
          key={book.id}
          {...book}
          blurredImage={blurredImages[index]}
        />
      ))}
    </div>
  );
};
